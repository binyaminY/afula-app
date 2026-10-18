import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const INTERVAL_MS = 5000;
const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("reduce-motion");

// A rotating banner. One slide at a time, scroll-snapped (swipe on phones),
// advancing every few seconds. It pauses while it is hovered, focused or
// touched, can be paused with a button (WCAG 2.2.2), and doesn't autoplay at
// all with reduced motion.
export function PromoCarousel({ slides, t, dir }) {
  const track = useRef(null);
  const slideRefs = useRef([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Hovered, focused or touched. Pressing Play/Pause clears it, so an explicit
  // choice isn't overridden by the focus the click left inside the banner.
  const [engaged, setEngaged] = useState(false);
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(prefersReducedMotion());
    mq?.addEventListener?.("change", update);
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { mq?.removeEventListener?.("change", update); obs.disconnect(); };
  }, []);

  // Which slide is showing, from what has scrolled into view.
  useEffect(() => {
    const root = track.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setIndex(slideRefs.current.indexOf(e.target)); });
    }, { root, threshold: 0.6 });
    slideRefs.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, [slides.length]);

  const goTo = (i, smooth = true) => {
    const n = (i + slides.length) % slides.length;
    // scrollIntoView with inline:start works the same in RTL and LTR.
    slideRefs.current[n]?.scrollIntoView({ inline: "start", block: "nearest", behavior: smooth && !reduced ? "smooth" : "auto" });
  };

  const playing = !paused && !engaged && !reduced && slides.length > 1;
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => goTo(index + 1), INTERVAL_MS);
    return () => clearInterval(id);
  });

  const Prev = dir === "rtl" ? ChevronRight : ChevronLeft;
  const Next = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <section className="carousel" aria-roledescription="carousel" aria-label={t.bannerLabel}
      onMouseEnter={() => setEngaged(true)} onMouseLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setEngaged(false); }}
      onTouchStart={() => setEngaged(true)} onTouchEnd={() => setTimeout(() => setEngaged(false), 4000)}>
      <div ref={track} className="slides" aria-live={playing ? "off" : "polite"}>
        {slides.map((s, i) => (
          <div key={s.key} ref={el => { slideRefs.current[i] = el; }} className="slide-item" role="group"
            aria-roledescription="slide" aria-label={t.slideOf(i + 1, slides.length)} aria-hidden={i === index ? undefined : true}>
            <button type="button" className="slide" onClick={s.onClick} style={{ background: s.bg }} tabIndex={i === index ? 0 : -1}>
              <span className="promo-emoji emoji" aria-hidden="true">{s.emoji}</span>
              <strong>{s.title}</strong>
              <span>{s.sub}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="carousel-bar">
        <button type="button" className="carousel-btn" onClick={() => goTo(index - 1)} aria-label={t.prevBanner}><Prev size={18} aria-hidden="true" /></button>
        <div className="dots">
          {slides.map((s, i) => (
            <button key={s.key} type="button" className="dot" aria-current={i === index ? "true" : undefined}
              aria-label={t.slideOf(i + 1, slides.length)} onClick={() => goTo(i)} />
          ))}
        </div>
        <button type="button" className="carousel-btn" onClick={() => goTo(index + 1)} aria-label={t.nextBanner}><Next size={18} aria-hidden="true" /></button>
        {!reduced && (
          <button type="button" className="carousel-btn" onClick={() => { setPaused(p => !p); setEngaged(false); }} aria-pressed={paused}
            aria-label={paused ? t.playBanners : t.pauseBanners}>
            {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
        )}
      </div>
    </section>
  );
}
