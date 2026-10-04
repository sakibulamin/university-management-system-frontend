import { ButtonLink } from "@/components/layout/button-link";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight">Ready to get started?</h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
        Log in to your existing account or create a new one to get started.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/login" variant="primary">
          Login
        </ButtonLink>
        <ButtonLink href="/register" variant="outline">
          Create Account
        </ButtonLink>
      </div>
    </section>
  );
}
