
"use client";

import { useMyInstructor } from "@/hooks";
import { RecordState } from "@/components/shared/record-state";
import {
  UserRound,
  Mail,
  Phone,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
} from "lucide-react";

export function InstructorProfileView() {
  const { data, isPending, isError, error, refetch } =
    useMyInstructor();
  type InstructorUser = {
    name?: string;
    email?: string;
    designation?: string
  };

  const profile = data?.data;
  const user = profile?.user as InstructorUser | undefined;

  const fields = [
    {
      label: "Instructor ID",
      value: profile?.instructorId,
      icon: UserRound,
    },
    {
      label: "Email",
      value: user?.email,
      icon: Mail,
    },
    {
      label: "Phone",
      value: profile?.phone,
      icon: Phone,
    },
    {
      label: "Designation",
      value: profile?.designation,
      icon: BriefcaseBusiness,
    },
    {
      label: "Department ID",
      value: profile?.departmentId,
      icon: Building2,
    },
    {
      label: "Created At",
      value:
        typeof profile?.createdAt === "string" ||
          typeof profile?.createdAt === "number"
          ? new Date(profile.createdAt).toLocaleDateString()
          : undefined,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View your instructor information.
        </p>
      </div>

      <RecordState
        isLoading={isPending}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        isEmpty={!profile || Object.keys(profile).length === 0}
        emptyMessage="No profile data was returned by the backend."
      >
        {profile && (
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-4 border-b p-5">
              <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                <UserRound className="size-7 text-muted-foreground" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  {user?.name ?? "Instructor"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {typeof profile?.designation === "string"
                    ? profile.designation
                    : "Instructor"}
                </p>
              </div>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2">
              {fields.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex gap-3">
                  <Icon className="mt-1 size-4 shrink-0 text-muted-foreground" />

                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-1 break-words text-sm font-medium">
                      {value == null || value === ""
                        ? "—"
                        : String(value)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t px-5 py-3">
              <p className="text-xs text-muted-foreground">
                Profile editing is not available.
              </p>
            </div>
          </div>
        )}
      </RecordState>
    </div>
  );
}
