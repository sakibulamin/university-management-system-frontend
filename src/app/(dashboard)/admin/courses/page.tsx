import type { Metadata } from "next";
import { CourseManager } from "@/components/admin/courses/course-manager";

export const metadata: Metadata = {
  title: "Courses",
};

export default function AdminCoursesPage() {
  return <CourseManager />;
}
