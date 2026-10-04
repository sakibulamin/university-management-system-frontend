import { UserRole } from "./auth.type";

export interface UpdateUserRolePayload {
  role: UserRole;
}

// Block/unblock/delete take no request body per the confirmed contract.
