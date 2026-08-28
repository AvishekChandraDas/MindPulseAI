import Link from "next/link";

import type { AdminUsersPage } from "@/server/queries/admin-users";
import { Card, CardContent, H3, Small, Text } from "@/components/ui";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function AdminUsersOverview({ data }: { data: AdminUsersPage }) {
  if (data.total === 0) {
    return (
      <Card>
        <CardContent className="space-y-2 p-6">
          <Small className="uppercase tracking-[0.18em] text-primary">
            Users
          </Small>
          <H3>No users yet</H3>
          <Text className="text-muted-foreground">
            Account information will appear here once users are created.
          </Text>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <H3>Users</H3>
            <Text className="mt-1 text-sm text-muted-foreground">
              {data.total} account{data.total === 1 ? "" : "s"} total
            </Text>
          </div>
          <Small>
            Page {data.page} of {data.pageCount}
          </Small>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="border-b border-border text-muted-foreground">
              <tr>
                <th scope="col" className="px-3 py-3 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border/70 last:border-0"
                >
                  <td className="px-3 py-4 font-medium">
                    {user.name ?? "Not provided"}
                  </td>
                  <td className="px-3 py-4 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-3 py-4 text-muted-foreground">
                    {dateFormatter.format(user.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.pageCount > 1 ? (
          <nav
            aria-label="User list pagination"
            className="flex justify-end gap-2"
          >
            {data.page > 1 ? (
              <Link
                href={`/admin?page=${data.page - 1}#users`}
                className="rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Previous
              </Link>
            ) : null}
            {data.page < data.pageCount ? (
              <Link
                href={`/admin?page=${data.page + 1}#users`}
                className="rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Next
              </Link>
            ) : null}
          </nav>
        ) : null}
      </CardContent>
    </Card>
  );
}
