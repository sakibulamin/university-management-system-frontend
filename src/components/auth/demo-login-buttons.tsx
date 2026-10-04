"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { DEMO_CREDENTIALS, UNAVAILABLE_DEMO_MESSAGE } from "@/lib/demo-credentials";

interface DemoLoginButtonsProps {
  onSelect: (credentials: { email: string; password: string }) => void;
  disabled?: boolean;
}

/**
 * Only the ADMIN credential has ever been confirmed anywhere in this
 * project's audit (the Postman collection's own Login example). It has
 * not been tested against the live backend. Instructor/Student have no
 * known credentials and are not invented here — clicking those buttons
 * only informs the user, it never attempts a login.
 */
export function DemoLoginButtons({ onSelect, disabled }: DemoLoginButtonsProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() => onSelect(DEMO_CREDENTIALS.ADMIN)}
      >
        Demo Admin
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() => toast.info(UNAVAILABLE_DEMO_MESSAGE.INSTRUCTOR)}
      >
        Demo Instructor
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() => toast.info(UNAVAILABLE_DEMO_MESSAGE.STUDENT)}
      >
        Demo Student
      </Button>
    </div>
  );
}
