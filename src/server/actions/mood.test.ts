import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockGetCurrentUser, mockMoodLogCreate } = vi.hoisted(() => ({
  mockGetCurrentUser: vi.fn(),
  mockMoodLogCreate: vi.fn(),
}));

vi.mock("@/lib/auth/current-user", () => ({
  getCurrentUser: mockGetCurrentUser,
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    moodLog: {
      create: mockMoodLogCreate,
    },
  },
}));

import { saveMood } from "./mood";

const currentUser = {
  id: "user_123",
  email: "user@example.com",
  name: null,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
};

beforeEach(() => {
  mockGetCurrentUser.mockReset();
  mockMoodLogCreate.mockReset();
  mockGetCurrentUser.mockResolvedValue(currentUser);
  mockMoodLogCreate.mockResolvedValue({
    id: "mood_123",
    mood: "GOOD",
    note: null,
    loggedAt: new Date("2026-01-02"),
  });
});

describe("saveMood", () => {
  it.each(["VERY_LOW", "LOW", "NEUTRAL", "GOOD", "VERY_GOOD"] as const)(
    "saves the valid %s mood level",
    async (mood) => {
      const result = await saveMood({ mood });

      expect(result.success).toBe(true);
      expect(mockMoodLogCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            userId: currentUser.id,
            mood,
            note: null,
          }),
        }),
      );
    },
  );

  it("rejects an invalid mood without writing to the database", async () => {
    const result = await saveMood({ mood: "HAPPY" });

    expect(result).toEqual({
      success: false,
      error: "Invalid mood data.",
    });
    expect(mockMoodLogCreate).not.toHaveBeenCalled();
  });

  it("trims and saves an optional note", async () => {
    const result = await saveMood({
      mood: "GOOD",
      note: "  Felt more focused today.  ",
    });

    expect(result.success).toBe(true);
    expect(mockMoodLogCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          note: "Felt more focused today.",
        }),
      }),
    );
  });

  it("requires an authenticated user before validating or saving", async () => {
    mockGetCurrentUser.mockResolvedValue(null);

    const result = await saveMood({ mood: "GOOD" });

    expect(result).toEqual({
      success: false,
      error: "You must be logged in to save a mood.",
    });
    expect(mockMoodLogCreate).not.toHaveBeenCalled();
  });

  it("returns a safe error when the database write fails", async () => {
    mockMoodLogCreate.mockRejectedValue(new Error("Database unavailable"));

    const result = await saveMood({ mood: "GOOD" });

    expect(result).toEqual({
      success: false,
      error: "Unable to save your mood. Please try again.",
    });
  });
});
