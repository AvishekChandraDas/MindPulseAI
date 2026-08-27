"use server";

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

export async function saveMood(input: unknown) {
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

  const moodLog = await prisma.moodLog.create({
    data: {
      userId: currentUser.id,
      mood: parsed.data.mood,
      note: parsed.data.note || null,
    },
    select: {
      id: true,
      mood: true,
      note: true,
      loggedAt: true,
    },
  });

  return {
    success: true,
    moodLog,
  };
}