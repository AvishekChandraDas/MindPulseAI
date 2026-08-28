import type { AdminAssessmentOverview } from "@/server/queries/admin-assessments";
import { Card, CardContent, H3, Small, Text } from "@/components/ui";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function AdminAssessmentOverview({
  overview,
}: {
  overview: AdminAssessmentOverview;
}) {
  if (overview.total === 0) {
    return (
      <Card>
        <CardContent className="space-y-2 p-6">
          <Small className="uppercase tracking-[0.18em] text-primary">
            Assessments
          </Small>
          <H3>No assessments yet</H3>
          <Text className="text-muted-foreground">
            Aggregate assessment information will appear here once assessments
            are created.
          </Text>
        </CardContent>
      </Card>
    );
  }

  const metrics = [
    ["Total assessments", overview.total],
    ["Completed", overview.completed],
    ["In progress", overview.inProgress],
    ["Reviewed", overview.reviewed],
    ["Abandoned", overview.abandoned],
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map(([label, value]) => (
          <Card key={label}>
            <CardContent className="space-y-1 p-5">
              <div className="text-3xl font-semibold tracking-tight">
                {value}
              </div>
              <Small>{label}</Small>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
          <div>
            <H3 className="text-base">Latest completed assessment</H3>
            <Text className="mt-1 text-sm text-muted-foreground">
              Aggregate timing only; no individual assessment details are shown.
            </Text>
          </div>
          <Small className="rounded-full bg-muted px-3 py-1.5">
            {overview.lastCompletedAt
              ? dateFormatter.format(overview.lastCompletedAt)
              : "No completed assessments"}
          </Small>
        </CardContent>
      </Card>
    </div>
  );
}
