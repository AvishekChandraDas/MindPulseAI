import "server-only";

import { isCurrentUserAdmin } from "@/lib/auth/admin";
import { prisma } from "@/lib/prisma";

const pageSize = 20;

export type AdminUser = {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
};

export type AdminUsersPage = {
  users: AdminUser[];
  page: number;
  pageCount: number;
  total: number;
};

export async function getAdminUsers(
  requestedPage = 1,
): Promise<AdminUsersPage | null> {
  if (!(await isCurrentUserAdmin())) {
    return null;
  }

  const total = await prisma.user.count();
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, Math.floor(requestedPage)), pageCount);

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    users,
    page,
    pageCount,
    total,
  };
}
