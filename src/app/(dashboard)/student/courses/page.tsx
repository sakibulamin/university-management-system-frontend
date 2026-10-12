import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { StudentCourseBrowser } from "@/components/student/courses/student-course-browser";

export const metadata: Metadata = {
  title: "Courses",
};

export default function StudentCoursesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Courses" />
      <StudentCourseBrowser />
    </div>
  );
}
