import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import RoleGuard from "@/components/authguard/role-guard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col md:flex-row">
      <RoleGuard roles={["ADMIN"]}>
        <AdminSidebar />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </RoleGuard>
    </div>
  );
}
