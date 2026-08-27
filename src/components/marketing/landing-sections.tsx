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

const features = [
  [
    "◌",
    "A check-in that meets you where you are",
    "Thoughtful questions and a measured pace make it easier to pause and reflect without pressure.",
  ],
  [
    "✦",
    "Clarity you can carry forward",
    "See your responses gathered in one simple, plain-language summary to help you spot patterns.",
  ],
  [
    "⌁",
    "Your space, treated with care",
    "A quiet, respectful experience designed around personal reflection and your peace of mind.",
  ],
];
const steps = [
  [
    "01",
    "Take a private moment",
    "Settle in and answer a few research-backed questions at your own pace.",
  ],
  [
    "02",
    "Understand your check-in",
    "Receive a simple overview that puts your answers in context—not a diagnosis.",
  ],
  [
    "03",
    "Choose what feels helpful",
    "Use the insight as a gentle starting point for reflection, support, or conversation.",
  ],
];
const benefits = [
  [
    "3–5 min",
    "A little time for yourself",
    "A brief experience that respects your attention and emotional energy.",
  ],
  [
    "Private",
    "Personal by design",
    "Your responses are presented as a personal reflection, without judgment or noise.",
  ],
  [
    "1 clear view",
    "Simple, useful context",
    "A clear snapshot can make the next conversation feel a little easier to begin.",
  ],
];
const faqs = [
  [
    "Is this a medical diagnosis?",
    "No. MindPulse is an educational check-in that can help you reflect on mental wellness signals. It is not a diagnosis and should not replace care from a qualified professional.",
  ],
  [
    "Who is MindPulse for?",
    "It is designed for adults looking for a calm place to reflect on how they have been feeling recently.",
  ],
  [
    "How long does a check-in take?",
    "Most people can complete the guided check-in in around three to five minutes. You can take a pause whenever you need to.",
  ],
  [
    "What if I need urgent help?",
    "MindPulse is not an emergency service. If you feel at risk of harming yourself or someone else, contact local emergency services or a crisis support line right away.",
  ],
];

export function LandingHero() {
  return (
    <Section className="homepage-hero overflow-hidden py-14 sm:py-20 lg:py-24">
      <Container size="xl">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <FadeIn className="space-y-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-3.5 py-2 text-xs font-semibold tracking-wide text-primary shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />A calmer
              place to check in
            </div>
            <div className="space-y-5">
              <H1 className="max-w-xl text-5xl leading-[1.06] sm:text-6xl">
                Make space for how you&apos;re really doing.
              </H1>
              <Lead className="max-w-xl">
                A private, guided check-in that helps you notice your mental
                wellness patterns—one thoughtful moment at a time.
              </Lead>
            </div>
            <LandingHeroActions />
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <b className="text-primary">✓</b> Takes only a few minutes
              </span>
              <span className="inline-flex items-center gap-2">
                <b className="text-primary">✓</b> Private and judgment-free
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="relative">
            <div className="absolute -right-10 top-8 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-6 left-0 h-36 w-36 rounded-full bg-accent/70 blur-3xl" />
            <Card className="relative overflow-hidden rounded-[1.75rem] border-primary/15 bg-card/90 shadow-2xl shadow-primary/10">
              <CardHeader className="space-y-4 border-b border-border/70 pb-6">
                <div className="flex items-center justify-between gap-4">
                  <Small className="inline-flex items-center gap-2 uppercase tracking-[0.18em] text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Today&apos;s check-in
                  </Small>
                  <div className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
                    About 3 min
                  </div>
                </div>
                <CardTitle className="text-xl leading-tight sm:text-2xl">
                  How have you been feeling lately?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                <div className="rounded-2xl bg-muted/60 p-5">
                  <div className="mb-5 flex items-center justify-between text-sm text-muted-foreground">
                    <span>Question 1 of 9</span>
                    <span className="font-medium text-primary">
                      11% complete
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-border/70">
                    <div className="h-full w-[11%] rounded-full bg-primary" />
                  </div>
                  <H3 className="mt-6 text-xl">
                    Over the last two weeks, how often have you felt down,
                    depressed, or hopeless?
                  </H3>
                  <div className="mt-5 grid gap-2">
                    {[
                      "Not at all",
                      "Several days",
                      "More than half the days",
                    ].map((label, index) => (
                      <div
                        key={label}
                        className={`rounded-xl border px-4 py-3 text-sm font-medium ${index === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground"}`}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-primary/10 bg-primary/5 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    ✦
                  </span>
                  <Small className="leading-5">
                    There are no right answers here. This is simply a moment for
                    you.
                  </Small>
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
        <Intro
          eyebrow="Designed around you"
          title="A gentler way to understand your wellbeing."
          copy="MindPulse makes room for honest reflection with an experience that feels clear, grounded, and human."
        />
        <StaggerList className="grid gap-6 md:grid-cols-3">
          {features.map(([icon, title, description]) => (
            <StaggerItem key={title}>
              <Card className="h-full rounded-2xl border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-xl font-semibold text-primary">
                    {icon}
                  </span>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground">{description}</Text>
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
            <H2>A simple path back to yourself.</H2>
            <Text className="text-muted-foreground">
              No complicated onboarding. Just a small, purposeful moment to
              notice what is happening beneath the surface.
            </Text>
          </div>
          <div className="grid gap-4">
            {steps.map(([number, title, description]) => (
              <Card
                key={number}
                className="border-border/80 transition-colors hover:border-primary/25"
              >
                <CardContent className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {number}
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base sm:text-lg">
                      {title}
                    </CardTitle>
                    <Text className="text-muted-foreground">{description}</Text>
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
          <Card className="overflow-hidden border-primary/15 bg-primary/5">
            <CardHeader>
              <Small className="uppercase tracking-[0.18em] text-primary">
                Built for a calmer day
              </Small>
              <CardTitle className="text-2xl sm:text-3xl">
                Small moments of reflection can add up.
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Text className="text-muted-foreground">
                Checking in is not about finding a perfect answer. It is about
                giving yourself room to notice, name, and move forward with more
                awareness.
              </Text>
              <Text className="text-muted-foreground">
                Whether you are feeling steady or stretched thin, this is a
                place to begin with compassion.
              </Text>
            </CardContent>
          </Card>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {benefits.map(([metric, title, description]) => (
              <Card key={title} className="h-full rounded-2xl">
                <CardHeader>
                  <Small className="text-primary">{metric}</Small>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground">{description}</Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
            <H2>A little clarity before you begin.</H2>
            <Text className="text-muted-foreground">
              Everything you need to know about taking a moment with MindPulse.
            </Text>
          </div>
          <div className="grid gap-4">
            {faqs.map(([question, answer]) => (
              <details
                key={question}
                className="group rounded-2xl border border-border bg-card p-5 transition-colors open:bg-muted/30"
              >
                <summary className="cursor-pointer list-none text-base font-semibold tracking-tight outline-none">
                  {question}
                </summary>
                <Text className="mt-3 text-muted-foreground">{answer}</Text>
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
        <Card className="homepage-cta overflow-hidden rounded-[1.75rem] border-primary/15 bg-primary text-primary-foreground">
          <CardContent className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-3">
              <Small className="uppercase tracking-[0.18em] text-primary-foreground/70">
                Your next small step
              </Small>
              <H2 className="text-3xl text-primary-foreground sm:text-4xl">
                Take a moment. Check in with yourself.
              </H2>
              <Text className="text-primary-foreground/75">
                Your thoughts and feelings deserve a little room. Start your
                private check-in whenever you&apos;re ready.
              </Text>
            </div>
            <LandingHeroActions />
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
function Intro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mb-10 max-w-2xl space-y-4">
      <Small className="uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </Small>
      <H2>{title}</H2>
      <Text className="text-muted-foreground">{copy}</Text>
    </div>
  );
}
