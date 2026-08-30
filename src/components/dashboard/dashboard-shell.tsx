"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Small, Text } from "@/components/ui/typography";
import { SignOutButton } from "@/components/auth";
import { cn } from "@/lib/utils";

import { AssessmentWorkspace } from "@/components/assessment";
import { dashboardNavItems } from "./mock-data";

type DashboardShellProps = {
  children: ReactNode;
  user: AuthenticatedUser;
};

type AuthenticatedUser = {
  name: string | null;
  email: string;
  image: string | null;
};

export function DashboardShell({ children, user }: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#overview");

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash || "#overview");
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  if (pathname.startsWith("/dashboard/assessment")) {
    return <AssessmentWorkspace user={user}>{children}</AssessmentWorkspace>;
  }

  return (
    <div className="min-h-screen bg-muted/20 text-foreground">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[18rem_1fr]">
        <aside className="hidden border-r border-border/80 bg-card/60 lg:block">
          <DashboardSidebar
            activeHash={activeHash}
            onNavigate={() => undefined}
          />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopbar
            user={user}
            onMenuClick={() => setMobileOpen(true)}
          />
          <main
            id="dashboard-content"
            className="flex-1 px-4 py-6 sm:px-6 lg:px-8"
          >
            {children}
          </main>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
            aria-label="Close navigation overlay"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[18rem] border-r border-border/80 bg-background shadow-2xl shadow-slate-950/20">
            <DashboardSidebar
              activeHash={activeHash}
              mobile
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      ) : null}
    </div>
  );
}

type DashboardSidebarProps = {
  activeHash: string;
  mobile?: boolean;
  onNavigate: () => void;
};

export function DashboardSidebar({
  activeHash,
  mobile = false,
  onNavigate,
}: DashboardSidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-6",
        mobile ? "overflow-y-auto p-5" : "sticky top-0 p-6",
      )}
    >
      <div className="space-y-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
            MP
          </span>
          <span>
            <span className="block text-base font-semibold tracking-tight">
              MindPulse AI
            </span>
            <span className="block text-xs text-muted-foreground">
              Dashboard workspace
            </span>
          </span>
        </Link>

        <Card className="border-primary/15 bg-primary/5">
          <CardContent className="space-y-2 p-4">
            <Small className="uppercase tracking-[0.18em] text-primary">
              Workspace status
            </Small>
            <Text className="font-medium text-foreground">
              Private, account-based workspace
            </Text>
            <Small>Built for responsive navigation and fast scanning.</Small>
          </CardContent>
        </Card>
      </div>

      <nav aria-label="Dashboard sections" className="space-y-2">
        {dashboardNavItems.map((item) => {
          const isActive = activeHash === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "location" : undefined}
              onClick={onNavigate}
              className={cn(
                "flex items-start gap-3 rounded-2xl border px-4 py-3 transition-colors",
                isActive
                  ? "border-primary/20 bg-primary/10 text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/70 hover:text-foreground",
              )}
            >
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-current opacity-70" />
              <span className="space-y-0.5">
                <span className="block text-sm font-medium">{item.label}</span>
                <span className="block text-xs text-muted-foreground">
                  {item.description}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <Card className="mt-auto border-border/80">
        <CardContent className="space-y-3 p-4">
          <Small className="uppercase tracking-[0.18em] text-primary">
            Today&apos;s focus
          </Small>
          <Text className="font-medium">Three reminders due</Text>
          <Small>Keep the experience calm and easy to revisit later.</Small>
        </CardContent>
      </Card>
    </div>
  );
}

type DashboardTopbarProps = {
  onMenuClick: () => void;
  user: AuthenticatedUser;
};

function getInitials(name: string | null, email: string): string {
  const words = (name ?? "").trim().split(/\s+/).filter(Boolean);

  if (words.length > 0) {
    return words
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  return email.slice(0, 2).toUpperCase();
}

export function DashboardTopbar({ onMenuClick, user }: DashboardTopbarProps) {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          Menu
        </Button>

        <div className="min-w-0 flex-1 space-y-1">
          <Small className="uppercase tracking-[0.18em] text-primary">
            Dashboard
          </Small>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
              Welcome back, {user.name?.trim() || user.email}
            </h1>
            <span className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              {today}
            </span>
          </div>
        </div>

        <div className="hidden flex-1 justify-end md:flex">
          <Input
            aria-label="Search dashboard"
            placeholder="Search assessments, reminders, or activity"
            className="max-w-md"
          />
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="#reminders"
            className="hidden rounded-md border border-border bg-transparent px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:inline-flex"
          >
            View reminders
          </Link>
          <div className="hidden min-w-0 text-right sm:block">
            <p className="truncate text-sm font-medium">
              {user.name || user.email}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-semibold text-primary-foreground"
            aria-label={`${user.name || user.email} profile image`}
            title={user.email}
          >
            {user.image ? (
              <Image
                src={user.image}
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              getInitials(user.name, user.email)
            )}
          </div>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
