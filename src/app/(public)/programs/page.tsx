
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  GraduationCap,
  ArrowRight,
  Code2,
    Cpu,
 
} from "lucide-react";

const programs = [
  {
    id: 1,
    title: "Computer Science & Engineering",
    shortName: "CSE",
    category: "Technology",
    duration: "4 Years",
    description:
      "Learn programming, software development, algorithms, and modern computing technologies.",
    icon: Code2,
    color: "bg-blue-100 text-blue-700",
  },

  {
    id: 2,
    title: "Electrical Engineering",
    shortName: "EEE",
    category: "Engineering",
    duration: "4 Years",
    description:
      "Explore electrical systems, electronics, power engineering, and circuit design.",
    icon: Cpu,
    color: "bg-purple-100 text-purple-700",
  },
 
  {
    id: 3,
    title: "Information Technology",
    shortName: "IT",
    category: "Technology",
    duration: "4 Years",
    description:
      "Explore networking, databases, cybersecurity, and information systems.",
    icon: Code2,
    color: "bg-cyan-100 text-cyan-700",
  },
];

const categories = [
  "All Programs",
  "Technology",
  "Engineering",
  
];

export default function ProgramsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Programs");

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesCategory =
        category === "All Programs" ||
        program.category === category;

      const query = search.trim().toLowerCase();

      const matchesSearch =
        program.title.toLowerCase().includes(query) ||
        program.shortName.toLowerCase().includes(query) ||
        program.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <main className="min-h-screen bg-slate-50">
    
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-4 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-blue-100">
            <GraduationCap className="size-4" />
            Academic Programs
          </div>

          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Discover Your Future Through Education
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
            Explore academic programs designed to help you develop
            knowledge, practical skills, and a successful future.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#program-list"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-blue-950 transition hover:bg-blue-50"
            >
              Explore Programs
              <ArrowRight className="size-4" />
            </a>

            <Link
              href="/register"
              className="inline-flex h-11 items-center rounded-lg border border-white/30 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Apply / Register
            </Link>
          </div>
        </div>
      </section>

    
      <section
        id="program-list"
        className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Find your path
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Explore Our Programs
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Find a program that matches your interests and goals.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            {filteredPrograms.length} programs found
          </p>
        </div>

   
        <div className="mt-8">
          <label htmlFor="program-search" className="sr-only">
            Search academic programs
          </label>

          <div className="flex h-12 max-w-xl items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm focus-within:border-blue-500">
            <Search className="size-5 shrink-0 text-slate-400" />

            <input
              id="program-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by program name or keyword..."
              className="h-full w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                category === item
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program) => {
            const Icon = program.icon;

            return (
              <article
                key={program.id}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl ${program.color}`}
                  >
                    <Icon className="size-6" />
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {program.shortName}
                  </span>
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-blue-700">
                  {program.category}
                </p>

                <h3 className="mt-2 text-lg font-bold leading-7 text-slate-900">
                  {program.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {program.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm text-slate-500">
                    Duration: {program.duration}
                  </span>

                  <Link
                    href="/register"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 transition hover:text-blue-900"
                    aria-label={`Register for ${program.title}`}
                  >
                    Details
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

   
        {filteredPrograms.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <Search className="mx-auto size-8 text-slate-400" />

            <h3 className="mt-3 font-semibold text-slate-900">
              No programs found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another search term or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All Programs");
              }}
              className="mt-4 text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl bg-blue-950 px-6 py-10 text-center text-white sm:px-12 sm:py-14">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Start Your Journey?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
            Create your account to get started with our university
            management platform.
          </p>

          <Link
            href="/register"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-blue-950 transition hover:bg-blue-50"
          >
            Create Account
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
