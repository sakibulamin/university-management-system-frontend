
import {
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

import { ButtonLink } from "@/components/layout/button-link";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/5 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
   
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-80 rounded-full bg-indigo-600/10 blur-[100px]"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold tracking-wide text-blue-300 sm:text-sm">
            <GraduationCap className="size-4" aria-hidden="true" />
            University Management Platform
          </div>


          <h1 className="mt-8 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Manage Your University{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Smarter & Better
            </span>
          </h1>

  
          <p className="mt-6 max-w-2xl text-balance text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            A single platform for managing students, instructors,
            courses, programs, and academic administration with
            a simpler and more organized workflow.
          </p>


          <div className="mt-9 flex w-full flex-wrap items-center justify-center gap-4">
            <ButtonLink
              href="/register"
              variant="primary"
              className="h-12 gap-2 rounded-xl px-6 font-semibold shadow-lg shadow-blue-950/30 transition-transform hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>

            <ButtonLink
              href="/login"
              variant="outline"
              className="h-12 rounded-xl border-white/20 bg-white/5 px-6 font-semibold text-white transition-colors hover:bg-white/10 hover:text-white"
            >
              Sign In
            </ButtonLink>
          </div>

  
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck
                className="size-4 text-cyan-400"
                aria-hidden="true"
              />
              Secure Authentication
            </div>

            <div className="flex items-center gap-2">
              <BookOpen
                className="size-4 text-cyan-400"
                aria-hidden="true"
              />
              Academic Management
            </div>

            <div className="flex items-center gap-2">
              <GraduationCap
                className="size-4 text-cyan-400"
                aria-hidden="true"
              />
              Role-based Access
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
