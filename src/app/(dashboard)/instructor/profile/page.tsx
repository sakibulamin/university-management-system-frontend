import { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { InstructorProfileView } from "@/components/instructor/profile/instructor-profile-view";

export const metadata: Metadata = {
  title: "My Profile",
};

export default function InstructorProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        description="Profile editing is not available here — the backend's only update endpoint for instructor profiles is admin-only."
      />
      <InstructorProfileView />
    </div>
  );
}
