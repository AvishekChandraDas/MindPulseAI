import type { Metadata } from "next";

import { getDashboardData } from "@/server/queries/dashboard";
import { getWellnessReports } from "@/server/queries/wellness-reports";
import { AssessmentScoreCharts, MoodTrendChart } from "@/components/analytics";
import { MoodHistory, MoodTracker } from "@/components/mood";
import { WellnessReportCard } from "@/components/reports";

import {
  AssessmentSummaryCards,
  DashboardWelcomeCard,
  QuickActions,
  RecentActivity,
  ReminderManager,
  UpcomingReminders,
} from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your private MindPulse AI overview, including assessments, mood insights, reports, activity, and reminders.",
};

export default async function DashboardPage() {
  const [{ user, assessments, moodLogs, reminders, activity }, reports] =
    await Promise.all([getDashboardData(), getWellnessReports()]);
  return (
    <div className="space-y-10">
      <section id="overview" className="scroll-mt-28 space-y-6">
        <DashboardWelcomeCard
          name={user?.name ?? null}
          completedAssessments={
            assessments.filter(
              (assessment) => assessment.status === "COMPLETED",
            ).length
          }
          moodEntries={moodLogs.length}
          reminders={reminders.length}
        />
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
          <RecentActivity activity={activity} />
          <UpcomingReminders>
            <ReminderManager reminders={reminders} />
          </UpcomingReminders>
        </div>
      </section>

      <WellnessReportCard reports={reports} />
    </div>
  );
}
