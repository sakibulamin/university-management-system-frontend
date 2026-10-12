/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */
export default function Loading() {
  return (
    <div
      className="flex min-h-svh w-full items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading…</span>
      <div
        className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary"
        aria-hidden="true"
      />
    </div>
  );
}
