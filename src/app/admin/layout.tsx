import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin";
import { isCurrentUserAdmin } from "@/lib/auth/admin";

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  if (!(await isCurrentUserAdmin())) {
    notFound();
  }

  return <AdminShell>{children}</AdminShell>;
}
