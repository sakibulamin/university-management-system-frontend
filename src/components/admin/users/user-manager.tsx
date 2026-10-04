"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  useAdminUsers,
  useBlockUser,
  useDeleteUser,
  useUnblockUser,
} from "@/hooks";
import { useQueryParams } from "@/hooks/use-query-params";
import { getErrorMessage } from "@/lib/get-error-message";
import { getRecordId } from "@/lib/get-record-id";
import { UserRole } from "@/types";
import { ConfirmDialog } from "../confirm-dialog";
import { DataTable } from "../data-table";
import { PageHeader } from "../page-header";
import { PaginationControls } from "../pagination-controls";
import { SearchInput } from "../search-input";
import { RoleChangeDialog } from "./role-change-dialog";

const LIMIT = 10;

type PendingAction = {
  type: "block" | "unblock" | "delete";
  user: Record<string, unknown>;
};

function labelFor(user: Record<string, unknown>): string {
  return (
    (typeof user.name === "string" && user.name) ||
    (typeof user.email === "string" && user.email) ||
    "this user"
  );
}

export function UserManager() {
  const { searchParams, setParams } = useQueryParams();
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const search = searchParams.get("search") ?? "";
  const role = searchParams.get("role") ?? "";

  const { data, isPending, isError, error, refetch } = useAdminUsers({
    page,
    limit: LIMIT,
    search: search || undefined,
    role: role || undefined,
  });
  const items = data?.data ?? [];

  const [roleTarget, setRoleTarget] = useState<Record<string, unknown> | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);

  const { mutate: blockUser, isPending: blocking } = useBlockUser();
  const { mutate: unblockUser, isPending: unblocking } = useUnblockUser();
  const { mutate: deleteUser, isPending: deletingUser } = useDeleteUser();

  const isActionPending = blocking || unblocking || deletingUser;

  const handleConfirmAction = () => {
    if (!pendingAction) return;
    const id = getRecordId(pendingAction.user);
    if (!id) return;

    const onSettled = {
      onSuccess: () => {
        toast.success(
          pendingAction.type === "block"
            ? "User blocked"
            : pendingAction.type === "unblock"
              ? "User unblocked"
              : "User deleted",
        );
        setPendingAction(null);
      },
      onError: (err: unknown) => {
        toast.error(getErrorMessage(err));
        setPendingAction(null);
      },
    };

    if (pendingAction.type === "block") blockUser(id, onSettled);
    else if (pendingAction.type === "unblock") unblockUser(id, onSettled);
    else deleteUser(id, onSettled);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Users" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          defaultValue={search}
          onSearch={(value) => setParams({ search: value, page: 1 })}
          placeholder="Search users…"
        />
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Role
          <select
            value={role}
            onChange={(e) => setParams({ role: e.target.value, page: 1 })}
            className="h-9 rounded-md border border-input bg-transparent px-2 text-sm"
          >
            <option value="">All</option>
            <option value="STUDENT">Student</option>
            <option value="INSTRUCTOR">Instructor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>
      </div>

      <DataTable
        items={items}
        isLoading={isPending}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        emptyMessage="No users found."
        renderRowActions={(item) => {
          const id = getRecordId(item);
          // "status" is unconfirmed, but if the backend happens to
          // return one, use it to pick which of block/unblock to offer;
          // otherwise fall back to offering block (the common case).
          const status = typeof item.status === "string" ? item.status : null;
          const isBlocked = status?.toUpperCase() === "BLOCKED";

          return (
            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                disabled={!id}
                onClick={() => setRoleTarget(item)}
                className="rounded-md border border-input px-3 py-1 text-xs font-medium hover:bg-muted disabled:opacity-50"
              >
                Change role
              </button>
              <button
                type="button"
                disabled={!id}
                onClick={() =>
                  setPendingAction({ type: isBlocked ? "unblock" : "block", user: item })
                }
                className="rounded-md border border-input px-3 py-1 text-xs font-medium hover:bg-muted disabled:opacity-50"
              >
                {isBlocked ? "Unblock" : "Block"}
              </button>
              <button
                type="button"
                disabled={!id}
                onClick={() => setPendingAction({ type: "delete", user: item })}
                className="rounded-md border border-input px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          );
        }}
      />

      <PaginationControls
        page={page}
        limit={LIMIT}
        itemCount={items.length}
        onPageChange={(next) => setParams({ page: next })}
      />

      {roleTarget && (
        <RoleChangeDialog
          key={getRecordId(roleTarget) ?? "unknown"}
          id={getRecordId(roleTarget) ?? ""}
          currentRole={
            (["STUDENT", "INSTRUCTOR", "ADMIN"] as const).includes(
              roleTarget.role as UserRole,
            )
              ? (roleTarget.role as UserRole)
              : null
          }
          label={labelFor(roleTarget)}
          onClose={() => setRoleTarget(null)}
        />
      )}

      <ConfirmDialog
        open={!!pendingAction}
        title={
          pendingAction?.type === "delete"
            ? "Delete user"
            : pendingAction?.type === "block"
              ? "Block user"
              : "Unblock user"
        }
        description={
          pendingAction
            ? `${
                pendingAction.type === "delete"
                  ? "Delete"
                  : pendingAction.type === "block"
                    ? "Block"
                    : "Unblock"
              } ${labelFor(pendingAction.user)}? ${
                pendingAction.type === "delete"
                  ? "This cannot be undone."
                  : pendingAction.type === "block"
                    ? "They will be signed out and unable to log in until unblocked."
                    : "They will be able to log in again."
              }`
            : ""
        }
        confirmLabel={
          pendingAction?.type === "delete"
            ? "Delete"
            : pendingAction?.type === "block"
              ? "Block"
              : "Unblock"
        }
        destructive={pendingAction?.type !== "unblock"}
        isPending={isActionPending}
        onConfirm={handleConfirmAction}
        onCancel={() => setPendingAction(null)}
      />
    </div>
  );
}
