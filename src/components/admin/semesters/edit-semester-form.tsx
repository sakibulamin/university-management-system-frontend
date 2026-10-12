"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useUpdateSemester } from "@/hooks";
import { getErrorMessage } from "@/lib/get-error-message";
import type { SemesterStatus } from "@/types";
import { updateSemesterSchema } from "@/validation";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

interface EditSemesterFormProps {
  id: string;
  initialName: string;
  initialStatus: SemesterStatus;
  onSuccess: () => void;
}

export function EditSemesterForm({
  id,
  initialName,
  initialStatus,
  onSuccess,
}: EditSemesterFormProps) {
  const { mutate: updateSemester, isPending } = useUpdateSemester();

  const form = useForm({
    defaultValues: { name: initialName, status: initialStatus },
    validators: { onSubmit: updateSemesterSchema },
    onSubmit: ({ value }) => {
      updateSemester(
        { id, payload: value },
        {
          onSuccess: () => {
            toast.success("Semester updated");
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

        <form.Field name="status">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                <select
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(e.target.value as SemesterStatus)
                  }
                  aria-invalid={isInvalid}
                  className="border-input bg-transparent flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <option value="UPCOMING">Upcoming</option>
                  <option value="ACTIVE">Active</option>
                  <option value="COMPLETED">Completed</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  Valid transitions are Upcoming → Active → Completed, and only
                  one semester may be Active at a time. The server enforces
                  this — an invalid change will come back as an error below.
                </p>
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
