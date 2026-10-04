import { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password | University Management System",
  description: "Request a password reset code.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
