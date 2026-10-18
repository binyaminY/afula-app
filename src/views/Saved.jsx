import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { PlaceCard } from "../components/PlaceCard";
import { Sheet } from "../components/Sheet";
import { CATEGORIES } from "../data/places";

function AddPlaceSheet({ t, lang, onAdd, onClose }) {
  const [form, setForm] = useState({ name: "", desc: "", address: "", phone: "", cat: "food" });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onAdd(form);
    onClose();
  };
  return (
    <Sheet labelledBy="add-title" onClose={onClose}>
      <form className="sheet-body form" onSubmit={submit}>
        <h2 id="add-title">{t.addPlace}</h2>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: ".9rem" }}>{t.addPlaceHint}</p>
        <label className="field">{t.placeName}<input className="input" value={form.name} onChange={set("name")} required /></label>
        <label className="field">{t.placeDesc}<input className="input" value={form.desc} onChange={set("desc")} /></label>
        <label className="field">{t.placeAddress}<input className="input" value={form.address} onChange={set("address")} /></label>
        <label className="field">{t.placePhone}<input className="input" value={form.phone} onChange={set("phone")} dir="ltr" inputMode="tel" /></label>
        <label className="field">{t.placeCat}
          <select className="input" value={form.cat} onChange={set("cat")}>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label[lang]}</option>)}
          </select>
        </label>
        <button type="submit" className="btn btn-primary btn-block">{t.savePlace}</button>
      </form>
    </Sheet>
  );
}

export function Saved({ t, lang, savedPlaces, myPlaces, onAdd, onRemove, cardProps }) {
  const [adding, setAdding] = useState(false);
  return (
    <>
      <section className="section" aria-labelledby="saved-title">
        <div className="section-head"><h1 id="saved-title" style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800 }}>{t.saved}</h1></div>
        {savedPlaces.length ? (
          <div className="grid">{savedPlaces.map(p => <PlaceCard key={p.id} place={p} {...cardProps(p)} level={2} />)}</div>
        ) : (
          <div className="empty panel"><div className="emoji" aria-hidden="true">💚</div><p>{t.savedEmpty}</p></div>
        )}
      </section>

      <section className="section" aria-labelledby="mine-title">
        <div className="section-head">
          <h2 id="mine-title">{t.myPlaces}</h2>
          <button type="button" className="btn btn-primary" style={{ minHeight: 40 }} onClick={() => setAdding(true)}>
            <Plus size={18} aria-hidden="true" />{t.addPlace}
          </button>
        </div>
        {myPlaces.length > 0 && (
          <div className="grid">
            {myPlaces.map(p => (
              <div key={p.id} style={{ position: "relative" }}>
                <PlaceCard place={p} {...cardProps(p)} level={3} />
                <button type="button" className="btn btn-ghost" style={{ marginTop: 8, minHeight: 38, width: "100%" }} onClick={() => onRemove(p.id)}>
                  <Trash2 size={16} aria-hidden="true" />{t.remove}
                </button>
              </div>
            ))}
          </div>
        )}
        <p style={{ color: "var(--muted)", fontSize: ".85rem" }}>{t.addPlaceHint}</p>
      </section>

      {adding && <AddPlaceSheet t={t} lang={lang} onAdd={onAdd} onClose={() => setAdding(false)} />}
    </>
  );
}
