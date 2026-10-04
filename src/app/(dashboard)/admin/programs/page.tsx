import { Metadata } from "next";
import { ProgramManager } from "@/components/admin/programs/program-manager";

export const metadata: Metadata = {
  title: "Programs",
};

export default function AdminProgramsPage() {
  return <ProgramManager />;
}
