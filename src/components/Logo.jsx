// The site's logo, as it was before the redesign (public/logo.png).
// The image has a white background, so it gets rounded corners to sit well on
// any surface, including the dark theme.
export function LogoMark({ size = 40 }) {
  return (
    <img src="/logo.png" alt="AfulaGo" width={size} height={size}
      style={{ width: size, height: size, objectFit: "contain", display: "block", borderRadius: Math.round(size * 0.24), background: "#fff" }} />
  );
}

export function Logo({ size = 40 }) {
  return <LogoMark size={size} />;
}
