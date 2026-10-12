import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { StudentProfileView } from "@/components/student/profile/student-profile-view";

export const metadata: Metadata = {
  title: "My Profile",
};

export default function StudentProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" />
      <StudentProfileView />
    </div>
  );
}
