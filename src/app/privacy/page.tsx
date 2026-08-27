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

const sections = [
  {
    title: "Information we collect",
    body: [
      "Placeholder content for account details, basic contact information, and any data entered during a future screening flow.",
      "Placeholder content for device and usage data that helps keep the service stable and understandable.",
    ],
  },
  {
    title: "How we use information",
    body: [
      "Placeholder content for generating summaries, improving the product, and providing support.",
      "Placeholder content for safety, compliance, and service communications.",
    ],
  },
  {
    title: "Sharing and retention",
    body: [
      "Placeholder content for limited sharing with service providers and legal obligations where required.",
      "Placeholder content for how long data is retained and how deletion requests are handled.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Review the placeholder privacy policy for MindPulse AI, including collection, use, and retention principles.",
};

export default function PrivacyPage() {
  return (
    <>
      <Section className="py-16 sm:py-20 lg:py-24">
        <Container size="xl">
          <div className="max-w-3xl space-y-6">
            <Small className="uppercase tracking-[0.18em] text-primary">
              Privacy Policy
            </Small>
            <H1>We keep the privacy policy plain, short, and readable.</H1>
            <Lead>
              Last updated August 7, 2026. Placeholder content only. Replace
              this policy with counsel-reviewed language before launch.
            </Lead>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="xl">
          <div className="space-y-6">
            {sections.map((section) => (
              <Card key={section.title}>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {section.body.map((paragraph) => (
                    <Text key={paragraph} className="text-muted-foreground">
                      {paragraph}
                    </Text>
                  ))}
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader>
                <CardTitle>Your choices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Text className="text-muted-foreground">
                  Placeholder content for access, correction, deletion, and
                  communication preferences.
                </Text>
                <Text className="text-muted-foreground">
                  Contact placeholder: privacy@mindpulseai.com
                </Text>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
