"use client";

import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";
import { getErrorMessage } from "@/lib/get-error-message";

interface RecordStateProps {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  onRetry?: () => void;
  isEmpty: boolean;
  emptyMessage?: string;
  children: ReactNode;
}

export function RecordState({
  isLoading,
  isError,
  error,
  onRetry,
  isEmpty,
  emptyMessage = "No data found.",
  children,
}: RecordStateProps) {
  if (isLoading) {
    return (
      <div className="space-y-3" role="status" aria-live="polite">
        <span className="sr-only">Loading…</span>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-6 w-full animate-pulse rounded-md bg-muted" />
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

  if (isEmpty) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return <>{children}</>;
}
