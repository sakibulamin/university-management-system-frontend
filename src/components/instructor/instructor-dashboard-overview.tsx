
"use client";

import Link from "next/link";
import { BookOpen, UserRound } from "lucide-react";
import { InstructorProfileView } from "./profile/instructor-profile-view";

export function InstructorDashboardOverview() {
  return (
    <div className="space-y-6">
  

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/instructor/profile"
          className="flex items-center gap-4 rounded-lg border bg-card p-5 transition-colors hover:bg-muted/50"
        >
          <UserRound
            className="size-6 shrink-0 text-primary"
            aria-hidden="true"
          />

          <div>
            <p className="font-semibold">My Profile</p>
            <p className="text-sm text-muted-foreground">
              View your instructor profile
            </p>
          </div>
        </Link>

        <Link
          href="/instructor/courses"
          className="flex items-center gap-4 rounded-lg border bg-card p-5 transition-colors hover:bg-muted/50"
        >
          <BookOpen
            className="size-6 shrink-0 text-primary"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold">Courses</p>
            <p className="text-sm text-muted-foreground">
              Browse courses in the system
            </p>
          </div>
        </Link>
      </div>
      <InstructorProfileView />
    </div>
  );
}