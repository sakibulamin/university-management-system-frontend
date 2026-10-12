/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */
"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import { useInitiatePayment, usePayment } from "@/hooks";
import { getErrorMessage } from "@/lib/get-error-message";
import { initiatePaymentSchema } from "@/validation";
import type { InitiatePaymentResponseData } from "@/types";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { RecordFields } from "@/components/shared/record-fields";

type FormState = "idle" | "redirecting";

export function PaymentInitiateForm() {
  const { mutate: initiatePayment, isPending } = useInitiatePayment();
  const [formState, setFormState] = useState<FormState>("idle");
  const [result, setResult] = useState<InitiatePaymentResponseData | null>(null);

  const {
    data: paymentStatus,
    isFetching: statusLoading,
    refetch: refetchStatus,
  } = usePayment(result?.paymentId ?? "");

const form = useForm({
  defaultValues: { amount: 0, purpose: "" },
  validators: {
    onSubmit: ({ value }) => {
      const result = initiatePaymentSchema.safeParse(value);

      if (!result.success) {
        return result.error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        }));
      }

      return undefined;
    },
  },
    onSubmit: ({ value }) => {
      initiatePayment(
        { amount: value.amount, purpose: value.purpose || undefined },
        {
          onSuccess: (res) => {
            setResult(res.data);
            if (res.data.bkashURL) {
              setFormState("redirecting");
              toast.success("Payment initiated — redirecting to bKash…");
              window.location.href = res.data.bkashURL;
            } else {
              toast.error(
                "Payment was initiated but no bKash redirect URL was returned.",
              );
            }
          },
          onError: (err) => toast.error(getErrorMessage(err)),
        },
      );
    },
  });

  if (formState === "redirecting") {
    return (
      <div
        className="flex flex-col items-center gap-3 rounded-lg border p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <Spinner />
        <p className="font-medium">Redirecting to bKash…</p>
        <p className="text-sm text-muted-foreground">
          If nothing happens,{" "}
          {result?.bkashURL ? (
            <a href={result.bkashURL} className="underline underline-offset-4">
              click here to continue
            </a>
          ) : (
            "please try again"
          )}
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="amount">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Amount (BDT)</FieldLabel>
                    <Input
                      id={field.name}
                      type="number"
                      min={1}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="purpose">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Purpose <span className="text-muted-foreground">(optional)</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      placeholder="e.g. Semester Fee"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <p className="text-xs text-muted-foreground">
              Enter the amount you intend to pay. This system does not
              currently look up a fee schedule automatically.
            </p>

            <Button disabled={isPending} type="submit">
              {isPending ? (
                <>
                  <Spinner /> Initiating…
                </>
              ) : (
                "Pay with bKash"
              )}
            </Button>
          </FieldGroup>
        </form>
      </div>

      {result && formState === "idle" && (
        <div className="space-y-4 rounded-lg border p-6">
          <h2 className="text-sm font-medium text-muted-foreground">
            Last payment attempt
          </h2>
          <RecordFields record={result as unknown as Record<string, unknown>} />

          <div className="flex items-center justify-between border-t pt-4">
            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
            <button
              type="button"
              onClick={() => refetchStatus()}
              disabled={statusLoading}
              className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium hover:bg-muted disabled:opacity-50"
            >
              {statusLoading ? "Checking…" : "Check status"}
            </button>
          </div>
          {paymentStatus?.data && <RecordFields record={paymentStatus.data} />}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Payment history is not available — the backend has no confirmed
        endpoint for listing past payments, only looking up a single
        payment by its id.
      </p>
    </div>
  );
}
