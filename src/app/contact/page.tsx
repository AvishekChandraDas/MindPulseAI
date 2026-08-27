import type { Metadata } from "next";

import { ContactEmailButton } from "@/components/layout/contact-email-button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  H1,
  H2,
  Lead,
  Section,
  Small,
  Text,
} from "@/components/ui";

const contactPoints = [
  {
    title: "Email",
    description: "hello@mindpulseai.com",
  },
  {
    title: "Response time",
    description: "Within 1-2 business days, placeholder timing only.",
  },
  {
    title: "Format",
    description: "Brief context, your question, and any relevant constraints.",
  },
];

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the MindPulse AI team for product questions, support, or partnership requests.",
};

export default function ContactPage() {
  return (
    <>
      <Section className="py-16 sm:py-20 lg:py-24">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <Small className="uppercase tracking-[0.18em] text-primary">
                Contact
              </Small>
              <H1>Talk to the team when you need a human answer.</H1>
              <Lead>
                Placeholder content for support, partnerships, and general
                questions. A form is intentionally not included yet, so this
                page stays simple and accessible.
              </Lead>
              <div className="flex flex-wrap gap-3">
                <ContactEmailButton />
                <a
                  href="/privacy"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  View privacy policy
                </a>
              </div>
            </div>

            <Card>
              <CardHeader>
                <Small className="uppercase tracking-[0.18em] text-primary">
                  What to include
                </Small>
                <CardTitle>Keep it short and specific.</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Text className="text-muted-foreground">
                  Placeholder guidance for a future support workflow. Mention
                  the page you were on, what you expected, and anything that
                  blocked you.
                </Text>
                <Text className="text-muted-foreground">
                  If your message is about safety or urgent care, direct users
                  to local emergency services or clinical support resources.
                </Text>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="xl">
          <div className="mb-8 max-w-2xl space-y-3">
            <Small className="uppercase tracking-[0.18em] text-primary">
              Ways to reach us
            </Small>
            <H2>Direct, predictable, and easy to scan.</H2>
            <Text className="text-muted-foreground">
              Placeholder content for contact details that can later be replaced
              with real support channels or a proper request form.
            </Text>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {contactPoints.map((point) => (
              <Card key={point.title}>
                <CardHeader>
                  <CardTitle>{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground">
                    {point.description}
                  </Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
