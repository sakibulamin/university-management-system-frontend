
export function getRecordId(record: Record<string, unknown>): string | null {
  const candidate = record.id ?? record._id;
  return typeof candidate === "string" ? candidate : null;
}
