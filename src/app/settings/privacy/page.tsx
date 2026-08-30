import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { PrivacySettings } from "@/components/privacy";
import { getCurrentUser } from "@/lib/auth/current-user";

export const metadata: Metadata = {
  title: "Privacy Settings",
  description: "Manage privacy choices for your MindPulse AI account.",
};

export default async function PrivacySettingsPage() {
  if (!(await getCurrentUser())) {
    redirect("/sign-in");
  }

  return <PrivacySettings />;
}
