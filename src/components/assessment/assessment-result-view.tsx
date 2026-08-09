import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Small, Text } from "@/components/ui/typography";

import type { ScoreResult } from "@/lib/assessment/scoring";

type AssessmentResultViewProps = {
  phq9: ScoreResult;
  gad7: ScoreResult;
};

export function AssessmentResultView({ phq9, gad7 }: AssessmentResultViewProps) {
  return (
    <div className="space-y-8">
      <Card className="border-primary/15 bg-primary/5">
        <CardHeader>
          <Small className="uppercase tracking-[0.18em] text-primary">
            Result page
          </Small>
          <CardTitle className="text-2xl sm:text-3xl">
            Your educational screening results are ready.
          </CardTitle>
          <CardDescription>
            These results are generated locally from the responses you completed in this session.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="PHQ-9 score" result={phq9} />
            <ResultCard label="GAD-7 score" result={gad7} />
          </div>

          <div className="rounded-2xl border border-border bg-background p-4">
            <Text className="text-muted-foreground">
              Educational disclaimer: this page is not a diagnosis, medical advice, or emergency support. If you are in immediate danger or thinking about harming yourself, contact local emergency services or a crisis line right away.
            </Text>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{phq9.band.label}</CardTitle>
            <CardDescription>{phq9.band.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Text className="text-muted-foreground">{phq9.band.recommendation}</Text>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{gad7.band.label}</CardTitle>
            <CardDescription>{gad7.band.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Text className="text-muted-foreground">{gad7.band.recommendation}</Text>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/dashboard/assessment"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Review assessment
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-transparent px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

function ResultCard({ label, result }: { label: string; result: ScoreResult }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <Small className="uppercase tracking-[0.18em] text-primary">{label}</Small>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{result.score}</div>
      <Text className="mt-1 text-muted-foreground">{result.band.label}</Text>
    </div>
  );
}
