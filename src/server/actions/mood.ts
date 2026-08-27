"use server";

import type { Prisma } from "@prisma/client";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/prisma";

const moodSchema = z.object({
  mood: z.enum(["VERY_LOW", "LOW", "NEUTRAL", "GOOD", "VERY_GOOD"]),
  note: z
    .string()
    .trim()
    .max(500, "Mood note must be 500 characters or less.")
    .optional(),
});

const moodLogSelect = {
  id: true,
  mood: true,
  note: true,
  loggedAt: true,
} satisfies Prisma.MoodLogSelect;

export type SaveMoodInput = z.infer<typeof moodSchema>;
export type SavedMoodLog = Prisma.MoodLogGetPayload<{
  select: typeof moodLogSelect;
}>;
export type SaveMoodResult =
  | { success: true; moodLog: SavedMoodLog }
  | { success: false; error: string };

export async function saveMood(input: unknown): Promise<SaveMoodResult> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      success: false,
      error: "You must be logged in to save a mood.",
    };
  }

  const parsed = moodSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid mood data.",
    };
  }

  try {
    const moodLog = await prisma.moodLog.create({
      data: {
        userId: currentUser.id,
        mood: parsed.data.mood,
        note: parsed.data.note || null,
      },
      select: moodLogSelect,
    });

    return {
      success: true,
      moodLog,
    };
  } catch {
    return {
      success: false,
      error: "Unable to save your mood. Please try again.",
    };
  }
}
