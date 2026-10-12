"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";
import { useVerifyAccount } from "@/hooks";
import { getErrorMessage } from "@/lib/get-error-message";
import { verifyAccountSchema } from "@/validation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Spinner } from "../ui/spinner";

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const { mutate: verify, isPending } = useVerifyAccount();

  const form = useForm({
    defaultValues: { otp: "" },
    validators: {
      onSubmit: verifyAccountSchema.pick({ otp: true }),
    },
    onSubmit: ({ value }) => {
      verify(
        { email, otp: value.otp },
        {
          onSuccess: () => {
            toast.success("Email verified", {
              description: "You can now log in.",
            });
            router.push("/login");
          },
          onError: (err) => {
            toast.error(getErrorMessage(err));
          },
        },
      );
    },
  });

  if (!email) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Missing email</CardTitle>
          <CardDescription>
            We couldn&apos;t find an email to verify. Please register again.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link
            href="/register"
            className="text-sm font-medium underline underline-offset-4 hover:text-primary"
          >
            Back to register
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          Enter the code we sent to {email}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="otp">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="otp">Verification code</FieldLabel>
                  <InputOTP
                    maxLength={6}
                    onChange={(value) => field.handleChange(value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="one-time-code"
                    name="otp"
                    id="otp"
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button disabled={isPending} type="submit" form="otp-form" className="w-full">
          {isPending ? (
            <>
              <Spinner /> Verifying…
            </>
          ) : (
            "Verify"
          )}
        </Button>
 
        <Link
          href="/register"
          className="text-center text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
        >
          Wrong email? Register again
        </Link>
      </CardFooter>
    </Card>
  );
}
