import { Metadata } from "next";
import { DashboardStats } from "@/components/admin/dashboard/dashboard-stats";
import { PageHeader } from "@/components/admin/page-header";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of the system." />
      <DashboardStats />
    </div>
  );
}
