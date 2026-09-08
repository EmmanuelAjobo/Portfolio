"use client";

import { ProjectCard } from "@/tools/projectCard";
import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { projectList } from "@/tools/projectList";
import { Loader2 } from "lucide-react";

gsap.registerPlugin(Draggable, InertiaPlugin);

function fibonacciSphere(n: number, radius: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    return { x: Math.cos(theta) * r * radius, y: y * radius * 0.55, z: Math.sin(theta) * r * radius };
  });
}

function rotatePoint(px: number, py: number, pz: number, rotX: number, rotY: number): [number, number, number] {
  const ry = (rotY * Math.PI) / 180;
  const rx = (rotX * Math.PI) / 180;
  const x1 = px * Math.cos(ry) + pz * Math.sin(ry);
  const z1 = -px * Math.sin(ry) + pz * Math.cos(ry);
  const y2 = py * Math.cos(rx) - z1 * Math.sin(rx);
  const z2 = py * Math.sin(rx) + z1 * Math.cos(rx);
  return [x1, y2, z2];
}

const BASE_POSITIONS = fibonacciSphere(projectList.length, 380);
const FOCUS_Z = 450;
const CARD_TILTS = projectList.map((_, i) =>
  ((Math.sin(i * 47.3 + 9.1) * 0.5 + Math.cos(i * 31.7) * 0.5) * 7).toFixed(2)
);

export function Projects() {
  const [isReady, setIsReady] = useState(false);
  const sphereRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const wrappersRef = useRef<HTMLDivElement[]>([]);
  const rotRef = useRef({ x: 0, y: 0 });
  const focusedRef = useRef<number>(-1);
  
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const isAnimating = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollRaf = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const settersRef = useRef<{ x: Function; y: Function; z: Function }[]>([]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const applyOrbit = useCallback((rotX: number, rotY: number) => {
    rotRef.current = { x: rotX, y: rotY };
    for (let i = 0; i < BASE_POSITIONS.length; i++) {
      if (focusedRef.current === i) continue;
      const setter = settersRef.current[i];
      if (!setter) continue;
      const { x, y, z } = BASE_POSITIONS[i];
      const [tx, ty, tz] = rotatePoint(x, y, z, rotX, rotY);
      setter.x(tx);
      setter.y(ty);
      setter.z(tz);
    }
  }, []);

  const focusCard = useCallback((i: number) => {
    focusedRef.current = i;
    setFocusedIndex(i);

    if (wrappersRef.current[i]) wrappersRef.current[i].style.zIndex = "50";
    gsap.to(cardsRef.current[i], {
      x: 0,
      y: 0,
      z: FOCUS_Z,
      scale: 1.1,
      duration: 0.6,
      rotate: 0,
      ease: "expo.out",
      onComplete: () => {
        isAnimating.current = false;
      },
    });
    cardsRef.current.forEach((card, j) => {
      if (j === i) return;
      gsap.to(card, { opacity: 0.12, duration: 0.35, ease: "power2.out" });
    });
  }, []);

  const blurCard = useCallback(() => {
    const i = focusedRef.current;
    if (i === -1) return;
    isAnimating.current = true;
    focusedRef.current = -1;
    setFocusedIndex(null);

    if (wrappersRef.current[i]) wrappersRef.current[i].style.zIndex = "";
    const { x: rx, y: ry } = rotRef.current;
    const { x, y, z } = BASE_POSITIONS[i];
    const [tx, ty, tz] = rotatePoint(x, y, z, rx, ry);
    gsap.to(cardsRef.current[i], {
      x: tx,
      y: ty,
      z: tz,
      scale: 1,
      duration: 0.8,
      ease: "expo.out",
      onComplete: () => {
        isAnimating.current = false;
      },
    });
    cardsRef.current.forEach((card) => {
      gsap.to(card, { opacity: 1, duration: 0.4, ease: "power2.out" });
    });
  }, []);

  const handleCardClick = (i: number) => {
    if (didDrag.current) return;
    if (focusedRef.current === i) {
      blurCard();
    } else {
      if (focusedRef.current !== -1) blurCard();
      focusCard(i);
    }
  };

  useGSAP(
    () => {
      if (!isReady) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        settersRef.current = cardsRef.current.map((card) => ({
          x: gsap.quickSetter(card, "x", "px"),
          y: gsap.quickSetter(card, "y", "px"),
          z: gsap.quickSetter(card, "z", "px"),
        }));

        const { x: rx, y: ry } = rotRef.current;
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          const { x, y, z } = BASE_POSITIONS[i];
          const [tx, ty, tz] = rotatePoint(x, y, z, rx, ry);
          gsap.fromTo(
            card,
            { opacity: 0, x: 0, y: 0, z: 0 },
            { opacity: 1, x: tx, y: ty, z: tz, duration: 1.2, delay: i * 0.04, ease: "expo.out" }
          );
        });

        const AUTO_SPEED = 0.08;
        const ticker: gsap.TickerCallback = () => {
          if (isDragging.current || isAnimating.current || focusedRef.current !== -1) return;
          rotRef.current.y += AUTO_SPEED;
          applyOrbit(rotRef.current.x, rotRef.current.y);
        };
        gsap.ticker.add(ticker);

        const dragProxy = document.createElement("div");
        dragProxy.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;";
        sphereRef.current?.appendChild(dragProxy);

        const draggable = Draggable.create(dragProxy, {
          type: "x,y",
          trigger: sphereRef.current,
          inertia: true,
          onPress() {
            didDrag.current = false;
            isDragging.current = true;
            this.x = 0;
            this.y = 0;
            this.update();
            (this as any)._baseRotX = rotRef.current.x;
            (this as any)._baseRotY = rotRef.current.y;
          },
          onDrag() {
            if (Math.abs(this.x) > 4 || Math.abs(this.y) > 4) didDrag.current = true;
            const rotY = (this as any)._baseRotY + this.x * 0.25;
            const rotX = (this as any)._baseRotX - this.y * 0.25;
            applyOrbit(rotX, rotY);
          },
          onThrowUpdate() {
            const rotY = (this as any)._baseRotY + this.x * 0.25;
            const rotX = (this as any)._baseRotX - this.y * 0.25;
            applyOrbit(rotX, rotY);
          },
          onThrowComplete() {
            isDragging.current = false;
          },
          onDragEnd() {
            if (!this.isThrowing) isDragging.current = false;
          },
          onRelease() {
            if (!this.isDragging && !this.isThrowing) isDragging.current = false;
          },
        })[0];

        return () => {
          gsap.ticker.remove(ticker);
          draggable.kill();
          dragProxy.remove();
        };
      });

      return () => mm.revert();
    },
    { scope: sphereRef, dependencies: [applyOrbit, isReady] }
  );

  const handleScroll = () => {
    if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);

    scrollRaf.current = requestAnimationFrame(() => {
      const el = carouselRef.current;
      if (!el) return;
      const firstCard = el.children[0] as HTMLElement;
      if (!firstCard) return;
      const cardWidth = firstCard.clientWidth + 16;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(index, 0), projectList.length - 1));
    });
  };

  const scrollToCard = (i: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const targetCard = el.children[i] as HTMLElement;
    if (targetCard) {
      const targetX = targetCard.offsetLeft - (el.clientWidth - targetCard.clientWidth) / 2;
      el.scrollTo({ left: targetX, behavior: "smooth" });
    }
  };

  if (!isReady) {
    return (
      <section id="projects" className="relative w-full h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-xs font-mono text-white/50 tracking-widest uppercase">
            Loading Workspace...
          </span>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative w-full h-screen overflow-hidden text-white bg-black">
      {/* Mobile & Tablet Horizontal Scroll View (< lg) */}
      <div className="lg:hidden relative w-full h-full flex flex-col justify-center items-center overflow-hidden py-8">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-4 px-[calc(50vw-140px)] sm:px-[calc(50vw-160px)] md:px-[calc(50vw-180px)] w-full overflow-x-auto snap-x snap-mandatory overscroll-x-contain scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden items-center touch-pan-x"
          style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
        >
          {projectList.map((c, i) => (
            <div
              key={c.id}
              className="shrink-0 snap-center rounded-xl overflow-hidden border border-white/10 bg-white/5 transition-transform duration-300"
              style={{
                width: "min(75vw, 320px)",
                aspectRatio: "3 / 4",
              }}
            >
              <ProjectCard
                title={c.title}
                description={c.description}
                src={c.src}
                href={c.href}
                techstack={c.techstack}
                focus={activeIndex === i}
              />
            </div>
          ))}
        </div>

        {/* Dynamic Pagination Indicators */}
        <div className="flex justify-center gap-2 mt-6 z-10">
          {projectList.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? "w-6 bg-white" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>

        <div className="mt-4 pointer-events-none">
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-mono">
            swipe to explore
          </span>
        </div>
      </div>

      {/* Desktop 3D Sphere View (lg+) */}
      <main
        ref={sphereRef}
        className="hidden lg:block relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ perspective: "1100px", transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          {projectList.map((c, i) => (
            <div
              key={c.id}
              ref={(el) => {
                if (el) wrappersRef.current[i] = el;
              }}
              className="absolute"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                onClick={() => handleCardClick(i)}
                className="rounded-lg overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-colors"
                style={{
                  width: "clamp(140px, 13vw, 200px)",
                  aspectRatio: "3 / 4",
                  willChange: "transform",
                  rotate: `${CARD_TILTS[i]}deg`,
                }}
              >
                <ProjectCard
                  title={c.title}
                  description={c.description}
                  src={c.src}
                  href={c.href}
                  techstack={c.techstack}
                  focus={focusedIndex === i}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-mono">
            drag to orbit · click to focus
          </span>
        </div>
      </main>
    </section>
  );
}
