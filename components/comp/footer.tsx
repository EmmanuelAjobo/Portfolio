"use client";

import Link from "next/link";
import {
  GraduationCap,
  Code2,
  Video,
  BookOpen,
  Hammer,
  GitFork,
  BriefcaseBusiness,
  Mail,
} from "lucide-react";
import Logo from "@/public/logo";

interface EducationEntry {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  period?: string;
  description: string;
  methods?: { icon: React.ReactNode; label: string }[];
}

const entries: EducationEntry[] = [
  {
    icon: <GraduationCap className="h-4 w-4" strokeWidth={1.75} />,
    title: "B.Eng. Civil Engineering",
    subtitle: "Your University Name",
    period: "2020 — 2026",
    description:
      "Formal training in structural analysis, materials, and project management — foundations that carried over directly into building systems.",
  },
  {
    icon: <Code2 className="h-4 w-4" strokeWidth={1.75} />,
    title: "Self-Taught Developer",
    subtitle: "Learning outside the classroom",
    description:
      "No formal CS background — learned Next.js and GSAP animation by watching, reading, and building.",
    methods: [
      {
        icon: <Video className="h-3 w-3" strokeWidth={1.75} />,
        label: "YouTube tutorials",
      },
      {
        icon: <BookOpen className="h-3 w-3" strokeWidth={1.75} />,
        label: "Documentation",
      },
      {
        icon: <Hammer className="h-3 w-3" strokeWidth={1.75} />,
        label: "Hands-on practice",
      },
    ],
  },
];

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    icon: GitFork,
    href: "https://github.com/EmmanuelAjobo",
    label: "GitHub",
  },
  {
    icon: BriefcaseBusiness,
    href: "https://www.linkedin.com/in/emmanuel-ajobo/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:ajoboemmanuel04@gmail.com",
    label: "Email",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="education"
      className="relative w-full min-h-[90vh] flex flex-col justify-between border-t border-border scroll-mt-[10vh]"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-evenly px-4 pt-6 pb-8 sm:px-6 sm:pt-12 sm:pb-12">
        {/* Education Timeline Section */}
        <div className="w-full">
          <h2 className="mb-4 text-lg font-semibold tracking-tight text-foreground sm:mb-8 sm:text-2xl">
            Education
          </h2>

          <div className="relative flex flex-col gap-6 sm:gap-10">
            {/* Timeline line */}
            <div
              className="absolute bottom-3 left-3.75 top-3 w-px bg-border sm:left-4.75"
              aria-hidden="true"
            />

            {entries.map((entry, i) => (
              <div key={i} className="relative flex gap-3.5 sm:gap-5">
                {/* Icon */}
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary sm:h-10 sm:w-10">
                  {entry.icon}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 flex flex-col gap-0.5 pt-0.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                    <h3 className="text-xs font-semibold text-foreground sm:text-base">
                      {entry.title}
                    </h3>

                    {entry.period && (
                      <span className="text-[10px] text-muted-foreground font-mono sm:text-xs">
                        {entry.period}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] leading-tight text-muted-foreground sm:text-sm">
                    {entry.subtitle}
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {entry.description}
                  </p>

                  {entry.methods && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {entry.methods.map((method) => (
                        <span
                          key={method.label}
                          className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground bg-white/5 sm:text-xs sm:px-2.5"
                        >
                          {method.icon}
                          {method.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Area */}
        <div className="flex flex-col w-full gap-4 border-t border-border pt-2 sm:gap-8 sm:pt-8 mt-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <Logo size={26} />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground sm:text-sm">
                  Ajobo Emmanuel Jesufifunmi
                </span>
                <span className="text-[10px] text-muted-foreground sm:text-xs">
                  Civil engineer turned developer
                </span>
              </div>
            </div>

            {/* Nav & Socials */}
            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
              <nav className="flex gap-3 sm:gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    target="_blank"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="flex gap-6">
                {socialLinks.map(({ icon: Icon, href, label }) => {
                  const cleanHref = href.trim();
                  const isExternal = cleanHref.startsWith("http");
                  const formattedHref =
                    cleanHref.startsWith("http") || cleanHref.startsWith("mailto:")
                      ? cleanHref
                      : `https://${cleanHref}`;

                  return (
                    <a
                      key={label}
                      href={formattedHref}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col gap-1 border-t border-border/60 pt-3 text-[10px] sm:text-xs text-muted-foreground sm:flex-row sm:justify-between">
            <span>© {year} AJOBO E. All rights reserved.</span>
            <span>Built with Next.js, GSAP & shadcn/ui</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
