import type { Metadata } from "next";
import { InstructorCourseDetail } from "@/components/instructor/courses/instructor-course-detail";

export const metadata: Metadata = {
  title: "Course Details",
};

export default async function InstructorCourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InstructorCourseDetail id={id} />;
}
