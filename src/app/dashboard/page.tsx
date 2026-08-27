import type { Metadata } from "next";

import { getDashboardData } from "@/server/queries/dashboard";
import { getMoodLogs } from "@/server/queries/mood";
import { AssessmentScoreCharts, MoodTrendChart } from "@/components/analytics";
import { MoodHistory, MoodTracker } from "@/components/mood";

import {
  AssessmentSummaryCards,
  DashboardWelcomeCard,
  QuickActions,
  RecentActivity,
  UpcomingReminders,
} from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Static dashboard layout for MindPulse AI with sidebar navigation, summary cards, mood insights, activity, and reminders.",
};

export default async function DashboardPage() {
  const [{ assessments }, moodLogs] = await Promise.all([
    getDashboardData(),
    getMoodLogs(),
  ]);
  return (
    <div className="space-y-10">
      <section id="overview" className="scroll-mt-28 space-y-6">
        <DashboardWelcomeCard />
        <QuickActions />
      </section>

      <section id="assessments" className="scroll-mt-28 space-y-6">
        <AssessmentSummaryCards assessments={assessments} />
        <AssessmentScoreCharts assessments={assessments} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <section
          id="mood"
          aria-label="Mood check-in"
          className="space-y-6 scroll-mt-28"
        >
          <MoodTracker />
          <MoodTrendChart moodLogs={moodLogs} />
          <MoodHistory moodLogs={moodLogs} />
        </section>
        <div className="space-y-6">
          <RecentActivity />
          <UpcomingReminders />
        </div>
      </section>
    </div>
  );
}
