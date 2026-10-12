import type { Metadata } from "next";
import { InstructorManager } from "@/components/admin/instructors/instructor-manager";

export const metadata: Metadata = {
  title: "Instructors",
};

export default function AdminInstructorsPage() {
  return <InstructorManager />;
}
