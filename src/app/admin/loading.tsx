import { Card, CardContent } from "@/components/ui";

export default function Loading() {
  return (
    <div className="space-y-8" aria-label="Loading admin assessments">
      <div className="space-y-3">
        <div className="h-3 w-24 rounded bg-muted animate-pulse" />
        <div className="h-10 w-80 max-w-full rounded bg-muted animate-pulse" />
        <div className="h-5 w-full max-w-2xl rounded bg-muted animate-pulse" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="space-y-3 p-5">
              <div className="h-8 w-12 rounded bg-muted animate-pulse" />
              <div className="h-3 w-28 rounded bg-muted animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
