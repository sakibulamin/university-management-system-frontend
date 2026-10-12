"use client";

import { AlertCircle } from "lucide-react";
import { useCourses } from "@/hooks";
import { useQueryParams } from "@/hooks/use-query-params";
import type { CourseSortOrder } from "@/types";
import { DataTable } from "@/components/admin/data-table";
import { PaginationControls } from "@/components/admin/pagination-controls";
import { SearchInput } from "@/components/admin/search-input";

const LIMIT = 10;

export function StudentCourseBrowser() {
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
     
      <div className="flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <AlertCircle className="size-5 shrink-0" aria-hidden="true" />
        <p>
          Course enrollment is not currently exposed by the backend — there is
          no confirmed endpoint for &quot;my enrolled courses&quot;. What you
          see below is every course in the system, for browsing only. Browsing
          a course does not mean you are enrolled in it.
        </p>
      </div>

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
