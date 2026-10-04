"use client";

import { Menu, X } from "lucide-react";
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

  // Same auth/me architecture the rest of the app uses — no separate
  // "who am I" mechanism introduced here.
  const { data, isPending, isError } = useGetMe();
  const user = isError ? undefined : data?.data;
  const { mutate: logout, isPending: logoutPending } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out");
        router.push("/");
        router.refresh();
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-semibold tracking-tight">
          {APP_NAME}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>

          {isPending ? (
            // Fixed-size placeholder — avoids flashing "Login/Register"
            // and then swapping to "Dashboard/Logout" a moment later.
            <div className="flex items-center gap-3" aria-hidden="true">
              <div className="h-9 w-16 animate-pulse rounded-md bg-muted" />
              <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                href={getRoleHomePath(user.role)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutPending}
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-muted disabled:opacity-50"
              >
                {logoutPending ? "Logging out…" : "Logout"}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Login
              </Link>
              <ButtonLink href="/register" variant="primary" className="h-9 px-4">
                Register
              </ButtonLink>
            </div>
          )}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              Home
            </Link>

            {isPending ? (
              <div className="flex flex-col gap-2 px-3 py-2" aria-hidden="true">
                <div className="h-8 w-full animate-pulse rounded-md bg-muted" />
                <div className="h-8 w-full animate-pulse rounded-md bg-muted" />
              </div>
            ) : user ? (
              <>
                <Link
                  href={getRoleHomePath(user.role)}
                  onClick={closeMobileMenu}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    handleLogout();
                  }}
                  disabled={logoutPending}
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-muted disabled:opacity-50"
                >
                  {logoutPending ? "Logging out…" : "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
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
