"use client";

import { useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

import { NaviBar } from "./NaviBar";
import { Introduction } from "@/components/comp/introduction";
import { Skill } from "@/components/comp/skill";
import GridBackground from "@/tools/gridBackground";
import { Projects } from "@/components/comp/project";
import { Footer } from "@/components/comp/footer";


gsap.registerPlugin(Observer, useGSAP);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const animating = useRef(false);

  const slideSections = [
    { id: "intro", Component: Introduction },
    { id: "skill", Component: Skill },
    { id: "projects", Component: Projects },
    { id: "footer", Component: Footer },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // MOBILE & TABLET (< 1024px): Full GSAP Observer Slide Effect
      mm.add("(max-width: 1023px)", () => {
        const sections = gsap.utils.toArray<HTMLElement>(".sect");
        const outerWrappers = gsap.utils.toArray<HTMLElement>(".outer");
        const innerWrappers = gsap.utils.toArray<HTMLElement>(".inner");
        const clamp = (val: number) => Math.max(0, Math.min(sections.length - 1, val));

        // Reset positions for Observer layout
        gsap.set(outerWrappers, { yPercent: 100 });
        gsap.set(innerWrappers, { yPercent: -100 });
        gsap.set(sections, { autoAlpha: 0, zIndex: 0 });

        // Show first section
        gsap.set(sections[0], { autoAlpha: 1, zIndex: 10 });
        gsap.set([outerWrappers[0], innerWrappers[0]], { yPercent: 0 });

        const gotoSection = (index: number, direction: number) => {
          index = clamp(index);
          if (animating.current || index === currentIndex.current) return;
          animating.current = true;

          const fromTop = direction === -1;
          const dFactor = fromTop ? -1 : 1;
          const activeSection = sections[currentIndex.current];
          const nextSection = sections[index];

          const tl = gsap.timeline({
            defaults: { duration: 1.2, ease: "power2.inOut" },
            onComplete: () => {
              animating.current = false;
            },
          });

          gsap.set(activeSection, { zIndex: 0 });
          tl.to(activeSection, { autoAlpha: 0 });

          gsap.set(nextSection, { autoAlpha: 1, zIndex: 10 });

          tl.fromTo(
            [outerWrappers[index], innerWrappers[index]],
            { yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor) },
            { yPercent: 0 },
            0
          );

          currentIndex.current = index;
        };

        const obs = Observer.create({
          target: containerRef.current,
          type: "wheel,touch,pointer",
          wheelSpeed: -1,
          onDown: () => gotoSection(currentIndex.current - 1, -1),
          onUp: () => gotoSection(currentIndex.current + 1, 1),
          tolerance: 10,
          preventDefault: true,
        });

        return () => obs.kill();
      });

      // DESKTOP (>= 1024px): Clear transforms so native scroll snapping works
      mm.add("(min-width: 1024px)", () => {
        const sections = gsap.utils.toArray<HTMLElement>(".sect");
        const outerWrappers = gsap.utils.toArray<HTMLElement>(".outer");
        const innerWrappers = gsap.utils.toArray<HTMLElement>(".inner");

        gsap.set([sections, outerWrappers, innerWrappers], {
          clearProps: "all",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden lg:overflow-y-scroll lg:snap-y lg:snap-mandatory lg:scroll-smooth bg-black text-white"
    >
      {/* Background layer stays behind content */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GridBackground />
      </div>

      {/* Navigation overlay */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-auto">
        <NaviBar />
      </div>

      {/* Slide sections */}
      {slideSections.map(({ id, Component }) => (
        <div
          className="sect absolute inset-0 w-full h-full  lg:relative lg:h-screen lg:w-full lg:snap-start lg:snap-always z-10"
          key={id}
        >
          <div className="outer h-full w-full overflow-hidden">
            <div className="inner h-full w-full flex flex-col justify-center items-center">
              <Component />
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}