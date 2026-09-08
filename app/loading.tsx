"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/public/logo";
import GridBackground from "@/tools/gridBackground";

export default function Loading() {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const shadowRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const logo = logoRef.current;
            const shadow = shadowRef.current;
            const glow = glowRef.current;
            if (!logo || !shadow || !glow) return;

            gsap.set(logo, { transformPerspective: 1000, transformStyle: "preserve-3d" });

            const tl = gsap.timeline({
                repeat: -1,
                yoyo: true,
                defaults: { duration: 2.2, ease: "sine.inOut" },
            });

            // Float logo with subtle 3D tilt
            tl.to(logo, { y: -20, rotateX: 6, rotateY: -4, rotateZ: 1 }, 0)
                // Shrink & soften shadow as object elevates
                .to(shadow, { scaleX: 0.6, opacity: 0.3 }, 0)
                // Pulsate ambient backlight
                .to(glow, { scale: 1.25, opacity: 0.75 }, 0);
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-background text-foreground"
        >
            {/* Background Grid & Backdrop Blur Spot */}
            <GridBackground />
            <div className="absolute w-[320px] h-80 sm:w-125 sm:h-125 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

            {/* Dynamic Ambient Glow behind logo */}
            <div
                ref={glowRef}
                className="absolute w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none opacity-50"
            />

            {/* Floating Glassmorphic Logo Card */}
            <div
                ref={logoRef}
                style={{ willChange: "transform" }}
                className="relative z-10 flex items-center justify-center p-6 sm:p-8 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(255,255,255,0.05)]"
            >
                <div className="block sm:hidden">
                    <Logo size={64} />
                </div>
                <div className="hidden sm:block">
                    <Logo size={96} />
                </div>
            </div>

            {/* Ground Contact Shadow */}
            <div
                ref={shadowRef}
                className="mt-10 pointer-events-none flex flex-col items-center"
                style={{ willChange: "transform, opacity" }}
            >
                {/* Soft Ambient Floor Tint */}
                <div className="w-28 sm:w-44 h-3 rounded-[100%] bg-primary/25 blur-md" />
                {/* Sharp Contact Shadow Core */}
                <div className="-mt-2 w-14 sm:w-24 h-1.5 rounded-[100%] bg-black/80 blur-xs" />
            </div>
        </section>
    );
}