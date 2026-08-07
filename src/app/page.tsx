import Link from "next/link";

import { FadeIn, StaggerItem, StaggerList } from "@/components/motion";
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

const highlights = [
  {
    title: "Screening that stays human",
    description:
      "Placeholder content for a guided experience that surfaces signals without flattening context.",
  },
  {
    title: "Clear next steps",
    description:
      "Placeholder content for practical summaries, plain language recommendations, and follow-up prompts.",
  },
  {
    title: "Designed for trust",
    description:
      "Placeholder content for privacy-forward design, accessibility, and calm interactions.",
  },
];

const steps = [
  {
    title: "Start with a short check-in",
    description:
      "A concise entry flow that gathers the minimum context needed to orient the experience.",
  },
  {
    title: "Review the signal in context",
    description:
      "A response layer that explains what the screening result means and what it does not mean.",
  },
  {
    title: "Move to a next action",
    description:
      "Placeholder guidance that helps people decide whether to self-manage, seek support, or learn more.",
  },
];

export const metadata = {
  title: "Home",
  description:
    "MindPulse AI is a public preview for a calmer, more accessible mental wellness screening experience.",
};

export default function HomePage() {
  return (
    <>
      <Section className="overflow-hidden py-16 sm:py-20 lg:py-28">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <FadeIn className="space-y-8">
              <div className="inline-flex w-fit items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Public preview
              </div>
              <div className="space-y-6">
                <H1>
                  Mental wellness screening, presented with clarity and care.
                </H1>
                <Lead>
                  Placeholder content for a public landing page that introduces
                  MindPulse AI, what it does, and why the experience is built
                  around trust, accessibility, and clear next steps.
                </Lead>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Contact us
                </Link>
                <Link
                  href="/about"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Learn more
                </Link>
              </div>
              <Small>
                Placeholder note: replace this copy once product messaging and
                positioning are finalized.
              </Small>
            </FadeIn>

            <FadeIn delay={0.1} className="grid gap-4">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <Small className="uppercase tracking-[0.18em] text-primary">
                    What this page highlights
                  </Small>
                  <CardTitle>
                    Calm interface, clear language, useful next steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Text>
                    This is placeholder content for the hero support panel. It
                    can later be replaced with product screenshots, score
                    summaries, or a short walkthrough.
                  </Text>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="grid gap-4 sm:grid-cols-3">
                  {[
                    ["3 min", "quick orientation"],
                    ["1 summary", "shared understanding"],
                    ["0 clutter", "calm UI"],
                  ].map(([value, label]) => (
                    <div
                      key={value}
                      className="space-y-1 rounded-lg bg-muted/50 p-4"
                    >
                      <div className="text-2xl font-semibold tracking-tight">
                        {value}
                      </div>
                      <Small>{label}</Small>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="xl">
          <div className="mb-8 max-w-2xl space-y-3">
            <Small className="uppercase tracking-[0.18em] text-primary">
              Why people use it
            </Small>
            <H2>Designed to explain, not just score.</H2>
            <Text className="text-muted-foreground">
              Placeholder content for the core value proposition. These cards
              can later map to actual features, screenshots, or product proof
              points.
            </Text>
          </div>
          <StaggerList className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <StaggerItem key={item.title}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text className="text-muted-foreground">
                      {item.description}
                    </Text>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </Section>

      <Section>
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="space-y-3">
              <Small className="uppercase tracking-[0.18em] text-primary">
                How it works
              </Small>
              <H2>Simple enough to understand at a glance.</H2>
              <Text className="text-muted-foreground">
                Placeholder content for a short overview of the product flow.
                The structure here is intentionally plain and legible so future
                content can slot in without changing the page architecture.
              </Text>
            </div>
            <div className="grid gap-4">
              {steps.map((step, index) => (
                <Card key={step.title}>
                  <CardContent className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                      0{index + 1}
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-base">{step.title}</CardTitle>
                      <Text className="text-muted-foreground">
                        {step.description}
                      </Text>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
