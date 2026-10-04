"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDeleteDepartment, useDepartments } from "@/hooks";
import { useQueryParams } from "@/hooks/use-query-params";
import { getErrorMessage } from "@/lib/get-error-message";
import { getRecordId } from "@/lib/get-record-id";
import { ConfirmDialog } from "../confirm-dialog";
import { DataTable } from "../data-table";
import { Modal } from "../modal";
import { PageHeader } from "../page-header";
import { PaginationControls } from "../pagination-controls";
import { SearchInput } from "../search-input";
import { CreateDepartmentForm } from "./create-department-form";
import { EditDepartmentForm } from "./edit-department-form";

const LIMIT = 10;

export function DepartmentManager() {
  const { searchParams, setParams } = useQueryParams();
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const search = searchParams.get("search") ?? "";

  const { data, isPending, isError, error, refetch } = useDepartments({
    page,
    limit: LIMIT,
    search: search || undefined,
  });
  const items = data?.data ?? [];

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Record<string, unknown> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Record<string, unknown> | null>(null);
  const { mutate: deleteDepartment, isPending: deleting } = useDeleteDepartment();

  const handleDelete = () => {
    const id = deleteTarget ? getRecordId(deleteTarget) : null;
    if (!id) return;
    deleteDepartment(id, {
      onSuccess: () => {
        toast.success("Department deleted");
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
        title="Departments"
        action={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            New department
          </button>
        }
      />

      <SearchInput
        defaultValue={search}
        onSearch={(value) => setParams({ search: value, page: 1 })}
        placeholder="Search departments…"
      />

      <DataTable
        items={items}
        isLoading={isPending}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        emptyMessage="No departments found."
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

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New department">
        <CreateDepartmentForm onSuccess={() => setCreateOpen(false)} />
      </Modal>

      {editTarget && (
        <Modal open onClose={() => setEditTarget(null)} title="Edit department">
          <EditDepartmentForm
            key={getRecordId(editTarget) ?? "unknown"}
            id={getRecordId(editTarget) ?? ""}
            initialName={typeof editTarget.name === "string" ? editTarget.name : ""}
            onSuccess={() => setEditTarget(null)}
          />
        </Modal>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete department"
        description={
          <>
            Delete{" "}
            <strong>
              {(deleteTarget && typeof deleteTarget.name === "string"
                ? deleteTarget.name
                : "this department")}
            </strong>
            ? This cannot be undone. The backend will reject this if programs,
            courses or instructors still depend on it.
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
