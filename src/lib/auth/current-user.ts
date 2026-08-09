import { cookies, headers } from "next/headers";

import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const userId = cookieStore.get("mindpulse-user-id")?.value ?? headerStore.get("x-mindpulse-user-id");

  if (!userId) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
