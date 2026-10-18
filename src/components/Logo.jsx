import { useId } from "react";

// The AfulaGo mark: a bottle-green app tile with depth (layered gradient, top
// highlight, inner shadow) holding a map pin. Inside the pin: the valley, a
// green hill (Givat HaMoreh) under a warm sun, above ploughed field lines.
export function LogoMark({ size = 40, title }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs>
        <linearGradient id={`${id}-tile`} x1="8" y1="2" x2="56" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1FA38F" />
          <stop offset=".45" stopColor="#0A6E62" />
          <stop offset="1" stopColor="#043A33" />
        </linearGradient>
        <radialGradient id={`${id}-shine`} cx="22" cy="6" r="34" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity=".45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-pin`} x1="32" y1="10" x2="32" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D9F5E6" />
        </linearGradient>
        <linearGradient id={`${id}-sky`} x1="32" y1="17" x2="32" y2="37" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E8FBEF" />
          <stop offset="1" stopColor="#BFF0D3" />
        </linearGradient>
        <filter id={`${id}-drop`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.4" floodColor="#02231F" floodOpacity=".45" />
        </filter>
        <linearGradient id={`${id}-depth`} x1="0" y1="34" x2="0" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".22" />
        </linearGradient>
        <clipPath id={`${id}-hole`}><circle cx="32" cy="27" r="10" /></clipPath>
      </defs>

      {/* Tile, its shine and a soft inner shadow at the bottom edge */}
      <rect x="2" y="2" width="60" height="60" rx="18" fill={`url(#${id}-tile)`} />
      <rect x="2" y="2" width="60" height="60" rx="18" fill={`url(#${id}-shine)`} />
      <rect x="2.75" y="2.75" width="58.5" height="58.5" rx="17.25" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1.5" />
      <rect x="2" y="2" width="60" height="60" rx="18" fill={`url(#${id}-depth)`} />

      {/* Field lines of the valley */}
      <path d="M8 50c8-4 16-4 24 0s16 4 24 0" fill="none" stroke="#25D366" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 56c7-3 13-3 20 0s13 3 20 0" fill="none" stroke="#25D366" strokeOpacity=".3" strokeWidth="2" strokeLinecap="round" />

      {/* Map pin with depth */}
      <g filter={`url(#${id}-drop)`}>
        <path d="M32 9c-10.5 0-18 7.6-18 17.6C14 39 32 52 32 52s18-13 18-25.4C50 16.6 42.5 9 32 9Z" fill={`url(#${id}-pin)`} />
      </g>
      <path d="M32 9c-10.5 0-18 7.6-18 17.6 0 1.3.2 2.6.5 3.9C16 21 23.4 13.5 32 13.5S48 21 49.5 30.5c.3-1.3.5-2.6.5-3.9C50 16.6 42.5 9 32 9Z" fill="#fff" opacity=".7" />

      {/* The window into the valley */}
      <circle cx="32" cy="27" r="10.6" fill="#0A6E62" opacity=".25" />
      <g clipPath={`url(#${id}-hole)`}>
        <rect x="20" y="15" width="24" height="24" fill={`url(#${id}-sky)`} />
        <circle cx="36.5" cy="23" r="3.4" fill="#FFC83D" />
        <path d="M20 33c4-6 8-8.5 12-8.5s7 2.5 12 7.5V40H20Z" fill="#25D366" />
        <path d="M20 35.5c6-3.5 16-3.5 24 0V40H20Z" fill="#128C7E" />
      </g>
    </svg>
  );
}

export function Logo({ size = 40, wordmark = true }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <LogoMark size={size} />
      {wordmark && <span className="brand-word">Afula<b>Go</b></span>}
    </span>
  );
}
