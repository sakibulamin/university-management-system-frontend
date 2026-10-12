"use client";

interface PaginationControlsProps {
  page: number;
  limit: number;
  itemCount: number;
  onPageChange: (page: number) => void;
}


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
