"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useUpdateMyStudent } from "@/hooks";
import { getErrorMessage } from "@/lib/get-error-message";
import { updateMyStudentSchema } from "@/validation";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

interface EditStudentProfileFormProps {
  initialPhone: string;
  initialAddress: string;
}

export function EditStudentProfileForm({
  initialPhone,
  initialAddress,
}: EditStudentProfileFormProps) {
  const { mutate: updateMyStudent, isPending } = useUpdateMyStudent();

  const form = useForm({
    defaultValues: { phone: initialPhone, address: initialAddress },
    validators: { onSubmit: updateMyStudentSchema },
    onSubmit: ({ value }) => {
      updateMyStudent(value, {
        onSuccess: () => toast.success("Profile updated"),
        onError: (err) => toast.error(getErrorMessage(err)),
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="phone">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                <Input
                  id={field.name}
                  type="tel"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="tel"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="address">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="street-address"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Button disabled={isPending} type="submit">
          {isPending ? (
            <>
              <Spinner /> Saving…
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
