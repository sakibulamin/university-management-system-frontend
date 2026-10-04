"use client";

interface PaginationControlsProps {
  page: number;
  limit: number;
  itemCount: number;
  onPageChange: (page: number) => void;
}

/**
 * TODO(contract): no paginated response's metadata shape has ever been
 * confirmed (see types/common.type.ts ApiPaginationMeta). Rather than
 * assume a `total`/`totalPages` field exists, "next" is enabled based on
 * how many items actually came back: a full page (itemCount === limit)
 * might mean there's more; a short page means we've reached the end.
 * This can be replaced with real total-based pagination once a real
 * response is seen.
 */
export function PaginationControls({
  page,
  limit,
  itemCount,
  onPageChange,
}: PaginationControlsProps) {
  const hasNextPage = itemCount === limit;

  return (
    <div className="flex items-center justify-between gap-4 pt-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-muted disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-sm text-muted-foreground">Page {page}</span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-muted disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
