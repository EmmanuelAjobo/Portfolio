"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ProjectCardProps } from "@/tools/types";

export const ProjectCard = ({
  title,
  description,
  techstack,
  src,
  href,
  focus = false,
}: ProjectCardProps & { focus?: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, on: true });
  }

  return (
    <Card
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
      className={`group relative flex h-full w-full flex-col  rounded-xl border p-0 gap-0 backdrop-blur-md transition-all duration-500 select-none ${
        focus
          ? "border-primary/50 bg-slate-950/80 shadow-2xl shadow-primary/20 z-20 overflow-scroll opacity-100 scale-100"
          : "border-white/10 bg-slate-950/40 opacity-80 hover:opacity-95 z-10 scale-[0.98]"
      }`}
    >
      {/* Interactive Glass Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-xl transition-opacity duration-300"
        style={{
          opacity: spot.on || focus ? 1 : 0,
          background: `radial-gradient(300px circle at ${spot.x}px ${spot.y}px, rgba(255, 255, 255, 0.08), transparent 80%)`,
        }}
      />

      {/* Top Image Container */}
      <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-black/20">
        {src ? (
          <Image
            fill
            priority
            src={src}
            alt={title}
            sizes="(max-width: 768px) 80vw, 25vw"
            draggable={false}
            className={`h-full w-full object-cover pointer-events-none transition-all duration-700 ease-out ${
              focus
                ? "scale-105 brightness-100"
                : "scale-100 brightness-75 group-hover:brightness-95"
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-white/40 font-mono">
            NO PREVIEW
          </div>
        )}

        {/* Gradient Vignette */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-transparent to-black/20" />

        {/* Top-Right Action Badge Link */}
        {href && (
          <Link
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`absolute top-2.5 right-2.5 z-30 flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
              focus
                ? "border-primary/60 bg-primary text-white scale-110 shadow-lg shadow-primary/30"
                : "border-white/15 bg-black/40 text-white/70 hover:border-primary/50 hover:bg-primary hover:text-white"
            }`}
          >
            <ArrowUpRight className="h-3.5 w-3.5 stroke-2" />
          </Link>
        )}
      </div>

      {/* Content Section built with shadcn/ui Card components */}
      <div className="relative z-10 flex flex-1 flex-col justify-between p-3.5 sm:p-4">
        <CardHeader className="p-0 space-y-1.5">
          <CardTitle
            className={`text-sm sm:text-base font-semibold tracking-tight transition-colors duration-300 ${
              focus ? "text-white line-clamp-none" : "text-primary line-clamp-1"
            }`}
          >
            {title}
          </CardTitle>

          <CardDescription
            className={`text-[11px] sm:text-xs leading-relaxed transition-all duration-300 ${
              focus ? "text-white/90 line-clamp-none" : "text-white/60 line-clamp-2"
            }`}
          >
            {description}
          </CardDescription>
        </CardHeader>

        {/* Tech Stack Badges wrapped in CardFooter */}
        {techstack && techstack.length > 0 && (
          <CardFooter className="mt-3 flex flex-wrap gap-1 p-0 pt-2 border-t border-white/10">
            {href ? (
              <Link
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex flex-wrap gap-1"
              >
                {techstack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className={`text-[9px] sm:text-[10px] font-normal backdrop-blur-sm transition-all duration-300 ${
                      focus
                        ? "border-primary/40 bg-primary/10 text-white hover:border-primary hover:bg-primary/20"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-primary/50 hover:bg-primary/20 hover:text-white"
                    }`}
                  >
                    {tech}
                  </Badge>
                ))}
              </Link>
            ) : (
              techstack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className={`text-[9px] sm:text-[10px] font-normal backdrop-blur-sm transition-colors duration-300 ${
                    focus
                      ? "border-primary/40 bg-primary/10 text-white"
                      : "border-white/10 bg-white/5 text-white/70"
                  }`}
                >
                  {tech}
                </Badge>
              ))
            )}
          </CardFooter>
        )}
      </div>
    </Card>
  );
};