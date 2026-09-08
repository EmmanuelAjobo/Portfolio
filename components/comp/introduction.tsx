"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import smokyBg from "@/public/assets/images/smoky.jpg";
import profileImg from "@/public/assets/images/profile.png";

export const Introduction = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

            tl.from(".intro-animate", {
                y: 40,
                opacity: 0,
                stagger: 0.15,
                delay: 0.2,
            }).from(
                // Target the wrapper container for the scale/fade animation
                ".profile-portrait-wrapper",
                {
                    opacity: 0,
                    scale: 1.05,
                    duration: 1.4,
                    ease: "power2.out",
                },
                "-=0.8"
            );
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative w-full min-h-screen flex items-center justify-center text-white bg-black"
        >
            {/* Background Grid Layer */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "80px 80px"
                }}
            />

            {/* Single Unified Profile Image Wrapper */}
            <div
                aria-hidden="true"
                className="profile-image-wrapper absolute w-full h-full justify-center inset-0 pointer-events-none"
                style={{
                    mixBlendMode: "luminosity", // Blends greyscale values
                }}
            >

                {/* NEW Child Div for better positioning control */}
                {/* Mobile: constrained height so object-cover doesn't crop the face out of frame.
                    Desktop: back to full-height right-anchored portrait. */}
                <div className="profile-portrait-wrapper absolute right-0 z-1 w-screen h-screen sm:h-full sm:w-[65vw] md:w-[clamp(500px,65vw,820px)]">
                    {/* Layer 1: Portrait */}
                    <Image
                        fill
                        priority
                        quality={100}
                        placeholder="blur"
                        blurDataURL={profileImg.blurDataURL}
                        src={profileImg}
                        alt="Ajobo Emmanuel Portrait"
                        sizes="(max-width: 639px) 80vw, (max-width: 767px) 65vw, 820px"
                        // object-right-top ensures face is prioritized on mobile scaling
                        className="absolute object-cover md:right-0 -right-[50px] bottom-0 h-3/4 select-none object-[75%_10%] md:object-top"
                        style={{
                            opacity: 0.85, // Maintained slightly higher opacity for luminosity blend
                        }}
                    />
                </div>

                {/* Layer 2: Smoky Background Image (Integrated into greyscale mix) */}
                <Image
                    fill
                    priority
                    quality={100}
                    placeholder="blur"
                    blurDataURL={smokyBg.blurDataURL}
                    src={smokyBg}
                    alt=""
                    sizes="100vw"
                    className="absolute object-cover object-center select-none pointer-events-none z-1"
                    style={{ opacity: 0.12 }}
                />

                {/* Layer 3: Ambient Amber Glow (Greyscale mix relative to image center) */}
                <div
                    className="absolute rounded-full z-1 blur-[80px] md:blur-[120px] opacity-[0.12] md:opacity-[0.18]" // Modulated intensity/blur by screen size
                    style={{
                        top: "20%",
                        right: "5%",
                        width: "clamp(200px, 35vw, 500px)",
                        height: "clamp(200px, 35vw, 500px)",
                        background: "radial-gradient(circle, var(--color-amber, #e8841a) 0%, transparent 75%)",
                    }}
                />

                {/* Layer 4: Responsive Overlays (Crucial for legibility) */}
                {/* Radial Spotlight: re-centered on mobile to sit over the actual portrait
                    (68% 32%, matching object-[75%_10%] above) instead of the empty left half,
                    and widened/eased so the face isn't crushed by the falloff. */}
                <div
                    className="absolute inset-0 z-2 [background:radial-gradient(ellipse_100%_85%_at_68%_30%,transparent_45%,rgba(0,0,0,0.9)_100%)] md:[background:radial-gradient(ellipse_70%_90%_at_72%_50%,transparent_45%,rgba(0,0,0,0.96)_90%)]"
                />

                {/* Left Edge Shadow: Softened on mobile to prevent blocking portrait details */}
                <div
                    className="absolute inset-0 z-3 bg-gradient-to-r from-black/60 via-black/20 to-transparent md:from-black md:via-black/90 md:to-transparent max-md:w-1/2"
                />

                {/* Bottom Edge Fade */}
                <div
                    className="absolute inset-0 z-3 bg-gradient-to-t from-black/95 via-transparent to-transparent h-full"
                />
            </div>


            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 flex flex-col justify-between min-h-screen py-10 md:py-14">

                <div className="intro-animate flex items-center justify-between">
                    <span
                        className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-mono"
                        style={{ color: "var(--color-amber, #e8841a)" }}
                    >
                        PEEL 2025
                    </span>
                    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-white/30 font-mono">
                        SELECTED PORTFOLIO
                    </span>
                </div>


                <div className="flex flex-col justify-center gap-5 md:gap-7 py-12 md:py-0 my-auto">

                    <div className="intro-animate flex items-center gap-3">
                        <span
                            className="inline-block w-6 h-px shrink-0"
                            style={{ background: "var(--color-amber, #e8841a)" }}
                        />
                        <span className="text-[10px] font-bold md:text-xs uppercase tracking-[0.28em] text-white/60 font-mono">
                            Creative Developer &amp; Brand Systems
                        </span>
                    </div>


                    <div className="intro-animate">
                        <h1
                            className="leading-[0.85] font-black uppercase select-none tracking-tight font-display"
                            style={{
                                fontSize: "clamp(2.8rem, 9.5vw, 11rem)",
                            }}
                        >
                            <span className="block text-white drop-shadow-2xl opacity-90">AJOBO</span>
                            <span
                                className="block"
                                style={{
                                    color: "var(--color-primary, #d1d5db)",
                                    textShadow: "0 0 60px rgba(209, 213, 219, 0.25)",
                                }}
                            >
                                EMMANUEL
                            </span>
                        </h1>
                    </div>


                    <div className="intro-animate flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12 mt-2">
                        <p className="max-w-xs text-sm md:text-[15px] text-white/50 font-light leading-relaxed">
                            Crafting brand systems, motion, and cinematic digital products for
                            teams that refuse to look like a template.
                        </p>
                    </div>
                    <div className="flex intro-animate flex-col sm:flex-row sm:items-end gap-6 sm:gap-12 shrink-0">
                        <a
                            href="https://www.linkedin.com/in/emmanuel-ajobo/"
                            target="_blank"
                            className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary w-40 text-black font-mono text-[11px] font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                        >

                            <span className="relative z-10 transition-colors duration-300">
                                Hire Me
                            </span>

                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                            >
                                <path
                                    d="M1 7h12M7 1l6 6-6 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="animate-pulse"
                                />
                            </svg>

                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{
                                    background: "radial-gradient(circle at center, rgba(232,132,26,0.15) 0%, transparent 70%)"
                                }}
                            />
                        </a>
                    </div>
                </div>


                <div className="intro-animate flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/8 pt-5 font-mono text-[10px] uppercase tracking-[0.3em]">
                    <span className="text-white/30">Built by Ajobo E.</span>
                    <div className="flex items-center gap-6">
                        <span className="hidden md:inline text-white/30">Based in Lagos</span>
                        <span
                            className="flex items-center gap-2"
                            style={{ color: "var(--color-amber, #e8841a)" }}
                        >
                            <span
                                className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                                style={{ background: "var(--color-amber, #e8841a)" }}
                            />
                            Remote Worldwide
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};
