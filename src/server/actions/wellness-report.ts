"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/prisma";
import {
  generateWellnessReport,
  getWellnessReportInput,
  type WellnessReportOutput,
} from "@/server/services/wellness-report";

export type WellnessReportActionResult =
  | { success: true; report: WellnessReportOutput & { id: string } }
  | { success: false; error: string };

export async function generateWellnessReportAction(): Promise<WellnessReportActionResult> {
  const input = await getWellnessReportInput();

  if (!input) {
    return {
      success: false,
      error: "You must be signed in to generate a wellness report.",
    };
  }

  if (input.assessments.length === 0 && input.moodLogs.length === 0) {
    return {
      success: false,
      error:
        "Add a mood entry or complete an assessment before generating a report.",
    };
  }

  const generation = await generateWellnessReport(input);

  if (!generation.success) {
    return generation;
  }

  try {
    const report = await prisma.wellnessReport.create({
      data: {
        userId: input.userId,
        assessmentResults: generation.report.assessmentResults,
        moodPatterns: generation.report.moodPatterns,
        wellnessObservations: generation.report.wellnessObservations,
        supportiveNextSteps: generation.report.supportiveNextSteps,
        disclaimer: generation.report.disclaimer,
        generatedAt: generation.report.generatedAt,
      },
    });
    revalidatePath("/dashboard");

    return {
      success: true,
      report: {
        ...generation.report,
        id: report.id,
      },
    };
  } catch {
    return {
      success: false,
      error: "Unable to save your wellness report right now.",
    };
  }
}

const reportIdSchema = z.string().cuid();

export async function deleteWellnessReport(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      success: false,
      error: "You must be signed in to delete a report.",
    };
  }

  if (!reportIdSchema.safeParse(id).success) {
    return { success: false, error: "Invalid report." };
  }

  const result = await prisma.wellnessReport.deleteMany({
    where: { id, userId: currentUser.id },
  });

  if (result.count === 0) {
    return { success: false, error: "Report not found." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
