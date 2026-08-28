import "server-only";

import { isCurrentUserAdmin } from "@/lib/auth/admin";
import { prisma } from "@/lib/prisma";

export type AdminAssessmentOverview = {
  total: number;
  completed: number;
  inProgress: number;
  reviewed: number;
  abandoned: number;
  lastCompletedAt: Date | null;
};

export async function getAdminAssessmentOverview(): Promise<AdminAssessmentOverview | null> {
  if (!(await isCurrentUserAdmin())) {
    return null;
  }

  const [statusCounts, completionAggregate] = await Promise.all([
    prisma.assessment.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    }),
    prisma.assessment.aggregate({
      _max: {
        completedAt: true,
      },
    }),
  ]);

  const countByStatus = new Map(
    statusCounts.map((item) => [item.status, item._count._all]),
  );

  return {
    total: statusCounts.reduce((total, item) => total + item._count._all, 0),
    completed: countByStatus.get("COMPLETED") ?? 0,
    inProgress: countByStatus.get("IN_PROGRESS") ?? 0,
    reviewed: countByStatus.get("REVIEWED") ?? 0,
    abandoned: countByStatus.get("ABANDONED") ?? 0,
    lastCompletedAt: completionAggregate._max.completedAt,
  };
}
