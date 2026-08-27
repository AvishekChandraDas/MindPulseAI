import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  H1,
  Lead,
  Section,
  Small,
  Text,
} from "@/components/ui";

const terms = [
  {
    title: "Use of the service",
    body: "Placeholder content explaining that the product is provided for informational purposes and may evolve before launch.",
  },
  {
    title: "Acceptable use",
    body: "Placeholder content for respecting the platform, avoiding misuse, and not relying on the product as a substitute for professional care.",
  },
  {
    title: "Changes and contact",
    body: "Placeholder content for how terms may change and where users can ask questions about the policy.",
  },
];

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the placeholder terms and conditions for MindPulse AI, including use, limits, and updates.",
};

export default function TermsPage() {
  return (
    <>
      <Section className="py-16 sm:py-20 lg:py-24">
        <Container size="xl">
          <div className="max-w-3xl space-y-6">
            <Small className="uppercase tracking-[0.18em] text-primary">
              Terms & Conditions
            </Small>
            <H1>Placeholder terms that keep the structure readable.</H1>
            <Lead>
              Last updated August 7, 2026. Replace this text with final legal
              copy before the public launch.
            </Lead>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="xl">
          <div className="space-y-6">
            {terms.map((term) => (
              <Card key={term.title}>
                <CardHeader>
                  <CardTitle>{term.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground">{term.body}</Text>
                </CardContent>
              </Card>
            ))}

            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Intellectual property</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground">
                    Placeholder content for ownership of the product,
                    trademarks, and related assets.
                  </Text>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Limitations</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground">
                    Placeholder content for service availability, liability, and
                    the limits of the screening experience.
                  </Text>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
