import type { Metadata } from "next";
import { Suspense } from "react";
import VerifyEmailForm from "@/components/auth/verify-email-form";

export const metadata: Metadata = {
  title: "Verify Email | University Management System",
  description: "Verify your email address to activate your account.",
};

export default function VerifyEmailPage() {

  return (
    <Suspense fallback={null}>
      <VerifyEmailForm />
    </Suspense>
  );
}
