"use client";

import { useEffect, useRef, useState, startTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function LandingHeroActions() {
  const router = useRouter();
  const timeoutRef = useRef<number | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleStart() {
    setIsStarting(true);
    timeoutRef.current = window.setTimeout(() => {
      startTransition(() => {
        router.push("/dashboard/assessment");
      });
    }, 350);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button size="lg" isLoading={isStarting} onClick={handleStart}>
        Start assessment
      </Button>
      <a
        href="#how-it-works"
        className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        Explore how it works
      </a>
    </div>
  );
}
