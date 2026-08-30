import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

const { mockSignOut } = vi.hoisted(() => ({
  mockSignOut: vi.fn(),
}));

vi.mock("next-auth/react", () => ({
  signOut: mockSignOut,
}));

import { SignOutButton } from "./sign-out-button";

it("ends the Auth.js session and returns to the public home page", async () => {
  const user = userEvent.setup();
  render(<SignOutButton />);

  await user.click(screen.getByRole("button", { name: "Sign out" }));

  expect(mockSignOut).toHaveBeenCalledWith({ callbackUrl: "/" });
});
