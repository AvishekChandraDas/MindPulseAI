import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockGetCurrentUser, mockDeleteMany } = vi.hoisted(() => ({
  mockGetCurrentUser: vi.fn(),
  mockDeleteMany: vi.fn(),
}));

vi.mock("@/lib/auth/current-user", () => ({
  getCurrentUser: mockGetCurrentUser,
}));
vi.mock("@/lib/prisma", () => ({
  prisma: { wellnessReport: { deleteMany: mockDeleteMany } },
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

import { deleteWellnessReport } from "./wellness-report";

describe("deleteWellnessReport", () => {
  beforeEach(() => {
    mockGetCurrentUser.mockReset();
    mockDeleteMany.mockReset();
    mockGetCurrentUser.mockResolvedValue({
      id: "user_123",
      email: "member@example.com",
    });
  });

  it("scopes deletion to the authenticated user", async () => {
    mockDeleteMany.mockResolvedValue({ count: 0 });

    await expect(
      deleteWellnessReport("c123456789012345678901234"),
    ).resolves.toEqual({ success: false, error: "Report not found." });
    expect(mockDeleteMany).toHaveBeenCalledWith({
      where: { id: "c123456789012345678901234", userId: "user_123" },
    });
  });
});
