
"use client";

import { GraduationCap, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { useGetMe, useLogout } from "@/hooks";
import { getErrorMessage } from "@/lib/get-error-message";
import { getRoleHomePath } from "@/lib/get-role-home-path";

import { ButtonLink } from "./button-link";

const APP_NAME = "University Management System";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const { data, isPending, isError } = useGetMe();
  const user = isError ? undefined : data?.data;

  const { mutate: logout, isPending: logoutPending } = useLogout();

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        closeMobileMenu();
        toast.success("Logged out successfully");
        router.replace("/");
        router.refresh();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-semibold tracking-tight"
          onClick={closeMobileMenu}
        >
          
            <div className="inline-flex gap-3 ">
            <GraduationCap className="size-6"  aria-hidden="true" />
            {APP_NAME}
          </div>
        </Link>


        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-between md:flex md:ml-8"
        >

          <div className="flex items-center gap-5 p-35">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>

            <Link
              href="/programs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Academic Programs
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact Us
            </Link>


            {isPending ? (
              <div
                className="h-8 w-20 animate-pulse rounded-md bg-muted"
                aria-hidden="true"
              />
            ) : user ? (
              <Link
                href={getRoleHomePath(user.role)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
            ) : null}
          </div>

    
          <div className="flex items-center gap-3">
            {isPending ? (
              <div
                className="h-9 w-20 animate-pulse rounded-md bg-muted"
                aria-hidden="true"
              />
            ) : user ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutPending}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-red-600 bg-red-600 px-5 text-sm font-semibold text-white transition-colors hover:border-red-700 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {logoutPending ? "Logging out…" : "Logout"}
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Login
                </Link>

                <ButtonLink
                  href="/register"
                  variant="primary"
                  className="h-9 px-4"
                >
                  Register
                </ButtonLink>
              </>
            )}
          </div>
        </nav>


        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((previous) => !previous)}
        >
          {mobileOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t md:hidden"
        >
          <div className="flex flex-col gap-1 px-4 py-3">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Home
            </Link>

            {isPending ? (
              <div
                className="flex flex-col gap-2 px-3 py-2"
                aria-hidden="true"
              >
                <div className="h-8 w-full animate-pulse rounded-md bg-muted" />
                <div className="h-8 w-full animate-pulse rounded-md bg-muted" />
              </div>
            ) : user ? (
              <>
                <Link
                  href={getRoleHomePath(user.role)}
                  onClick={closeMobileMenu}
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={logoutPending}
                  className="rounded-md bg-red-600 px-3 py-2 text-left text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {logoutPending ? "Logging out…" : "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
