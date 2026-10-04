import {
  Building2,
  GraduationCap,
  BookOpen,
  CalendarRange,
  Users,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

// Every item here maps to a confirmed module in the backend's Postman
// collection (Departments, Programs, Courses, Semesters, Instructors,
// Students, Payments, Auth). No feature is listed that the backend
// doesn't actually expose an endpoint for.
const FEATURES = [
  {
    icon: Building2,
    title: "Department management",
    description:
      "Organize the university into departments and keep their structure up to date.",
  },
  {
    icon: GraduationCap,
    title: "Program management",
    description: "Define academic programs and the departments they belong to.",
  },
  {
    icon: BookOpen,
    title: "Course management",
    description: "Create and manage the courses offered within each program.",
  },
  {
    icon: CalendarRange,
    title: "Semester management",
    description: "Track semesters and their status through the academic year.",
  },
  {
    icon: Users,
    title: "Student & instructor management",
    description: "Manage student and instructor records and academic details.",
  },
  {
    icon: ShieldCheck,
    title: "Secure authentication",
    description:
      "Role-based accounts for students, instructors and admins, with email verification.",
  },
  {
    icon: CreditCard,
    title: "Online payment",
    description: "Students can pay fees securely through the bKash integration.",
  },
] as const;

export function FeatureSection() {
  return (
    <section id="features" className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            What you can do
          </h2>
          <p className="mt-3 text-muted-foreground">
            Core capabilities available in the system today.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <li key={title} className="rounded-lg border bg-background p-6">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
