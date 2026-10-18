import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { PlaceCard } from "../components/PlaceCard";
import { CATEGORIES, TAG_LABELS } from "../data/places";

// Hebrew-friendly matching: ignore case, geresh / quote marks and hyphens.
const norm = (s = "") => s.toLowerCase().replace(/["'׳״`\-–—]/g, "").replace(/\s+/g, " ").trim();

function matches(place, query, lang) {
  const q = norm(query);
  if (!q) return true;
  const cat = CATEGORIES.find(c => c.id === place.cat);
  const hay = norm([place.name, place.desc, place.sub, place.address, cat?.label.he, cat?.label[lang]].filter(Boolean).join(" "));
  return q.split(" ").every(word => hay.includes(word));
}

const FILTER_TAGS = ["kosher", "free", "kids", "breakfast", "evening"];

export function SearchView({ t, lang, places, query, setQuery, cat, setCat, tags, setTags, cardProps, autoFocus }) {
  const input = useRef(null);
  const catRow = useRef(null);
  useEffect(() => { if (autoFocus) input.current?.focus(); }, [autoFocus]);

  // The chosen category can sit off-screen in the scrolling row (a tile on the
  // home screen picks it); bring it into view without moving the page.
  useEffect(() => {
    catRow.current?.querySelector('.chip[aria-pressed="true"]')?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [cat]);

  // Places that pass the category, the search text and the given tags.
  const filter = (tagList) => places.filter(p =>
    (cat === "all" || p.cat === cat) &&
    tagList.every(tag => p.tags.includes(tag)) &&
    matches(p, query, lang));

  const results = filter(tags);
  const toggleTag = (tag) => setTags(tags.includes(tag) ? tags.filter(x => x !== tag) : [...tags, tag]);
  const clearAll = () => { setQuery(""); setCat("all"); setTags([]); };
  const filtered = Boolean(query.trim()) || cat !== "all" || tags.length > 0;

  return (
    <section className="section" aria-labelledby="search-title" style={{ marginTop: 16 }}>
      <h1 id="search-title" className="visually-hidden">{t.tabSearch}</h1>
      <form className="search" role="search" style={{ maxWidth: "none", boxShadow: "var(--shadow-sm)" }} onSubmit={e => e.preventDefault()}>
        <Search size={20} aria-hidden="true" style={{ color: "var(--muted)", flexShrink: 0 }} />
        <input ref={input} type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={t.search} aria-label={t.search} autoComplete="off" />
        {query && (
          <button type="button" className="icon-btn" onClick={() => { setQuery(""); input.current?.focus(); }} aria-label={t.close} style={{ width: 38, height: 38 }}>
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </form>

      <div ref={catRow} className="chips" role="group" aria-label={t.categories} style={{ marginTop: 14 }}>
        <button type="button" className="chip" aria-pressed={cat === "all"} onClick={() => setCat("all")}>{t.all}</button>
        {CATEGORIES.map(c => (
          <button key={c.id} type="button" className="chip" aria-pressed={cat === c.id} onClick={() => setCat(cat === c.id ? "all" : c.id)}>
            <span className="emoji" aria-hidden="true">{c.emoji}</span>{c.label[lang]}
          </button>
        ))}
      </div>
      <div className="chips" role="group" aria-label={t.filters}>
        {FILTER_TAGS.map(tag => {
          const on = tags.includes(tag);
          // A filter that would leave nothing is disabled, so you can't pick a dead end.
          const dead = !on && filter([...tags, tag]).length === 0;
          return (
            <button key={tag} type="button" className="chip" aria-pressed={on} disabled={dead} onClick={() => toggleTag(tag)}>
              {TAG_LABELS[tag][lang]}
            </button>
          );
        })}
      </div>

      <p role="status" style={{ margin: "4px 0 12px", color: "var(--muted)", fontWeight: 600, fontSize: ".9rem" }}>
        {results.length ? t.results(results.length) : ""}
      </p>
      {results.length ? (
        <div className="grid">{results.map(p => <PlaceCard key={p.id} place={p} {...cardProps(p)} level={2} />)}</div>
      ) : (
        <div className="empty">
          <div className="emoji" aria-hidden="true">🔎</div>
          <p>{query.trim() ? t.noResults(query.trim()) : t.noMatches}</p>
          {filtered && <button type="button" className="btn btn-ghost" style={{ marginTop: 8 }} onClick={clearAll}>{t.clearFilters}</button>}
        </div>
      )}
    </section>
  );
}
