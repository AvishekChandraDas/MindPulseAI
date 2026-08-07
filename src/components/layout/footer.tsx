import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Small, Text } from "@/components/ui/typography";
import { footerNavItems } from "@/constants/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80 bg-card/60">
      <Container size="xl" className="py-10 sm:py-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-3">
            <div className="text-lg font-semibold tracking-tight">MindPulse AI</div>
            <Text className="max-w-xl text-muted-foreground">
              Placeholder footer content for the public pages. Replace this with
              final brand copy, legal links, or product messaging when it is
              ready.
            </Text>
            <Small>© {year} MindPulse AI. All rights reserved.</Small>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-4">
            {footerNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}