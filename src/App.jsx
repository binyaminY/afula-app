import { useCallback, useEffect, useMemo, useState } from "react";
import { STRINGS } from "./i18n";
import { CATEGORIES, PLACES } from "./data/places";
import { load, save } from "./lib/storage";
import { TopBar } from "./components/TopBar";
import { BottomNav } from "./components/BottomNav";
import { PlaceSheet } from "./components/PlaceSheet";
import { ProfileSheet } from "./components/ProfileSheet";
import { Logo } from "./components/Logo";
import { Home } from "./views/Home";
import { SearchView } from "./views/SearchView";
import { Saved } from "./views/Saved";
import { City } from "./views/City";

const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));
const A11Y_CLASSES = { largeText: "large-text", highContrast: "hc", grayscale: "gray", underline: "underline", reduceMotion: "reduce-motion" };
const systemTheme = () => (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
const placeFromHash = () => decodeURIComponent((location.hash.match(/place=([^&]+)/) || [])[1] || "") || null;

export default function App() {
  const [lang, setLang] = useState(() => load("afula.lang", "he"));
  const [theme, setTheme] = useState(() => load("afula.theme", null) || systemTheme());
  const [a11y, setA11y] = useState(() => load("afula.a11y", {}));
  const [savedIds, setSavedIds] = useState(() => load("afula.saved", []));
  const [myPlaces, setMyPlaces] = useState(() => load("afula.myPlaces", []));
  const [user, setUser] = useState(() => load("afula.user", null));
  const [tab, setTab] = useState("home");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [tags, setTags] = useState([]);
  const [openId, setOpenId] = useState(placeFromHash);
  const [profileOpen, setProfileOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [focusSearch, setFocusSearch] = useState(false);
  const t = STRINGS[lang] || STRINGS.he;

  useEffect(() => save("afula.lang", lang), [lang]);
  useEffect(() => save("afula.a11y", a11y), [a11y]);
  useEffect(() => save("afula.saved", savedIds), [savedIds]);
  useEffect(() => save("afula.myPlaces", myPlaces), [myPlaces]);
  useEffect(() => save("afula.user", user), [user]);

  // Language, direction, theme and accessibility live on <html>, so the whole
  // page (and the sheets) pick them up from CSS.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = t.dir;
    root.dataset.theme = theme;
    Object.entries(A11Y_CLASSES).forEach(([key, cls]) => root.classList.toggle(cls, Boolean(a11y[key])));
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#111B21" : "#075E54");
  }, [lang, t.dir, theme, a11y]);

  // Back button: every screen, category and open place is a history entry, so
  // Back returns to the previous view instead of leaving the site. A shared
  // link (#place=…) opens its place on top of the home screen.
  useEffect(() => {
    const home = { tab: "home", cat: "all", query: "", tags: [], place: null };
    const sharedPlace = placeFromHash();
    if (history.state?.place !== sharedPlace) history.replaceState(home, "", location.pathname + location.search);
    if (sharedPlace && history.state?.place !== sharedPlace) history.pushState({ ...home, place: sharedPlace }, "", `#place=${encodeURIComponent(sharedPlace)}`);

    const onPop = (e) => {
      const s = e.state || { ...home, place: placeFromHash() };
      setTab(s.tab); setCat(s.cat); setQuery(s.query); setTags(s.tags); setOpenId(s.place);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Filters changed inside the search screen belong to the current entry.
  useEffect(() => {
    if (tab !== "search" || !history.state) return;
    history.replaceState({ ...history.state, cat, query, tags }, "");
  }, [tab, cat, query, tags]);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [tab]);

  const notify = useCallback((text) => {
    setToast(text);
    setTimeout(() => setToast(cur => (cur === text ? null : cur)), 2200);
  }, []);

  const places = useMemo(() => [...PLACES, ...myPlaces], [myPlaces]);
  const placeById = useMemo(() => Object.fromEntries(places.map(p => [p.id, p])), [places]);
  const savedSet = useMemo(() => new Set(savedIds), [savedIds]);

  const toggleSave = useCallback((id) => {
    setSavedIds(ids => (ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]));
  }, []);

  const pushView = (view) => {
    const url = view.place ? `#place=${encodeURIComponent(view.place)}` : location.pathname + location.search;
    history.pushState(view, "", url);
  };
  const openPlace = (id) => {
    setOpenId(id);
    pushView({ tab, cat, query, tags, place: id });
  };
  const closePlace = () => {
    // The sheet is its own history entry, so closing it is a step back.
    if (history.state?.place) history.back();
    else setOpenId(null);
  };

  const cardProps = (p) => ({
    category: CATEGORY_BY_ID[p.cat], saved: savedSet.has(p.id), onToggleSave: toggleSave, onOpen: openPlace, t, lang,
  });

  const goSearch = (q = "", category = "all") => {
    setQuery(q); setCat(category); setTags([]);
    setFocusSearch(!q && category === "all");
    setTab("search");
    pushView({ tab: "search", cat: category, query: q, tags: [], place: null });
  };
  const goTab = (id) => {
    if (id === "search") { if (tab !== "search") goSearch(query, cat); return; }
    if (id === tab && !openId) return;
    setTab(id);
    pushView({ tab: id, cat, query, tags, place: null });
  };

  const addPlace = (form) => {
    const id = `mine-${Date.now()}`;
    const placeCat = CATEGORY_BY_ID[form.cat] ? form.cat : "food";
    setMyPlaces(list => [...list, {
      id, cat: placeCat, emoji: "📍", name: form.name.trim(), desc: form.desc.trim(), address: form.address.trim() || "עפולה",
      phone: form.phone.trim() || undefined, tags: [], mine: true,
    }]);
  };
  const removePlace = (id) => {
    setMyPlaces(list => list.filter(p => p.id !== id));
    setSavedIds(ids => ids.filter(x => x !== id));
  };

  const openedPlace = openId ? placeById[openId] : null;

  return (
    <div className="app">
      <a href="#main" className="skip-link">{t.skip}</a>
      <TopBar t={t} lang={lang} setLang={setLang} theme={theme}
        toggleTheme={() => { const next = theme === "dark" ? "light" : "dark"; setTheme(next); save("afula.theme", next); }}
        a11y={a11y} setA11y={setA11y} user={user} onProfile={() => setProfileOpen(true)} tab={tab} setTab={goTab} />

      <main id="main" className="container" tabIndex={-1} style={{ outline: "none" }}>
        {tab === "home" && (
          <Home t={t} lang={lang} places={places} onSearch={(q) => goSearch(q)} onCategory={(c) => goSearch("", c)}
            openPlace={openPlace} cardProps={cardProps} />
        )}
        {tab === "search" && (
          <SearchView t={t} lang={lang} places={places} query={query} setQuery={setQuery} cat={cat} setCat={setCat}
            tags={tags} setTags={setTags} cardProps={cardProps} autoFocus={focusSearch} />
        )}
        {tab === "saved" && (
          <Saved t={t} lang={lang} savedPlaces={savedIds.map(id => placeById[id]).filter(Boolean)}
            myPlaces={myPlaces} onAdd={addPlace} onRemove={removePlace} cardProps={cardProps} />
        )}
        {tab === "city" && <City t={t} />}

        <footer className="footer">
          <div className="brand"><Logo size={30} /></div>
          {t.footer}
        </footer>
      </main>

      <BottomNav tab={tab} setTab={goTab} t={t} savedCount={savedIds.length} />

      {openedPlace && (
        <PlaceSheet place={openedPlace} category={CATEGORY_BY_ID[openedPlace.cat]} saved={savedSet.has(openedPlace.id)}
          onToggleSave={toggleSave} onClose={closePlace} notify={notify} t={t} lang={lang} />
      )}
      {profileOpen && <ProfileSheet t={t} user={user} setUser={setUser} onClose={() => setProfileOpen(false)} />}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
