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
  const isHome = pathname === "/";

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Container size="xl" className="py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
                MP
              </span>
              <span className="space-y-0.5">
                <span className="block text-base font-semibold tracking-tight">
                  MindPulse AI
                </span>
                <span className="block text-xs text-muted-foreground">
                  Educational mental wellness screening
                </span>
              </span>
            </Link>

            <Button
              size="sm"
              className="sm:hidden"
              onClick={() => router.push("/contact")}
            >
              Contact
            </Button>
          </div>

          <div className="flex flex-col gap-3 border-t border-border/70 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <nav
              aria-label="Primary navigation"
              className="flex flex-wrap gap-2"
            >
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
            </nav>

            <nav
              aria-label="Section navigation"
              className="flex flex-wrap gap-2"
            >
              {isHome ? (
                <>
                  <Link
                    href="#features"
                    className="rounded-full border border-border bg-transparent px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    Features
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="rounded-full border border-border bg-transparent px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    How it works
                  </Link>
                  <Link
                    href="#faq"
                    className="rounded-full border border-border bg-transparent px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    FAQ
                  </Link>
                </>
              ) : null}
              <Button
                size="sm"
                className="hidden sm:inline-flex"
                onClick={() => router.push("/contact")}
              >
                Contact
              </Button>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}
