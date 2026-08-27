import type { MoodLevel } from "@prisma/client";

import type { MoodLog } from "@/server/queries/mood";
import { Card, CardContent, H3, Small, Text } from "@/components/ui";

const moodDetails: Record<MoodLevel, { label: string; emoji: string }> = {
  VERY_LOW: { label: "Very low", emoji: "😞" },
  LOW: { label: "Low", emoji: "🙁" },
  NEUTRAL: { label: "Neutral", emoji: "😐" },
  GOOD: { label: "Good", emoji: "🙂" },
  VERY_GOOD: { label: "Very good", emoji: "😄" },
};

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function MoodHistory({ moodLogs }: { moodLogs: MoodLog[] }) {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <div className="space-y-1">
          <Small className="uppercase tracking-[0.18em] text-primary">
            Recent entries
          </Small>
          <H3 className="text-2xl">Your mood check-ins</H3>
          <Text className="text-muted-foreground">
            A simple record of the moments you have logged.
          </Text>
        </div>

        {moodLogs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-5">
            <H3 className="text-base">No mood entries yet</H3>
            <Text className="mt-1 text-sm text-muted-foreground">
              Use the check-in above to save your first reflection.
            </Text>
          </div>
        ) : (
          <ul className="divide-y divide-border/70">
            {moodLogs.map((moodLog) => {
              const details = moodDetails[moodLog.mood];

              return (
                <li key={moodLog.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl"
                      aria-hidden="true"
                    >
                      {details.emoji}
                    </span>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                        <H3 className="text-base">{details.label}</H3>
                        <time
                          dateTime={moodLog.loggedAt.toISOString()}
                          className="text-sm text-muted-foreground"
                        >
                          {dateTimeFormatter.format(moodLog.loggedAt)}
                        </time>
                      </div>
                      {moodLog.note ? (
                        <Text className="break-words text-sm leading-6 text-muted-foreground">
                          {moodLog.note}
                        </Text>
                      ) : (
                        <Small>No note added</Small>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
