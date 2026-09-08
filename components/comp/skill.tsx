"use client"
import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/public/logo";
import { skills } from "@/tools/projectList";

gsap.registerPlugin(useGSAP);

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const primary = "var(--color-primary)";

export function Skill() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const counterRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".skill-eyebrow", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.8 })
        .fromTo(".skill-heading-word", { y: "110%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.8, stagger: 0.1 }, "-=0.5")
        .fromTo(".skill-mark", { opacity: 0, rotate: -12, scale: 0.85 }, { opacity: 1, rotate: 0, scale: 1, duration: 0.8 }, "-=0.6")
        .fromTo(".skill-row", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.08 }, "-=0.4")
        .fromTo(".skill-tag", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.02, ease: "back.out(1.5)" }, "-=0.4");

      gsap.to(".grid-texture", { opacity: 0.1, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".ambient-orb", { x: 30, y: -20, duration: 8, ease: "sine.inOut", repeat: -1, yoyo: true });
    },
    { scope: containerRef }
  );

  const handleMouseEnter = useCallback((i: number) => {
    gsap.to(lineRefs.current[i], { width: "100%", duration: 0.4, ease: "power2.out", overwrite: "auto" });
    gsap.to(counterRefs.current[i], { opacity: 0.9, duration: 0.2, overwrite: "auto" });
  }, []);

  const handleMouseLeave = useCallback((i: number) => {
    gsap.to(lineRefs.current[i], { width: "0%", duration: 0.3, ease: "power2.in", overwrite: "auto" });
    gsap.to(counterRefs.current[i], { opacity: 0.5, duration: 0.2, overwrite: "auto" });
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative w-full min-h-screen text-white overflow-hidden flex flex-col select-none"
    >
      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="grid-texture absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.06,
        }}
      />
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="ambient-orb absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "-5%",
          width: "min(45vw,500px)",
          height: "min(45vw,500px)",
          background: "radial-gradient(circle,rgba(232,132,26,0.12) 0%,transparent 30%)",
          filter: "blur(60px)",
        }}
      />

      {/* Outer padding: 20px mobile → 40px tablet → 64px desktop */}
      <div className="relative z-10 flex flex-col flex-1 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 py-8 sm:py-10 lg:py-14">

        {/* ── Header ── */}
        <header className="flex items-end justify-between border-b border-white/10 pb-5 sm:pb-7 shrink-0">
          <div className="min-w-0">
            <p className="skill-eyebrow inline-block text-[9px] uppercase tracking-[0.35em] mb-2 sm:mb-3" style={{ ...mono, color: `${primary}cc` }}>
              — Capabilities
            </p>
            {/* Fluid heading: 28px → scales with viewport → caps at 88px */}
            <h2
              className="font-black uppercase leading-[0.88]"
              style={{ fontSize: "clamp(1.75rem, 7vw, 5.5rem)", letterSpacing: "-0.02em" }}
            >
              <span className="block overflow-hidden">
                <span className="skill-heading-word inline-block">WHAT I</span>
              </span>
              <span className="block overflow-hidden">
                <span className="skill-heading-word inline-block" style={{ color: primary }}>BRING.</span>
              </span>
            </h2>
          </div>
          {/* Logo: hide on narrow mobile, show from sm */}
          <div className="skill-mark shrink-0 hidden sm:block pb-1 ml-4">
            <Logo size={100} />
          </div>
        </header>

        {/* ── LAYOUT A: Desktop list (≥ lg) ── */}
        <div className="hidden lg:flex flex-col justify-center flex-1 py-2">
          {skills.map((skill, i) => (
            <div
              key={skill.index}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="skill-row group relative border-b border-white/[0.07] py-5 xl:py-6 cursor-default hover:border-white/20 transition-colors duration-300"
            >
              <div
                ref={(el) => { lineRefs.current[i] = el; }}
                className="absolute left-0 top-0 h-px w-0"
                style={{ background: primary }}
              />
              {/* 12-col grid: index | category+note | tags */}
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                  <span
                    ref={(el) => { counterRefs.current[i] = el; }}
                    className="text-xs font-bold tabular-nums"
                    style={{ ...mono, color: primary, opacity: 0.5 }}
                  >
                    {skill.index}
                  </span>
                </div>
                <div className="col-span-3">
                  <h3
                    className="font-black uppercase leading-none"
                    style={{ fontSize: "clamp(1.3rem, 1.8vw, 2.2rem)", letterSpacing: "-0.015em" }}
                  >
                    {skill.category}
                  </h3>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/40" style={mono}>
                    {skill.note}
                  </p>
                </div>
                <div className="col-span-8 flex flex-wrap gap-2 justify-end">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="skill-tag px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] border border-white/10 text-white/50 group-hover:border-primary group-hover:text-white/90 transition-all duration-300"
                      style={mono}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── LAYOUT B: Tablet 2-col cards (sm → lg) ── */}
        <div className="hidden sm:grid lg:hidden grid-cols-2 gap-3 sm:gap-4 flex-1 py-6 content-center">
          {skills.map((skill) => (
            <div
              key={skill.index}
              className="skill-row border border-white/10 rounded-md p-4 sm:p-5 flex flex-col gap-3"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold tabular-nums" style={{ ...mono, color: primary }}>
                  {skill.index}
                </span>
                <p className="text-[8px] uppercase tracking-[0.18em] text-white/35 text-right leading-relaxed" style={mono}>
                  {skill.note}
                </p>
              </div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight leading-none">
                {skill.category}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="skill-tag px-2 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-[0.12em] border border-white/10 text-white/55"
                    style={{ ...mono, background: "rgba(255,255,255,0.03)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── LAYOUT C: Mobile stacked rows (< sm) ── */}
        <div className="flex sm:hidden flex-col divide-y divide-white/[0.07] flex-1 py-4">
          {skills.map((skill) => (
            <div key={skill.index} className="skill-row py-5 first:pt-2">
              {/* Row header: index + category */}
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="text-[10px] font-bold tabular-nums shrink-0" style={{ ...mono, color: primary, opacity: 0.75 }}>
                  {skill.index}
                </span>
                <h3 className="text-[1.25rem] font-black uppercase leading-none tracking-tight">
                  {skill.category}
                </h3>
              </div>
              {/* Note */}
              <p className="text-[8px] uppercase tracking-[0.22em] text-white/35 mb-3 pl-[1.6rem]" style={mono}>
                {skill.note}
              </p>
              {/* Tags — allow natural wrap, no fixed height */}
              <div className="flex flex-wrap gap-1.5 pl-[1.6rem]">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="skill-tag px-2 py-0.75 text-[8px] uppercase tracking-[0.12em] border border-white/10 text-white/55"
                    style={{ ...mono, background: "rgba(255,255,255,0.025)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}