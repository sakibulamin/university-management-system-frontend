"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useUpdateProgram } from "@/hooks";
import { getErrorMessage } from "@/lib/get-error-message";
import { updateProgramSchema } from "@/validation";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

interface EditProgramFormProps {
  id: string;
  initialName: string;
  onSuccess: () => void;
}

export function EditProgramForm({ id, initialName, onSuccess }: EditProgramFormProps) {
  const { mutate: updateProgram, isPending } = useUpdateProgram();

  const form = useForm({
    defaultValues: { name: initialName },
    validators: { onSubmit: updateProgramSchema },
    onSubmit: ({ value }) => {
      updateProgram(
        { id, payload: value },
        {
          onSuccess: () => {
            toast.success("Program updated");
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
