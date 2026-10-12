
"use client";

import { AlertTriangle, CreditCard, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const paymentID = searchParams.get("paymentID");
  const reason = searchParams.get("reason");

  return (
    <main className="flex min-h-[70vh] items-center justify-center p-4">
      <section className="w-full max-w-lg space-y-6 rounded-xl border p-8 text-center shadow-sm">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-100 text-red-700">
          <AlertTriangle className="size-9" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Payment Failed</h1>
          <p className="text-muted-foreground">
            We could not confirm your payment. Please check the payment status
            before trying again.
          </p>
        </div>

        {paymentID && (
          <div className="rounded-lg bg-muted p-4 text-left">
            <p className="text-sm text-muted-foreground">Payment ID</p>
            <p className="break-all font-medium">{paymentID}</p>
          </div>
        )}

        {reason && (
          <p className="break-words text-sm text-muted-foreground">
            Reason: {reason}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/student/payments"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <RefreshCw className="size-4" />
            Try Again
          </Link>

          <Link
            href="/student/dashboard"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-muted"
          >
            <CreditCard className="size-4" />
            Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
