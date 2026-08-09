export type DashboardNavItem = {
  label: string;
  href: string;
  description: string;
};

export type QuickAction = {
  label: string;
  description: string;
  href: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  note: string;
  tone: "primary" | "success" | "warning" | "info";
};

export type MoodTrendPoint = {
  label: string;
  value: number;
};

export type ActivityItem = {
  title: string;
  detail: string;
  time: string;
  category: string;
};

export type ReminderItem = {
  title: string;
  detail: string;
  due: string;
  priority: string;
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    label: "Overview",
    href: "#overview",
    description: "Today's snapshot",
  },
  {
    label: "Assessments",
    href: "#assessments",
    description: "Assessment summaries",
  },
  {
    label: "Mood",
    href: "#mood",
    description: "Mood trends and history",
  },
  {
    label: "Activity",
    href: "#activity",
    description: "Recent actions",
  },
  {
    label: "Reminders",
    href: "#reminders",
    description: "Upcoming follow-ups",
  },
];

export const quickActions: QuickAction[] = [
  {
    label: "Review summary",
    description: "Jump straight to the latest assessment signals.",
    href: "#assessments",
  },
  {
    label: "Log mood",
    description: "Open the mood snapshot for a quick update.",
    href: "#mood",
  },
  {
    label: "View activity",
    description: "Scan recent updates and recent progress.",
    href: "#activity",
  },
  {
    label: "Check reminders",
    description: "See what is due today and later this week.",
    href: "#reminders",
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Assessments completed",
    value: "18",
    note: "+12% this week",
    tone: "primary",
  },
  {
    label: "Average confidence",
    value: "82%",
    note: "+4 points",
    tone: "success",
  },
  {
    label: "Mood streak",
    value: "9 days",
    note: "Most consistent period",
    tone: "info",
  },
  {
    label: "Reminders due",
    value: "3",
    note: "Two today, one tomorrow",
    tone: "warning",
  },
];

export const moodTrend: MoodTrendPoint[] = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 48 },
  { label: "Wed", value: 57 },
  { label: "Thu", value: 63 },
  { label: "Fri", value: 71 },
  { label: "Sat", value: 77 },
  { label: "Sun", value: 72 },
];

export const recentActivity: ActivityItem[] = [
  {
    title: "Assessment completed",
    detail: "Baseline check-in finished with a moderate signal.",
    time: "12 min ago",
    category: "Assessment",
  },
  {
    title: "Mood note added",
    detail: "User captured an evening reflection on energy and sleep.",
    time: "1 hour ago",
    category: "Mood",
  },
  {
    title: "Reminder acknowledged",
    detail: "Today's follow-up reminder was marked complete.",
    time: "3 hours ago",
    category: "Reminder",
  },
  {
    title: "Summary reviewed",
    detail: "Shared a concise summary with a trusted contact.",
    time: "Yesterday",
    category: "Share",
  },
];

export const upcomingReminders: ReminderItem[] = [
  {
    title: "Mood check-in",
    detail: "Add a quick note about energy, focus, and sleep.",
    due: "Today · 6:30 PM",
    priority: "High priority",
  },
  {
    title: "Assessment follow-up",
    detail: "Review the latest summary and next-step guidance.",
    due: "Tomorrow · 9:00 AM",
    priority: "Medium priority",
  },
  {
    title: "Weekly reflection",
    detail: "Capture a short note to spot patterns across the week.",
    due: "Friday · 5:00 PM",
    priority: "Low priority",
  },
];