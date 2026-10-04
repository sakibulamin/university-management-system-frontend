import {
  formatCellValue,
  SENSITIVE_KEY_PATTERN,
} from "@/components/admin/data-table";
import { formatFieldLabel } from "@/lib/format-field-label";

interface RecordFieldsProps {
  record: Record<string, unknown>;
}

/**
 * Renders whatever fields a single-record response actually contains —
 * same non-inventive approach as the admin DataTable, just laid out as a
 * description list instead of a table row. Reuses DataTable's cell
 * formatting rather than duplicating it.
 */
export function RecordFields({ record }: RecordFieldsProps) {
  const entries = Object.entries(record).filter(
    ([key]) => !SENSITIVE_KEY_PATTERN.test(key),
  );

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No fields were returned by the backend.
      </p>
    );
  }

  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {entries.map(([key, value]) => (
        <div key={key}>
          <dt className="text-sm text-muted-foreground">{formatFieldLabel(key)}</dt>
          <dd className="mt-1 text-sm font-medium">{formatCellValue(value)}</dd>
        </div>
      ))}
    </dl>
  );
}
