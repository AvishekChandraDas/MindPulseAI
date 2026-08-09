import { Card, CardContent } from "@/components/ui/card";

export function AssessmentEngineSkeleton() {
  return (
    <div className="space-y-8">
      <Card className="border-primary/15 bg-primary/5">
        <CardContent className="space-y-4 p-6 sm:p-8">
          <div className="h-4 w-28 rounded bg-muted animate-pulse" />
          <div className="h-10 w-3/4 rounded bg-muted animate-pulse" />
          <div className="h-5 w-full rounded bg-muted animate-pulse" />
          <div className="h-2 w-full rounded-full bg-muted animate-pulse" />
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.35fr]">
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-2xl border border-border p-5">
                <div className="space-y-3">
                  <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
                  <div className="h-3 w-full rounded bg-muted animate-pulse" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Array.from({ length: 4 }).map((__, optionIndex) => (
                      <div key={optionIndex} className="h-16 rounded-2xl bg-muted animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="h-4 w-28 rounded bg-muted animate-pulse" />
              <div className="h-32 rounded-2xl bg-muted animate-pulse" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 p-6">
              <div className="h-4 w-24 rounded bg-muted animate-pulse" />
              <div className="h-10 rounded-md bg-muted animate-pulse" />
              <div className="h-10 rounded-md bg-muted animate-pulse" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}