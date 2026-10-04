import { Metadata } from "next";
import { SemesterManager } from "@/components/admin/semesters/semester-manager";

export const metadata: Metadata = {
  title: "Semesters",
};

export default function AdminSemestersPage() {
  return <SemesterManager />;
}
