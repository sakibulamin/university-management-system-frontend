"use client";

import { useAdminUsers } from "@/hooks";
import { getRecordId } from "@/lib/get-record-id";

interface InstructorUserSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  "aria-invalid"?: boolean;
}

/**
 * Confirmed: creating an instructor profile requires an existing user's
 * id (instructorId is auto-generated). This does not invent a way to
 * pick "users without an instructor profile yet" — that distinction
 * isn't available from any confirmed endpoint — it simply lists users
 * with role=INSTRUCTOR and lets the admin pick. If the chosen user
 * already has a profile, the backend's own error will surface.
 */
export function InstructorUserSelect({
  id,
  value,
  onChange,
  onBlur,
  ...rest
}: InstructorUserSelectProps) {
  const { data, isPending } = useAdminUsers({ role: "INSTRUCTOR", limit: 100 });
  const users = data?.data ?? [];

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
        {isPending ? "Loading users…" : "Select a user with role INSTRUCTOR"}
      </option>
      {users.map((user) => {
        const userId = getRecordId(user);
        if (!userId) return null;
        const label =
          (typeof user.name === "string" && user.name) ||
          (typeof user.email === "string" && user.email) ||
          userId;
        return (
          <option key={userId} value={userId}>
            {label}
          </option>
        );
      })}
    </select>
  );
}
