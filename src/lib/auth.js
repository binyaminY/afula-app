// Supabase auth over REST. The anon key is public by design; it only allows
// what the project's auth settings allow.
const SB_URL = "https://voetrktlczxhmmpohjcj.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvZXRya3RsY3p4aG1tcG9oamNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NTE2OTMsImV4cCI6MjA4OTMyNzY5M30.XDY24UJlbBjMPk570U-6TukhHkTf6zEfz9gFr8M4YBA";

const HE_ERRORS = {
  "email rate limit exceeded": "נשלחו יותר מדי בקשות — נסו שוב בעוד כמה דקות",
  "user already registered": "כתובת האימייל כבר רשומה — נסו להתחבר",
  "invalid login credentials": "אימייל או סיסמה שגויים",
  "email not confirmed": "צריך לאשר את האימייל לפני הכניסה",
  "password should be at least 6 characters": "הסיסמה חייבת להכיל לפחות 6 תווים",
  "invalid email": "כתובת אימייל לא תקינה",
  "signup disabled": "ההרשמה סגורה כרגע",
};

const toHebrew = (msg = "") => {
  const lower = msg.toLowerCase();
  for (const [key, he] of Object.entries(HE_ERRORS)) if (lower.includes(key)) return he;
  return "אירעה שגיאה — נסו שוב";
};

const post = async (endpoint, body) => {
  const res = await fetch(`${SB_URL}/auth/v1/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { error: toHebrew(data.error_description || data.msg || data.error?.message || data.message || "") };
  return data;
};

export const signUp = (email, password, name) => post("signup", { email, password, data: { name } });
export const signIn = (email, password) => post("token?grant_type=password", { email, password });
