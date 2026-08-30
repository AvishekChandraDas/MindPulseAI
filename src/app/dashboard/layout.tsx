import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard";
import { getCurrentUser } from "@/lib/auth/current-user";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AuthenticatedDashboardLayout>{children}</AuthenticatedDashboardLayout>
  );
}

async function AuthenticatedDashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <DashboardShell
      user={{
        name: user.name,
        email: user.email,
        image: user.image,
      }}
    >
      {children}
    </DashboardShell>
  );
}
