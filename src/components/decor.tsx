// Small pieces of inline artwork: logo mark, ornament divider and the diya.
// All inline SVG in the brass tone, so there's nothing extra to download.

/** A brass diamond with a painted dot, echoing the Tanjore medallions. */
export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg class="logo-mark" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <rect x="4.5" y="4.5" width="15" height="15" transform="rotate(45 12 12)" fill="none" stroke="currentColor" stroke-width="1.2" />
      <rect x="8" y="8" width="8" height="8" transform="rotate(45 12 12)" fill="none" stroke="currentColor" stroke-width=".8" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    </svg>
  )
}

/** Hairline ─ ◇ ─ divider used under section titles. */
export function Ornament({ class: cls = '' }: { class?: string }) {
  return (
    <svg class={`ornament ${cls}`} viewBox="0 0 120 12" width="120" height="12" aria-hidden="true">
      <path d="M0 6h46M74 6h46" stroke="currentColor" stroke-width=".8" />
      <path d="M60 1.5 64.5 6 60 10.5 55.5 6Z" fill="none" stroke="currentColor" stroke-width=".9" />
      <circle cx="60" cy="6" r="1.2" fill="currentColor" />
      <circle cx="50.5" cy="6" r="1" fill="currentColor" />
      <circle cx="69.5" cy="6" r="1" fill="currentColor" />
    </svg>
  )
}

/** A brass diya. Unlit in light mode, lit (with a soft glow) in dark mode or when `lit`. */
export function Diya({ size = 26, id = 'diya', lit }: { size?: number; id?: string; lit?: boolean }) {
  return (
    <svg class={lit ? 'diya is-lit' : 'diya'} viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stop-color="#F3D9A4" stop-opacity=".8" />
          <stop offset="1" stop-color="#C9A56A" stop-opacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-flame`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#FFF6DA" />
          <stop offset=".5" stop-color="#F2C46B" />
          <stop offset="1" stop-color="#D98A2B" />
        </linearGradient>
        <linearGradient id={`${id}-bowl`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#D8B77A" />
          <stop offset=".55" stop-color="#A8834A" />
          <stop offset="1" stop-color="#7A5C2E" />
        </linearGradient>
      </defs>
      <circle class="diya-glow" cx="20" cy="14" r="14" fill={`url(#${id}-glow)`} />
      <path class="diya-smoke" d="M20 17c-2-2 2-4 0-6s2-4 0-6" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
      <g class="diya-flame">
        <path d="M20 5c3.4 4.4 4.7 7.8 0 13.3-4.7-5.5-3.4-8.9 0-13.3Z" fill={`url(#${id}-flame)`} />
      </g>
      <path d="M20 18.5v3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
      <path d="M5 21.5h30c-1 6.4-7.2 10.6-15 10.6S6 27.9 5 21.5Z" fill={`url(#${id}-bowl)`} />
      <path d="M5 21.5h30" stroke="#7A5C2E" stroke-width="1" />
      <path d="M11 26.5c5.5 2.2 12.5 2.2 18 0" fill="none" stroke="#F3E3BE" stroke-width=".7" opacity=".7" />
    </svg>
  )
}
