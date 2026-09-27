// Decorative artwork: logo mark, marigold toran, rangoli, sparkles and the diya.
// All inline SVG, so there's nothing extra to download.

export function LogoMark({ id = 'lm', size = 34 }: { id?: string; size?: number }) {
  return (
    <svg class="logo-mark" viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#FF8A00" />
          <stop offset="1" stop-color="#E91E78" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="24" height="24" rx="6" transform="rotate(45 20 20)" fill={`url(#${id})`} />
      <circle cx="20" cy="20" r="8" fill="#FFC53D" />
      <circle cx="20" cy="20" r="6" fill="none" stroke="#fff" stroke-width="1.3" stroke-dasharray="1.4 1.9" />
      <circle cx="20" cy="20" r="2.8" fill="#D81B6E" />
    </svg>
  )
}

// ── Toran: a marigold garland strung across the top of the page ─────────────

const TILE = 64
const swag = (t: number) => {
  // Quadratic curve from (0,4) → (64,4), dipping to y≈16 in the middle.
  const x = TILE * t
  const y = (1 - t) ** 2 * 4 + 2 * (1 - t) * t * 28 + t ** 2 * 4
  return [x, y] as const
}

function Hanging({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <path d="M0 4c-5 4-6 12-1 19 5-7 5-15 1-19Z" fill="#2E9E5B" />
      <path d="M0 4c5 4 6 12 1 19-5-7-5-15-1-19Z" fill="#23864B" />
      <line x1="0" y1="20" x2="0" y2="44" stroke="#C2410C" stroke-width="1" />
      <circle cy="26" r="3.6" fill="#FF8A00" />
      <circle cy="33" r="3.6" fill="#FFC53D" />
      <circle cy="40" r="3.6" fill="#FF8A00" />
      <path d="M-3 45h6l-1.5 8h-3Z" fill="#E91E78" />
    </g>
  )
}

export function Toran() {
  const flowers = Array.from({ length: 9 }, (_, i) => swag(i / 8))
  return (
    <svg class="toran" width="100%" height="56" aria-hidden="true">
      <defs>
        <pattern id="toran-tile" width={TILE} height="56" patternUnits="userSpaceOnUse">
          {flowers.map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r="4.6" fill={i % 2 ? '#FFC53D' : '#FF8A00'} />
              <circle r="2.2" fill={i % 2 ? '#FFB020' : '#F06A00'} />
            </g>
          ))}
          <Hanging x={0} />
          <Hanging x={TILE} />
        </pattern>
      </defs>
      <line x1="0" y1="3" x2="100%" y2="3" stroke="#C2410C" stroke-width="1.5" />
      <rect width="100%" height="56" fill="url(#toran-tile)" />
    </svg>
  )
}

// ── Rangoli ─────────────────────────────────────────────────────────────────

export function Rangoli({ class: cls = '' }: { class?: string }) {
  const ring = (n: number) => Array.from({ length: n }, (_, i) => (360 / n) * i)
  return (
    <svg class={`rangoli ${cls}`} viewBox="-100 -100 200 200" aria-hidden="true">
      <g class="r-dots">
        {ring(24).map((a) => (
          <circle key={a} cx="0" cy="-92" r="3" transform={`rotate(${a})`} />
        ))}
      </g>
      <g class="r-outer">
        {ring(16).map((a) => (
          <path key={a} d="M0-86c9 14 9 28 0 40-9-12-9-26 0-40Z" transform={`rotate(${a})`} />
        ))}
      </g>
      <circle class="r-line" r="44" fill="none" stroke-width="2" stroke-dasharray="3 5" />
      <g class="r-mid">
        {ring(8).map((a) => (
          <path key={a} d="M0-42c14 10 14 24 0 34-14-10-14-24 0-34Z" transform={`rotate(${a + 22.5})`} />
        ))}
      </g>
      <circle class="r-core" r="12" />
      <circle class="r-eye" r="5" />
    </svg>
  )
}

// ── Sparkles ────────────────────────────────────────────────────────────────

const SPARKS = [
  { x: 8, y: 18, s: 18, d: 0 },
  { x: 88, y: 10, s: 14, d: 0.8 },
  { x: 94, y: 62, s: 20, d: 1.6 },
  { x: 4, y: 72, s: 12, d: 2.2 },
  { x: 50, y: 2, s: 10, d: 1.1 },
  { x: 70, y: 90, s: 14, d: 2.8 },
]

export function Sparkles() {
  return (
    <div class="sparkles" aria-hidden="true">
      {SPARKS.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDelay: `${p.d}s` }}
        >
          <path d="M12 0c.8 6.4 4.8 10.4 12 12-7.2 1.6-11.2 5.6-12 12-.8-6.4-4.8-10.4-12-12C7.2 10.4 11.2 6.4 12 0Z" />
        </svg>
      ))}
    </div>
  )
}

// ── Diya (used by the theme toggle and the empty bag) ───────────────────────

export function Diya({ size = 28, id = 'diya', lit }: { size?: number; id?: string; lit?: boolean }) {
  return (
    <svg class={lit ? 'diya is-lit' : 'diya'} viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stop-color="#FFD166" stop-opacity=".85" />
          <stop offset="1" stop-color="#FF8A00" stop-opacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-flame`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#FFF3B0" />
          <stop offset=".45" stop-color="#FFC53D" />
          <stop offset="1" stop-color="#FF6A00" />
        </linearGradient>
        <linearGradient id={`${id}-bowl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#F0782F" />
          <stop offset="1" stop-color="#B8431A" />
        </linearGradient>
      </defs>
      <circle class="diya-glow" cx="20" cy="14" r="14" fill={`url(#${id}-glow)`} />
      <path class="diya-smoke" d="M20 17c-2-2 2-4 0-6s2-4 0-6" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
      <g class="diya-flame">
        <path d="M20 4.5c3.6 4.6 5 8.2 0 14-5-5.8-3.6-9.4 0-14Z" fill={`url(#${id}-flame)`} />
        <path d="M20 11c1.4 2 1.8 3.6 0 5.8-1.8-2.2-1.4-3.8 0-5.8Z" fill="#FFFBEA" />
      </g>
      <path d="M20 18.5v3" stroke="#5B2A12" stroke-width="1.4" stroke-linecap="round" />
      <path d="M4.5 21.5h31c-1 6.6-7.4 11-15.5 11s-14.5-4.4-15.5-11Z" fill={`url(#${id}-bowl)`} />
      <ellipse cx="20" cy="21.5" rx="15.5" ry="2.2" fill="#8E2F10" />
      <circle cx="12" cy="27" r="1.3" fill="#FFC53D" />
      <circle cx="20" cy="28.6" r="1.3" fill="#FFC53D" />
      <circle cx="28" cy="27" r="1.3" fill="#FFC53D" />
    </svg>
  )
}
