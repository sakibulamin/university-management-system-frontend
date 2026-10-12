import type { Metadata } from "next";
import { UserManager } from "@/components/admin/users/user-manager";

export const metadata: Metadata = {
  title: "Users",
};

export default function AdminUsersPage() {
  return <UserManager />;
}
