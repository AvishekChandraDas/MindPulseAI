import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockPush, mockSaveAssessment } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockSaveAssessment: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("@/server/actions/assessment", () => ({
  saveAssessmentAction: mockSaveAssessment,
}));

import { AssessmentFlow } from "./assessment-flow";

describe("AssessmentFlow", () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockSaveAssessment.mockReset();
  });

  it("requires consent before allowing the assessment to begin", async () => {
    const user = userEvent.setup();

    render(<AssessmentFlow />);

    const beginButton = screen.getByRole("button", {
      name: "Begin PHQ-9",
    });
    expect((beginButton as HTMLButtonElement).disabled).toBe(true);

    await user.click(
      screen.getByRole("checkbox", {
        name: /i understand this screening is educational/i,
      }),
    );

    expect((beginButton as HTMLButtonElement).disabled).toBe(false);
    await user.click(beginButton);

    expect(
      await screen.findByRole("heading", {
        name: "Depression screening questions",
      }),
    ).toBeTruthy();
    expect(window.location.hash).toBe("#phq-9");
  });
});
