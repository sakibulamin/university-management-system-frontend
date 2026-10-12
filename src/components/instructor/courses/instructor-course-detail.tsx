"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCourse } from "@/hooks";
import { RecordFields } from "@/components/shared/record-fields";
import { RecordState } from "@/components/shared/record-state";

interface InstructorCourseDetailProps {
  id: string;
}


export function InstructorCourseDetail({ id }: InstructorCourseDetailProps) {
  const { data, isPending, isError, error, refetch } = useCourse(id);
  const course = data?.data;

  return (
    <div className="space-y-6">
      <Link
        href="/instructor/courses"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to courses
      </Link>

      <div className="rounded-lg border p-6">
        <RecordState
          isLoading={isPending}
          isError={isError}
          error={error}
          onRetry={() => refetch()}
          isEmpty={!course || Object.keys(course).length === 0}
          emptyMessage="This course has no data to display."
        >
          {course && <RecordFields record={course} />}
        </RecordState>
      </div>
    </div>
  );
}
