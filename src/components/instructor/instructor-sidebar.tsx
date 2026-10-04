"use client";

import { BookOpen, LayoutDashboard, UserRound } from "lucide-react";
import {
  DashboardSidebar,
  type DashboardNavItem,
} from "@/components/layout/dashboard-sidebar";

const INSTRUCTOR_NAV_ITEMS: readonly DashboardNavItem[] = [
  { href: "/instructor", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/instructor/profile", label: "Profile", icon: UserRound },
  { href: "/instructor/courses", label: "Courses", icon: BookOpen },
];

export function InstructorSidebar() {
  return <DashboardSidebar heading="Instructor" items={INSTRUCTOR_NAV_ITEMS} />;
}
