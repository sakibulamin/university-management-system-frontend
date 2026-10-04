import { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login | University Management System",
  description: "Log in to your University Management System account.",
};

export default function LoginPage() {
  // LoginForm reads useSearchParams (callbackUrl) — must be wrapped in
  // Suspense or `next build` fails.
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
