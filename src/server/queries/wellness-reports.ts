import "server-only";

import { z } from "zod";

import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/prisma";

const reportEntriesSchema = z.array(z.string());

export type StoredWellnessReport = {
  id: string;
  assessmentResults: string[];
  moodPatterns: string[];
  wellnessObservations: string[];
  supportiveNextSteps: string[];
  disclaimer: string;
  generatedAt: Date;
};

export async function getWellnessReports(): Promise<StoredWellnessReport[]> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  const reports = await prisma.wellnessReport.findMany({
    where: { userId: currentUser.id },
    orderBy: { generatedAt: "desc" },
    take: 10,
  });

  return reports.flatMap((report) => {
    const assessmentResults = reportEntriesSchema.safeParse(
      report.assessmentResults,
    );
    const moodPatterns = reportEntriesSchema.safeParse(report.moodPatterns);
    const wellnessObservations = reportEntriesSchema.safeParse(
      report.wellnessObservations,
    );
    const supportiveNextSteps = reportEntriesSchema.safeParse(
      report.supportiveNextSteps,
    );

    if (
      !assessmentResults.success ||
      !moodPatterns.success ||
      !wellnessObservations.success ||
      !supportiveNextSteps.success
    ) {
      return [];
    }

    return [
      {
        id: report.id,
        assessmentResults: assessmentResults.data,
        moodPatterns: moodPatterns.data,
        wellnessObservations: wellnessObservations.data,
        supportiveNextSteps: supportiveNextSteps.data,
        disclaimer: report.disclaimer,
        generatedAt: report.generatedAt,
      },
    ];
  });
}
