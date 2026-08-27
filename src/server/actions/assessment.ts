"use server";

import { z } from "zod";

import {
  phq9Questions,
  gad7Questions,
} from "@/components/assessment/mock-data";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import {
  calculateGad7Score,
  calculatePhq9Score,
} from "@/lib/assessment/scoring";

const answerValueSchema = z.enum(["0", "1", "2", "3"]);

const saveAssessmentSchema = z.object({
  consentAccepted: z.literal(true),
  answers: z.record(z.string(), answerValueSchema),
});

const phq9Ids = phq9Questions.map((question) => question.id);
const gad7Ids = gad7Questions.map((question) => question.id);
const allQuestionIds = [...phq9Ids, ...gad7Ids];

type SaveAssessmentResult =
  { ok: true; assessmentId: string } | { ok: false; error: string };

async function ensureQuestionRecords() {
  const questionRecords = [
    ...phq9Questions.map((question, index) => ({
      id: question.id,
      prompt: question.prompt,
      category: "PHQ-9",
      order: index,
    })),
    ...gad7Questions.map((question, index) => ({
      id: question.id,
      prompt: question.prompt,
      category: "GAD-7",
      order: index,
    })),
  ];

  for (const question of questionRecords) {
    await prisma.question.upsert({
      where: {
        id: question.id,
      },
      update: {
        prompt: question.prompt,
        category: question.category,
        order: question.order,
        type: "SCALE",
        isActive: true,
      },
      create: {
        id: question.id,
        prompt: question.prompt,
        category: question.category,
        order: question.order,
        type: "SCALE",
        isActive: true,
      },
    });
  }
}

export async function saveAssessmentAction(
  input: unknown,
): Promise<SaveAssessmentResult> {
  const parsed = saveAssessmentSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: "Complete every question and confirm consent before saving.",
    };
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      ok: false,
      error: "Sign in to save this assessment to your account.",
    };
  }

  const missingQuestionIds = allQuestionIds.filter(
    (questionId) => !parsed.data.answers[questionId],
  );

  if (missingQuestionIds.length > 0) {
    return {
      ok: false,
      error: "Please answer all PHQ-9 and GAD-7 questions before saving.",
    };
  }

  const phq9 = calculatePhq9Score(parsed.data.answers, phq9Ids);
  const gad7 = calculateGad7Score(parsed.data.answers, gad7Ids);

  try {
    await ensureQuestionRecords();

    const assessment = await prisma.$transaction(async (transaction) => {
      return transaction.assessment.create({
        data: {
          userId: currentUser.id,
          status: "COMPLETED",
          score: phq9.score + gad7.score,
          phq9Score: phq9.score,
          gad7Score: gad7.score,
          phq9Severity: phq9.band.label,
          gad7Severity: gad7.band.label,
          summary: `PHQ-9 ${phq9.band.label}; GAD-7 ${gad7.band.label}`,
          completedAt: new Date(),
          responses: {
            create: allQuestionIds.map((questionId) => ({
              questionId,
              selectedOption: parsed.data.answers[questionId],
              answerNumber: Number(parsed.data.answers[questionId]),
            })),
          },
        },
      });
    });

    return {
      ok: true,
      assessmentId: assessment.id,
    };
  } catch {
    return {
      ok: false,
      error: "We could not save your assessment. Please try again.",
    };
  }
}
