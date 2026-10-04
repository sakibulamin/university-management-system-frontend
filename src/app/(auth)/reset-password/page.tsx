import { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password | University Management System",
  description: "Set a new password using your reset code.",
};

export default function ResetPasswordPage() {
  // ResetPasswordForm reads useSearchParams (email) — must be wrapped in
  // Suspense or `next build` fails.
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
