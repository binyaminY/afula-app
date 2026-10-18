import { useEffect, useRef, useState } from "react";
import { Accessibility, Check, Globe, MapPin, Moon, Sun, User } from "lucide-react";
import { STRINGS } from "../i18n";

// A button with a small panel under it. Closes on outside click and Escape,
// and returns focus to the button.
function Popover({ label, icon, className = "icon-btn", children }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const btn = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (!wrap.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  return (
    <div ref={wrap} style={{ position: "relative" }}>
      <button ref={btn} type="button" className={className} aria-label={label} aria-expanded={open} onClick={() => setOpen(o => !o)}>{icon}</button>
      {open && <div className="popover" role="dialog" aria-label={label}>{children(() => setOpen(false))}</div>}
    </div>
  );
}

const A11Y_OPTIONS = ["largeText", "highContrast", "grayscale", "underline", "reduceMotion"];

export function TopBar({ t, lang, setLang, theme, toggleTheme, a11y, setA11y, user, onProfile, tab, setTab }) {
  const tabs = [["home", t.tabHome], ["search", t.tabSearch], ["saved", t.tabSaved], ["city", t.tabCity]];
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <button type="button" className="loc-pill" onClick={() => setTab("home")} aria-label={`AfulaGo — ${t.location}`}>
          <MapPin size={15} aria-hidden="true" style={{ flexShrink: 0 }} /><span>{t.locationShort}</span>
        </button>
        <nav className="top-nav" aria-label={t.tabHome}>
          {tabs.map(([id, label]) => (
            <button key={id} type="button" aria-current={tab === id ? "page" : undefined} onClick={() => setTab(id)}>{label}</button>
          ))}
        </nav>

        <div className="top-actions">
          <Popover label={t.language} className="icon-btn lang-btn" icon={<><Globe size={17} aria-hidden="true" /><span style={{ marginInlineStart: 6 }}>{lang.toUpperCase()}</span></>}>
            {close => (
              <>
                <h3>{t.language}</h3>
                {Object.entries(STRINGS).map(([code, s]) => (
                  <button key={code} type="button" className="menu-item" role="menuitemradio" aria-checked={lang === code}
                    onClick={() => { setLang(code); close(); }}>
                    <span style={{ width: 18 }}>{lang === code && <Check size={16} aria-hidden="true" />}</span>{s.langName}
                  </button>
                ))}
              </>
            )}
          </Popover>

          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={theme === "dark" ? t.lightTheme : t.theme}>
            {theme === "dark" ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
          </button>

          <Popover label={t.a11y} icon={<Accessibility size={20} aria-hidden="true" />}>
            {() => (
              <>
                <h3>{t.a11yTitle}</h3>
                {A11Y_OPTIONS.map(key => (
                  <button key={key} type="button" role="switch" aria-checked={Boolean(a11y[key])} className="toggle-row"
                    onClick={() => setA11y({ ...a11y, [key]: !a11y[key] })}>
                    {t[key]}<span className="switch" aria-hidden="true" />
                  </button>
                ))}
                <button type="button" className="btn btn-ghost btn-block" style={{ marginTop: 8, minHeight: 42 }} onClick={() => setA11y({})}>{t.reset}</button>
              </>
            )}
          </Popover>

          <button type="button" className="icon-btn" onClick={onProfile} aria-label={`${t.profile} — ${t.hello(user?.name)}`}
            style={user ? { background: "var(--brand-800)", color: "var(--on-brand)", fontWeight: 800 } : undefined}>
            {user?.name ? user.name.trim().charAt(0) : <User size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
