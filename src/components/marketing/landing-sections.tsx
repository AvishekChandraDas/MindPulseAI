import Image from "next/image";

import { FadeIn, StaggerItem, StaggerList } from "@/components/motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  H1,
  H2,
  H3,
  Lead,
  Section,
  Small,
  Text,
} from "@/components/ui";

import { LandingHeroActions } from "./landing-hero-actions";

const featureItems = [
  {
    title: "Calm assessment flow",
    description:
      "A short, readable journey designed to reduce friction and keep the experience approachable.",
  },
  {
    title: "Clear results summary",
    description:
      "Placeholder output that turns screening signals into language people can actually use.",
  },
  {
    title: "Privacy-first foundations",
    description:
      "An interface that keeps sensitive information quiet, contained, and easy to reason about.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Answer a guided set of questions",
    description:
      "The intake is intentionally short, so people can move through it without fatigue.",
  },
  {
    step: "02",
    title: "Review a plain-language summary",
    description:
      "Results are framed in clear language with context about what the score does and does not mean.",
  },
  {
    step: "03",
    title: "Choose the next best step",
    description:
      "The last screen points to a practical next action instead of dropping people at a dead end.",
  },
];

const benefitItems = [
  {
    title: "Less guesswork",
    description:
      "People can understand the signal faster and decide whether they need more support.",
  },
  {
    title: "More trust",
    description:
      "The tone stays measured and explicit, which helps a sensitive product feel safer to use.",
  },
  {
    title: "Easier sharing",
    description:
      "Future summaries can be handed to a clinician or trusted contact without heavy rewriting.",
  },
];

const testimonials = [
  {
    quote:
      "The experience feels calm, clear, and easier to explain to someone else.",
    name: "Avery Chen",
    role: "Wellness program lead",
  },
  {
    quote:
      "Placeholder feedback from a user who appreciated the concise flow and readable summary.",
    name: "Jordan Patel",
    role: "Early pilot participant",
  },
  {
    quote:
      "The page structure makes it obvious where to go next without crowding the screen.",
    name: "Morgan Lee",
    role: "Product designer",
  },
];

const faqs = [
  {
    question: "Is this a medical diagnosis?",
    answer:
      "No. This placeholder page presents the screening as an informational tool, not a diagnosis or emergency service.",
  },
  {
    question: "Who should use it?",
    answer:
      "Anyone looking for a clearer starting point for a mental wellness check-in can use the public landing experience.",
  },
  {
    question: "What happens after the landing page?",
    answer:
      "For now, the primary action takes visitors to the contact page while the rest of the product remains in progress.",
  },
  {
    question: "Is any backend logic running here?",
    answer:
      "No. The landing page is static and uses only client-side loading state for the primary CTA.",
  },
];

export function LandingHero() {
  return (
    <Section className="overflow-hidden py-16 sm:py-20 lg:py-24">
      <Container size="xl">
        <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <FadeIn className="space-y-8">
            <div className="inline-flex w-fit items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Mental wellness screening, designed for clarity
            </div>
            <div className="space-y-5">
              <H1>
                A calmer way to understand mental wellness signals.
              </H1>
              <Lead>
                MindPulse AI is presented here as a polished public landing page
                with concise copy, accessible navigation, and a clear next step
                for curious visitors.
              </Lead>
            </div>
            <LandingHeroActions />
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>Short, readable experience</span>
              <span>Accessible by default</span>
              <span>Built for calm navigation</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="relative">
            <div className="absolute inset-x-8 top-10 h-56 rounded-full bg-primary/10 blur-3xl" />
            <Card className="relative overflow-hidden border-primary/15 bg-card/90 shadow-lg shadow-primary/5">
              <CardHeader className="space-y-4 pb-0">
                <div className="flex items-center justify-between gap-4">
                  <Small className="uppercase tracking-[0.18em] text-primary">
                    Preview
                  </Small>
                  <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    3 minute check-in
                  </div>
                </div>
                <CardTitle className="text-2xl leading-tight sm:text-3xl">
                  What a finished screening summary could look like
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid gap-4 rounded-2xl border border-border bg-muted/30 p-4 sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-44 overflow-hidden rounded-xl bg-background">
                    <Image
                      src="/globe.svg"
                      alt="Decorative globe illustration"
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-contain p-6 opacity-90"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-xl bg-background p-4">
                      <Small className="uppercase tracking-[0.18em] text-primary">
                        Current status
                      </Small>
                      <H3 className="mt-2 text-lg">Low to moderate signal</H3>
                      <Text className="mt-2 text-muted-foreground">
                        Placeholder language for a summary that tells the story
                        plainly instead of overwhelming the reader.
                      </Text>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        ["1 summary", "easy to share"],
                        ["2 min", "to review"],
                        ["3 steps", "to move forward"],
                      ].map(([value, label]) => (
                        <div key={value} className="rounded-xl bg-background p-3">
                          <div className="text-lg font-semibold tracking-tight">
                            {value}
                          </div>
                          <Small>{label}</Small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <Text>
                    “The layout stays calm even when the message is sensitive.”
                  </Text>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}

export function FeatureSection() {
  return (
    <Section id="features">
      <Container size="xl">
        <div className="mb-10 max-w-2xl space-y-4">
          <Small className="uppercase tracking-[0.18em] text-primary">
            Features
          </Small>
          <H2>Built to make the experience easier to scan.</H2>
          <Text className="text-muted-foreground">
            These cards describe the product direction without overcommitting
            to implementation details that are not ready yet.
          </Text>
        </div>
        <StaggerList className="grid gap-6 md:grid-cols-3">
          {featureItems.map((item) => (
            <StaggerItem key={item.title}>
              <Card className="h-full border-border/80 transition-transform duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground">{item.description}</Text>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </Section>
  );
}

export function HowItWorksSection() {
  return (
    <Section id="how-it-works">
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-4">
            <Small className="uppercase tracking-[0.18em] text-primary">
              How it works
            </Small>
            <H2>Three simple steps, no clutter.</H2>
            <Text className="text-muted-foreground">
              The section layout gives visitors a quick mental model of the
              product before they ever leave the landing page.
            </Text>
          </div>

          <div className="grid gap-4">
            {howItWorks.map((step) => (
              <Card key={step.step} className="border-border/80">
                <CardContent className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {step.step}
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base sm:text-lg">{step.title}</CardTitle>
                    <Text className="text-muted-foreground">{step.description}</Text>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function BenefitsSection() {
  return (
    <Section>
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Card className="border-primary/15 bg-primary/5">
            <CardHeader>
              <Small className="uppercase tracking-[0.18em] text-primary">
                Benefits
              </Small>
              <CardTitle className="text-2xl sm:text-3xl">
                Why this landing page feels easier to trust.
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Text className="text-muted-foreground">
                The copy, spacing, and navigation are all tuned for fast
                comprehension on desktop and mobile.
              </Text>
              <Text className="text-muted-foreground">
                This is still placeholder content, but the structure is ready
                for real launch details later.
              </Text>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {benefitItems.map((benefit) => (
              <Card key={benefit.title} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground">{benefit.description}</Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function TestimonialsSection() {
  return (
    <Section>
      <Container size="xl">
        <div className="mb-10 max-w-2xl space-y-4">
          <Small className="uppercase tracking-[0.18em] text-primary">
            Testimonials
          </Small>
          <H2>Dummy feedback to show how social proof will fit.</H2>
          <Text className="text-muted-foreground">
            These quotes are placeholders only, but the layout already supports
            real testimonials later without a redesign.
          </Text>
        </div>
        <StaggerList className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <StaggerItem key={item.name}>
              <Card className="h-full">
                <CardContent className="space-y-4 pt-6">
                  <Text className="text-lg leading-8">
                    “{item.quote}”
                  </Text>
                  <div>
                    <div className="font-semibold tracking-tight">{item.name}</div>
                    <Small>{item.role}</Small>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </Section>
  );
}

export function FaqSection() {
  return (
    <Section id="faq">
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="space-y-4">
            <Small className="uppercase tracking-[0.18em] text-primary">
              FAQ
            </Small>
            <H2>Common questions, answered plainly.</H2>
            <Text className="text-muted-foreground">
              The FAQ uses native disclosure controls for accessibility and a
              cleaner mobile experience.
            </Text>
          </div>

          <div className="grid gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-border bg-card p-5 transition-colors open:bg-muted/30"
              >
                <summary className="cursor-pointer list-none text-base font-semibold tracking-tight outline-none">
                  <span>{faq.question}</span>
                </summary>
                <Text className="mt-3 text-muted-foreground">{faq.answer}</Text>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function FinalCtaSection() {
  return (
    <Section className="pb-20 sm:pb-24">
      <Container size="xl">
        <Card className="overflow-hidden border-primary/15 bg-primary/5">
          <CardContent className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-3">
              <Small className="uppercase tracking-[0.18em] text-primary">
                Ready to explore?
              </Small>
              <H2 className="text-3xl sm:text-4xl">Move from landing page to next step.</H2>
              <Text className="text-muted-foreground">
                The final CTA keeps the path simple: review the page, then reach
                out when you are ready.
              </Text>
            </div>
            <div className="flex flex-wrap gap-3">
              <LandingHeroActions />
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}