"use client";

import Link from "next/link";
import { BookOpen, UserRound } from "lucide-react";
import { useMyInstructor } from "@/hooks";
import { RecordFields } from "@/components/shared/record-fields";
import { RecordState } from "@/components/shared/record-state";

// No "Total Courses" / "Total Students" / etc. cards: no confirmed
// instructor-specific statistics endpoint exists. This shows the real
// confirmed data (the instructor's own profile, generically rendered)
// plus navigation — not invented numbers.
export function InstructorDashboardOverview() {
  const { data, isPending, isError, error, refetch } = useMyInstructor();
  const profile = data?.data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/instructor/profile"
          className="flex items-center gap-3 rounded-lg border p-5 hover:bg-muted/50"
        >
          <UserRound className="size-6 text-primary" aria-hidden="true" />
          <div>
            <p className="font-medium">My Profile</p>
            <p className="text-sm text-muted-foreground">View your instructor profile</p>
          </div>
        </Link>
        <Link
          href="/instructor/courses"
          className="flex items-center gap-3 rounded-lg border p-5 hover:bg-muted/50"
        >
          <BookOpen className="size-6 text-primary" aria-hidden="true" />
          <div>
            <p className="font-medium">Courses</p>
            <p className="text-sm text-muted-foreground">Browse courses in the system</p>
          </div>
        </Link>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          Your profile
        </h2>
        <RecordState
          isLoading={isPending}
          isError={isError}
          error={error}
          onRetry={() => refetch()}
          isEmpty={!profile || Object.keys(profile).length === 0}
          emptyMessage="No profile data was returned by the backend."
        >
          {profile && <RecordFields record={profile} />}
        </RecordState>
      </div>
    </div>
  );
}
