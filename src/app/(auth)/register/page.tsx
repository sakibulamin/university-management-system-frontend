import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Register | University Management System",
  description: "Create your University Management System account.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
