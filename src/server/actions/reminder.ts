"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/prisma";

const reminderSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(500).optional(),
  dueAt: z.coerce.date(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

const reminderIdSchema = z.string().cuid();

export type ReminderActionResult =
  { success: true } | { success: false; error: string };

export async function createReminder(
  input: unknown,
): Promise<ReminderActionResult> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      success: false,
      error: "You must be signed in to create a reminder.",
    };
  }

  const parsed = reminderSchema.safeParse(input);

  if (!parsed.success || Number.isNaN(parsed.data?.dueAt.getTime())) {
    return { success: false, error: "Enter a title and a valid due date." };
  }

  await prisma.reminder.create({
    data: {
      userId: currentUser.id,
      title: parsed.data.title,
      description: parsed.data.description || null,
      dueAt: parsed.data.dueAt,
      priority: parsed.data.priority,
    },
  });
  revalidatePath("/dashboard");

  return { success: true };
}

export async function completeReminder(
  id: string,
): Promise<ReminderActionResult> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      success: false,
      error: "You must be signed in to update a reminder.",
    };
  }

  if (!reminderIdSchema.safeParse(id).success) {
    return { success: false, error: "Invalid reminder." };
  }

  const result = await prisma.reminder.updateMany({
    where: { id, userId: currentUser.id, completedAt: null },
    data: { completedAt: new Date() },
  });

  if (result.count === 0) {
    return { success: false, error: "Reminder not found." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
