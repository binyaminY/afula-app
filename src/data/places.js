// Places in and around Afula.
//
// Collected in October 2026 from public directories and articles (each place
// keeps its `source`). Opening hours change often, so they are left out except
// where a source gives them; the app tells people to check before going.
// Phones are listed only when a directory shows the business's own number.

export const CATEGORIES = [
  { id: "food",       emoji: "🍽️", tint: "#FFE8D6", label: { he: "אוכל",            en: "Food",            ru: "Еда" } },
  { id: "cafes",      emoji: "☕",  tint: "#F3E7DA", label: { he: "קפה ומאפים",       en: "Cafés & bakeries", ru: "Кафе и выпечка" } },
  { id: "sweets",     emoji: "🍦", tint: "#FDE2EC", label: { he: "גלידה ומתוקים",     en: "Ice cream & sweets", ru: "Мороженое и сладкое" } },
  { id: "fun",        emoji: "🎬", tint: "#E6E3FB", label: { he: "בילוי ופנאי",       en: "Fun & leisure",   ru: "Досуг" } },
  { id: "attractions",emoji: "🎡", tint: "#DCF8C6", label: { he: "אטרקציות בעיר",     en: "In the city",     ru: "В городе" } },
  { id: "nature",     emoji: "🌿", tint: "#D9F2E3", label: { he: "טבע וטיולים",       en: "Nature & trips",  ru: "Природа" } },
  { id: "culture",    emoji: "🏛️", tint: "#E3ECF7", label: { he: "תרבות ומורשת",      en: "Culture & heritage", ru: "Культура" } },
  { id: "shopping",   emoji: "🛍️", tint: "#FFF1C9", label: { he: "קניות",             en: "Shopping",        ru: "Покупки" } },
  { id: "sport",      emoji: "⚽", tint: "#DDF3F8", label: { he: "ספורט וכושר",       en: "Sport & fitness", ru: "Спорт" } },
  { id: "services",   emoji: "🏥", tint: "#FBE3E1", label: { he: "שירותים חיוניים",   en: "Essentials",      ru: "Услуги" } },
];

const SRC = {
  dCafes: "https://www.d.co.il/h-c8930-e0-p0-l0-city7700/",
  b144Food: "https://www.b144.co.il/%D7%9E%D7%A1%D7%A2%D7%93%D7%95%D7%AA/%D7%A2%D7%A4%D7%95%D7%9C%D7%94/",
  b144Fast: "https://www.b144.co.il/%D7%9E%D7%A1%D7%A2%D7%93%D7%95%D7%AA-%D7%9E%D7%96%D7%95%D7%9F-%D7%9E%D7%94%D7%99%D7%A8/%D7%A2%D7%A4%D7%95%D7%9C%D7%94/",
  b144Pizza: "https://www.b144.co.il/%D7%A4%D7%99%D7%A6%D7%A8%D7%99%D7%95%D7%AA/%D7%A2%D7%A4%D7%95%D7%9C%D7%94/",
  b144Oriental: "https://www.b144.co.il/%D7%9E%D7%A1%D7%A2%D7%93%D7%95%D7%AA-%D7%9E%D7%96%D7%A8%D7%97%D7%99%D7%95%D7%AA/%D7%A2%D7%A4%D7%95%D7%9C%D7%94/",
  b144Ice: "https://www.b144.co.il/%D7%92%D7%9C%D7%99%D7%93%D7%A8%D7%99%D7%95%D7%AA/%D7%A2%D7%A4%D7%95%D7%9C%D7%94/",
  b144Bakery: "https://www.b144.co.il/%D7%9E%D7%90%D7%A4%D7%99%D7%95%D7%AA/%D7%A2%D7%A4%D7%95%D7%9C%D7%94/",
  b144Gym: "https://www.b144.co.il/%D7%97%D7%93%D7%A8%D7%99-%D7%9B%D7%95%D7%A9%D7%A8/%D7%A2%D7%A4%D7%95%D7%9C%D7%94/",
  rest: "https://www.rest.co.il/restaurants/afula/",
  wiki: "https://he.wikipedia.org/wiki/%D7%A2%D7%A4%D7%95%D7%9C%D7%94",
  tiuliDay: "https://tiuli.com/articles/1753/-136",
  tiuliFrench: "https://www.tiuli.com/restaurants/347/",
  karamelGlitz: "https://www.karamel.co.il/%D7%A4%D7%90%D7%A8%D7%A7_%D7%92%D7%9C%D7%99%D7%A6_-_%D7%A2%D7%A4%D7%95%D7%9C%D7%94.asp",
  karamel: "https://www.karamel.co.il/%D7%90%D7%98%D7%A8%D7%A7%D7%A6%D7%99%D7%95%D7%AA_%D7%91%D7%A2%D7%A4%D7%95%D7%9C%D7%94.asp",
  iceMovieland: "https://www.ice.co.il/culture/news/article/1068442",
  maariv: "https://www.maariv.co.il/news/israel/article-1225868",
  mako34: "https://www.mako.co.il/food-restaurants/restaurant-news/Article-5d309a1c536ef61026.htm",
  sport: "https://www.israelhayom.co.il/article/675503",
};

// tags: kosher · free · kids · evening · breakfast · new · popular
export const PLACES = [
  // ── Food ──────────────────────────────────────────────────────────────────
  { id: "hashuk34", cat: "food", sub: "מסעדת שף", emoji: "🥩", name: "השוק 34", desc: "מסעדת שוק באווירה רגועה עם תפריט רחב בהשראת תל אביב: סביצ'ה, גרבלקס, דג על הפלנצ'ה וקינוחים שזוכים לשבחים.", address: "השוק 34, עפולה", tags: ["evening", "popular"], source: SRC.mako34 },
  { id: "esterika", cat: "food", sub: "אוכל ביתי", emoji: "🍲", name: "אסתריקה (מבית טומיקה)", desc: "אוכל ביתי בשרי וקייטרינג. בימי שישי מוכרים אוכל ביתי במשקל, ויש גם אירוח לאירועים משפחתיים.", address: "התוכנה 4, עפולה", tags: ["kosher"], source: SRC.b144Food },
  { id: "samurai", cat: "food", sub: "יפני", emoji: "🍣", name: "סמוראיו — סושי בר", desc: "מסעדה יפנית כשרה: סושי, ראשונות ומנות אסייתיות.", address: "הנשיא ויצמן 25, עפולה", phone: "053-6285296", tags: ["kosher", "evening"], source: SRC.rest },
  { id: "petite-france", cat: "food", sub: "איטלקי וקפה", emoji: "🍝", name: "הצרפתיה הקטנה", desc: "בית קפה־מסעדה ותיק ליד התחנה המרכזית: ארוחות בוקר, פסטות ומנות איטלקיות, עם תפריט ילדים.", address: "שפרינצק 5, עפולה", tags: ["breakfast", "kids", "popular"], source: SRC.tiuliFrench },
  { id: "ilan-sdera", cat: "food", sub: "בשרי", emoji: "🍖", name: "אילן בשדרה", desc: "מסעדה בשרית על שדרות ארלוזורוב.", address: "שדרות ארלוזורוב 24, עפולה", tags: [], source: SRC.b144Fast },
  { id: "burger-vibe", cat: "food", sub: "המבורגר", emoji: "🍔", name: "בורגר וייב", desc: "המבורגרים על השדרה — ארוחה מהירה ומשביעה.", address: "ארלוזורוב 24, עפולה", phone: "077-3530103", tags: ["evening"], source: SRC.b144Fast },
  { id: "amos-1", cat: "food", sub: "שיפודים", emoji: "🍢", name: "שיפודי עמוס", desc: "שווארמה ושיפודים על האש.", address: "העצמאות 11, עפולה", tags: [], source: SRC.b144Fast },
  { id: "amos-2", cat: "food", sub: "שיפודים", emoji: "🍢", name: "שיפודי עמוס — ויצמן", desc: "הסניף ברחוב הנשיא ויצמן: שווארמה ושיפודים.", address: "הנשיא וייצמן 8, עפולה", tags: [], source: SRC.b144Fast },
  { id: "hachesed", cat: "food", sub: "שיפודים", emoji: "🍢", name: "שיפודי החסד", desc: "שיפודייה שכונתית.", address: "קפלן 6, עפולה", tags: [], source: SRC.b144Fast },
  { id: "hasabich", cat: "food", sub: "רחוב", emoji: "🥙", name: "הסביח", desc: "סביח בפיתה — חציל, ביצה, עמבה וכל התוספות, בלב השוק.", address: "השוק 24, עפולה", tags: ["popular"], source: SRC.b144Fast },
  { id: "shawarmos", cat: "food", sub: "רחוב", emoji: "🌯", name: "שווארמוס", desc: "חומוסייה ושווארמה.", address: "קהילת ציון 4, עפולה", phone: "04-6597550", tags: [], source: SRC.rest },
  { id: "pacho", cat: "food", sub: "רחוב", emoji: "🌮", name: "פאצ'ו אקספרס", desc: "אוכל מהיר בשוק.", address: "השוק 5, עפולה", phone: "04-6588088", tags: [], source: SRC.rest },
  { id: "schnekins", cat: "food", sub: "מזון מהיר", emoji: "🥪", name: "שנקינס — שניצל", desc: "שניצל בבאגט, בפיתה או בצלחת.", address: "הנשיא וייצמן 14, עפולה", tags: [], source: SRC.b144Fast },
  { id: "mr-potato", cat: "food", sub: "מזון מהיר", emoji: "🥔", name: "מיסטר פוטטו", desc: "תפוחי אדמה ממולאים וצ'יפס.", address: "שפרינצק 2, עפולה", tags: [], source: SRC.b144Fast },
  { id: "mcdonalds", cat: "food", sub: "מזון מהיר", emoji: "🍟", name: "מקדונלד'ס", desc: "רשת ההמבורגרים — ארוחות, שייקים וקפה.", address: "חטיבה תשע, עפולה", tags: ["kids"], source: SRC.rest },
  { id: "abu-mahran", cat: "food", sub: "מזרחי", emoji: "🥗", name: "אבו מהראן ובניו", desc: "מסעדה מזרחית: סלטים, בשרים על האש ומנות בית.", address: "קהילת ציון 35, עפולה", tags: [], source: SRC.b144Oriental },
  { id: "mataamei", cat: "food", sub: "מזרחי", emoji: "🍛", name: "מטעמי המזרח", desc: "אוכל מזרחי ביתי.", address: "קהילת ציון 58, עפולה", tags: [], source: SRC.b144Food },
  { id: "pizza-munch", cat: "food", sub: "פיצה", emoji: "🍕", name: "פיצה מאנצ'", desc: "פיצריה במרכז העיר.", address: "יהושע חנקין 15, עפולה", tags: [], source: SRC.b144Pizza },
  { id: "mikeys", cat: "food", sub: "פיצה", emoji: "🍕", name: "Mikey's — פיצה מקומית", desc: "פיצה מקומית.", address: "ברנר 3, עפולה", tags: [], source: SRC.b144Pizza },
  { id: "pizza-peak", cat: "food", sub: "פיצה", emoji: "🍕", name: "פיצה פיק", desc: "פיצריה שכונתית.", address: "משה שרת 6, עפולה", tags: [], source: SRC.b144Pizza },
  { id: "pizza-shemesh", cat: "food", sub: "פיצה", emoji: "🍕", name: "פיצה שמש", desc: "פיצריה שכונתית.", address: "משה שרת 3, עפולה", tags: [], source: SRC.b144Pizza },
  { id: "pizza-elkana", cat: "food", sub: "פיצה", emoji: "🍕", name: "פיצה אלקנה", desc: "פיצריה שכונתית.", address: "עלית הנוער 4, עפולה", tags: [], source: SRC.b144Pizza },
  { id: "pizza-hut", cat: "food", sub: "פיצה", emoji: "🍕", name: "פיצה האט", desc: "סניף הרשת — פיצות במשלוח ובאיסוף.", address: "חטיבה תשע, עפולה", tags: ["kids"], source: SRC.b144Pizza },
  { id: "piazza", cat: "food", sub: "פיצה", emoji: "🍕", name: "פיאצה", desc: "פיצריה ברחוב חטיבה תשע.", address: "חטיבה תשע 30, עפולה", tags: [], source: SRC.b144Pizza },
  { id: "rimini", cat: "food", sub: "פיצה", emoji: "🍕", name: "פיצריה רימיני", desc: "פיצריה ותיקה ברחוב ויצמן.", address: "הנשיא וייצמן 14, עפולה", tags: [], source: SRC.b144Food },
  { id: "haoman", cat: "food", sub: "פיצה", emoji: "🍕", name: "גלידריית ופיצת האומן", desc: "פיצה וגלידה באותו מקום — מושלם למשפחות.", address: "פנקס צבי 2, עפולה", tags: ["kids"], source: SRC.b144Pizza },

  // ── Cafés & bakeries ──────────────────────────────────────────────────────
  { id: "landwer-g", cat: "cafes", emoji: "☕", name: "לנדוור — ג'י בעמק", desc: "בית קפה־מסעדה: ארוחות בוקר, פסטות, סלטים וקפה.", address: "שד' יצחק רבין 18, מתחם ג'י בעמק, עפולה", phone: "053-9380603", tags: ["breakfast"], source: SRC.rest },
  { id: "landwer-k", cat: "cafes", emoji: "☕", name: "לנדוור כשר", desc: "הסניף הכשר של לנדוור באזור התעשייה — חלבי.", address: "המלאכה 21, עפולה", phone: "04-9022040", tags: ["kosher", "breakfast"], source: SRC.rest },
  { id: "aroma-hankin", cat: "cafes", emoji: "☕", name: "ארומה — חנקין", desc: "אספרסו בר: קפה, כריכים וסלטים.", address: "יהושע חנקין 48, עפולה", phone: "04-6896050", tags: ["breakfast"], source: SRC.dCafes },
  { id: "aroma-g", cat: "cafes", emoji: "☕", name: "ארומה — ג'י בעמק", desc: "אספרסו בר במתחם ג'י בעמק.", address: "שד' יצחק רבין 18, מתחם ג'י בעמק, עפולה", phone: "04-6492424", tags: [], source: SRC.dCafes },
  { id: "greg", cat: "cafes", emoji: "☕", name: "קפה גרג", desc: "בית קפה של הרשת — ארוחות בוקר, סלטים ומאפים.", address: "השוק 13, עפולה", phone: "04-6490011", tags: ["breakfast"], source: SRC.dCafes },
  { id: "greg-kitchen", cat: "cafes", emoji: "🍳", name: "גרג קיטשן", desc: "בית קפה־מסעדה במתחם ג'י בעמק.", address: "שד' יצחק רבין 18, מתחם ג'י בעמק, עפולה", phone: "04-6493344", tags: ["breakfast"], source: SRC.dCafes },
  { id: "cafe-cafe-mall", cat: "cafes", emoji: "☕", name: "קפה קפה — קניון העמקים", desc: "בית קפה בקניון העמקים.", address: "יהושע חנקין 14, קניון העמקים, עפולה", phone: "04-6404083", tags: [], source: SRC.dCafes },
  { id: "cafe-cafe-illit", cat: "cafes", emoji: "☕", name: "קפה קפה — עפולה עילית", desc: "בית קפה בעפולה עילית.", address: "החרט 8, עפולה עילית", phone: "04-8384423", tags: [], source: SRC.dCafes },
  { id: "roladin", cat: "cafes", emoji: "🥐", name: "רולדין", desc: "קונדיטוריה ובית קפה: מאפים, עוגות וקפה.", address: "השוק 13, עפולה", phone: "04-6492333", tags: [], source: SRC.dCafes },
  { id: "amfm", cat: "cafes", emoji: "🥐", name: "בורקס בר AM:FM", desc: "בורקס טרי וקפה. כשר.", address: "ירושלים 17, עפולה", phone: "04-8200053", tags: ["kosher", "breakfast"], source: SRC.rest },
  { id: "french-bakery", cat: "cafes", emoji: "🥖", name: "בית מאפה צרפתי", desc: "מאפייה ובית מאפה ברובע יזרעאל.", address: "שדרות רובע יזרעאל, עפולה", phone: "04-6147177", tags: ["breakfast"], source: SRC.dCafes },
  { id: "khachapuri-ziva", cat: "cafes", emoji: "🫓", name: "חצ'פורי זיוה", desc: "מאפייה גיאורגית ביתית — חצ'פורי ומאפים.", address: "משה שרת 3, עפולה", phone: "04-8323111", tags: ["popular"], source: SRC.dCafes },
  { id: "bracha-moshe", cat: "cafes", emoji: "🍞", name: "מאפיית ברכת משה", desc: "סניף מאפיית ברכת משה — לחמים, חלות ומאפים.", address: "הנשיא וייצמן 17, עפולה", tags: [], source: SRC.b144Bakery },
  { id: "cofix-weizman", cat: "cafes", emoji: "🥤", name: "Cofix — ויצמן", desc: "קפה ומאפים במחיר אחיד וזול.", address: "הנשיא ויצמן 2, עפולה", phone: "053-9377296", tags: [], source: SRC.dCafes },
  { id: "cofix-g", cat: "cafes", emoji: "🥤", name: "Cofix — ג'י בעמק", desc: "קפה ומאפים במחיר אחיד וזול.", address: "שד' יצחק רבין 18, מתחם ג'י בעמק, עפולה", phone: "053-9377296", tags: [], source: SRC.dCafes },
  { id: "super-cofix", cat: "cafes", emoji: "🛒", name: "Super Cofix", desc: "סופר במחירים אחידים, עם פינת קפה.", address: "חטיבה תשע 34, עפולה", tags: [], source: SRC.dCafes },
  { id: "cofizz", cat: "cafes", emoji: "🥤", name: "Cofizz", desc: "קפה, שתייה ומאפים בזול על השדרה.", address: "שד' ארלוזורוב 4, עפולה", phone: "050-9018650", tags: [], source: SRC.dCafes },

  // ── Ice cream & sweets ───────────────────────────────────────────────────
  { id: "leggenda", cat: "sweets", emoji: "🍨", name: "לג'נדה — LEGGENDA", desc: "גלידריה איטלקית במרכז העיר.", address: "יהושע חנקין 9, עפולה", phone: "04-9000015", tags: ["kids", "evening", "popular"], source: SRC.rest },
  { id: "yokler", cat: "sweets", emoji: "🍦", name: "יוקלר", desc: "גלידריה.", address: "חטיבה תשע 9, עפולה", tags: ["kids"], source: SRC.b144Ice },
  { id: "shokonil", cat: "sweets", emoji: "🍫", name: "שוקוניל", desc: "גלידה ומתוקים במתחם ג'י בעמק.", address: "שדרות יצחק רבין 18, עפולה", tags: ["kids"], source: SRC.b144Ice },
  { id: "yogiz", cat: "sweets", emoji: "🍧", name: "Yogiz", desc: "פרוזן יוגורט ותוספות על השדרה.", address: "שדרות ארלוזורוב 22, עפולה", tags: ["kids"], source: SRC.b144Ice },
  { id: "shosho", cat: "sweets", emoji: "🧁", name: "שושו — סודות מתוקים", desc: "גלידה ומתוקים.", address: "קהילת ציון 20, עפולה", phone: "052-5502045", tags: [], source: SRC.b144Ice },

  // ── Fun & leisure ────────────────────────────────────────────────────────
  { id: "movieland", cat: "fun", emoji: "🎬", name: "מובילנד עפולה", desc: "בית הקולנוע של העיר, שנפתח ביוני 2025 אחרי יותר מעשור בלי קולנוע: שמונה אולמות חווייתיים, עם ספות ומילוי חוזר חינם.", address: "מתחם בלו וואלי, עפולה", tags: ["new", "evening", "kids", "popular"], source: SRC.iceMovieland },
  { id: "glitz", cat: "fun", emoji: "🏊", name: "פארק המים גליץ'", desc: "פארק מים קיצי בעפולה עילית: מגלשות, בריכה חצי־אולימפית, בריכת ילדים ובריכת פעוטות מוצלת, ונגישות מלאה. פתוח בעונת הקיץ, תושבי עפולה נהנים ממחיר מוזל.", address: "מרדכי גור 6, עפולה עילית", tags: ["kids", "popular"], hours: "בקיץ: א'–ה' 16:00–20:00 · ו' 12:00–17:00 · שבת 10:00–17:00", source: SRC.karamelGlitz },
  { id: "old-market", cat: "fun", emoji: "🌙", name: "השוק הישן — בילוי בערב", desc: "השוק הוותיק של העיר, שהעירייה מקדמת כמרכז חיי הלילה: מסעדות שף, פאבים וברים בין סמטאות השוק.", address: "רחוב השוק, עפולה", tags: ["evening"], source: SRC.maariv },

  // ── In the city ──────────────────────────────────────────────────────────
  { id: "park-chai", cat: "attractions", emoji: "🦚", name: "פארק חי העמק", desc: "הפארק הגדול של העיר, בכניסה חופשית: פינת חי עם גמלים, עזים, כבשים וטווסים, מתחם מזרקות ענק, קיר טיפוס, פארק חבלים, גן שעשועים ומסלולי הליכה ורכיבה.", address: "רובע יזרעאל, עפולה", tags: ["free", "kids", "popular"], source: SRC.tiuliDay },
  { id: "train-park", cat: "attractions", emoji: "🚂", name: "פארק הרכבת", desc: "פארק במרכז העיר. כאן נערך פסטיבל האוכל העירוני AFOODIS בחול המועד סוכות, ובעירייה מתכננים להקים בו מתחם קולינרי.", address: "מרכז עפולה", tags: ["free", "kids"], source: SRC.maariv },
  { id: "market", cat: "attractions", emoji: "🧺", name: "שוק עפולה", desc: "השוק העירוני: ירקות, פירות, תבלינים, מאפים ואוכל רחוב. כדאי להגיע בבוקר.", address: "רחוב השוק, עפולה", tags: [], source: SRC.wiki },
  { id: "arlozorov", cat: "attractions", emoji: "🌴", name: "שדרות ארלוזורוב", desc: "השדרה ההיסטורית של העיר עם דקלי הוושינגטוניה. עד שנות ה־80 הייתה המרכז המסחרי של עפולה, והיום יש בה בתי קפה וגלידריות.", address: "שדרות ארלוזורוב, עפולה", tags: ["free"], source: SRC.wiki },
  { id: "givat-hamore", cat: "attractions", emoji: "⛰️", name: "גבעת המורה", desc: "ההר שמתנשא מעל העיר. במורדותיו בית החולים העמק והשכונה בשם זה, ומהשבילים נשקף נוף רחב לעמק יזרעאל.", address: "גבעת המורה, עפולה", tags: ["free"], source: SRC.wiki },

  // ── Nature & trips nearby ────────────────────────────────────────────────
  { id: "maayan-harod", cat: "nature", emoji: "💧", name: "גן לאומי מעיין חרוד", desc: "מי מעיין קרירים נובעים ממערת גדעון וזורמים לבריכת שכשוך גדולה, עם מדשאות, צל, שולחנות פיקניק וחניון לילה. כדאי להירשם מראש באתר רשות הטבע והגנים.", address: "למרגלות הגלבוע, ליד עפולה", tags: ["kids", "popular"], nearby: true, source: SRC.tiuliDay },
  { id: "beit-hankin", cat: "nature", emoji: "🏡", name: "בית חנקין", desc: "ביתו של יהושע חנקין, גואל אדמות העמק, שהפך למוזיאון קטן בתוך גן לאומי מעיין חרוד.", address: "גן לאומי מעיין חרוד", tags: [], nearby: true, source: SRC.tiuliDay },
  { id: "pnei-haemek", cat: "nature", emoji: "🕯️", name: "אנדרטת \"פני העמק\"", desc: "יצירת ברזל של האמן דוד פלומבו לזכר בני העמק שנפלו, ליד בית חנקין.", address: "גן לאומי מעיין חרוד", tags: ["free"], nearby: true, source: SRC.tiuliDay },
  { id: "gilboa", cat: "nature", emoji: "🌸", name: "הר הגלבוע", desc: "רכס עם תצפיות לעמק, דרך נוף ושבילים. בסוף החורף פורח בו אירוס הגלבוע הסגול.", address: "הר הגלבוע, מזרחית לעפולה", tags: ["free"], nearby: true, source: SRC.tiuliDay },
  { id: "megiddo", cat: "nature", emoji: "🏺", name: "גן לאומי תל מגידו", desc: "תל עתיק ואתר מורשת עולמית של אונסק\"ו, עם שכבות של אלפי שנות היסטוריה ומערכת מים קדומה.", address: "צומת מגידו, מערבית לעפולה", tags: [], nearby: true, source: SRC.wiki },
  { id: "katufoti", cat: "nature", emoji: "🍓", name: "קטופותי — בית לחם הגלילית", desc: "קטיף עצמי משפחתי של פירות וירקות עונתיים, החל מ־50 ₪.", address: "מושב בית לחם הגלילית", tags: ["kids"], nearby: true, source: SRC.karamel },

  // ── Culture & heritage ───────────────────────────────────────────────────
  { id: "heichal", cat: "culture", emoji: "🎭", name: "היכל התרבות עפולה", desc: "אולם המופעים של העיר — הצגות, הופעות ומוזיקה, עם גלריה עירונית לצידו. נבנה על בסיס בית קולנוע ישן.", address: "עפולה", tags: ["evening"], source: SRC.wiki },
  { id: "tel-afula", cat: "culture", emoji: "🏺", name: "תל עפולה", desc: "תל עתיק בלב העיר עם עשר שכבות יישוב, כולל סרקופגים מהמאות ה־2 עד ה־4 לספירה.", address: "מרכז עפולה", tags: ["free"], source: SRC.wiki },
  { id: "synagogue", cat: "culture", emoji: "🕍", name: "בית הכנסת הגדול", desc: "בית הכנסת ההיסטורי של העיר, שנבנה בשנים 1928–1932 לפי תכנון האדריכל זליג אקסלרוד.", address: "מרכז עפולה", tags: [], source: SRC.wiki },
  { id: "water-tower", cat: "culture", emoji: "🗼", name: "מגדל המים ותחנת רכבת העמק", desc: "שרידי רכבת העמק ההיסטורית: הטורקים הקימו כאן תחנה ב־1905, ומגדל המים הישן שימש את הקטרים.", address: "עפולה", tags: ["free"], source: SRC.wiki },
  { id: "conservatory", cat: "culture", emoji: "🎻", name: "הקונסרבטוריון העירוני", desc: "בית הספר למוזיקה של העיר, ובו פועלת התזמורת הייצוגית של עפולה.", address: "עפולה", tags: ["kids"], source: SRC.wiki },
  { id: "library", cat: "culture", emoji: "📚", name: "הספרייה העירונית", desc: "ספרייה ציבורית עם השאלת ספרים ופעילויות.", address: "עפולה", tags: ["free", "kids"], source: SRC.wiki },

  // ── Shopping ─────────────────────────────────────────────────────────────
  { id: "g-baemek", cat: "shopping", emoji: "🛍️", name: "מתחם ג'י בעמק", desc: "מתחם הקניות הפתוח הגדול של העיר: רשתות אופנה, בתי קפה ומסעדות במקום אחד.", address: "שד' יצחק רבין 18, עפולה", tags: ["popular"], source: SRC.dCafes },
  { id: "hamakim", cat: "shopping", emoji: "🏬", name: "קניון העמקים", desc: "הקניון של העיר, שהתמתג כאאוטלט. יש בו גם קפה קפה וסניף של משרד הרישוי.", address: "יהושע חנקין 14, עפולה", tags: [], source: SRC.maariv },
  { id: "carrefour", cat: "shopping", emoji: "🛒", name: "קרפור עפולה", desc: "סניף רשת הסופרמרקטים.", address: "עפולה", tags: [], source: SRC.maariv },
  { id: "market-shop", cat: "shopping", emoji: "🧺", name: "שוק עפולה — קניות", desc: "ירקות ופירות, תבלינים, גבינות ומאפים, במחירי שוק.", address: "רחוב השוק, עפולה", tags: [], source: SRC.wiki },

  // ── Sport & fitness ──────────────────────────────────────────────────────
  { id: "stadium", cat: "sport", emoji: "⚽", name: "האצטדיון העירוני — הפועל עפולה", desc: "הבית של מועדון הכדורגל הפועל עפולה. האצטדיון משמש גם קבוצות מהאזור.", address: "עפולה", tags: ["evening"], source: SRC.sport },
  { id: "hapoel-emek", cat: "sport", emoji: "🏀", name: "הפועל העמק — כדורסל", desc: "מעונת 2025/26 קבוצת הכדורסל של עפולה התאחדה לקבוצה אזורית בשם הפועל העמק.", address: "עפולה", tags: [], source: SRC.sport },
  { id: "one-gym", cat: "sport", emoji: "🏋️", name: "ONE — מכון כושר", desc: "מכון כושר עם חדר כושר מאובזר.", address: "מנחם בגין, עפולה", tags: [], source: SRC.b144Gym },

  // ── Essentials ───────────────────────────────────────────────────────────
  { id: "haemek", cat: "services", emoji: "🏥", name: "בית החולים העמק", desc: "בית החולים האזורי של העמק, שהוקם ב־1923 במורדות גבעת המורה. חדר מיון פתוח 24/7.", address: "שדרות יצחק רבין, עפולה", phone: "04-6494000", tags: [], source: SRC.wiki },
  { id: "train", cat: "services", emoji: "🚆", name: "תחנת רכבת עפולה", desc: "על קו העמק בין חיפה לבית שאן (נחנך ב־2016). רכבת פעם בשעה, ובשעות העומס פעמיים בשעה.", address: "שכונת C1, עפולה", tags: [], source: SRC.wiki },
  { id: "bus", cat: "services", emoji: "🚌", name: "המרכז התחבורתי", desc: "התחנה המרכזית החדשה של העיר, שנפתחה בסוף 2020 במקום התחנה הוותיקה.", address: "עפולה", tags: [], source: SRC.wiki },
  { id: "municipality", cat: "services", emoji: "🏛️", name: "עיריית עפולה", desc: "שירותי העירייה, אירועים עירוניים ומידע לתושבים.", address: "עפולה", url: "https://www.afula.muni.il/", tags: [], source: "https://www.afula.muni.il/" },
];

// Wolt-style rails on the home screen. Each picks places by a rule.
export const COLLECTIONS = [
  { id: "popular",   title: { he: "הכי פופולרי בעפולה", en: "Most popular in Afula", ru: "Популярное в Афуле" }, pick: p => p.tags.includes("popular") },
  { id: "breakfast", title: { he: "בוקר טוב, עפולה ☀️", en: "Good morning, Afula ☀️", ru: "Доброе утро ☀️" }, pick: p => p.tags.includes("breakfast") },
  { id: "kids",      title: { he: "יוצאים עם הילדים", en: "Out with the kids", ru: "С детьми" }, pick: p => p.tags.includes("kids") && p.cat !== "food" },
  { id: "evening",   title: { he: "בילוי בערב", en: "Night out", ru: "Вечером" }, pick: p => p.tags.includes("evening") },
  { id: "free",      title: { he: "בחינם ובכיף", en: "Free & fun", ru: "Бесплатно" }, pick: p => p.tags.includes("free") },
  { id: "nearby",    title: { he: "טבע ליד הבית", en: "Nature nearby", ru: "Природа рядом" }, pick: p => p.nearby },
];

export const TAG_LABELS = {
  kosher:    { he: "כשר", en: "Kosher", ru: "Кошер" },
  free:      { he: "חינם", en: "Free", ru: "Бесплатно" },
  kids:      { he: "לילדים", en: "Kids", ru: "Детям" },
  evening:   { he: "בערב", en: "Evening", ru: "Вечер" },
  breakfast: { he: "ארוחת בוקר", en: "Breakfast", ru: "Завтрак" },
  new:       { he: "חדש", en: "New", ru: "Новое" },
  popular:   { he: "פופולרי", en: "Popular", ru: "Популярно" },
};
