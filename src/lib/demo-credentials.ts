/**
 * CONFIGURATION LOCATION for demo login credentials.
 *
 * TODO(contract): "admin@university.com" / "Admin@123" is the ONLY
 * credential that has ever appeared anywhere in this project's audit —
 * it is the example body on the Postman collection's Login request. It
 * has NOT been tested against the live backend by this assistant; treat
 * it as "documented", not "verified working".
 *
 * No INSTRUCTOR or STUDENT credential has ever been confirmed anywhere
 * (not in the Postman collection, not in any README, not supplied by the
 * project owner). Per instruction, none is invented here. If real demo
 * accounts are created later, add them here — nowhere else.
 */
export const DEMO_CREDENTIALS = {
  ADMIN: {
    email: "admin@university.com",
    password: "Admin@123",
  },
} as const;

export const UNAVAILABLE_DEMO_MESSAGE: Record<"INSTRUCTOR" | "STUDENT", string> = {
  INSTRUCTOR: "Instructor demo credentials are not configured yet.",
  STUDENT: "Student demo credentials are not configured yet.",
};
