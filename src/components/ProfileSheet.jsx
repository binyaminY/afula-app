import { useState } from "react";
import { LogOut, X } from "lucide-react";
import { Sheet } from "./Sheet";
import { LogoMark } from "./Logo";
import { signIn, signUp } from "../lib/auth";

// Optional account. Browsing never needs it.
export function ProfileSheet({ t, user, setUser, onClose }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { setError(t.passwordMin); return; }
    setBusy(true); setError("");
    try {
      const data = mode === "login"
        ? await signIn(form.email.trim(), form.password)
        : await signUp(form.email.trim(), form.password, form.name.trim());
      if (data.error) setError(data.error);
      else if (mode === "register") setDone(t.signedUp);
      else {
        const u = data.user || {};
        setUser({ name: u.user_metadata?.name || form.email.split("@")[0], email: u.email || form.email.trim() });
        onClose();
      }
    } catch {
      setError(t.networkError);
    }
    setBusy(false);
  };

  return (
    <Sheet labelledBy="profile-title" onClose={onClose}>
      <button type="button" className="icon-btn sheet-close" onClick={onClose} aria-label={t.close} style={{ position: "absolute" }}><X size={20} aria-hidden="true" /></button>
      <div className="sheet-body">
        <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 12px" }}><LogoMark size={64} /></div>
        {user ? (
          <div style={{ textAlign: "center" }}>
            <h2 id="profile-title">{t.hello(user.name)}</h2>
            <p style={{ color: "var(--muted)", marginTop: 0 }} dir="ltr">{user.email}</p>
            <button type="button" className="btn btn-ghost btn-block" onClick={() => { setUser(null); onClose(); }}>
              <LogOut size={18} aria-hidden="true" />{t.logout}
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={submit}>
            <h2 id="profile-title" style={{ textAlign: "center" }}>{mode === "login" ? t.login : t.register}</h2>
            <p style={{ margin: 0, textAlign: "center", color: "var(--muted)", fontSize: ".9rem" }}>{t.loginOptional}</p>
            {error && <div className="error" role="alert">{error}</div>}
            {done && <div className="success" role="status">{done}</div>}
            {mode === "register" && <label className="field">{t.fullName}<input className="input" value={form.name} onChange={set("name")} autoComplete="name" required /></label>}
            <label className="field">{t.email}<input className="input" type="email" dir="ltr" value={form.email} onChange={set("email")} autoComplete="email" required /></label>
            <label className="field">{t.password}<input className="input" type="password" dir="ltr" value={form.password} onChange={set("password")} autoComplete={mode === "login" ? "current-password" : "new-password"} required minLength={6} /></label>
            <button type="submit" className="btn btn-primary btn-block" disabled={busy} aria-busy={busy}>{busy ? "…" : mode === "login" ? t.login : t.register}</button>
            <button type="button" className="linklike" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); setDone(""); }}>
              {mode === "login" ? t.noAccount : t.hasAccount}
            </button>
          </form>
        )}
      </div>
    </Sheet>
  );
}
