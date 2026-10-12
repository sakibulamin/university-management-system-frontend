"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDeleteStudent, useStudents } from "@/hooks";
import { useQueryParams } from "@/hooks/use-query-params";
import { getErrorMessage } from "@/lib/get-error-message";
import { getRecordId } from "@/lib/get-record-id";
import { ConfirmDialog } from "../confirm-dialog";
import { DataTable } from "../data-table";
import { Modal } from "../modal";
import { PageHeader } from "../page-header";
import { PaginationControls } from "../pagination-controls";
import { SearchInput } from "../search-input";
import { EditStudentForm } from "./edit-student-form";

const LIMIT = 10;


export function StudentManager() {
  const { searchParams, setParams } = useQueryParams();
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const search = searchParams.get("search") ?? "";

  const { data, isPending, isError, error, refetch } = useStudents({
    page,
    limit: LIMIT,
    search: search || undefined,
  });
  const items = data?.data ?? [];

  const [editTarget, setEditTarget] = useState<Record<string, unknown> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Record<string, unknown> | null>(null);
  const { mutate: deleteStudent, isPending: deleting } = useDeleteStudent();

  const handleDelete = () => {
    const id = deleteTarget ? getRecordId(deleteTarget) : null;
    if (!id) return;
    deleteStudent(id, {
      onSuccess: () => {
        toast.success("Student deleted");
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
        title="Students"
        description="Students are created by self-registration, not by admins — the only editable field here is their program."
      />

      <SearchInput
        defaultValue={search}
        onSearch={(value) => setParams({ search: value, page: 1 })}
        placeholder="Search students…"
      />

      <DataTable
        items={items}
        isLoading={isPending}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        emptyMessage="No students found."
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
                Edit program
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

      {editTarget && (
        <Modal open onClose={() => setEditTarget(null)} title="Edit student's program">
          <EditStudentForm
            key={getRecordId(editTarget) ?? "unknown"}
            id={getRecordId(editTarget) ?? ""}
            initialProgramId={
              typeof editTarget.programId === "string" ? editTarget.programId : ""
            }
            onSuccess={() => setEditTarget(null)}
          />
        </Modal>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete student"
        description="Delete this student? This cannot be undone. The backend will reject this if active enrollments still exist."
        confirmLabel="Delete"
        destructive
        isPending={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
