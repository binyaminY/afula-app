import { Heart, MapPin } from "lucide-react";
import { TAG_LABELS } from "../data/places";

// One place, Wolt style: a colorful art area with the place's emoji, a heart
// to save it, and name / one-line description / address below. The whole card
// opens the details; the heart is a separate control on top.
export function PlaceCard({ place, category, saved, onToggleSave, onOpen, t, lang, level = 3 }) {
  const Heading = `h${level}`;
  const content = place.mine ? undefined : "he";
  const badges = [];
  if (place.tags.includes("new")) badges.push({ key: "new", cls: "badge new" });
  if (place.tags.includes("free")) badges.push({ key: "free", cls: "badge" });
  if (place.tags.includes("kosher")) badges.push({ key: "kosher", cls: "badge" });

  return (
    <article className="card">
      <div className="card-art" style={{ "--tint": category?.tint }}>
        <span className="emoji" aria-hidden="true">{place.emoji}</span>
        {badges.length > 0 && (
          <div className="card-badges">
            {badges.map(b => <span key={b.key} className={b.cls}>{TAG_LABELS[b.key][lang]}</span>)}
          </div>
        )}
      </div>
      <div className="card-body">
        <Heading className="card-title" lang={content}>{place.name}</Heading>
        <p className="card-desc" lang={content}>{place.desc}</p>
        <div className="card-meta">
          <MapPin size={13} aria-hidden="true" />
          <span lang={content}>{place.address}</span>
        </div>
      </div>
      <button type="button" className="card-link" onClick={() => onOpen(place.id)}
        aria-label={`${place.name} — ${category?.label[lang] ?? ""}`} />
      <button type="button" className="heart" onClick={() => onToggleSave(place.id)}
        aria-pressed={saved} aria-label={`${saved ? t.unsave : t.save}: ${place.name}`}>
        <Heart size={18} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
      </button>
    </article>
  );
}
