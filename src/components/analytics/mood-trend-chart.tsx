import type { MoodLog } from "@/server/queries/mood";

import { ChartCard } from "./chart-card";
import { LineChart } from "./line-chart";
import type { ChartDataPoint } from "./types";

const moodScores: Record<MoodLog["mood"], number> = {
  VERY_LOW: 1,
  LOW: 2,
  NEUTRAL: 3,
  GOOD: 4,
  VERY_GOOD: 5,
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

export function getMoodTrendData(moodLogs: MoodLog[]): ChartDataPoint[] {
  return [...moodLogs]
    .sort(
      (first, second) => first.loggedAt.getTime() - second.loggedAt.getTime(),
    )
    .map((moodLog) => ({
      id: moodLog.id,
      label: dateFormatter.format(moodLog.loggedAt),
      value: moodScores[moodLog.mood],
    }));
}

export function MoodTrendChart({ moodLogs }: { moodLogs: MoodLog[] }) {
  return (
    <ChartCard
      eyebrow="Mood trend"
      title="Your recent check-ins"
      description="A simple view of your logged mood levels over time."
    >
      <LineChart
        data={getMoodTrendData(moodLogs)}
        label="Mood trend over recent check-ins"
        valueLabel="out of 5"
        minValue={1}
        maxValue={5}
      />
    </ChartCard>
  );
}