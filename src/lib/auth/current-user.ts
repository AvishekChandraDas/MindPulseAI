import "server-only";

import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";

/**
 * Resolves identity exclusively from Auth.js' server-validated database
 * session. Never derive a user id from request headers, arbitrary cookies, or
 * client input.
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
