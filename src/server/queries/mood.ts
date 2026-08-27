import type { Prisma } from "@prisma/client";

import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/prisma";

const moodLogSelect = {
  id: true,
  mood: true,
  note: true,
  loggedAt: true,
} satisfies Prisma.MoodLogSelect;

export type MoodLog = Prisma.MoodLogGetPayload<{
  select: typeof moodLogSelect;
}>;

export async function getMoodLogs(): Promise<MoodLog[]> {
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
    take: 10,
    select: moodLogSelect,
  });
}
