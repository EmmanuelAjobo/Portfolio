/**
 * Logo reads color from CSS custom properties defined in theme-config.css:
 *   --logo-a / --logo-a-mid / --logo-a-dim   (primary brand color, e.g. mint)
 *   --logo-b / --logo-b-mid / --logo-b-dim   (secondary brand color, e.g. blue)
 *   --logo-gold / --logo-gold-mid / --logo-gold-dim / --logo-gold-pale
 *
 * Override any of those on a parent element to retheme the logo without
 * touching this file:
 *   <div style={{ "--logo-a": "#ff0080" } as React.CSSProperties}>
 *     <Logo />
 *   </div>
 */
export default function Logo({ className = "", size = 120 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Primary brand gradient (mint → blue, or flipped by theme) */}
        <linearGradient id="lgA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   style={{ stopColor: "var(--logo-a)",     stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "var(--logo-a-dim)", stopOpacity: 1 }} />
        </linearGradient>

        {/* Secondary brand gradient */}
        <linearGradient id="lgB" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   style={{ stopColor: "var(--logo-b)",     stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "var(--logo-b-dim)", stopOpacity: 1 }} />
        </linearGradient>

        {/* A→B cross gradient for mixed elements */}
        <linearGradient id="lgAB" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   style={{ stopColor: "var(--logo-a)",     stopOpacity: 1 }} />
          <stop offset="50%"  style={{ stopColor: "var(--logo-a-mid)", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "var(--logo-b)",     stopOpacity: 1 }} />
        </linearGradient>

        {/* Gold gradient – complement, stays fixed */}
        <linearGradient id="lgGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   style={{ stopColor: "var(--logo-gold)",     stopOpacity: 1 }} />
          <stop offset="50%"  style={{ stopColor: "var(--logo-gold-mid)", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "var(--logo-gold-dim)", stopOpacity: 1 }} />
        </linearGradient>

        {/* Particle radial – A highlight → A body */}
        <radialGradient id="rgParticle" cx="35%" cy="30%" r="65%">
          <stop offset="0%"   style={{ stopColor: "var(--logo-a)",     stopOpacity: 1 }} />
          <stop offset="55%"  style={{ stopColor: "var(--logo-a-mid)", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "var(--logo-a-dim)", stopOpacity: 0.7 }} />
        </radialGradient>

        {/* Core radial – gold (complement center) */}
        <radialGradient id="rgCore" cx="40%" cy="35%" r="65%">
          <stop offset="0%"   style={{ stopColor: "var(--logo-gold-pale)", stopOpacity: 1 }} />
          <stop offset="35%"  style={{ stopColor: "var(--logo-b)",      stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "var(--logo-b-dim)",  stopOpacity: 0.5 }} />
        </radialGradient>

        {/* Corona radial – faint gold aura */}
        <radialGradient id="rgCorona" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   style={{ stopColor: "var(--logo-gold)", stopOpacity: 0.35 }} />
          <stop offset="100%" style={{ stopColor: "var(--logo-gold)", stopOpacity: 0 }} />
        </radialGradient>

        {/* Filters */}
        <filter id="fGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="fCoreGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="fLineGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── Halo rings – very slow spins ── */}
      <circle cx="60" cy="60" r="54" stroke="url(#lgAB)" strokeWidth="0.5"
              strokeDasharray="1 7" fill="none" opacity="0.2">
        <animateTransform attributeName="transform" type="rotate"
                          from="0 60 60" to="360 60 60" dur="60s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="60" r="49" stroke="url(#lgB)" strokeWidth="0.4"
              strokeDasharray="2 9" fill="none" opacity="0.22">
        <animateTransform attributeName="transform" type="rotate"
                          from="0 60 60" to="-360 60 60" dur="45s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="60" r="43" stroke="url(#lgAB)" strokeWidth="0.5"
              strokeDasharray="1 5" fill="none" opacity="0.28">
        <animateTransform attributeName="transform" type="rotate"
                          from="0 60 60" to="360 60 60" dur="30s" repeatCount="indefinite" />
      </circle>

      {/* ── Three tilted orbital ellipses (gyroscope feel) ── */}
      <g opacity="0.45">
        <ellipse cx="60" cy="60" rx="35" ry="14" stroke="url(#lgA)"
                 strokeWidth="0.9" fill="none" strokeDasharray="3 4">
          <animateTransform attributeName="transform" type="rotate"
                            from="-30 60 60" to="330 60 60" dur="28s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="60" cy="60" rx="35" ry="14" stroke="url(#lgB)"
                 strokeWidth="0.9" fill="none" strokeDasharray="3 4">
          <animateTransform attributeName="transform" type="rotate"
                            from="90 60 60" to="450 60 60" dur="28s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="60" cy="60" rx="35" ry="14" stroke="url(#lgAB)"
                 strokeWidth="0.9" fill="none" strokeDasharray="3 4">
          <animateTransform attributeName="transform" type="rotate"
                            from="210 60 60" to="570 60 60" dur="28s" repeatCount="indefinite" />
        </ellipse>
      </g>

      {/* ── Triangle edges with flowing dashes ── */}
      <g filter="url(#fLineGlow)" opacity="0.55">
        <line x1="60" y1="25" x2="30" y2="80" stroke="url(#lgAB)" strokeWidth="0.9" strokeDasharray="3 3">
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2.8s" repeatCount="indefinite" />
        </line>
        <line x1="60" y1="25" x2="90" y2="80" stroke="url(#lgAB)" strokeWidth="0.9" strokeDasharray="3 3">
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2.8s" repeatCount="indefinite" />
        </line>
        <line x1="30" y1="80" x2="90" y2="80" stroke="url(#lgAB)" strokeWidth="0.9" strokeDasharray="3 3">
          <animate attributeName="stroke-dashoffset" from="-24" to="0" dur="2.8s" repeatCount="indefinite" />
        </line>
      </g>

      {/* ── Spoke lines: core → particles ── */}
      <g filter="url(#fLineGlow)" opacity="0.7">
        <line x1="60" y1="52" x2="60" y2="30" stroke="url(#lgA)" strokeWidth="1" strokeDasharray="2 2.5">
          <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1.8s" repeatCount="indefinite" />
        </line>
        <line x1="54" y1="64" x2="35" y2="75" stroke="url(#lgA)" strokeWidth="1" strokeDasharray="2 2.5">
          <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2.1s" repeatCount="indefinite" />
        </line>
        <line x1="66" y1="64" x2="85" y2="75" stroke="url(#lgA)" strokeWidth="1" strokeDasharray="2 2.5">
          <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2.4s" repeatCount="indefinite" />
        </line>
      </g>

      {/* ── Hexagonal frames (pulse staggered) ── */}
      <g>
        <path d="M60 13 L71 19.4 L71 32.2 L60 38.6 L49 32.2 L49 19.4 Z"
              stroke="url(#lgA)" strokeWidth="0.6" fill="none">
          <animate attributeName="opacity" values="0.25;0.55;0.25" dur="4s" begin="0s" repeatCount="indefinite" />
        </path>
        <path d="M30 67.5 L41 73.9 L41 86.7 L30 93.1 L19 86.7 L19 73.9 Z"
              stroke="url(#lgB)" strokeWidth="0.6" fill="none">
          <animate attributeName="opacity" values="0.25;0.55;0.25" dur="4s" begin="1.33s" repeatCount="indefinite" />
        </path>
        <path d="M90 67.5 L101 73.9 L101 86.7 L90 93.1 L79 86.7 L79 73.9 Z"
              stroke="url(#lgAB)" strokeWidth="0.6" fill="none">
          <animate attributeName="opacity" values="0.25;0.55;0.25" dur="4s" begin="2.66s" repeatCount="indefinite" />
        </path>
      </g>

      {/* ── Data-flow beads: spoke paths ── */}
      <circle r="1.6" style={{ fill: "var(--logo-a)" }}>
        <animateMotion dur="1.8s" repeatCount="indefinite" path="M60,30 L60,52" />
        <animate attributeName="opacity" values="0;0.9;0" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle r="1.6" style={{ fill: "var(--logo-a)" }}>
        <animateMotion dur="2.1s" repeatCount="indefinite" path="M35,75 L54,64" />
        <animate attributeName="opacity" values="0;0.9;0" dur="2.1s" repeatCount="indefinite" />
      </circle>
      <circle r="1.6" style={{ fill: "var(--logo-a)" }}>
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M85,75 L66,64" />
        <animate attributeName="opacity" values="0;0.9;0" dur="2.4s" repeatCount="indefinite" />
      </circle>

      {/* Bead looping triangle – secondary color */}
      <circle r="1.2" style={{ fill: "var(--logo-b)" }}>
        <animateMotion dur="6s" repeatCount="indefinite" path="M60,25 L90,80 L30,80 Z" />
        <animate attributeName="opacity" values="0.15;0.8;0.15" dur="6s" repeatCount="indefinite" />
      </circle>

      {/* ── Inner neural-net nodes (secondary color) ── */}
      <circle cx="40" cy="47" r="1.4" style={{ fill: "var(--logo-b)" }}>
        <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3.2s" begin="0s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="47" r="1.4" style={{ fill: "var(--logo-b)" }}>
        <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.8s" begin="0.7s" repeatCount="indefinite" />
      </circle>
      <circle cx="49" cy="70" r="1.4" style={{ fill: "var(--logo-b)" }}>
        <animate attributeName="opacity" values="0.25;0.75;0.25" dur="3.6s" begin="1.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="71" cy="70" r="1.4" style={{ fill: "var(--logo-b)" }}>
        <animate attributeName="opacity" values="0.65;0.1;0.65" dur="2.4s" begin="2.1s" repeatCount="indefinite" />
      </circle>

      {/* Inner net edges */}
      <g opacity="0.2" stroke="url(#lgB)" strokeWidth="0.4">
        <line x1="40" y1="47" x2="60" y2="60" />
        <line x1="80" y1="47" x2="60" y2="60" />
        <line x1="49" y1="70" x2="60" y2="60" />
        <line x1="71" y1="70" x2="60" y2="60" />
        <line x1="40" y1="47" x2="49" y2="70" />
        <line x1="80" y1="47" x2="71" y2="70" />
      </g>

      {/* ── Three primary particles (brand A color) ── */}
      <g filter="url(#fGlow)">
        <circle cx="60" cy="25" r="5.5" fill="url(#rgParticle)">
          <animate attributeName="r" values="5;6;5" dur="3s" begin="0s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="25" r="2.2" style={{ fill: "var(--logo-a)" }} opacity="0.5" />
      </g>
      <g filter="url(#fGlow)">
        <circle cx="30" cy="80" r="5.5" fill="url(#rgParticle)">
          <animate attributeName="r" values="5;6;5" dur="3s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="30" cy="80" r="2.2" style={{ fill: "var(--logo-a)" }} opacity="0.5" />
      </g>
      <g filter="url(#fGlow)">
        <circle cx="90" cy="80" r="5.5" fill="url(#rgParticle)">
          <animate attributeName="r" values="5;6;5" dur="3s" begin="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="90" cy="80" r="2.2" style={{ fill: "var(--logo-a)" }} opacity="0.5" />
      </g>

      {/* ── Central core – gold complement ── */}
      <circle cx="60" cy="60" r="16" fill="url(#rgCorona)">
        <animate attributeName="r" values="14;20;14" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="60" r="10" fill="url(#rgCore)" filter="url(#fCoreGlow)">
        <animate attributeName="r" values="9;10.5;9" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="60" r="4.5" style={{ fill: "var(--logo-b-pale)" }} opacity="0.9">
        <animate attributeName="r" values="4;5.2;4" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}