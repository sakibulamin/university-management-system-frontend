import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}

const base =
  "inline-flex h-10 items-center justify-center rounded-md px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const variants: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  outline: "border border-input bg-background hover:bg-muted",
};

/**
 * A plain styled <Link>, not a wrapper around components/ui/button.tsx.
 * This project's shadcn style is "base-nova" (Base UI), whose button
 * likely uses a `render` prop rather than Radix's `asChild` — never
 * confirmed, since that file has never been seen by this assistant.
 * Rather than guess at that API, this avoids the dependency entirely.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
