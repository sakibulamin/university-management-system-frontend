"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useCourses, useDeleteCourse } from "@/hooks";
import { useQueryParams } from "@/hooks/use-query-params";
import { getErrorMessage } from "@/lib/get-error-message";
import { getRecordId } from "@/lib/get-record-id";
import type { CourseSortOrder } from "@/types";
import { ConfirmDialog } from "../confirm-dialog";
import { DataTable } from "../data-table";
import { Modal } from "../modal";
import { PageHeader } from "../page-header";
import { PaginationControls } from "../pagination-controls";
import { SearchInput } from "../search-input";
import { CreateCourseForm } from "./create-course-form";
import { EditCourseForm } from "./edit-course-form";

const LIMIT = 10;

export function CourseManager() {
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

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Record<string, unknown> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Record<string, unknown> | null>(null);
  const { mutate: deleteCourse, isPending: deleting } = useDeleteCourse();

  const handleDelete = () => {
    const id = deleteTarget ? getRecordId(deleteTarget) : null;
    if (!id) return;
    deleteCourse(id, {
      onSuccess: () => {
        toast.success("Course deleted");
        setDeleteTarget(null);
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
        setDeleteTarget(null);
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Courses"
        action={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            New course
          </button>
        }
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
          return (
            <div className="flex justify-end gap-2">
              <button
                type="button"
                disabled={!id}
                onClick={() => setEditTarget(item)}
                className="rounded-md border border-input px-3 py-1 text-xs font-medium hover:bg-muted disabled:opacity-50"
              >
                Edit
              </button>
              <button
                type="button"
                disabled={!id}
                onClick={() => setDeleteTarget(item)}
                className="rounded-md border border-input px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          );
        }}
      />

      <PaginationControls
        page={page}
        limit={LIMIT}
        itemCount={items.length}
        onPageChange={(next) => setParams({ page: next })}
      />

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New course">
        <CreateCourseForm onSuccess={() => setCreateOpen(false)} />
      </Modal>

      {editTarget && (
        <Modal open onClose={() => setEditTarget(null)} title="Edit course">
          <EditCourseForm
            key={getRecordId(editTarget) ?? "unknown"}
            id={getRecordId(editTarget) ?? ""}
            initialName={typeof editTarget.name === "string" ? editTarget.name : ""}
            initialCredits={typeof editTarget.credits === "number" ? editTarget.credits : 1}
            onSuccess={() => setEditTarget(null)}
          />
        </Modal>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete course"
        description={
          <>
            Delete{" "}
            <strong>
              {(deleteTarget && typeof deleteTarget.name === "string"
                ? deleteTarget.name
                : "this course")}
            </strong>
            ? This cannot be undone. The backend will reject this if
            dependent sections or prerequisites still exist.
          </>
        }
        confirmLabel="Delete"
        destructive
        isPending={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
