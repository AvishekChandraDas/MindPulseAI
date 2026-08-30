import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/prisma";

export type DashboardActivity = {
  id: string;
  category: "Assessment" | "Mood" | "Report" | "Reminder";
  title: string;
  detail: string;
  occurredAt: Date;
};

export async function getDashboardData() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      user: null,
      assessments: [],
      moodLogs: [],
      reminders: [],
      activity: [],
    };
  }

  const [assessments, moodLogs, reminders, reports] = await Promise.all([
    prisma.assessment.findMany({
      where: { userId: currentUser.id },
      select: {
        id: true,
        status: true,
        score: true,
        phq9Score: true,
        gad7Score: true,
        phq9Severity: true,
        gad7Severity: true,
        riskLevel: true,
        summary: true,
        completedAt: true,
        createdAt: true,
      },
      orderBy: { completedAt: "desc" },
    }),
    prisma.moodLog.findMany({
      where: { userId: currentUser.id },
      select: { id: true, mood: true, note: true, loggedAt: true },
      orderBy: { loggedAt: "desc" },
      take: 10,
    }),
    prisma.reminder.findMany({
      where: { userId: currentUser.id, completedAt: null },
      select: {
        id: true,
        title: true,
        description: true,
        dueAt: true,
        priority: true,
      },
      orderBy: { dueAt: "asc" },
      take: 10,
    }),
    prisma.wellnessReport.findMany({
      where: { userId: currentUser.id },
      select: { id: true, generatedAt: true },
      orderBy: { generatedAt: "desc" },
      take: 10,
    }),
  ]);

  const activity: DashboardActivity[] = [
    ...assessments
      .filter((assessment) => assessment.status === "COMPLETED")
      .map((assessment) => ({
        id: `assessment-${assessment.id}`,
        category: "Assessment" as const,
        title: "Assessment completed",
        detail: assessment.summary ?? "A screening was saved to your account.",
        occurredAt: assessment.completedAt ?? assessment.createdAt,
      })),
    ...moodLogs.map((moodLog) => ({
      id: `mood-${moodLog.id}`,
      category: "Mood" as const,
      title: "Mood check-in saved",
      detail:
        moodLog.note ||
        `Logged mood: ${moodLog.mood.toLowerCase().replace("_", " ")}.`,
      occurredAt: moodLog.loggedAt,
    })),
    ...reports.map((report) => ({
      id: `report-${report.id}`,
      category: "Report" as const,
      title: "Wellness report generated",
      detail: "A private AI wellness report was saved to your account.",
      occurredAt: report.generatedAt,
    })),
  ]
    .sort(
      (first, second) =>
        second.occurredAt.getTime() - first.occurredAt.getTime(),
    )
    .slice(0, 8);

  return {
    user: currentUser,
    assessments,
    moodLogs,
    reminders,
    activity,
  };
}
