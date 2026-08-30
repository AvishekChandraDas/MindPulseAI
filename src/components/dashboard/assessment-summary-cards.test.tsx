import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/motion", () => ({
  FadeIn: ({ children }: { children: ReactNode }) => <>{children}</>,
  StaggerItem: ({ children }: { children: ReactNode }) => <>{children}</>,
  StaggerList: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

import { AssessmentSummaryCards } from "./dashboard-sections";

describe("AssessmentSummaryCards", () => {
  it("shows an empty state until a completed assessment exists", () => {
    render(<AssessmentSummaryCards assessments={[]} />);

    expect(
      screen.getByText("You have not completed an assessment yet."),
    ).toBeTruthy();
  });

  it("shows the latest completed assessment scores", () => {
    render(
      <AssessmentSummaryCards
        assessments={[
          {
            id: "assessment_123",
            status: "COMPLETED",
            score: 12,
            phq9Score: 7,
            gad7Score: 5,
            phq9Severity: "Mild",
            gad7Severity: "Mild",
            riskLevel: "LOW",
            summary: "Saved assessment",
            completedAt: new Date("2026-08-01"),
            createdAt: new Date("2026-08-01"),
          },
        ]}
      />,
    );

    expect(screen.getAllByText("7").length).toBeGreaterThan(0);
    expect(screen.getAllByText("5").length).toBeGreaterThan(0);
    expect(screen.getByText("LOW")).toBeTruthy();
  });
});
