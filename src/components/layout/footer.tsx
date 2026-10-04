import Link from "next/link";

const APP_NAME = "University Management System";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <span className="font-semibold tracking-tight">{APP_NAME}</span>
          <p className="max-w-md text-sm text-muted-foreground">
            A platform for managing students, instructors, courses, programs
            and academic administration.
          </p>
        </div>

        {/*
          No address/phone/email/social links: none were provided by the
          project, and none are invented here per instruction.
        */}
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link
            href="/login"
            className="text-muted-foreground hover:text-foreground"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-muted-foreground hover:text-foreground"
          >
            Register
          </Link>
        </nav>

        <p className="text-xs text-muted-foreground">
          © {currentYear} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
