"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { completeReminder, createReminder } from "@/server/actions/reminder";
import { Button, Input, Small, Text } from "@/components/ui";

export type DashboardReminder = {
  id: string;
  title: string;
  description: string | null;
  dueAt: Date;
  priority: "LOW" | "MEDIUM" | "HIGH";
};

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function ReminderManager({
  reminders,
}: {
  reminders: DashboardReminder[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [priority, setPriority] =
    useState<DashboardReminder["priority"]>("MEDIUM");
  const [error, setError] = useState<string | null>(null);

  const runAction = (
    action: () => Promise<{ success: boolean; error?: string }>,
  ) => {
    startTransition(async () => {
      setError(null);
      const result = await action();

      if (!result.success) {
        setError(result.error ?? "Unable to update reminders right now.");
        return;
      }

      setTitle("");
      setDueAt("");
      router.refresh();
    });
  };

  return (
    <div className="space-y-4">
      <form
        className="grid gap-3 rounded-2xl border border-border bg-muted/20 p-4 sm:grid-cols-[1fr_auto_auto_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          runAction(() => createReminder({ title, dueAt, priority }));
        }}
      >
        <Input
          aria-label="Reminder title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a reminder"
          maxLength={120}
          required
        />
        <Input
          aria-label="Reminder due date"
          type="datetime-local"
          value={dueAt}
          onChange={(event) => setDueAt(event.target.value)}
          required
        />
        <select
          aria-label="Reminder priority"
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as DashboardReminder["priority"])
          }
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <Button
          type="submit"
          isLoading={isPending}
          loadingLabel="Saving reminder"
        >
          Add
        </Button>
      </form>

      {error ? (
        <Text role="alert" className="text-sm text-destructive">
          {error}
        </Text>
      ) : null}

      {reminders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-background p-5">
          <Text className="text-sm text-muted-foreground">
            No upcoming reminders. Add one when a follow-up would help.
          </Text>
        </div>
      ) : (
        reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="rounded-2xl border border-border bg-background p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-semibold">{reminder.title}</h3>
                {reminder.description ? (
                  <Text className="text-sm text-muted-foreground">
                    {reminder.description}
                  </Text>
                ) : null}
              </div>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <Small className="block text-primary">
                    {reminder.priority.toLowerCase()} priority
                  </Small>
                  <Small>{dateTimeFormatter.format(reminder.dueAt)}</Small>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => runAction(() => completeReminder(reminder.id))}
                >
                  Complete
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
