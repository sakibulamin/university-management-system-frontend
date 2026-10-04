import { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { FeatureSection } from "@/components/home/feature-section";
import { RoleSection } from "@/components/home/role-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { CtaSection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "University Management System",
  description:
    "University Management System — manage students, instructors, courses, programs and academic administration.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <RoleSection />
      <HowItWorksSection />
      <CtaSection />
    </>
  );
}
