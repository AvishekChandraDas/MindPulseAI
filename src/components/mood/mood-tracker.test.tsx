import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockSaveMood } = vi.hoisted(() => ({
  mockSaveMood: vi.fn(),
}));

vi.mock("@/server/actions/mood", () => ({
  saveMood: mockSaveMood,
}));

import { MoodTracker } from "./mood-tracker";

describe("MoodTracker", () => {
  beforeEach(() => {
    mockSaveMood.mockReset();
  });

  it("saves the selected mood and optional note", async () => {
    const user = userEvent.setup();
    mockSaveMood.mockResolvedValue({
      success: true,
      moodLog: {
        id: "mood_123",
        mood: "GOOD",
        note: "Felt focused",
        loggedAt: new Date("2026-08-01"),
      },
    });

    render(<MoodTracker />);

    const saveButton = screen.getByRole("button", { name: "Save mood" });
    expect((saveButton as HTMLButtonElement).disabled).toBe(true);

    await user.click(screen.getByRole("radio", { name: /^good$/i }));
    await user.type(
      screen.getByRole("textbox", { name: /note/i }),
      "Felt focused",
    );
    await user.click(saveButton);

    expect(mockSaveMood).toHaveBeenCalledWith({
      mood: "GOOD",
      note: "Felt focused",
    });
    expect((await screen.findByRole("status")).textContent).toContain(
      "Your mood has been saved.",
    );
    expect(
      (screen.getByRole("textbox", { name: /note/i }) as HTMLTextAreaElement)
        .value,
    ).toBe("");
  });

  it("shows a safe error when saving fails", async () => {
    const user = userEvent.setup();
    mockSaveMood.mockResolvedValue({
      success: false,
      error: "Unable to save your mood. Please try again.",
    });

    render(<MoodTracker />);

    await user.click(screen.getByRole("radio", { name: /^low$/i }));
    await user.click(screen.getByRole("button", { name: "Save mood" }));

    expect((await screen.findByRole("status")).textContent).toContain(
      "Unable to save your mood. Please try again.",
    );
  });
});
