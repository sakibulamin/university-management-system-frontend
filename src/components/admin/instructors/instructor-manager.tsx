"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDeleteInstructor, useInstructors } from "@/hooks";
import { useQueryParams } from "@/hooks/use-query-params";
import { getErrorMessage } from "@/lib/get-error-message";
import { getRecordId } from "@/lib/get-record-id";
import { ConfirmDialog } from "../confirm-dialog";
import { DataTable } from "../data-table";
import { Modal } from "../modal";
import { PageHeader } from "../page-header";
import { PaginationControls } from "../pagination-controls";
import { SearchInput } from "../search-input";
import { CreateInstructorForm } from "./create-instructor-form";
import { EditInstructorForm } from "./edit-instructor-form";

const LIMIT = 10;

export function InstructorManager() {
  const { searchParams, setParams } = useQueryParams();
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const search = searchParams.get("search") ?? "";

  const { data, isPending, isError, error, refetch } = useInstructors({
    page,
    limit: LIMIT,
    search: search || undefined,
  });
  const items = data?.data ?? [];

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Record<string, unknown> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Record<string, unknown> | null>(null);
  const { mutate: deleteInstructor, isPending: deleting } = useDeleteInstructor();

  const handleDelete = () => {
    const id = deleteTarget ? getRecordId(deleteTarget) : null;
    if (!id) return;
    deleteInstructor(id, {
      onSuccess: () => {
        toast.success("Instructor deleted");
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
        title="Instructors"
        action={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            New instructor
          </button>
        }
      />

      <SearchInput
        defaultValue={search}
        onSearch={(value) => setParams({ search: value, page: 1 })}
        placeholder="Search instructors…"
      />

      <DataTable
        items={items}
        isLoading={isPending}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        emptyMessage="No instructors found."
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

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New instructor">
        <CreateInstructorForm onSuccess={() => setCreateOpen(false)} />
      </Modal>

      {editTarget && (
        <Modal open onClose={() => setEditTarget(null)} title="Edit instructor">
          <EditInstructorForm
            key={getRecordId(editTarget) ?? "unknown"}
            id={getRecordId(editTarget) ?? ""}
            initialDepartmentId={
              typeof editTarget.departmentId === "string" ? editTarget.departmentId : ""
            }
            initialDesignation={
              typeof editTarget.designation === "string" ? editTarget.designation : ""
            }
            initialPhone={typeof editTarget.phone === "string" ? editTarget.phone : ""}
            onSuccess={() => setEditTarget(null)}
          />
        </Modal>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete instructor"
        description="Delete this instructor profile? This cannot be undone. The backend will reject this if active section assignments still exist."
        confirmLabel="Delete"
        destructive
        isPending={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
