import {
  Button,
  Card,
  CardContent,
  H1,
  H3,
  Lead,
  Small,
  Text,
} from "@/components/ui";

const privacyControls = [
  {
    title: "Wellness report generation",
    description:
      "Controls whether you can request an AI-generated wellness summary from your saved assessments and mood entries. Report generation is optional and is initiated only when you choose it.",
    status: "Preference saving is coming soon",
  },
  {
    title: "Download your information",
    description:
      "Will let you request a copy of your account, assessment, and mood information in a portable format.",
    status: "Not available yet",
  },
  {
    title: "Delete account and data",
    description:
      "Will provide a separate, carefully confirmed process to request account and associated data deletion.",
    status: "Not available yet",
  },
];

export function PrivacySettings() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:py-16">
      <div className="max-w-3xl space-y-4">
        <Small className="uppercase tracking-[0.18em] text-primary">
          Privacy settings
        </Small>
        <H1>Understand and manage your privacy choices.</H1>
        <Lead>
          This space keeps privacy controls separate from your wellness
          dashboard. Settings shown here are clearly labeled until they can be
          saved securely.
        </Lead>
      </div>

      <Card className="border-primary/15 bg-primary/5">
        <CardContent className="space-y-3 p-6">
          <Small className="uppercase tracking-[0.18em] text-primary">
            What MindPulse stores
          </Small>
          <Text className="text-muted-foreground">
            Your account includes basic profile information. Assessment
            responses, completed score summaries, mood entries, and optional
            mood notes are stored separately and associated with your account.
          </Text>
          <Text className="text-muted-foreground">
            When you request an AI wellness report, the report service uses your
            saved assessment and mood data to create that optional reflection.
            It is informational and not a medical diagnosis.
          </Text>
        </CardContent>
      </Card>

      <section aria-labelledby="privacy-controls-heading" className="space-y-4">
        <div className="space-y-1">
          <Small className="uppercase tracking-[0.18em] text-primary">
            Your controls
          </Small>
          <H3 id="privacy-controls-heading">Privacy preferences</H3>
          <Text className="text-muted-foreground">
            These controls are displayed for transparency. They do not change
            your account until secure preference storage is added.
          </Text>
        </div>

        <div className="grid gap-4">
          {privacyControls.map((control) => (
            <Card key={control.title}>
              <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl space-y-2">
                  <H3 className="text-lg">{control.title}</H3>
                  <Text className="text-muted-foreground">
                    {control.description}
                  </Text>
                </div>
                <div className="shrink-0 space-y-2 sm:text-right">
                  <Small className="block text-primary">{control.status}</Small>
                  <Button variant="outline" disabled>
                    Manage setting
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card>
        <CardContent className="space-y-2 p-6">
          <Small className="uppercase tracking-[0.18em] text-primary">
            More information
          </Small>
          <Text className="text-muted-foreground">
            For the current policy and contact details, review the public
            privacy policy. Any future deletion or export process will be
            described here before it becomes available.
          </Text>
          <a
            href="/privacy"
            className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Read the privacy policy
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
