import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

// Route-level protection for /admin/* is enforced by middleware.ts
// (Step 2) — not duplicated here. This layout is purely presentational.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
