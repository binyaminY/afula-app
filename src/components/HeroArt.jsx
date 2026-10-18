// Decorative valley behind the hero: Givat HaMoreh and the Gilboa as soft
// layered hills, ploughed fields, and a low sun. Purely visual.
export function HeroArt() {
  return (
    <svg className="hero-art" viewBox="0 0 1200 360" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="hero-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE08A" />
          <stop offset="1" stopColor="#FFB547" />
        </linearGradient>
        <linearGradient id="hero-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1C8F7C" stopOpacity=".55" />
          <stop offset="1" stopColor="#0A6E62" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="hero-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#25D366" stopOpacity=".55" />
          <stop offset="1" stopColor="#128C7E" stopOpacity=".35" />
        </linearGradient>
        <linearGradient id="hero-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B7A6B" />
          <stop offset="1" stopColor="#053F38" />
        </linearGradient>
      </defs>
      <circle cx="210" cy="196" r="64" fill="#FFD36B" opacity=".12" />
      <circle cx="210" cy="196" r="40" fill="url(#hero-sun)" opacity=".9" />
      <path d="M0 210 C 140 150, 260 140, 400 190 S 640 120, 820 170 S 1080 140, 1200 175 V360 H0Z" fill="url(#hero-far)" />
      <path d="M0 250 C 180 200, 330 215, 520 245 S 860 190, 1010 225 S 1150 230, 1200 220 V360 H0Z" fill="url(#hero-mid)" />
      <path d="M0 300 C 220 268, 420 282, 640 300 S 1000 270, 1200 290 V360 H0Z" fill="url(#hero-near)" />
      <g fill="none" stroke="#25D366" strokeOpacity=".28" strokeWidth="3" strokeLinecap="round">
        <path d="M60 325 C 260 305, 460 315, 660 330" />
        <path d="M520 340 C 720 322, 920 330, 1140 318" />
        <path d="M120 350 C 360 338, 600 346, 860 352" />
      </g>
    </svg>
  );
}
