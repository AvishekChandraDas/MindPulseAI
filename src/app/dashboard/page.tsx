import type { Metadata } from "next";

import {
  AssessmentSummaryCards,
  DashboardWelcomeCard,
  MoodSummaryCard,
  QuickActions,
  RecentActivity,
  UpcomingReminders,
} from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Static dashboard layout for MindPulse AI with sidebar navigation, summary cards, mood insights, activity, and reminders.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <section id="overview" className="scroll-mt-28 space-y-6">
        <DashboardWelcomeCard />
        <QuickActions />
      </section>

      <section id="assessments" className="scroll-mt-28 space-y-6">
        <AssessmentSummaryCards />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <MoodSummaryCard />
        <div className="space-y-6">
          <RecentActivity />
          <UpcomingReminders />
        </div>
      </section>
    </div>
  );
}