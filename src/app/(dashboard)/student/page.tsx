import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { StudentDashboardOverview } from "@/components/student/student-dashboard-overview";

export const metadata: Metadata = {
  title: "Student Dashboard",
};

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Welcome back." />
      <StudentDashboardOverview />
    </div>
  );
}
