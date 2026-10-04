import { UserRole } from "@/types";

export function getRoleHomePath(role: UserRole): string {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "INSTRUCTOR":
      return "/instructor";
    case "STUDENT":
      return "/student";
    default:
      return "/";
  }
}
