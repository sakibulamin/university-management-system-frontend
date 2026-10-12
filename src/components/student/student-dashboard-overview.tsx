"use client";

import Link from "next/link";
import { BookOpen, CreditCard, UserRound } from "lucide-react";
import { useMyStudent } from "@/hooks";
import { RecordFields } from "@/components/shared/record-fields";
import { RecordState } from "@/components/shared/record-state";
import { StudentProfileView } from "./profile/student-profile-view";

export function StudentDashboardOverview() {
  const { data, isPending, isError, error, refetch } = useMyStudent();
  const profile = data?.data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/student/profile"
          className="flex items-center gap-3 rounded-lg border p-5 hover:bg-muted/50"
        >
          <UserRound className="size-6 text-primary" aria-hidden="true" />
          <div>
            <p className="font-medium">My Profile</p>
            <p className="text-sm text-muted-foreground">View and edit your profile</p>
          </div>
        </Link>
        <Link
          href="/student/courses"
          className="flex items-center gap-3 rounded-lg border p-5 hover:bg-muted/50"
        >
          <BookOpen className="size-6 text-primary" aria-hidden="true" />
          <div>
            <p className="font-medium">Courses</p>
            <p className="text-sm text-muted-foreground">Browse available courses</p>
          </div>
        </Link>
        <Link
          href="/student/payments"
          className="flex items-center gap-3 rounded-lg border p-5 hover:bg-muted/50"
        >
          <CreditCard className="size-6 text-primary" aria-hidden="true" />
          <div>
            <p className="font-medium">Payments</p>
            <p className="text-sm text-muted-foreground">Pay a fee via bKash</p>
          </div>
        </Link>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          Your profile
        </h2>
  
         
        <StudentProfileView />
      </div>
    </div>
  );
}
