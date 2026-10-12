import Link from "next/link";
import type { ReactNode } from "react";
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
