
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  MessageSquare,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@university.edu",
    description: "Send us your questions anytime.",
    href: "mailto:support@university.edu",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+880 1XXX-XXXXXX",
    description: "Contact our support team.",
    href: "tel:+88016781234",
  },
  {
    icon: MapPin,
    title: "Our Location",
    value: "Bangladesh",
    description: "Supporting your academic journey.",
    href: undefined,
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Sunday – Thursday",
    description: "9:00 AM – 5:00 PM",
    href: undefined,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.subject.trim()) {
      nextErrors.subject = "Please enter a subject.";
    }

    if (form.message.trim().length < 10) {
      nextErrors.message = "Message must contain at least 10 characters.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

  
    setSubmitted(true);
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20";

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="relative isolate overflow-hidden border-b border-white/5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]"
        />

        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
            <MessageSquare className="size-7" />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Contact Us
          </p>

          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s Start a{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Have a question about our University Management System?
            We&apos;re here to help you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_INFO.map((item) => {
            const Icon = item.icon;

            const content = (
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.05]">
                <div className="flex size-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
                  <Icon className="size-5" />
                </div>

                <h2 className="mt-4 font-semibold">{item.title}</h2>

                <p className="mt-2 break-words text-sm font-medium text-blue-300">
                  {item.value}
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  {item.description}
                </p>
              </div>
            );

            return (
              <div key={item.title}>
                {item.href ? (
                  <a href={item.href} className="block h-full">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
   
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300">
              <GraduationCap className="size-4" />
              We&apos;re here to help
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              How can we help you today?
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
              Send us your questions, feedback, or suggestions.
              We appreciate hearing from students, instructors,
              and university administrators.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "General questions and support",
                "Academic system inquiries",
                "Feedback and suggestions",
              ].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                    <ArrowRight className="size-3.5" />
                  </span>
                  <span className="text-sm text-slate-300">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold">Already have an account?</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Sign in to access your role-based dashboard.
              </p>

              <Link
                href="/login"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-cyan-200"
              >
                Go to Login
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

   
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-blue-950/10 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold">Send us a message</h2>

            <p className="mt-2 text-sm text-slate-400">
              Fill in the details below.
            </p>

            {submitted ? (
              <div
                role="status"
                className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6"
              >
                <h3 className="font-semibold text-emerald-300">
                  Form validated successfully!
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  This form is not connected to a message service yet.
                  Your message has not been sent.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                >
                  Back to form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-medium text-slate-200"
                    >
                      Full Name
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      placeholder="Your full name"
                      className={inputClass}
                    />

                    {errors.name && (
                      <p id="name-error" className="mt-2 text-xs text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-medium text-slate-200"
                    >
                      Email Address
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm({ ...form, email: event.target.value })
                      }
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      placeholder="you@example.com"
                      className={inputClass}
                    />

                    {errors.email && (
                      <p id="email-error" className="mt-2 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="text-sm font-medium text-slate-200"
                  >
                    Subject
                  </label>

                  <input
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={(event) =>
                      setForm({ ...form, subject: event.target.value })
                    }
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={
                      errors.subject ? "subject-error" : undefined
                    }
                    placeholder="How can we help?"
                    className={inputClass}
                  />

                  {errors.subject && (
                    <p id="subject-error" className="mt-2 text-xs text-red-400">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-slate-200"
                  >
                    Message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={(event) =>
                      setForm({ ...form, message: event.target.value })
                    }
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    placeholder="Write your message here..."
                    className={`${inputClass} resize-y`}
                  />

                  {errors.message && (
                    <p id="message-error" className="mt-2 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
                >
                  Send Message
                  <Send className="size-4" />
                </button>

                <p className="text-xs leading-5 text-slate-500">
                  Please don&apos;t include passwords or other sensitive
                  account information in your message.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
