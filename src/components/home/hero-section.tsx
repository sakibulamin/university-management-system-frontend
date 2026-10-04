import { ButtonLink } from "@/components/layout/button-link";

export function HeroSection() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
      <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        University Management System
      </h1>
      <p className="max-w-2xl text-balance text-lg text-muted-foreground">
        A single platform for managing students, instructors, courses,
        programs and academic administration.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
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
