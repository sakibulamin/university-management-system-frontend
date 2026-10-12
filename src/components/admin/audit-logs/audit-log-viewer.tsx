"use client";

import { useAuditLogs } from "@/hooks";
import { useQueryParams } from "@/hooks/use-query-params";
import { DataTable } from "../data-table";
import { PageHeader } from "../page-header";
import { PaginationControls } from "../pagination-controls";

const LIMIT = 10;


export function AuditLogViewer() {
  const { searchParams, setParams } = useQueryParams();
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const entity = searchParams.get("entity") ?? "";
  const action = searchParams.get("action") ?? "";

  const { data, isPending, isError, error, refetch } = useAuditLogs({
    page,
    limit: LIMIT,
    entity: entity || undefined,
    action: action || undefined,
  });
  const items = data?.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="Response shape for this endpoint has never been confirmed — columns shown are whatever the backend actually returns."
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={entity}
          onChange={(e) => setParams({ entity: e.target.value, page: 1 })}
          placeholder="Filter by entity…"
          aria-label="Filter by entity"
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm sm:max-w-xs"
        />
        <input
          value={action}
          onChange={(e) => setParams({ action: e.target.value, page: 1 })}
          placeholder="Filter by action…"
          aria-label="Filter by action"
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm sm:max-w-xs"
        />
      </div>

      <DataTable
        items={items}
        isLoading={isPending}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        emptyMessage="No audit log entries found."
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
