import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  AdminAssessmentOverview,
  AdminUsersOverview,
} from "@/components/admin";
import { Card, CardContent, H1, H3, Small, Text } from "@/components/ui";
import { getAdminAssessmentOverview } from "@/server/queries/admin-assessments";
import { getAdminUsers } from "@/server/queries/admin-users";

export const metadata: Metadata = {
  title: "Admin",
  description: "Restricted MindPulse AI administration workspace.",
};

type AdminPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function parsePage(value: string | string[] | undefined): number {
  const page = Number(Array.isArray(value) ? value[0] : value);

  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const page = parsePage(resolvedSearchParams.page);
  const [overview, users] = await Promise.all([
    getAdminAssessmentOverview(),
    getAdminUsers(page),
  ]);

  if (!overview || !users) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="max-w-3xl space-y-3">
        <Small className="uppercase tracking-[0.18em] text-primary">
          Admin panel
        </Small>
        <H1>Manage the MindPulse workspace.</H1>
        <Text className="text-muted-foreground">
          Administrative tools are limited to server-authorized administrators.
          Assessment information is presented in aggregate only.
        </Text>
      </div>

      <section
        id="overview"
        aria-labelledby="assessment-overview-heading"
        className="space-y-4 scroll-mt-28"
      >
        <div className="space-y-1">
          <Small className="uppercase tracking-[0.18em] text-primary">
            Assessments
          </Small>
          <H3 id="assessment-overview-heading">
            Assessment management overview
          </H3>
        </div>
        <AdminAssessmentOverview overview={overview} />
      </section>

      <section
        id="users"
        aria-labelledby="users-heading"
        className="space-y-4 scroll-mt-28"
      >
        <div className="space-y-1">
          <Small className="uppercase tracking-[0.18em] text-primary">
            Users
          </Small>
          <H3 id="users-heading">Basic user overview</H3>
        </div>
        <AdminUsersOverview data={users} />
      </section>

      <section
        id="configuration"
        aria-labelledby="configuration-heading"
        className="scroll-mt-28"
      >
        <Card>
          <CardContent className="space-y-3 p-6">
            <Small className="uppercase tracking-[0.18em] text-primary">
              Configuration
            </Small>
            <H3 id="configuration-heading">Workspace configuration</H3>
            <Text className="text-muted-foreground">
              Configuration tools will be introduced here when they are ready.
              Sensitive settings remain server-managed.
            </Text>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
