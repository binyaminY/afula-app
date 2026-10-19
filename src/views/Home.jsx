import { Search } from "lucide-react";
import { HeroArt } from "../components/HeroArt";
import { PromoCarousel } from "../components/PromoCarousel";
import { PlaceCard } from "../components/PlaceCard";
import { CATEGORIES, COLLECTIONS } from "../data/places";

// Decorative cluster beside the hero text on wide screens (x/y in %, s in px).
const HERO_BUBBLES = [
  { e: "🍕", x: "8%",  y: "6%",  s: "84px", d: "0s" },
  { e: "☕", x: "50%", y: "0%",  s: "72px", d: "-1.5s" },
  { e: "🌳", x: "74%", y: "26%", s: "92px", d: "-3s" },
  { e: "🎬", x: "26%", y: "40%", s: "96px", d: "-4.5s" },
  { e: "🍦", x: "58%", y: "62%", s: "76px", d: "-2s" },
  { e: "🧺", x: "2%",  y: "70%", s: "70px", d: "-5s" },
];

function Rail({ title, places, onSeeAll, cardProps, t }) {
  if (!places.length) return null;
  return (
    <section className="section" aria-label={title}>
      <div className="section-head">
        <h2>{title}</h2>
        {onSeeAll && <button type="button" className="see-all" onClick={onSeeAll}>{t.seeAll} ({places.length})</button>}
      </div>
      <div className="rail">
        {places.map(p => <PlaceCard key={p.id} place={p} {...cardProps(p)} />)}
      </div>
    </section>
  );
}

export function Home({ t, lang, places, onSearch, onCategory, openPlace, cardProps }) {
  const byId = Object.fromEntries(places.map(p => [p.id, p]));
  const slides = [
    { key: "movieland", emoji: "🍿", title: t.promoMovie, sub: t.promoMovieSub, bg: "linear-gradient(135deg,#3B2B8F,#6A4CC2)", onClick: () => openPlace("movieland") },
    { key: "maayan-harod", emoji: "💧", title: t.promoSpring, sub: t.promoSpringSub, bg: "linear-gradient(135deg,#0E7490,#22A6C7)", onClick: () => openPlace("maayan-harod") },
    { key: "glitz", emoji: "🏊", title: t.promoGlitz, sub: t.promoGlitzSub, bg: "linear-gradient(135deg,#0F6BB0,#2E9BE0)", onClick: () => openPlace("glitz") },
    { key: "park-chai", emoji: "🦚", title: t.promoPark, sub: t.promoParkSub, bg: "linear-gradient(135deg,#2F7D32,#5DB761)", onClick: () => openPlace("park-chai") },
    { key: "old-market", emoji: "🌙", title: t.promoMarket, sub: t.promoMarketSub, bg: "linear-gradient(135deg,#7A3E1D,#C0682F)", onClick: () => openPlace("old-market") },
  ].filter(s => byId[s.key]);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <HeroArt />
        <div className="hero-bubbles" aria-hidden="true">
          {HERO_BUBBLES.map(b => (
            <span key={b.e} className="bubble emoji" style={{ "--x": b.x, "--y": b.y, "--s": b.s, "--d": b.d }}>{b.e}</span>
          ))}
        </div>
        <h1 id="hero-title">{t.heroTitle}</h1>
        <p>{t.heroSub}</p>
        <form className="search" role="search" onSubmit={e => { e.preventDefault(); onSearch(new FormData(e.currentTarget).get("q") || ""); }}>
          <input name="q" type="search" placeholder={t.search} aria-label={t.search} autoComplete="off" />
          <button type="submit" className="search-go" aria-label={t.tabSearch}><Search size={20} aria-hidden="true" /></button>
        </form>
        <div className="hero-count">{t.placesCount(places.length)}</div>
      </section>

      <PromoCarousel slides={slides} t={t} dir={t.dir} />

      <section className="section" aria-labelledby="cats-title">
        <div className="section-head"><h2 id="cats-title">{t.categories}</h2></div>
        <div className="cat-rail">
          {CATEGORIES.map(c => (
            <button key={c.id} type="button" className="cat-tile" onClick={() => onCategory(c.id)} style={{ "--tint": c.tint }}>
              <span className="cat-icon emoji" aria-hidden="true">{c.emoji}</span>
              {c.label[lang]}
            </button>
          ))}
        </div>
      </section>

      {COLLECTIONS.map(col => (
        <Rail key={col.id} title={col.title[lang]} places={places.filter(col.pick)} cardProps={cardProps} t={t} />
      ))}

      {CATEGORIES.map(c => (
        <Rail key={c.id} title={`${c.emoji} ${c.label[lang]}`} places={places.filter(p => p.cat === c.id)}
          onSeeAll={() => onCategory(c.id)} cardProps={cardProps} t={t} />
      ))}
    </>
  );
}
