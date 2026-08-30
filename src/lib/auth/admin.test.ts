import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockGetCurrentUser } = vi.hoisted(() => ({
  mockGetCurrentUser: vi.fn(),
}));

vi.mock("./current-user", () => ({
  getCurrentUser: mockGetCurrentUser,
}));

import { isCurrentUserAdmin } from "./admin";

describe("isCurrentUserAdmin", () => {
  beforeEach(() => {
    mockGetCurrentUser.mockReset();
    process.env.ADMIN_EMAILS = "admin@example.com";
  });

  it("denies an unauthenticated request", async () => {
    mockGetCurrentUser.mockResolvedValue(null);

    await expect(isCurrentUserAdmin()).resolves.toBe(false);
  });

  it("uses the authenticated user's email against the server allowlist", async () => {
    mockGetCurrentUser.mockResolvedValue({ email: "ADMIN@example.com" });

    await expect(isCurrentUserAdmin()).resolves.toBe(true);
  });

  it("does not grant admin access to other authenticated users", async () => {
    mockGetCurrentUser.mockResolvedValue({ email: "member@example.com" });

    await expect(isCurrentUserAdmin()).resolves.toBe(false);
  });
});
