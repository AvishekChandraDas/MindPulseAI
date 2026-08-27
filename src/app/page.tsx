import {
  BenefitsSection,
  FaqSection,
  FeatureSection,
  FinalCtaSection,
  LandingHero,
  HowItWorksSection,
} from "@/components/marketing";

export const metadata = {
  title: "Home",
  description:
    "MindPulse AI is a public preview for a calmer, more accessible mental wellness screening experience.",
};

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <FeatureSection />
      <HowItWorksSection />
      <BenefitsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
