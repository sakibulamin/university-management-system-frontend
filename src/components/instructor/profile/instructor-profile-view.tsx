"use client";

import { useMyInstructor } from "@/hooks";
import { RecordFields } from "@/components/shared/record-fields";
import { RecordState } from "@/components/shared/record-state";

// Read-only by design: the Postman collection confirms PATCH
// /instructors/:id as "ADMIN only". There is no confirmed endpoint that
// lets an instructor edit their own profile, so none is built here —
// per "do not invent instructor features."
export function InstructorProfileView() {
  const { data, isPending, isError, error, refetch } = useMyInstructor();
  const profile = data?.data;

  return (
    <div className="rounded-lg border p-6">
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
  );
}
