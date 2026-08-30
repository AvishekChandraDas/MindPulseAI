import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn, StaggerItem, StaggerList } from "@/components/motion";
import {
  Card,
  CardContent,
  CardDescription,
  H2,
  H3,
  Small,
  Text,
} from "@/components/ui";
import { cn } from "@/lib/utils";

import { moodTrend, quickActions } from "./mock-data";
import type { DashboardActivity } from "@/server/queries/dashboard";

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl space-y-3">
      <Small className="uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </Small>
      <H2 id={id}>{title}</H2>
      <Text className="text-muted-foreground">{description}</Text>
    </div>
  );
}

export function DashboardWelcomeCard({
  name,
  completedAssessments,
  moodEntries,
  reminders,
}: {
  name: string | null;
  completedAssessments: number;
  moodEntries: number;
  reminders: number;
}) {
  return (
    <FadeIn>
      <Card className="overflow-hidden border-primary/15 bg-primary/5">
        <CardContent className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Overview
            </div>
            <div className="space-y-3">
              <H3 className="text-3xl sm:text-4xl">
                {name ? `Welcome back, ${name}.` : "Welcome back."}
              </H3>
              <Text className="max-w-2xl text-muted-foreground">
                Your saved assessments, mood check-ins, reports, and reminders
                are gathered here for a clear personal overview.
              </Text>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#assessments"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Review assessments
              </Link>
              <Link
                href="#mood"
                className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-transparent px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Check mood summary
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              [String(completedAssessments), "completed assessments"],
              [String(moodEntries), "recent mood entries"],
              [String(reminders), "reminders pending"],
            ].map(([value, label]) => (
              <div
                key={value}
                className="rounded-2xl border border-border bg-background p-4"
              >
                <div className="text-2xl font-semibold tracking-tight">
                  {value}
                </div>
                <Small>{label}</Small>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
}

export function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-heading" className="space-y-4">
      <SectionHeading
        id="quick-actions-heading"
        eyebrow="Quick actions"
        title="Jump to the right part of the dashboard."
        description="Move directly to the part of your dashboard you need."
      />
      <StaggerList className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => (
          <StaggerItem key={action.label}>
            <Link
              href={action.href}
              className={cn(
                "group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5",
              )}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <H3 className="text-lg">{action.label}</H3>
                  <span
                    aria-hidden
                    className="text-lg transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </div>
                <CardDescription>{action.description}</CardDescription>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerList>
    </section>
  );
}

export function AssessmentSummaryCards({
  assessments,
}: {
  assessments: Array<{
    id: string;
    status: string;
    score: number | null;
    phq9Score: number | null;
    gad7Score: number | null;
    phq9Severity: string | null;
    gad7Severity: string | null;
    riskLevel: string | null;
    summary: string | null;
    completedAt: Date | null;
    createdAt: Date;
  }>;
}) {
  const completedAssessments = assessments.filter(
    (assessment) => assessment.status === "COMPLETED",
  );

  const latestAssessment = completedAssessments[0];

  const metrics = [
    {
      label: "Assessments completed",
      value: String(completedAssessments.length),
      note: "From your assessment history",
      tone: "primary" as const,
    },
    {
      label: "Latest PHQ-9 score",
      value:
        latestAssessment?.phq9Score != null
          ? String(latestAssessment.phq9Score)
          : "—",
      note: latestAssessment?.phq9Severity ?? "No completed assessment",
      tone: "info" as const,
    },
    {
      label: "Latest GAD-7 score",
      value:
        latestAssessment?.gad7Score != null
          ? String(latestAssessment.gad7Score)
          : "—",
      note: latestAssessment?.gad7Severity ?? "No completed assessment",
      tone: "success" as const,
    },
    {
      label: "Risk level",
      value: latestAssessment?.riskLevel ?? "—",
      note: "Based on latest assessment",
      tone: "warning" as const,
    },
  ];

  return (
    <section aria-labelledby="assessments-heading" className="space-y-4">
      <SectionHeading
        id="assessments-heading"
        eyebrow="Assessment summary"
        title="What your latest screening picture looks like."
        description="These cards show information from your saved assessment history."
      />

      {completedAssessments.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <Text className="text-muted-foreground">
              You have not completed an assessment yet.
            </Text>
          </CardContent>
        </Card>
      ) : (
        <StaggerList className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <Card className="h-full">
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={cn(
                        "inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold",
                        metric.tone === "primary" &&
                          "bg-primary/10 text-primary",
                        metric.tone === "success" &&
                          "bg-success/10 text-success",
                        metric.tone === "warning" &&
                          "bg-warning/10 text-warning",
                        metric.tone === "info" && "bg-info/10 text-info",
                      )}
                    >
                      {metric.value.slice(0, 1)}
                    </div>

                    <Small>{metric.note}</Small>
                  </div>

                  <div className="space-y-1">
                    <div className="text-3xl font-semibold tracking-tight">
                      {metric.value}
                    </div>
                    <CardDescription className="text-sm">
                      {metric.label}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerList>
      )}
    </section>
  );
}

export function MoodSummaryCard() {
  return (
    <section
      id="mood"
      aria-labelledby="mood-heading"
      className="space-y-4 scroll-mt-28"
    >
      <SectionHeading
        id="mood-heading"
        eyebrow="Mood summary"
        title="A simple snapshot of how the week is trending."
        description="A lightweight view of recent mood patterns."
      />
      <Card className="h-full">
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <Small className="uppercase tracking-[0.18em] text-primary">
                Current mood
              </Small>
              <H3 className="text-2xl">Balanced and steady</H3>
            </div>
            <div className="rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
              +14% from last week
            </div>
          </div>

          <div className="grid gap-2 rounded-2xl border border-border bg-muted/30 p-4">
            <div className="flex items-end gap-2">
              {moodTrend.map((point) => (
                <div
                  key={point.label}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div className="flex h-32 w-full items-end justify-center rounded-lg bg-background p-2">
                    <div
                      className="w-full rounded-md bg-primary/80"
                      style={{ height: `${point.value}%`, maxHeight: "100%" }}
                    />
                  </div>
                  <Small>{point.label}</Small>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["4.2 / 5", "average mood score"],
              ["9 days", "consistent logging"],
              ["Most common", "evening check-ins"],
            ].map(([value, label]) => (
              <div
                key={value}
                className="rounded-2xl border border-border bg-muted/20 p-4"
              >
                <div className="text-xl font-semibold tracking-tight">
                  {value}
                </div>
                <Small>{label}</Small>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export function RecentActivity({
  activity,
}: {
  activity: DashboardActivity[];
}) {
  return (
    <section
      id="activity"
      aria-labelledby="activity-heading"
      className="space-y-4 scroll-mt-28"
    >
      <SectionHeading
        id="activity-heading"
        eyebrow="Recent activity"
        title="What changed most recently."
        description="Your latest saved activity, kept private to your account."
      />
      <Card>
        <CardContent className="space-y-4 p-6">
          {activity.length === 0 ? (
            <Text className="text-muted-foreground">
              Your recent check-ins and reports will appear here.
            </Text>
          ) : (
            activity.map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "flex gap-4 rounded-2xl p-4 transition-colors hover:bg-muted/40",
                  index !== activity.length - 1 &&
                    "border-b border-border/70 pb-5",
                )}
              >
                <div className="mt-1 h-11 w-11 shrink-0 rounded-full bg-primary/10 text-center text-xs font-semibold leading-[2.75rem] text-primary">
                  {item.category.slice(0, 1)}
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <H3 className="text-base">{item.title}</H3>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {item.category}
                    </span>
                  </div>
                  <CardDescription>{item.detail}</CardDescription>
                </div>
                <time
                  dateTime={item.occurredAt.toISOString()}
                  className="whitespace-nowrap text-xs text-muted-foreground"
                >
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                  }).format(item.occurredAt)}
                </time>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  );
}

export function UpcomingReminders({ children }: { children: ReactNode }) {
  return (
    <section
      id="reminders"
      aria-labelledby="reminders-heading"
      className="space-y-4 scroll-mt-28"
    >
      <SectionHeading
        id="reminders-heading"
        eyebrow="Upcoming reminders"
        title="What is due next."
        description="Create and complete personal follow-ups for your account."
      />
      <Card>
        <CardContent className="p-6">{children}</CardContent>
      </Card>
    </section>
  );
}
