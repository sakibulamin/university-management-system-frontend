"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDeleteProgram, usePrograms } from "@/hooks";
import { useQueryParams } from "@/hooks/use-query-params";
import { getErrorMessage } from "@/lib/get-error-message";
import { getRecordId } from "@/lib/get-record-id";
import { ConfirmDialog } from "../confirm-dialog";
import { DataTable } from "../data-table";
import { Modal } from "../modal";
import { PageHeader } from "../page-header";
import { PaginationControls } from "../pagination-controls";
import { SearchInput } from "../search-input";
import { CreateProgramForm } from "./create-program-form";
import { EditProgramForm } from "./edit-program-form";

const LIMIT = 10;

export function ProgramManager() {
  const { searchParams, setParams } = useQueryParams();
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const search = searchParams.get("search") ?? "";

  const { data, isPending, isError, error, refetch } = usePrograms({
    page,
    limit: LIMIT,
    search: search || undefined,
  });
  const items = data?.data ?? [];

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Record<string, unknown> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Record<string, unknown> | null>(null);
  const { mutate: deleteProgram, isPending: deleting } = useDeleteProgram();

  const handleDelete = () => {
    const id = deleteTarget ? getRecordId(deleteTarget) : null;
    if (!id) return;
    deleteProgram(id, {
      onSuccess: () => {
        toast.success("Program deleted");
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
        title="Programs"
        action={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            New program
          </button>
        }
      />

      <SearchInput
        defaultValue={search}
        onSearch={(value) => setParams({ search: value, page: 1 })}
        placeholder="Search programs…"
      />

      <DataTable
        items={items}
        isLoading={isPending}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        emptyMessage="No programs found."
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

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New program">
        <CreateProgramForm onSuccess={() => setCreateOpen(false)} />
      </Modal>

      {editTarget && (
        <Modal open onClose={() => setEditTarget(null)} title="Edit program">
          <EditProgramForm
            key={getRecordId(editTarget) ?? "unknown"}
            id={getRecordId(editTarget) ?? ""}
            initialName={typeof editTarget.name === "string" ? editTarget.name : ""}
            onSuccess={() => setEditTarget(null)}
          />
        </Modal>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete program"
        description={
          <>
            Delete{" "}
            <strong>
              {(deleteTarget && typeof deleteTarget.name === "string"
                ? deleteTarget.name
                : "this program")}
            </strong>
            ? This cannot be undone. The backend will reject this if active
            students still reference it.
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
