
import {
  Building2,
  GraduationCap,
  BookOpen,
  CalendarRange,
  Users,
  ShieldCheck,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: Building2,
    title: "Department management",
    description:
      "Organize the university into departments and keep their structure up to date.",
    number: "01",
  },
  {
    icon: GraduationCap,
    title: "Program management",
    description:
      "Define academic programs and the departments they belong to.",
    number: "02",
  },
  {
    icon: BookOpen,
    title: "Course management",
    description:
      "Create and manage the courses offered within each program.",
    number: "03",
  },
  {
    icon: CalendarRange,
    title: "Semester management",
    description:
      "Track semesters and their status through the academic year.",
    number: "04",
  },
  {
    icon: Users,
    title: "Student & instructor management",
    description:
      "Manage student and instructor records and academic details.",
    number: "05",
  },
  {
    icon: ShieldCheck,
    title: "Secure authentication",
    description:
      "Role-based accounts for students, instructors and admins, with email verification.",
    number: "06",
  },
  {
    icon: CreditCard,
    title: "Online payment",
    description:
      "Students can pay fees securely through the bKash integration.",
    number: "07",
  },
] as const;

export function FeatureSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-y border-white/5 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 size-80 rounded-full bg-blue-600/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 size-80 rounded-full bg-indigo-600/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
            <span className="size-1.5 rounded-full bg-blue-400" />
            Powerful features
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything you need,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              all in one place.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Simplify academic administration with tools designed to
            connect students, instructors, and university administrators.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, number }) => (
            <li key={title} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-blue-950/30 sm:p-7">
                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-blue-500/0 blur-3xl transition-colors duration-300 group-hover:bg-blue-500/15"
                />

                <div className="relative flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-cyan-400/5 text-blue-300 transition-all duration-300 group-hover:border-blue-400/40 group-hover:from-blue-500/30 group-hover:text-cyan-200">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>

                  <span className="text-xs font-medium tracking-widest text-slate-600 transition-colors group-hover:text-blue-300/70">
                    {number}
                  </span>
                </div>

                <h3 className="relative mt-6 text-lg font-semibold tracking-tight text-slate-100 transition-colors group-hover:text-white">
                  {title}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-slate-400">
                  {description}
                </p>

                <div className="relative mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
                  <span className="text-xs font-medium text-slate-500 transition-colors group-hover:text-blue-300">
                    University platform
                  </span>

                  <ArrowUpRight
                    className="size-4 text-slate-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-300"
                    aria-hidden="true"
                  />
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-xs leading-6 text-slate-500">
          One platform. Three roles. A simpler academic experience.
        </p>
      </div>
    </section>
  );
}
