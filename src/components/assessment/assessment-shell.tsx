"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Small, Text } from "@/components/ui/typography";
import { SignOutButton } from "@/components/auth";
import { cn } from "@/lib/utils";

import { ProgressIndicator } from "./progress-indicator";
import { assessmentSteps, consentSummary } from "./mock-data";

type AssessmentWorkspaceProps = {
  children: ReactNode;
  user: {
    name: string | null;
    email: string;
    image: string | null;
  };
};

const stepIndexFromHash = (hash: string) =>
  Math.max(
    0,
    assessmentSteps.findIndex((step) => step.href === hash),
  );

export function AssessmentWorkspace({
  children,
  user,
}: AssessmentWorkspaceProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#consent");

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash || "#consent");
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

  const currentIndex = Math.max(stepIndexFromHash(activeHash), 0);

  return (
    <div className="min-h-screen bg-muted/20 text-foreground">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[18rem_1fr]">
        <aside className="hidden border-r border-border/80 bg-card/60 lg:block">
          <AssessmentSidebar
            activeHash={activeHash}
            onNavigate={() => undefined}
          />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <AssessmentTopbar
            onMenuClick={() => setMobileOpen(true)}
            currentIndex={currentIndex}
            user={user}
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
            aria-label="Close assessment navigation"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[18rem] border-r border-border/80 bg-background shadow-2xl shadow-slate-950/20">
            <AssessmentSidebar
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

type AssessmentSidebarProps = {
  activeHash: string;
  mobile?: boolean;
  onNavigate: () => void;
};

function AssessmentSidebar({
  activeHash,
  mobile = false,
  onNavigate,
}: AssessmentSidebarProps) {
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
              Assessment workspace
            </span>
          </span>
        </Link>

        <Card className="border-primary/15 bg-primary/5">
          <CardContent className="space-y-2 p-4">
            <Small className="uppercase tracking-[0.18em] text-primary">
              Educational consent
            </Small>
            <Text className="font-medium text-foreground">
              {consentSummary.title}
            </Text>
            <Small>{consentSummary.description}</Small>
          </CardContent>
        </Card>
      </div>

      <nav aria-label="Assessment steps" className="space-y-2">
        {assessmentSteps.map((step) => {
          const isActive = activeHash === step.href;

          return (
            <Link
              key={step.href}
              href={step.href}
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
                <span className="block text-sm font-medium">{step.label}</span>
                <span className="block text-xs text-muted-foreground">
                  {step.description}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <Card className="mt-auto border-border/80">
        <CardContent className="space-y-3 p-4">
          <Small className="uppercase tracking-[0.18em] text-primary">
            Private draft
          </Small>
          <Text className="font-medium">Saved only in local state</Text>
          <Small>No database writes. No API calls. No scoring.</Small>
        </CardContent>
      </Card>
    </div>
  );
}

type AssessmentTopbarProps = {
  onMenuClick: () => void;
  currentIndex: number;
  user: AssessmentWorkspaceProps["user"];
};

function AssessmentTopbar({
  onMenuClick,
  currentIndex,
  user,
}: AssessmentTopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="space-y-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
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
              Assessment engine
            </Small>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
                Educational consent and screening
              </h1>
              <span className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                Local draft only
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden rounded-md border border-border bg-transparent px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:inline-flex"
            >
              Back to dashboard
            </Link>
            <div
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-semibold text-primary-foreground"
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
                (user.name || user.email)
                  .split(/\s+|@/)
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()
              )}
            </div>
            <SignOutButton />
          </div>
        </div>

        <ProgressIndicator
          currentStep={currentIndex + 1}
          totalSteps={assessmentSteps.length}
          label={assessmentSteps[currentIndex]?.label ?? "Consent"}
        />
      </div>
    </header>
  );
}
