import type { Metadata } from "next";
import { InstructorCourseList } from "@/components/instructor/courses/instructor-course-list";

export const metadata: Metadata = {
  title: "Courses",
};

export default function InstructorCoursesPage() {
  return <InstructorCourseList />;
}
