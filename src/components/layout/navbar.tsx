"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { mainNavItems } from "@/constants/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur">
      <Container size="xl" className="py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              MindPulse AI
            </Link>
            <Button
              size="sm"
              className="sm:hidden"
              onClick={() => router.push("/contact")}
            >
              Contact
            </Button>
          </div>

          <nav aria-label="Primary navigation" className="flex flex-wrap gap-2">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => router.push("/contact")}
            >
              Contact
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}