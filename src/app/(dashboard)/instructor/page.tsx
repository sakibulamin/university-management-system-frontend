import { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { InstructorDashboardOverview } from "@/components/instructor/instructor-dashboard-overview";

export const metadata: Metadata = {
  title: "Instructor Dashboard",
};

export default function InstructorDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Welcome back." />
      <InstructorDashboardOverview />
    </div>
  );
}
