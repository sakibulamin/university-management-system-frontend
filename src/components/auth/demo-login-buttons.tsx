"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";


interface DemoLoginButtonsProps {
  onSelect: (credentials: { email: string; password: string }) => void;
  disabled?: boolean;
}



export const DEMO_USER = {
  ADMIN: {
    email: "admin@university.com",
    password: "Admin@123",
  },
} as const;
export const DEMO_STUDENT = {
  STUDENT: {
    email: "student@university.com",
    password: "Student@123",
  },
} as const;
const DEMO_INSTRACTOR = {
  INSTRACTOR: {
    email: "instructor@university.com",
    password: "Instructor@123",
  },
} as const;
export function DemoLoginButtons({ onSelect, disabled }: DemoLoginButtonsProps) {
  
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() => onSelect(DEMO_USER.ADMIN)}
      >
        Demo Admin
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() =>onSelect(DEMO_INSTRACTOR.INSTRACTOR)}
      >
        Demo Instructor
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() => onSelect(DEMO_STUDENT.STUDENT)}
      >
        Demo Student
      </Button>
    </div>
  );
}
