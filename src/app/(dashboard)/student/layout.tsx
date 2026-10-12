import type { ReactNode } from "react";
import { StudentSidebar } from "@/components/student/student-sidebar";


export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col md:flex-row">
      <StudentSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
