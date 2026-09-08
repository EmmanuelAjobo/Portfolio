export default function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
      style={{ zIndex: -10}}
    >
      {/* Base dark fill */}
      <div className="absolute inset-0 bg-[#030303]" />

      {/* Grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Subtle dot at each intersection */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top edge fade */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background: "linear-gradient(to bottom, #030303 0%, transparent 100%)",
        }}
      />

      {/* Bottom edge fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to top, #030303 0%, transparent 100%)",
        }}
      />

      {/* Left edge fade */}
      <div
        className="absolute inset-y-0 left-0 w-24"
        style={{
          background: "linear-gradient(to right, #030303 0%, transparent 100%)",
        }}
      />

      {/* Right edge fade */}
      <div
        className="absolute inset-y-0 right-0 w-24"
        style={{
          background: "linear-gradient(to left, #030303 0%, transparent 100%)",
        }}
      />

      {/* Central radial vignette — keeps focus on content */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(3,3,3,0.65) 100%)",
        }}
      />
    </div>
  );
}
