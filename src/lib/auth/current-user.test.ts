import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockGetServerSession, mockFindUnique } = vi.hoisted(() => ({
  mockGetServerSession: vi.fn(),
  mockFindUnique: vi.fn(),
}));

vi.mock("next-auth/next", () => ({
  getServerSession: mockGetServerSession,
}));

vi.mock("@/lib/auth/options", () => ({
  authOptions: {},
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: mockFindUnique,
    },
  },
}));

import { getCurrentUser } from "./current-user";

describe("getCurrentUser", () => {
  beforeEach(() => {
    mockGetServerSession.mockReset();
    mockFindUnique.mockReset();
  });

  it("returns null without an Auth.js session", async () => {
    mockGetServerSession.mockResolvedValue(null);

    await expect(getCurrentUser()).resolves.toBeNull();
    expect(mockFindUnique).not.toHaveBeenCalled();
  });

  it("loads only the user identified by the server-validated session", async () => {
    const user = { id: "authenticated-user", email: "member@example.com" };
    mockGetServerSession.mockResolvedValue({
      user: { id: user.id, email: user.email },
    });
    mockFindUnique.mockResolvedValue(user);

    await expect(getCurrentUser()).resolves.toEqual(user);
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: "authenticated-user" },
    });
  });
});
