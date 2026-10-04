import { GraduationCap, ShieldCheck, UserRound } from "lucide-react";

const ROLES = [
  {
    icon: UserRound,
    title: "Student",
    description:
      "View your profile and academic information, and pay fees online.",
  },
  {
    icon: GraduationCap,
    title: "Instructor",
    description:
      "View your profile and the department, program and course information relevant to you.",
  },
  {
    icon: ShieldCheck,
    title: "Admin",
    description:
      "Manage departments, programs, courses, semesters, instructors, students and user accounts.",
  },
] as const;

export function RoleSection() {
  return (
    <section id="roles" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Built around three roles
        </h2>
        <p className="mt-3 text-muted-foreground">
          Every account has one of three roles, each with its own access.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {ROLES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-lg border p-6 text-center">
            <Icon className="mx-auto size-8 text-primary" aria-hidden="true" />
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
