import { BookOpen, Lightbulb, Map as MapIcon, Sparkles } from "lucide-react";
import { HeroArt } from "../components/HeroArt";
import { CITY } from "../data/city";

export function City({ t }) {
  return (
    <>
      <section className="hero" aria-labelledby="city-title">
        <HeroArt />
        <span className="hero-kicker"><Sparkles size={14} aria-hidden="true" />{t.promoCentennial}</span>
        <h1 id="city-title">{t.aboutTitle}</h1>
        <p lang="he">{CITY.intro}</p>
      </section>

      <section className="section">
        <div className="stats" lang="he">
          {CITY.stats.map(s => (
            <div key={s.label} className="stat"><strong>{s.value}</strong><span>{s.label}</span>{s.note && <small>{s.note}</small>}</div>
          ))}
        </div>
      </section>

      <div className="two-col section" lang="he">
        <section className="panel" aria-labelledby="timeline-title">
          <div className="section-head"><h2 id="timeline-title"><BookOpen size={20} aria-hidden="true" style={{ display: "inline", verticalAlign: "-3px", marginInlineEnd: 8 }} />{t.timeline}</h2></div>
          <ol className="timeline">
            {CITY.timeline.map(item => <li key={item.year}><span className="year">{item.year}</span><span>{item.text}</span></li>)}
          </ol>
        </section>

        <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <section className="panel" aria-labelledby="facts-title">
            <div className="section-head"><h2 id="facts-title"><Lightbulb size={20} aria-hidden="true" style={{ display: "inline", verticalAlign: "-3px", marginInlineEnd: 8 }} />{t.didYouKnow}</h2></div>
            <ul className="facts">{CITY.facts.map(f => <li key={f}><span className="emoji" aria-hidden="true">✨</span>{f}</li>)}</ul>
          </section>
          <section className="panel" aria-labelledby="hoods-title">
            <div className="section-head"><h2 id="hoods-title"><MapIcon size={20} aria-hidden="true" style={{ display: "inline", verticalAlign: "-3px", marginInlineEnd: 8 }} />{t.neighborhoods}</h2></div>
            <div className="tags">{CITY.neighborhoods.map(n => <span key={n} className="tag">{n}</span>)}</div>
            <p style={{ margin: "14px 0 0", color: "var(--text-2)", fontSize: ".9rem" }}>{t.mayor}: {CITY.mayor}</p>
          </section>
          <section className="panel sources" aria-labelledby="sources-title">
            <h2 id="sources-title" style={{ margin: "0 0 6px", fontSize: "1rem" }}>{t.sources}</h2>
            {CITY.sources.map(s => <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
          </section>
        </div>
      </div>
    </>
  );
}
