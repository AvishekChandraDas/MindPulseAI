import "server-only";

import { z } from "zod";

import type { MoodLog } from "@/server/queries/mood";
import { getDashboardData } from "@/server/queries/dashboard";
import { getMoodLogs } from "@/server/queries/mood";

export type WellnessReportAssessment = {
  id: string;
  phq9Score: number | null;
  gad7Score: number | null;
  phq9Severity: string | null;
  gad7Severity: string | null;
  riskLevel: string | null;
  completedAt: Date | null;
};

export type WellnessReportInput = {
  userId: string;
  generatedAt: Date;
  assessments: WellnessReportAssessment[];
  moodLogs: MoodLog[];
};

const wellnessReportContentSchema = z.object({
  assessmentResults: z.array(z.string()),
  moodPatterns: z.array(z.string()),
  wellnessObservations: z.array(z.string()),
  supportiveNextSteps: z.array(z.string()),
  disclaimer: z.string(),
});

type WellnessReportContent = z.infer<typeof wellnessReportContentSchema>;

export type WellnessReportOutput = WellnessReportContent & {
  generatedAt: Date;
};

export type WellnessReportGenerationResult =
  | { success: true; report: WellnessReportOutput }
  | { success: false; error: string };

const geminiResponseSchema = z.object({
  candidates: z
    .array(
      z.object({
        content: z
          .object({
            parts: z.array(z.object({ text: z.string().optional() })),
          })
          .optional(),
      }),
    )
    .optional(),
});

const wellnessReportJsonSchema = {
  type: "object",
  properties: {
    assessmentResults: { type: "array", items: { type: "string" } },
    moodPatterns: { type: "array", items: { type: "string" } },
    wellnessObservations: { type: "array", items: { type: "string" } },
    supportiveNextSteps: { type: "array", items: { type: "string" } },
    disclaimer: { type: "string" },
  },
  required: [
    "assessmentResults",
    "moodPatterns",
    "wellnessObservations",
    "supportiveNextSteps",
    "disclaimer",
  ],
} as const;

const reportInstructions = `
Create a concise, supportive wellness summary from the supplied structured data.

This is educational reflection, not medical advice. Do not diagnose medical or
mental-health conditions, determine whether someone is in an emergency, make
emergency-risk decisions, or recommend emergency action. Do not infer facts
that are absent from the data. Refer to screening scores as reported results,
not diagnoses.

Return JSON only with these fields:
- assessmentResults: up to 3 factual, plain-language observations
- moodPatterns: up to 3 observations based only on the supplied mood entries
- wellnessObservations: up to 3 neutral, general observations
- supportiveNextSteps: 2 or 3 low-pressure, non-clinical suggestions
- disclaimer: a brief reminder that this is not a diagnosis or a substitute for professional care
`;

/**
 * Assembles only the authenticated user's existing wellness data for report
 * generation. No identity, email address, or authentication data is sent to
 * Gemini.
 */
export async function getWellnessReportInput(): Promise<WellnessReportInput | null> {
  const [{ user, assessments }, moodLogs] = await Promise.all([
    getDashboardData(),
    getMoodLogs(),
  ]);

  if (!user) {
    return null;
  }

  return {
    userId: user.id,
    generatedAt: new Date(),
    assessments: assessments.map((assessment) => ({
      id: assessment.id,
      phq9Score: assessment.phq9Score,
      gad7Score: assessment.gad7Score,
      phq9Severity: assessment.phq9Severity,
      gad7Severity: assessment.gad7Severity,
      riskLevel: assessment.riskLevel,
      completedAt: assessment.completedAt,
    })),
    moodLogs,
  };
}

function serializeReportInput(input: WellnessReportInput) {
  return {
    assessments: input.assessments.map((assessment) => ({
      ...assessment,
      completedAt: assessment.completedAt?.toISOString() ?? null,
    })),
    moodLogs: input.moodLogs.map((moodLog) => ({
      ...moodLog,
      loggedAt: moodLog.loggedAt.toISOString(),
    })),
  };
}

export async function generateWellnessReport(
  input: WellnessReportInput,
): Promise<WellnessReportGenerationResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error: "AI report generation is not configured.",
    };
  }

  try {
    const model = process.env.GEMINI_MODEL ?? "gemini-3.6-flash";
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: {
          "x-goog-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: reportInstructions }],
          },
          contents: [
            {
              parts: [{ text: JSON.stringify(serializeReportInput(input)) }],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            responseJsonSchema: wellnessReportJsonSchema,
            maxOutputTokens: 900,
          },
        }),
      },
    );

    if (!response.ok) {
      return {
        success: false,
        error: "Unable to generate a wellness report right now.",
      };
    }

    const apiResponse = geminiResponseSchema.safeParse(await response.json());
    const outputText = apiResponse.data?.candidates?.[0]?.content?.parts
      .map((part) => part.text ?? "")
      .join("");

    if (!apiResponse.success || !outputText) {
      return {
        success: false,
        error: "Unable to generate a wellness report right now.",
      };
    }

    const reportContent = wellnessReportContentSchema.safeParse(
      JSON.parse(outputText),
    );

    if (!reportContent.success) {
      return {
        success: false,
        error: "Unable to generate a wellness report right now.",
      };
    }

    return {
      success: true,
      report: {
        ...reportContent.data,
        generatedAt: new Date(),
      },
    };
  } catch {
    return {
      success: false,
      error: "Unable to generate a wellness report right now.",
    };
  }
}
