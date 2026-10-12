
"use client";

import { useMyStudent } from "@/hooks";
import { RecordState } from "@/components/shared/record-state";
import { EditStudentProfileForm } from "./edit-student-profile-form";
import { UserRound } from "lucide-react";

type StudentUser = {
  name?: string;
  email?: string;
};

type StudentProfile = {
  studentId?: string | number | null;
  programId?: string | number | null;
  phone?: string;
  address?: string;
  user?: StudentUser;
};

export function StudentProfileView() {
  const { data, isPending, isError, error, refetch } = useMyStudent();

  const profile = data?.data as StudentProfile | undefined;
  const user = profile?.user;

  return (
    <div className="space-y-6">

      <div>

        <p className="mt-1 text-sm text-muted-foreground">
          View and manage your student information.
        </p>
      </div>


      <div className="rounded-lg border bg-card">
        <div className="flex items-center gap-3 border-b p-5">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <UserRound className="size-6 text-muted-foreground" />
          </div>

          <div>
            <h2 className="font-semibold">Student Information</h2>
            <p className="text-sm text-muted-foreground">
              Your registered academic details
            </p>
          </div>
        </div>

        <div className="p-5">
          <RecordState
            isLoading={isPending}
            isError={isError}
            error={error}
            onRetry={() => refetch()}
            isEmpty={!profile || Object.keys(profile).length === 0}
            emptyMessage="No student profile data available."
          >
            {profile && (
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Student Name
                  </p>
                  <p className="font-medium">
                    {user?.name || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Email
                  </p>
                  <p className="break-all font-medium">
                    {user?.email || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Student ID
                  </p>
                  <p className="font-medium">
                    {profile.studentId == null
                      ? "—"
                      : String(profile.studentId)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{profile.phone || "—"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="break-words font-medium">{profile.address || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Program ID
                  </p>
                  <p className="font-medium">
                    {profile.programId == null
                      ? "—"
                      : String(profile.programId)}
                  </p>
                </div>
              </div>
            )}
          </RecordState>
        </div>
      </div>


      {profile && (
        <div className="rounded-lg border bg-card">
          <div className="border-b p-5">
            <h2 className="font-semibold">Edit Contact Details</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Update your phone number and address.
            </p>
          </div>

          <div className="p-5">
            <EditStudentProfileForm
              initialPhone={
                typeof profile.phone === "string"
                  ? profile.phone
                  : ""
              }
              initialAddress={
                typeof profile.address === "string"
                  ? profile.address
                  : ""
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
