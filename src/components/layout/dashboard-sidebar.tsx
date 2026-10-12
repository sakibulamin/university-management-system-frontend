

"use client";

import { Home, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ComponentType, useState } from "react";
import { toast } from "sonner";
import { useLogout } from "@/hooks";
import { getErrorMessage } from "@/lib/get-error-message";

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
      {/* Home link */}
      <Link
        href="/"
        onClick={onNavigate}
        aria-current={pathname === "/" ? "page" : undefined}
        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          pathname === "/"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <Home className="size-4 shrink-0" aria-hidden="true" />
        Home
      </Link>

      {items.map(({ href, label, icon: Icon, exact }) => {
        const isActive = exact
          ? pathname === href
          : pathname.startsWith(href);

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

export function DashboardSidebar({
  heading,
  items,
}: DashboardSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const { mutate: logout, isPending: logoutPending } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setMobileOpen(false);
        toast.success("Logged out successfully");
        router.replace("/login");
        router.refresh();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const LogoutButton = () => (
    <button
      type="button"
      onClick={handleLogout}
      disabled={logoutPending}
      className="mt-4 flex w-full items-center gap-3 rounded-md border-t px-3 py-3 pt-4 text-left text-sm font-medium text-destructive transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
    >
      <LogOut className="size-4 shrink-0 text-red-600 dark:text-red-4" />
      {logoutPending ? "Logging out..." : "Logout"}
    </button>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r p-4 md:flex md:min-h-screen md:flex-col ">
        <div className="flex-1">
          <NavLinks items={items} />
        </div>

        <div className="mt-auto">
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile menu header */}
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

      {/* Mobile slide-over menu */}
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
            className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[80vw] flex-col overflow-y-auto bg-background p-4 shadow-lg"
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

            <div className="flex-1">
              <NavLinks
                items={items}
                onNavigate={() => setMobileOpen(false)}
              />
            </div>

            <div className="mt-auto">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}