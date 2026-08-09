import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export function DashboardShellSkeleton() {
  return (
    <div className="grid min-h-screen gap-0 lg:grid-cols-[18rem_1fr]">
      <aside className="hidden border-r border-border/80 bg-card/50 lg:block">
        <DashboardSidebarSkeleton />
      </aside>
      <div className="flex flex-1 flex-col">
        <DashboardTopbarSkeleton />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <DashboardContentSkeleton />
        </main>
      </div>
    </div>
  );
}

export function DashboardTopbarSkeleton() {
  return (
    <header className="border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="h-10 w-20 rounded-md bg-muted animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 rounded bg-muted animate-pulse" />
          <div className="h-5 w-52 rounded bg-muted animate-pulse" />
        </div>
        <div className="hidden h-10 max-w-md flex-1 rounded-md bg-muted animate-pulse md:block" />
        <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
      </div>
    </header>
  );
}

export function DashboardSidebarSkeleton() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-muted animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-28 rounded bg-muted animate-pulse" />
            <div className="h-3 w-24 rounded bg-muted animate-pulse" />
          </div>
        </div>
        <div className="h-24 rounded-2xl bg-muted animate-pulse" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-16 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>

      <div className="mt-auto h-28 rounded-2xl bg-muted animate-pulse" />
    </div>
  );
}

export function DashboardContentSkeleton() {
  return (
    <Container size="full" centered={false} className="space-y-8 px-0">
      <Card>
        <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-4">
            <div className="h-4 w-28 rounded bg-muted animate-pulse" />
            <div className="h-10 w-3/4 rounded bg-muted animate-pulse" />
            <div className="h-5 w-full rounded bg-muted animate-pulse" />
            <div className="flex gap-3">
              <div className="h-11 w-32 rounded-md bg-muted animate-pulse" />
              <div className="h-11 w-32 rounded-md bg-muted animate-pulse" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-28 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="space-y-4 p-5">
              <div className="h-4 w-24 rounded bg-muted animate-pulse" />
              <div className="h-8 w-20 rounded bg-muted animate-pulse" />
              <div className="h-3 w-32 rounded bg-muted animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 p-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-20 rounded-2xl bg-muted animate-pulse" />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4 p-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-24 rounded-2xl bg-muted animate-pulse" />
            ))}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}