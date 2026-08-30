import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { SignInButton } from "@/components/auth";
import { Card, CardContent, H1, Small, Text } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth/current-user";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in securely to access your MindPulse AI dashboard.",
};

export default async function SignInPage() {
  if (await getCurrentUser()) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-16rem)] max-w-xl items-center px-4 py-12 sm:px-6">
      <Card className="w-full border-primary/15 bg-primary/5">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="space-y-3">
            <Small className="uppercase tracking-[0.18em] text-primary">
              Secure access
            </Small>
            <H1>Sign in to your dashboard</H1>
            <Text className="text-muted-foreground">
              Continue with Google to access your saved assessments and mood
              check-ins.
            </Text>
          </div>

          <SignInButton />

          <Text className="text-sm text-muted-foreground">
            By continuing, you will be redirected to Google to authenticate.
            <Link href="/privacy" className="ml-1 underline underline-offset-4">
              Privacy information
            </Link>
          </Text>
        </CardContent>
      </Card>
    </div>
  );
}
