"use client";

import Link from "next/link";
import { useCourses } from "@/hooks";
import { useQueryParams } from "@/hooks/use-query-params";
import { getRecordId } from "@/lib/get-record-id";
import type { CourseSortOrder } from "@/types";
import { DataTable } from "@/components/admin/data-table";
import { PageHeader } from "@/components/admin/page-header";
import { PaginationControls } from "@/components/admin/pagination-controls";
import { SearchInput } from "@/components/admin/search-input";

const LIMIT = 10;


export function InstructorCourseList() {
  const { searchParams, setParams } = useQueryParams();
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const search = searchParams.get("search") ?? "";
  const sortOrder = (searchParams.get("sortOrder") as CourseSortOrder) || "desc";

  const { data, isPending, isError, error, refetch } = useCourses({
    page,
    limit: LIMIT,
    search: search || undefined,
    sortBy: "createdAt",
    sortOrder,
  });
  const items = data?.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Courses"
        description="All courses in the system. There is no confirmed way to filter this to courses you teach."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          defaultValue={search}
          onSearch={(value) => setParams({ search: value, page: 1 })}
          placeholder="Search courses…"
        />
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Sort by created date
          <select
            value={sortOrder}
            onChange={(e) => setParams({ sortOrder: e.target.value, page: 1 })}
            className="h-9 rounded-md border border-input bg-transparent px-2 text-sm"
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </label>
      </div>

      <DataTable
        items={items}
        isLoading={isPending}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        emptyMessage="No courses found."
        renderRowActions={(item) => {
          const id = getRecordId(item);
          if (!id) return null;
          return (
            <Link
              href={`/instructor/courses/${id}`}
              className="rounded-md border border-input px-3 py-1 text-xs font-medium hover:bg-muted"
            >
              View
            </Link>
          );
        }}
      />

      <PaginationControls
        page={page}
        limit={LIMIT}
        itemCount={items.length}
        onPageChange={(next) => setParams({ page: next })}
      />
    </div>
  );
}
