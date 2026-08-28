"use server";

import {
  generateWellnessReport,
  getWellnessReportInput,
  type WellnessReportGenerationResult,
} from "@/server/services/wellness-report";

export async function generateWellnessReportAction(): Promise<WellnessReportGenerationResult> {
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

  return generateWellnessReport(input);
}
