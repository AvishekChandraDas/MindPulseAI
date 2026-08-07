import type { Metadata } from "next";

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

const values = [
  {
    title: "Evidence over hype",
    description:
      "Placeholder content describing a product direction grounded in clarity, validation, and transparent limits.",
  },
  {
    title: "People over predictions",
    description:
      "Placeholder content that keeps the human experience central instead of letting the interface become the headline.",
  },
  {
    title: "Accessibility by default",
    description:
      "Placeholder content for inclusive language, predictable layout, and keyboard-friendly interaction patterns.",
  },
];

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the placeholder story, mission, and product direction behind MindPulse AI.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="py-16 sm:py-20 lg:py-24">
        <Container size="xl">
          <div className="max-w-3xl space-y-6">
            <Small className="uppercase tracking-[0.18em] text-primary">
              About MindPulse AI
            </Small>
            <H1>We are building a calmer path into mental wellness support.</H1>
            <Lead>
              Placeholder content for the story behind the product. This page
              can later explain the team, the mission, and the design choices
              that shape the screening experience.
            </Lead>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="xl">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title}>
                <CardHeader>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground">{value.description}</Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="xl">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Card>
              <CardHeader>
                <Small className="uppercase tracking-[0.18em] text-primary">
                  Mission
                </Small>
                <CardTitle>Make screening easier to understand and act on.</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Text className="text-muted-foreground">
                  Placeholder mission copy. The aim is to present mental
                  wellness information in a way that is supportive, concise,
                  and easier to share with trusted professionals.
                </Text>
                <Text className="text-muted-foreground">
                  A second paragraph can later cover product philosophy,
                  transparency, or how feedback is incorporated into the
                  experience.
                </Text>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <H2>What guides the experience</H2>
              <Card>
                <CardContent className="space-y-3">
                  <Text>
                    <strong>Clear language:</strong> placeholder content for
                    plain-English explanations that reduce ambiguity.
                  </Text>
                  <Text>
                    <strong>Steady pacing:</strong> placeholder content for a
                    thoughtful interface that avoids overwhelming users.
                  </Text>
                  <Text>
                    <strong>Respectful defaults:</strong> placeholder content
                    for privacy, accessibility, and minimal friction.
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