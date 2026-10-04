"use client";

import {
  Building2,
  BookOpen,
  CalendarRange,
  FileClock,
  GraduationCap,
  LayoutDashboard,
  Users,
  UserRound,
} from "lucide-react";
import {
  DashboardSidebar,
  type DashboardNavItem,
} from "@/components/layout/dashboard-sidebar";

// Unchanged from the original Step 5 implementation — only the
// responsive rail/slide-over behavior was extracted out to
// DashboardSidebar (Step 6), which this now wraps. Rendered output is
// identical.
const ADMIN_NAV_ITEMS: readonly DashboardNavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/departments", label: "Departments", icon: Building2 },
  { href: "/admin/programs", label: "Programs", icon: GraduationCap },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/semesters", label: "Semesters", icon: CalendarRange },
  { href: "/admin/instructors", label: "Instructors", icon: UserRound },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: FileClock },
];

export function AdminSidebar() {
  return <DashboardSidebar heading="Admin" items={ADMIN_NAV_ITEMS} />;
}
