import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/prisma";

export async function getMoodLogs() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  return prisma.moodLog.findMany({
    where: {
      userId: currentUser.id,
    },
    orderBy: {
      loggedAt: "desc",
    },
    select: {
      id: true,
      mood: true,
      note: true,
      loggedAt: true,
    },
  });
}