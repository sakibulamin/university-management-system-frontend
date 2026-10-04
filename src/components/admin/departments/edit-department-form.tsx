"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useUpdateDepartment } from "@/hooks";
import { getErrorMessage } from "@/lib/get-error-message";
import { updateDepartmentSchema } from "@/validation";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

interface EditDepartmentFormProps {
  id: string;
  initialName: string;
  onSuccess: () => void;
}

export function EditDepartmentForm({
  id,
  initialName,
  onSuccess,
}: EditDepartmentFormProps) {
  const { mutate: updateDepartment, isPending } = useUpdateDepartment();

  const form = useForm({
    defaultValues: { name: initialName },
    validators: { onSubmit: updateDepartmentSchema },
    onSubmit: ({ value }) => {
      updateDepartment(
        { id, payload: value },
        {
          onSuccess: () => {
            toast.success("Department updated");
            onSuccess();
          },
          onError: (err) => toast.error(getErrorMessage(err)),
        },
      );
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
        <form.Field name="name">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
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
