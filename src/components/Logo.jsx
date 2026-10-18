// The site's logo, as it was before the redesign (public/logo.png).
export function LogoMark({ size = 40 }) {
  return <img src="/logo.png" alt="AfulaGo" width={size} height={size} style={{ width: size, height: size, objectFit: "contain", display: "block" }} />;
}

export function Logo({ size = 40 }) {
  return <LogoMark size={size} />;
}
