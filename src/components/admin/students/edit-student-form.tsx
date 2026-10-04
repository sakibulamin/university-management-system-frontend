"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useAdminUpdateStudent } from "@/hooks";
import { getErrorMessage } from "@/lib/get-error-message";
import { adminUpdateStudentSchema } from "@/validation";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { ProgramSelect } from "../program-select";

interface EditStudentFormProps {
  id: string;
  initialProgramId: string;
  onSuccess: () => void;
}

export function EditStudentForm({ id, initialProgramId, onSuccess }: EditStudentFormProps) {
  const { mutate: adminUpdateStudent, isPending } = useAdminUpdateStudent();

  const form = useForm({
    defaultValues: { programId: initialProgramId },
    validators: { onSubmit: adminUpdateStudentSchema },
    onSubmit: ({ value }) => {
      adminUpdateStudent(
        { id, payload: value },
        {
          onSuccess: () => {
            toast.success("Student updated");
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
        <form.Field name="programId">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Program</FieldLabel>
                <ProgramSelect
                  id={field.name}
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
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
