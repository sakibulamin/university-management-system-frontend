"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentType, useState } from "react";

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  exact?: boolean;
}

function NavLinks({
  items,
  onNavigate,
}: {
  items: readonly DashboardNavItem[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {items.map(({ href, label, icon: Icon, exact }) => {
        const isActive = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

interface DashboardSidebarProps {
  heading: string;
  items: readonly DashboardNavItem[];
}

/**
 * Shared by the Admin (Step 5) and Instructor (Step 6) dashboards — a
 * role's nav items differ, but the responsive rail/slide-over behavior
 * doesn't, so it lives here once rather than being duplicated per role.
 */
export function DashboardSidebar({ heading, items }: DashboardSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r p-4 md:block">
        <NavLinks items={items} />
      </aside>

      <div className="flex items-center justify-between border-b p-4 md:hidden">
        <span className="font-semibold">{heading}</span>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-expanded={mobileOpen}
          aria-controls={`${heading.toLowerCase()}-mobile-nav`}
          aria-label={`Open ${heading.toLowerCase()} menu`}
          className="rounded-md p-2 hover:bg-muted"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          />
          <div
            id={`${heading.toLowerCase()}-mobile-nav`}
            role="dialog"
            aria-modal="true"
            aria-label={`${heading} navigation`}
            className="fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] overflow-y-auto bg-background p-4 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold">{heading}</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="rounded-md p-2 hover:bg-muted"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <NavLinks items={items} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
