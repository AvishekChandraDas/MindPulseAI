import "server-only";

import { getCurrentUser } from "./current-user";

function getAdminEmails(): Set<string> {
  return new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

/**
 * Checks whether the authenticated database user is in the server-configured
 * administrator allowlist. This must be used by every future admin query,
 * action, and route; client-provided role information is never trusted.
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return false;
  }

  return getAdminEmails().has(currentUser.email.trim().toLowerCase());
}
