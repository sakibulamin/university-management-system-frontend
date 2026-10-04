"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useUpdateUserRole } from "@/hooks";
import { getErrorMessage } from "@/lib/get-error-message";
import { UserRole } from "@/types";
import { Modal } from "../modal";

interface RoleChangeDialogProps {
  id: string;
  currentRole: UserRole | null;
  label: string;
  onClose: () => void;
}

export function RoleChangeDialog({ id, currentRole, label, onClose }: RoleChangeDialogProps) {
  const [role, setRole] = useState<UserRole>(currentRole ?? "STUDENT");
  const { mutate: updateUserRole, isPending } = useUpdateUserRole();

  const handleConfirm = () => {
    updateUserRole(
      { id, payload: { role } },
      {
        onSuccess: () => {
          toast.success("Role updated");
          onClose();
        },
        onError: (err) => toast.error(getErrorMessage(err)),
      },
    );
  };

  return (
    <Modal open onClose={onClose} title={`Change role for ${label}`}>
      <div className="space-y-4">
        <label className="flex flex-col gap-2 text-sm">
          New role
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
          >
            <option value="STUDENT">Student</option>
            <option value="INSTRUCTOR">Instructor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>
        <p className="text-xs text-muted-foreground">
          This changes the user&apos;s access across the whole system. Admins
          cannot change their own role — the backend will reject that attempt.
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-muted disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isPending}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isPending ? "Updating…" : "Update role"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
