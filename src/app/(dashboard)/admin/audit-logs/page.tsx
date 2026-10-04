import { Metadata } from "next";
import { AuditLogViewer } from "@/components/admin/audit-logs/audit-log-viewer";

export const metadata: Metadata = {
  title: "Audit Logs",
};

export default function AdminAuditLogsPage() {
  return <AuditLogViewer />;
}
