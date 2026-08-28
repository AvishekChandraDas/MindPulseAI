import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrivacySettings } from "@/components/privacy";
import { getCurrentUser } from "@/lib/auth/current-user";

export const metadata: Metadata = {
  title: "Privacy Settings",
  description: "Manage privacy choices for your MindPulse AI account.",
};

export default async function PrivacySettingsPage() {
  if (!(await getCurrentUser())) {
    notFound();
  }

  return <PrivacySettings />;
}
