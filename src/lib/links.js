// Outbound links for a place. Addresses that are only "עפולה" still get the
// place name in the query, so maps can find it.
const mapQuery = (p) => (p.address && p.address !== "עפולה" ? `${p.name}, ${p.address}` : `${p.name}, עפולה`);

export const wazeUrl = (p) => `https://waze.com/ul?q=${encodeURIComponent(mapQuery(p))}&navigate=yes`;
export const mapsUrl = (p) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery(p))}`;
export const telUrl = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;

// Native share sheet where available, otherwise copy a link to the clipboard.
// Resolves to "shared", "copied" or "failed".
export const sharePlace = async (p) => {
  const url = `${location.origin}${location.pathname}#place=${encodeURIComponent(p.id)}`;
  const data = { title: `${p.name} · AfulaGo`, text: p.desc, url };
  try {
    if (navigator.share) { await navigator.share(data); return "shared"; }
    await navigator.clipboard.writeText(url);
    return "copied";
  } catch (err) {
    return err?.name === "AbortError" ? "shared" : "failed";
  }
};
