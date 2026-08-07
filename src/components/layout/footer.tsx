import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Small, Text } from "@/components/ui/typography";
import { footerNavItems } from "@/constants/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80 bg-card/60">
      <Container size="xl" className="py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              MindPulse AI
            </div>
            <div className="max-w-2xl space-y-3">
              <Text className="text-muted-foreground">
                Built for a calm, accessible public experience with clear
                routing, readable content, and simple navigation.
              </Text>
              <Small>© {year} MindPulse AI. All rights reserved.</Small>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Contact us
              </Link>
              <Link
                href="/about"
                className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <nav aria-label="Footer navigation" className="space-y-3">
              <Small className="uppercase tracking-[0.18em] text-primary">
                Pages
              </Small>
              <div className="flex flex-col gap-3">
                {footerNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="space-y-3">
              <Small className="uppercase tracking-[0.18em] text-primary">
                What to expect
              </Small>
              <Text className="text-muted-foreground">
                Plain language, responsive layouts, and a single calm path to
                the contact page for now.
              </Text>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}