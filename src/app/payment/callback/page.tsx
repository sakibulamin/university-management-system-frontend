import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentCallbackHandler } from "@/components/payment/payment-callback-handler";

export const metadata: Metadata = {
  title: "Payment Status",
};


export default function PaymentCallbackPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        
        <Suspense
          fallback={
            <div className="rounded-lg border p-10 text-center text-sm text-muted-foreground">
              Loading…
            </div>
          }
        >
          <PaymentCallbackHandler />
        </Suspense>
      </div>
    </div>
  );
}
