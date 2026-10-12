"use client";

import { AlertCircle } from "lucide-react";
import { useDashboardStats } from "@/hooks";
import { formatFieldLabel } from "@/lib/format-field-label";
import { getErrorMessage } from "@/lib/get-error-message";

function StatValue({ value }: { value: unknown }) {
  if (value === null || value === undefined) return <>—</>;
  if (typeof value === "number" || typeof value === "string") return <>{value}</>;
  if (typeof value === "boolean") return <>{value ? "Yes" : "No"}</>;
  return <code className="text-xs">{JSON.stringify(value)}</code>;
}

export function DashboardStats() {
  const { data, isPending, isError, error, refetch } = useDashboardStats();
  const stats = data?.data ?? {};
  const entries = Object.entries(stats);

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" role="status" aria-live="polite">
        <span className="sr-only">Loading dashboard statistics…</span>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg border bg-muted" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-8 text-center">
        <AlertCircle className="size-6 text-destructive" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          {getErrorMessage(error, "Couldn't load dashboard statistics.")}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-muted"
        >
          Retry
        </button>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        No statistics were returned by the backend.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {entries.map(([key, value]) => (
        <div key={key} className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">{formatFieldLabel(key)}</p>
          <p className="mt-2 text-2xl font-semibold">
            <StatValue value={value} />
          </p>
        </div>
      ))}
    </div>
  );
}
