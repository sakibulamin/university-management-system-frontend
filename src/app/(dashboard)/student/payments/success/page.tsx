
"use client";

import { CheckCircle2, CreditCard } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const paymentID = searchParams.get("paymentID");

  return (
    <main className="flex min-h-[70vh] items-center justify-center p-4">
      <section className="w-full max-w-lg space-y-6 rounded-xl border p-8 text-center shadow-sm">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 className="size-9" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Your payment confirmation has been received.
          </p>
        </div>

        {paymentID && (
          <div className="rounded-lg bg-muted p-4 text-left">
            <p className="text-sm text-muted-foreground">Payment ID</p>
            <p className="break-all font-medium">{paymentID}</p>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/student/payments"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <CreditCard className="size-4" />
            Back to Payments
          </Link>

          <Link
            href="/student/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-muted"
          >
            Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
