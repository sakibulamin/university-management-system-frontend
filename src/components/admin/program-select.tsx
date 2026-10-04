"use client";

import { usePrograms } from "@/hooks";
import { getRecordId } from "@/lib/get-record-id";

interface ProgramSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  "aria-invalid"?: boolean;
}

export function ProgramSelect({ id, value, onChange, onBlur, ...rest }: ProgramSelectProps) {
  const { data, isPending } = usePrograms({ limit: 100 });
  const programs = data?.data ?? [];

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
      <option value="">{isPending ? "Loading programs…" : "Select a program"}</option>
      {programs.map((program) => {
        const programId = getRecordId(program);
        if (!programId) return null;
        const label =
          (typeof program.name === "string" && program.name) ||
          (typeof program.code === "string" && program.code) ||
          programId;
        return (
          <option key={programId} value={programId}>
            {label}
          </option>
        );
      })}
    </select>
  );
}
