import type { ReactNode } from "react";
import Link from "next/link";

import { Card, CardContent, Small, Text } from "@/components/ui";
import { cn } from "@/lib/utils";

const adminNavigation = [
  {
    label: "Overview",
    href: "#overview",
    description: "Administrative workspace",
  },
  {
    label: "Users",
    href: "#users",
    description: "User management",
  },
  {
    label: "Configuration",
    href: "#configuration",
    description: "Workspace settings",
  },
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full bg-muted/20">
      <div className="mx-auto grid min-h-full max-w-[1600px] lg:grid-cols-[18rem_1fr]">
        <aside className="border-b border-border/80 bg-card/60 lg:border-r lg:border-b-0">
          <div className="flex gap-4 overflow-x-auto p-4 lg:sticky lg:top-0 lg:flex-col lg:overflow-visible lg:p-6">
            <Link href="/admin" className="flex shrink-0 items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
                MP
              </span>
              <span>
                <span className="block text-base font-semibold tracking-tight">
                  MindPulse AI
                </span>
                <span className="block text-xs text-muted-foreground">
                  Admin workspace
                </span>
              </span>
            </Link>

            <nav
              aria-label="Admin sections"
              className="flex shrink-0 gap-2 lg:flex-col"
            >
              {adminNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground",
                    "lg:px-4 lg:py-3",
                  )}
                >
                  <span className="block">{item.label}</span>
                  <span className="hidden text-xs font-normal text-muted-foreground lg:block">
                    {item.description}
                  </span>
                </Link>
              ))}
            </nav>

            <Card className="ml-auto hidden border-primary/15 bg-primary/5 lg:mt-auto lg:ml-0 lg:block">
              <CardContent className="space-y-2 p-4">
                <Small className="uppercase tracking-[0.18em] text-primary">
                  Restricted area
                </Small>
                <Text className="text-sm text-muted-foreground">
                  Access is verified on the server for every admin route.
                </Text>
              </CardContent>
            </Card>
          </div>
        </aside>

        <main id="admin-content" className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
