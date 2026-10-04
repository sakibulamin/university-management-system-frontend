"use client";

import { useDepartments } from "@/hooks";
import { getRecordId } from "@/lib/get-record-id";

interface DepartmentSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  "aria-invalid"?: boolean;
}

/**
 * Populates from the real GET /departments endpoint (limit=100 to get a
 * practically-complete list — there is no dedicated "all departments, no
 * pagination" endpoint). Label text defensively falls back through
 * name -> code -> id, since the department record's response shape is
 * unconfirmed.
 */
export function DepartmentSelect({
  id,
  value,
  onChange,
  onBlur,
  ...rest
}: DepartmentSelectProps) {
  const { data, isPending } = useDepartments({ limit: 100 });
  const departments = data?.data ?? [];

  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      disabled={isPending}
      className="border-input bg-transparent flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:opacity-50"
      {...rest}
    >
      <option value="">
        {isPending ? "Loading departments…" : "Select a department"}
      </option>
      {departments.map((dept) => {
        const deptId = getRecordId(dept);
        if (!deptId) return null;
        const label =
          (typeof dept.name === "string" && dept.name) ||
          (typeof dept.code === "string" && dept.code) ||
          deptId;
        return (
          <option key={deptId} value={deptId}>
            {label}
          </option>
        );
      })}
    </select>
  );
}
