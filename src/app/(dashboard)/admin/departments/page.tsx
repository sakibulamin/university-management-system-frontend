import type { Metadata } from "next";
import { DepartmentManager } from "@/components/admin/departments/department-manager";

export const metadata: Metadata = {
  title: "Departments",
};

export default function AdminDepartmentsPage() {
  return <DepartmentManager />;
}
