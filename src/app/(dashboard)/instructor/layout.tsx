import type { ReactNode } from "react";
import { InstructorSidebar } from "@/components/instructor/instructor-sidebar";
import RoleGuard from "@/components/authguard/role-guard";


export default function InstructorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col md:flex-row">
      <RoleGuard roles={["INSTRUCTOR"]}>
        <InstructorSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </RoleGuard>
    </div>
  );
}
