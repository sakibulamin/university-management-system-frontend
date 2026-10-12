/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */

"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  useConfirmPaymentCancel,
  useConfirmPaymentFail,
  useConfirmPaymentSuccess,
} from "@/hooks";
import { getErrorMessage } from "@/lib/get-error-message";
import { RecordFields } from "@/components/shared/record-fields";

type CallbackState =
  | { kind: "processing" }
  | { kind: "cancelled"; data?: Record<string, unknown> }
  | { kind: "unknown" }
  | { kind: "error"; message: string };

function CenteredState({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-lg border p-10 text-center"
      role="status"
      aria-live="polite"
    >
      {icon}
      <h1 className="text-lg font-semibold">{title}</h1>

      {description && (
        <p className="max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {children}
    </div>
  );
}

function BackToPaymentsLink() {
  return (
    <Link
      href="/student/payments"
      className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-muted"
    >
      Back to Payments
    </Link>
  );
}

export function PaymentCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, setState] = useState<CallbackState>({
    kind: "processing",
  });

  const hasRunRef = useRef(false);

  const { mutate: confirmSuccess } = useConfirmPaymentSuccess();
  const { mutate: confirmFail } = useConfirmPaymentFail();
  const { mutate: confirmCancel } = useConfirmPaymentCancel();

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const paymentID = searchParams.get("paymentID");
    const status = searchParams.get("status");

    if (!paymentID) {
      setState({ kind: "unknown" });
      return;
    }

    const params = new URLSearchParams();
    params.set("paymentID", paymentID);

    const successUrl = `/student/payments/success?${params.toString()}`;
    const failedUrl = `/student/payments/failed?${params.toString()}`;

    if (status === "cancel" || status === "cancelled") {
      confirmCancel(
        { paymentID },
        {
          onSuccess: (res) => {
            setState({ kind: "cancelled", data: res.data });
          },
          onError: (err) => {
            setState({
              kind: "error",
              message: getErrorMessage(err),
            });
          },
        },
      );
      return;
    }

    if (
      status === "failure" ||
      status === "fail" ||
      status === "failed"
    ) {
      confirmFail(
        { paymentID },
        {
          onSuccess: () => {
            router.replace(failedUrl);
          },
          onError: (err) => {
            setState({
              kind: "error",
              message: getErrorMessage(err),
            });
          },
        },
      );
      return;
    }

    confirmSuccess(
      { paymentID },
      {
        onSuccess: () => {
          router.replace(successUrl);
        },
        onError: (err) => {
          setState({
            kind: "error",
            message: getErrorMessage(err),
          });
        },
      },
    );
  }, [
    searchParams,
    router,
    confirmSuccess,
    confirmFail,
    confirmCancel,
  ]);

  if (state.kind === "processing") {
    return (
      <CenteredState
        icon={
          <Loader2
            className="size-8 animate-spin text-primary"
            aria-hidden="true"
          />
        }
        title="Processing your payment…"
        description="Please wait while we confirm your payment with bKash."
      />
    );
  }

  if (state.kind === "cancelled") {
    return (
      <div className="space-y-4">
        <CenteredState
          icon={
            <AlertTriangle
              className="size-8 text-amber-600"
              aria-hidden="true"
            />
          }
          title="Payment cancelled"
          description="You cancelled the payment process."
        >
          <BackToPaymentsLink />
        </CenteredState>

        {state.data && (
          <div className="rounded-lg border p-6">
            <RecordFields record={state.data} />
          </div>
        )}
      </div>
    );
  }

  if (state.kind === "unknown") {
    return (
      <CenteredState
        icon={
          <AlertTriangle
            className="size-8 text-amber-600"
            aria-hidden="true"
          />
        }
        title="Payment status could not be determined"
        description="No payment reference was found in the URL."
      >
        <BackToPaymentsLink />
      </CenteredState>
    );
  }

  return (
    <CenteredState
      icon={
        <XCircle
          className="size-8 text-destructive"
          aria-hidden="true"
        />
      }
      title="Unable to confirm payment"
      description={state.message}
    >
      <BackToPaymentsLink />
    </CenteredState>
  );
}
