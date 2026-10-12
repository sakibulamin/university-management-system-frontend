"use client";

import { BookOpen, CreditCard, LayoutDashboard, UserRound } from "lucide-react";
import {
  DashboardSidebar,
  type DashboardNavItem,
} from "@/components/layout/dashboard-sidebar";

const STUDENT_NAV_ITEMS: readonly DashboardNavItem[] = [
  { href: "/student", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/student/profile", label: "Profile", icon: UserRound },
  { href: "/student/courses", label: "Courses", icon: BookOpen },
  { href: "/student/payments", label: "Payments", icon: CreditCard },
];

export function StudentSidebar() {
  return <DashboardSidebar heading="Student" items={STUDENT_NAV_ITEMS} />;
}
