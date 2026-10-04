import { Metadata } from "next";
import { StudentManager } from "@/components/admin/students/student-manager";

export const metadata: Metadata = {
  title: "Students",
};

export default function AdminStudentsPage() {
  return <StudentManager />;
}
