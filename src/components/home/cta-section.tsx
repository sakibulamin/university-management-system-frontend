
import { ArrowRight, GraduationCap } from "lucide-react";
import { ButtonLink } from "@/components/layout/button-link";

export function CtaSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 px-6 py-14 text-center shadow-2xl shadow-blue-950/20 sm:px-12 sm:py-20">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-blue-500/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full bg-indigo-500/20 blur-3xl"
        />


        <div className="relative mx-auto max-w-2xl">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-blue-200 shadow-lg shadow-blue-950/20">
            <GraduationCap className="size-7" aria-hidden="true" />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Your future starts here
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Join our academic community and manage your university
            journey through one convenient platform.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink
              href="/register"
              variant="primary"
              className="h-11 gap-2 rounded-xl px-6 font-semibold shadow-lg shadow-blue-950/20 transition-transform hover:-translate-y-0.5"
            >
              Create Account
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>

            <ButtonLink
              href="/login"
              variant="outline"
              className="h-11 rounded-xl border-white/25 bg-white/5 px-6 font-semibold text-white transition-colors hover:bg-white/10 hover:text-white"
            >
              Login
            </ButtonLink>
          </div>

          <p className="mt-6 text-xs text-slate-400">
            A smarter way to manage academic life.
          </p>
        </div>
      </div>
    </section>
  );
}
