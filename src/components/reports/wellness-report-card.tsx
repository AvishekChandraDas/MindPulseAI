"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  deleteWellnessReport,
  generateWellnessReportAction,
} from "@/server/actions/wellness-report";
import type { WellnessReportOutput } from "@/server/services/wellness-report";
import type { StoredWellnessReport } from "@/server/queries/wellness-reports";
import { Button, Card, CardContent, H3, Small, Text } from "@/components/ui";

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

type ReportSection = {
  title: string;
  entries: string[];
};

type DisplayReport = WellnessReportOutput & { id: string };

export function WellnessReportCard({
  reports,
}: {
  reports: StoredWellnessReport[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [report, setReport] = useState<DisplayReport | null>(
    reports[0] ?? null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateWellnessReportAction();

      if (result.success) {
        setReport(result.report);
        router.refresh();
      } else {
        setError(result.error);
      }
    } catch {
      setError("Unable to generate a wellness report right now.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = () => {
    if (!report) {
      return;
    }

    startTransition(async () => {
      setError(null);
      const result = await deleteWellnessReport(report.id);

      if (!result.success) {
        setError(result.error ?? "Unable to delete this report right now.");
        return;
      }

      setReport(reports.find((item) => item.id !== report.id) ?? null);
      router.refresh();
    });
  };

  const handleDownload = () => {
    if (!report) {
      return;
    }

    const text = [
      "MindPulse AI wellness report",
      `Generated: ${dateTimeFormatter.format(report.generatedAt)}`,
      "",
      ...sections.flatMap((section) => [
        section.title,
        ...section.entries.map((entry) => `- ${entry}`),
        "",
      ]),
      report.disclaimer,
    ].join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "mindpulse-wellness-report.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const sections: ReportSection[] = report
    ? [
        { title: "Assessment results", entries: report.assessmentResults },
        { title: "Mood patterns", entries: report.moodPatterns },
        {
          title: "Wellness observations",
          entries: report.wellnessObservations,
        },
        { title: "Supportive next steps", entries: report.supportiveNextSteps },
      ]
    : [];

  return (
    <section
      id="wellness-report"
      aria-labelledby="wellness-report-heading"
      className="scroll-mt-28"
    >
      <Card className="border-primary/15 bg-primary/5">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-2xl space-y-2">
              <Small className="uppercase tracking-[0.18em] text-primary">
                AI wellness report
              </Small>
              <H3 id="wellness-report-heading" className="text-2xl">
                A supportive summary of your recent check-ins
              </H3>
              <Text className="text-muted-foreground">
                Generate a concise reflection from your saved assessments and
                mood entries.
              </Text>
            </div>
            <Button
              type="button"
              isLoading={isGenerating}
              disabled={isGenerating || isPending}
              loadingLabel="Generating wellness report"
              onClick={handleGenerate}
            >
              Generate new report
            </Button>
          </div>

          <div className="rounded-2xl border border-primary/15 bg-background/70 p-4">
            <Small className="leading-5 text-muted-foreground">
              This report is informational only. It is not a medical diagnosis
              and does not replace professional care.
            </Small>
          </div>

          {error ? (
            <Text role="alert" className="text-destructive">
              {error}
            </Text>
          ) : null}

          {report ? (
            <div className="space-y-6">
              <Small className="block">
                Generated {dateTimeFormatter.format(report.generatedAt)}
              </Small>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={handleDownload}>
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  isLoading={isPending}
                  loadingLabel="Deleting report"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                {sections.map((section) => (
                  <div
                    key={section.title}
                    className="rounded-2xl border border-border bg-background p-5"
                  >
                    <H3 className="text-base">{section.title}</H3>
                    {section.entries.length > 0 ? (
                      <ul className="mt-3 space-y-2">
                        {section.entries.map((entry, index) => (
                          <li
                            key={`${section.title}-${index}`}
                            className="flex gap-2 text-sm leading-6 text-muted-foreground"
                          >
                            <span className="text-primary" aria-hidden="true">
                              •
                            </span>
                            <span>{entry}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Text className="mt-2 text-sm text-muted-foreground">
                        No observations available yet.
                      </Text>
                    )}
                  </div>
                ))}
              </div>
              <Text className="border-t border-border pt-5 text-sm text-muted-foreground">
                {report.disclaimer}
              </Text>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-background/60 p-5">
              <H3 className="text-base">No report selected</H3>
              <Text className="mt-1 text-sm text-muted-foreground">
                When you are ready, generate a report from the wellness data you
                have saved so far.
              </Text>
            </div>
          )}

          {reports.length > 0 ? (
            <div className="border-t border-border pt-5">
              <Small className="uppercase tracking-[0.18em] text-primary">
                Saved report history
              </Small>
              <div className="mt-3 flex flex-wrap gap-2">
                {reports.map((savedReport) => (
                  <Button
                    key={savedReport.id}
                    size="sm"
                    variant={
                      report?.id === savedReport.id ? "primary" : "outline"
                    }
                    onClick={() => setReport(savedReport)}
                  >
                    {dateTimeFormatter.format(savedReport.generatedAt)}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
}
