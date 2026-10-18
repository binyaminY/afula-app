import { Search } from "lucide-react";
import { HeroArt } from "../components/HeroArt";
import { LogoMark } from "../components/Logo";
import { PromoCarousel } from "../components/PromoCarousel";
import { PlaceCard } from "../components/PlaceCard";
import { CATEGORIES, COLLECTIONS } from "../data/places";

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

export function Home({ t, lang, places, onSearch, onCategory, goCity, openPlace, cardProps }) {
  const byId = Object.fromEntries(places.map(p => [p.id, p]));
  const slides = [
    { key: "centennial", emoji: "🎉", title: t.promoCentennial, sub: t.promoCentennialSub, bg: "linear-gradient(135deg,#075E54,#128C7E)", onClick: goCity },
    { key: "movieland", emoji: "🍿", title: t.promoMovie, sub: t.promoMovieSub, bg: "linear-gradient(135deg,#3B2B8F,#6A4CC2)", onClick: () => openPlace("movieland") },
    { key: "maayan-harod", emoji: "💧", title: t.promoSpring, sub: t.promoSpringSub, bg: "linear-gradient(135deg,#0E7490,#22A6C7)", onClick: () => openPlace("maayan-harod") },
    { key: "glitz", emoji: "🏊", title: t.promoGlitz, sub: t.promoGlitzSub, bg: "linear-gradient(135deg,#0F6BB0,#2E9BE0)", onClick: () => openPlace("glitz") },
    { key: "park-chai", emoji: "🦚", title: t.promoPark, sub: t.promoParkSub, bg: "linear-gradient(135deg,#2F7D32,#5DB761)", onClick: () => openPlace("park-chai") },
    { key: "old-market", emoji: "🌙", title: t.promoMarket, sub: t.promoMarketSub, bg: "linear-gradient(135deg,#7A3E1D,#C0682F)", onClick: () => openPlace("old-market") },
  ].filter(s => s.key === "centennial" || byId[s.key]);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <HeroArt />
        <span className="hero-logo"><LogoMark size={92} /></span>
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
