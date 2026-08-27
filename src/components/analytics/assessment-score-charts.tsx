import type { ChartDataPoint } from "./types";

import { ChartCard } from "./chart-card";
import { LineChart } from "./line-chart";

type AssessmentScoreRecord = {
  id: string;
  status: string;
  phq9Score: number | null;
  gad7Score: number | null;
  completedAt: Date | null;
  createdAt: Date;
};

type ScoreField = "phq9Score" | "gad7Score";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

function getAssessmentScoreData(
  assessments: AssessmentScoreRecord[],
  scoreField: ScoreField,
): ChartDataPoint[] {
  return assessments
    .filter(
      (assessment) =>
        assessment.status === "COMPLETED" &&
        assessment[scoreField] !== null &&
        assessment[scoreField] !== undefined,
    )
    .sort(
      (first, second) =>
        (first.completedAt ?? first.createdAt).getTime() -
        (second.completedAt ?? second.createdAt).getTime(),
    )
    .slice(-10)
    .map((assessment) => {
      const completedAt = assessment.completedAt ?? assessment.createdAt;

      return {
        id: assessment.id,
        label: dateFormatter.format(completedAt),
        value: assessment[scoreField]!,
      };
    });
}

export function AssessmentScoreCharts({
  assessments,
}: {
  assessments: AssessmentScoreRecord[];
}) {
  const phq9Data = getAssessmentScoreData(assessments, "phq9Score");
  const gad7Data = getAssessmentScoreData(assessments, "gad7Score");

  return (
    <section
      aria-label="Assessment score history"
      className="grid gap-6 lg:grid-cols-2"
    >
      <ChartCard
        eyebrow="PHQ-9 history"
        title="Depression screening score"
        description="Completed assessment scores, shown on the PHQ-9 scale from 0 to 27."
      >
        <LineChart
          data={phq9Data}
          label="PHQ-9 score history"
          valueLabel="out of 27"
          minValue={0}
          maxValue={27}
        />
      </ChartCard>

      <ChartCard
        eyebrow="GAD-7 history"
        title="Anxiety screening score"
        description="Completed assessment scores, shown on the GAD-7 scale from 0 to 21."
      >
        <LineChart
          data={gad7Data}
          label="GAD-7 score history"
          valueLabel="out of 21"
          minValue={0}
          maxValue={21}
        />
      </ChartCard>
    </section>
  );
}
