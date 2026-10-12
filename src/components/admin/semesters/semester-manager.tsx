"use client";

import { useState } from "react";
import { useSemesters } from "@/hooks";
import { useQueryParams } from "@/hooks/use-query-params";
import { getRecordId } from "@/lib/get-record-id";
import type { SemesterStatus } from "@/types";
import { DataTable } from "../data-table";
import { Modal } from "../modal";
import { PageHeader } from "../page-header";
import { PaginationControls } from "../pagination-controls";
import { CreateSemesterForm } from "./create-semester-form";
import { EditSemesterForm } from "./edit-semester-form";

const LIMIT = 10;

export function SemesterManager() {
  const { searchParams, setParams } = useQueryParams();
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const status = searchParams.get("status") ?? "";

  const { data, isPending, isError, error, refetch } = useSemesters({
    page,
    limit: LIMIT,
    status: status || undefined,
  });
  const items = data?.data ?? [];

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Record<string, unknown> | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Semesters"
        description="No delete endpoint is available for semesters — none is offered here."
        action={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            New semester
          </button>
        }
      />

      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        Filter by status
        <select
          value={status}
          onChange={(e) => setParams({ status: e.target.value, page: 1 })}
          className="h-9 rounded-md border border-input bg-transparent px-2 text-sm"
        >
          <option value="">All</option>
          <option value="UPCOMING">Upcoming</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </label>

      <DataTable
        items={items}
        isLoading={isPending}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        emptyMessage="No semesters found."
        renderRowActions={(item) => {
          const id = getRecordId(item);
          return (
            <button
              type="button"
              disabled={!id}
              onClick={() => setEditTarget(item)}
              className="rounded-md border border-input px-3 py-1 text-xs font-medium hover:bg-muted disabled:opacity-50"
            >
              Edit
            </button>
          );
        }}
      />

      <PaginationControls
        page={page}
        limit={LIMIT}
        itemCount={items.length}
        onPageChange={(next) => setParams({ page: next })}
      />

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New semester">
        <CreateSemesterForm onSuccess={() => setCreateOpen(false)} />
      </Modal>

      {editTarget && (
        <Modal open onClose={() => setEditTarget(null)} title="Edit semester">
          <EditSemesterForm
            key={getRecordId(editTarget) ?? "unknown"}
            id={getRecordId(editTarget) ?? ""}
            initialName={typeof editTarget.name === "string" ? editTarget.name : ""}
            initialStatus={
              (["UPCOMING", "ACTIVE", "COMPLETED"] as const).includes(
                editTarget.status as SemesterStatus,
              )
                ? (editTarget.status as SemesterStatus)
                : "UPCOMING"
            }
            onSuccess={() => setEditTarget(null)}
          />
        </Modal>
      )}
    </div>
  );
}
