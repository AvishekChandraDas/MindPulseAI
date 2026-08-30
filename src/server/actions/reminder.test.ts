import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockGetCurrentUser, mockCreate, mockUpdateMany } = vi.hoisted(() => ({
  mockGetCurrentUser: vi.fn(),
  mockCreate: vi.fn(),
  mockUpdateMany: vi.fn(),
}));

vi.mock("@/lib/auth/current-user", () => ({
  getCurrentUser: mockGetCurrentUser,
}));
vi.mock("@/lib/prisma", () => ({
  prisma: { reminder: { create: mockCreate, updateMany: mockUpdateMany } },
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

import { completeReminder, createReminder } from "./reminder";

describe("reminder actions", () => {
  beforeEach(() => {
    mockGetCurrentUser.mockReset();
    mockCreate.mockReset();
    mockUpdateMany.mockReset();
    mockGetCurrentUser.mockResolvedValue({
      id: "user_123",
      email: "member@example.com",
    });
  });

  it("creates a reminder under the authenticated user", async () => {
    mockCreate.mockResolvedValue({ id: "reminder_123" });

    await expect(
      createReminder({
        title: "Check in",
        dueAt: "2026-09-01T09:00",
        priority: "HIGH",
      }),
    ).resolves.toEqual({ success: true });
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          userId: "user_123",
          title: "Check in",
          priority: "HIGH",
        }),
      }),
    );
  });

  it("cannot complete another user's reminder", async () => {
    mockUpdateMany.mockResolvedValue({ count: 0 });

    await expect(
      completeReminder("c123456789012345678901234"),
    ).resolves.toEqual({ success: false, error: "Reminder not found." });
    expect(mockUpdateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ userId: "user_123" }),
      }),
    );
  });
});
