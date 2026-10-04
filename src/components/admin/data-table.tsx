"use client";

import { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { formatFieldLabel } from "@/lib/format-field-label";
import { getErrorMessage } from "@/lib/get-error-message";

// Defensive-only: never render a field whose name looks like it might
// hold a secret, even though nothing in the (unconfirmed) response
// contract suggests one would appear here.
export const SENSITIVE_KEY_PATTERN = /password|token|secret|hash/i;

export function formatCellValue(value: unknown): ReactNode {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string") {
    // Best-effort ISO-date detection for readability only — falls back
    // to the raw string on anything that doesn't parse cleanly.
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
      const parsed = new Date(value);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed.toLocaleDateString();
      }
    }
    return value;
  }
  if (typeof value === "number") return value;
  return JSON.stringify(value);
}

interface DataTableProps {
  items: Record<string, unknown>[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  onRetry?: () => void;
  renderRowActions?: (item: Record<string, unknown>) => ReactNode;
  emptyMessage?: string;
  /** Row identity for React's key prop — falls back to index if absent. */
  getRowKey?: (item: Record<string, unknown>, index: number) => string;
}

export function DataTable({
  items,
  isLoading,
  isError,
  error,
  onRetry,
  renderRowActions,
  emptyMessage = "No data found.",
  getRowKey,
}: DataTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-2" role="status" aria-live="polite">
        <span className="sr-only">Loading…</span>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-full animate-pulse rounded-md bg-muted" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-8 text-center">
        <AlertCircle className="size-6 text-destructive" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          {getErrorMessage(error, "Couldn't load this data.")}
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-muted"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  // Columns are the union of keys across all rows on this page — a row
  // missing an optional field simply shows "—" in that column, rather
  // than the table assuming every row has the same shape.
  const columns = Array.from(
    new Set(items.flatMap((item) => Object.keys(item))),
  ).filter((key) => !SENSITIVE_KEY_PATTERN.test(key));

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground"
              >
                {formatFieldLabel(col)}
              </th>
            ))}
            {renderRowActions && (
              <th scope="col" className="px-4 py-3 text-right font-medium text-muted-foreground">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={getRowKey ? getRowKey(item, index) : index}
              className="border-b last:border-0 hover:bg-muted/30"
            >
              {columns.map((col) => (
                <td key={col} className="whitespace-nowrap px-4 py-3">
                  {formatCellValue(item[col])}
                </td>
              ))}
              {renderRowActions && (
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  {renderRowActions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
