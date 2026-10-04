/**
 * TODO(contract): no GET response shape in this project has ever been
 * confirmed (no saved example response exists anywhere in the Postman
 * collection). Every PATCH/DELETE endpoint needs an :id from a list
 * response, so this probes the two overwhelmingly standard REST/Mongo
 * conventions rather than assuming either one. If neither is present,
 * callers must treat the record as having no usable id and disable
 * row actions for it — never guess or fabricate one.
 */
export function getRecordId(record: Record<string, unknown>): string | null {
  const candidate = record.id ?? record._id;
  return typeof candidate === "string" ? candidate : null;
}
