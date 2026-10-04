import { ReactNode } from "react";
import { InstructorSidebar } from "@/components/instructor/instructor-sidebar";

// Route-level protection for /instructor/* is enforced by middleware.ts
// (Step 2) — not duplicated here, same as the admin layout.
export default function InstructorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col md:flex-row">
      <InstructorSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
