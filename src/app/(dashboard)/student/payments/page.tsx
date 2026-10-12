import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { PaymentInitiateForm } from "@/components/student/payments/payment-initiate-form";

export const metadata: Metadata = {
  title: "Payments",
};

export default function StudentPaymentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        description="Pay a fee through the university's bKash integration."
      />
      <PaymentInitiateForm />
    </div>
  );
}
