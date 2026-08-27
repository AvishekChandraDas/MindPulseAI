import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      user: null,
      assessments: [],
    };
  }

  const assessments = await prisma.assessment.findMany({
    where: {
      userId: currentUser.id,
    },
    select: {
      id: true,
      status: true,
      score: true,
      phq9Score: true,
      gad7Score: true,
      phq9Severity: true,
      gad7Severity: true,
      riskLevel: true,
      summary: true,
      completedAt: true,
      createdAt: true,
    },
    orderBy: {
      completedAt: "desc",
    },
  });

  return {
    user: currentUser,
    assessments,
  };
}
