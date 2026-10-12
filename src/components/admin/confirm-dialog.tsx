"use client";

import type { ReactNode } from "react";
import { Modal } from "./modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  destructive?: boolean;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  destructive,
  isPending,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <div className="text-sm text-muted-foreground">{description}</div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-muted disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isPending}
          className={`inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-white disabled:opacity-50 ${
            destructive
              ? "bg-red-600 hover:bg-red-700"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isPending ? "Please wait…" : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
