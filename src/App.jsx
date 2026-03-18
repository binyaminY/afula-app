import { useState, useCallback, useMemo, useRef } from "react";
import { Search, MapPin, Star, Heart, Phone, Clock, ChevronLeft, Filter, TrendingUp, Calendar, Utensils, TreePine, ShoppingBag, Landmark, Wrench, Wine, Sun, Moon, BookOpen, Award, X, Sparkles, Info, Settings, LogOut, User, Plus } from "lucide-react";

/* ═══════════════════════════════════════
   CITY DATABASE - cleaned & verified
   ═══════════════════════════════════════ */
const CITIES_DATA = {
  "עפולה": {
    name: "עפולה", nameEn: "Afula",
    population: "68K+", founded: "1925", area: "28 קמ״ר",
    emoji: "🌾", gradient: "linear-gradient(135deg, #65a30d, #4d7c0f)",
    photo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Jezreel_Valley_view.jpg",
    tags: ["טבע", "אוכל", "משפחות"],
    description: "בירת העמק — לב עמק יזרעאל ההיסטורי",
    history: "עפולה נוסדה ב-1925 כיישוב חקלאי בלב עמק יזרעאל. קרויה על שם יישוב מקראי ומשמשת כמרכז מסחרי ושירותי לכל אזור העמק.",
    facts: ["מרכז שירותי לכל אזור העמק", "ממוקמת בלב עמק יזרעאל ההיסטורי", "בית חולים העמק משרת את כל הצפון"],
    landmarks: ["גבעת המורה", "עין חרוד", "מעיינות", "פארק העמק"],
    accent: "#65a30d",
  },
};

/* ═══════════════════════════════════════
   PLACES — emoji icons, no broken images
   ═══════════════════════════════════════ */
const PE = {
  attractions: ["🏛️","🎡","🗺️","📸","⭐","🌅"],
  professionals: ["🔧","⚡","🔨","🧹","🚗","🪠"],
  nightlife: ["🍸","🎶","🌙","🍺","💃","🎧"],
  culture: ["🎭","🖼️","📚","🏛️","🎬","🎻"],
};

const generatePlaces = (cityName) => {
  const DB = {
    "עפולה": {
      attractions: [
        { name: "פארק חי העמק", desc: "פארק ענק עם פינת חי, מתקני שעשועים, קיר טיפוס, מתחם נינג׳ה ושבילי הליכה", rating: 0, address: "רח׳ חטיבת כפיר, רובע יזרעאל, עפולה", phone: "04-9536356", icon: "🎡", trending: true, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Gilboa_mountains_and_Jezreel_valley.JPG?width=640" },
        { name: "גבעת המורה", desc: "יער ומגדל תצפית עם נוף פנורמי מדהים על עמק יזרעאל כולו", rating: 0, address: "גבעת המורה, צפונית למרכז עפולה", icon: "⛰️", trending: true, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Jezreel_Valley_view.jpg?width=640" },
        { name: "גן לאומי מעיין חרוד", desc: "פארק נופש עם מעיין שופע למרגלות הגלבוע — קמפינג, שירותים ומקלחות", rating: 0, address: "כביש 71, בין עפולה לבית שאן", icon: "💧", trending: true, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Ein_Harod.JPG?width=640" },
        { name: "גן לאומי גן השלושה (הסחנה)", desc: "בריכות מים טבעיות חמות מהיפות בארץ — רחצה בטבע", rating: 0, address: "כביש 669, ליד בית שאן (כ-25 דק׳ מעפולה)", icon: "🏊", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Gan_HaShlosha06.jpg?width=640" },
        { name: "גן לאומי בית שערים", desc: "אתר מורשת עולמית — מערות קבורה עתיקות ובית כנסת מתקופת המשנה", rating: 0, address: "ליד קריית טבעון (כ-15 דק׳ מעפולה)", icon: "🏛️", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Bet_Shearim_national_park_catacombs_entrance.jpg?width=640" },
        { name: "גן לאומי תל מגידו", desc: "אתר ארכיאולוגי מקראי — שרידי ארמונות, מקדשים ומערכת מים", rating: 0, address: "צומת מגידו (כ-20 דק׳ מעפולה)", icon: "🏺", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Tel_Megiddo_2007041.jpg?width=640" },
        { name: "הר תבור", desc: "שמורת טבע ירוקה כל השנה — נופים, שבילים ואתרי דת", rating: 0, address: "הר תבור (כ-15 דק׳ מעפולה)", icon: "🏔️", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mt._Tabor_Israel.JPG?width=640" },
        { name: "עין גדעון", desc: "מעיין עתיק — באר מים עגולה מוקפת ירוק", rating: 0, address: "ליד כפר גדעון, צפונית לעפולה", icon: "🌊", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Ein_Harod.JPG?width=640" },
        { name: "עין יבקע (מעיין הסוסים)", desc: "מעיין טורקיז עם בריכת אבן רומית — מים צלולים כל השנה", rating: 0, address: "ליד כביש 77, סמוך לכעביה", icon: "🐴", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Nahal_Harod.JPG?width=640" },
        { name: "תל עפולה", desc: "אתר ארכיאולוגי בלב העיר עם ממצאים מתקופות שונות", rating: 0, address: "רח׳ ירושלים, מרכז עפולה", icon: "🏛️", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Afula_station.jpg?width=640" },
        { name: "תחנת הרכבת ההיסטורית", desc: "תחנת רכבת עות׳מאנית משוקמת עם מגדל מים", rating: 0, address: "רח׳ הנשיא ויצמן / שפרינצק, עפולה", icon: "🚂", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Afula_station.jpg?width=640" },
        { name: "נחל חרוד", desc: "נחל לטיולי הליכה ואופניים עם נופי עמק ופינות פיקניק", rating: 0, address: "ממרגלות גבעת המורה מזרחה", icon: "🌿", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Nahal_Harod.JPG?width=640" },
        { name: "פסל אלכסנדר זייד", desc: "תצפית מדהימה על עמק יזרעאל ויער השומרים", rating: 0, address: "ליד בית שערים (כ-15 דק׳ מעפולה)", icon: "🗿", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Alexander_Zeid_statue.jpg?width=640" },
        { name: "הרי הגלבוע", desc: "יערות, אירוסים, מסלולי טיול ותצפיות נוף", rating: 0, address: "הרי הגלבוע (כ-20 דק׳ מעפולה)", icon: "🌺", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Gilboa_mountains_and_Jezreel_valley.JPG?width=640" },
        { name: "כיכר דוד", desc: "גן ציבורי במרכז העיר עם שטח ירוק ופינות ישיבה", rating: 0, address: "רח׳ ירושלים, עפולה", icon: "🌳", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Jezreel_Valley_view.jpg?width=640" },
      ],
      nightlife: [
        { name: "השוק 34", desc: "בר קוקטיילים ומעשנה בלב השוק — אווירה אותנטית", rating: 0, address: "השוק 34, עפולה", icon: "🍸", trending: true, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Cosmopolitan_cocktail.jpg?width=640" },
        { name: "יולה בר", desc: "בר עם במה פתוחה, מוזיקה חיה, יינות וקוקטיילים", rating: 0, address: "החשמל 1, עפולה", icon: "🎶", trending: true, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Cocktails.jpg?width=640" },
        { name: "פאב השוק", desc: "פאב משפחתי עם בירות, חדרי VIP ונשנושים", rating: 0, address: "השוק 32, עפולה", icon: "🍺", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Pils_large.jpg?width=640" },
        { name: "ליצ׳י ביסטרו בר", desc: "ביסטרו-בר מודרני עם קוקטיילים ואוכל", rating: 0, address: "שד׳ יצחק רבין, מתחם G, עפולה", icon: "🍹", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Cocktails.jpg?width=640" },
      ],
      food: [
        { name: "🥩 בשרי", _sub: true },
        { name: "השוק 34 — מעשנה", desc: "בשר מעושן, בריסקט ורוסטביף באווירת שוק", rating: 0, address: "השוק 34, עפולה", icon: "🥩", price: "₪₪₪", trending: true, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Brisket.jpg?width=640" },
        { name: "BBB — בורגרס", desc: "המבורגרים כשרים, צ׳יפס וטבעות בצל", rating: 0, address: "מתחם פרנדלי בעמק, עפולה", phone: "04-6424446", icon: "🍔", price: "₪₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/RedMeatBurger.jpg?width=640" },
        { name: "שווארמה חצי חצי", desc: "שווארמה בפיתה או בלאפה — מנות גדולות", rating: 0, address: "רח׳ יהושע חנקין, עפולה", icon: "🌯", price: "₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2015-12-31_-_shawarma_-_1.jpg?width=640" },
        { name: "הסביח", desc: "סביחייה אגדית — פיתה חמה עם חציל ועמבה", rating: 0, address: "השוק 24, עפולה", phone: "04-6961830", icon: "🥙", price: "₪", trending: true, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Sabich_Tel_Aviv.jpg?width=640" },
        { name: "פלאפל התחנה", desc: "פלאפל טרי בפיתה עם סלטים — קלאסיקה עפולאית", rating: 0, address: "ליד התחנה המרכזית, עפולה", icon: "🧆", price: "₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Falafels.jpg?width=640" },
        { name: "אסתריקה", desc: "אוכל ביתי בשרי — עלי גפן, קובה ומנות מזרחיות", rating: 0, address: "התוכנה 4, אזה״ת עפולה", icon: "🍖", price: "₪₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Stuffed_grape_leaves.jpg?width=640" },
        { name: "שינווה נקניקיות", desc: "נקניקיות מעושנות ביתיות — מוסד עפולאי ותיק", rating: 0, address: "השוק, עפולה", icon: "🌭", price: "₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Bratwurst.jpg?width=640" },
        { name: "🧀 חלבי", _sub: true },
        { name: "הצרפתיה הקטנה", desc: "מסעדה חלבית ותיקה — פסטות, ארוחות בוקר ואווירה כפרית", rating: 0, address: "שפרינצק 5, עפולה", phone: "04-6526516", icon: "🍽️", price: "₪₪₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Spaghetti_bolognese2.jpg?width=640" },
        { name: "דה ויטו", desc: "מסעדה איטלקית חלבית — פיצות, פסטות וסלטים", rating: 0, address: "שד׳ יצחק רבין 18, מתחם G, עפולה", phone: "04-6425858", icon: "🍕", price: "₪₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Eq_it-na_pizza-margherita_sep2005_sml.jpg?width=640" },
        { name: "סמוראיו — סושי בר", desc: "מסעדה יפנית כשרה עם סושי ומנות אסייתיות", rating: 0, address: "הנשיא ויצמן 25, עפולה", phone: "053-6285296", icon: "🍣", price: "₪₪₪₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Sushi_platter.jpg?width=640" },
        { name: "דומינו׳ס פיצה", desc: "פיצות, לחם שום ותוספות — משלוחים מהירים", rating: 0, address: "שד׳ יצחק רבין 20, עפולה", icon: "🍕", price: "₪₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Supreme_pizza.jpg?width=640" },
        { name: "מקלות וניל", desc: "קונדיטוריה עם פסטות, סלטים, פיצות וארוחות חלביות", rating: 0, address: "יהושע חנקין 9, עפולה", phone: "04-6420222", icon: "🥗", price: "₪₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Caesar_salad_(1).jpg?width=640" },
        { name: "לנדוור", desc: "שקשוקות, סלטים, פסטות וארוחות חלביות", rating: 0, address: "שד׳ יצחק רבין 18, מתחם G, עפולה", phone: "053-9380603", icon: "🥘", price: "₪₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Shakshuka.jpg?width=640" },
        { name: "🥬 פרווה / טבעוני", _sub: true },
        { name: "חצ׳פורי נטלי", desc: "חצ׳פורי גיאורגי ביתי — מאפים טריים מדי יום", rating: 0, address: "השוק 3, עפולה", icon: "🥟", price: "₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Khachapuri.jpg?width=640" },
        { name: "חומוס השוק", desc: "חומוס טרי עם פול, טחינה ותוספות — ארוחה מהירה", rating: 0, address: "השוק, עפולה", icon: "🫘", price: "₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Hummus_from_The_Old_City.jpg?width=640" },
      ],
      cafes: [
        { name: "מקלות וניל", desc: "קונדיטוריה, מאפייה ובית קפה — מאפים, לחמים וארוחות בוקר", rating: 0, address: "יהושע חנקין 9, עפולה", phone: "04-6420222", icon: "☕", price: "₪₪", trending: true, img: "https://commons.wikimedia.org/wiki/Special:FilePath/A_small_cup_of_coffee.JPG?width=640" },
        { name: "לנדוור", desc: "רשת בתי קפה ותיקה — ארוחות בוקר, קפה ומאפים", rating: 0, address: "שד׳ יצחק רבין 18, מתחם G, עפולה", phone: "053-9380603", icon: "☕", price: "₪₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Latte_art.jpg?width=640" },
        { name: "הצרפתיה הקטנה", desc: "בית קפה-מסעדה עם ארוחות בוקר עשירות ואווירה כפרית", rating: 0, address: "שפרינצק 5, עפולה", phone: "04-6526516", icon: "🥐", price: "₪₪₪", trending: true, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Croissant.jpg?width=640" },
        { name: "דה ויטו — בוקר", desc: "ארוחת בוקר איטלקית עם שקשוקה, גבינות ומאפים", rating: 0, address: "שד׳ יצחק רבין 18, מתחם G, עפולה", phone: "04-6425858", icon: "🍳", price: "₪₪", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Shakshuka.jpg?width=640" },
      ],
      bars: [
        { name: "השוק 34", desc: "בר קוקטיילים ומעשנה בלב השוק", rating: 0, address: "השוק 34, עפולה", icon: "🍸", trending: true, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Cosmopolitan_cocktail.jpg?width=640" },
        { name: "יולה בר", desc: "בר עם במה פתוחה, ג׳אם סשנים ומוזיקה חיה", rating: 0, address: "החשמל 1, עפולה", icon: "🎵", trending: true, img: "https://commons.wikimedia.org/wiki/Special:FilePath/GuitareClassique5.png?width=640" },
        { name: "פאב השוק", desc: "פאב משפחתי — בירות, חדרי VIP ונשנושים", rating: 0, address: "השוק 32, עפולה", icon: "🍺", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Pils_large.jpg?width=640" },
        { name: "ליצ׳י ביסטרו בר", desc: "ביסטרו-בר מודרני — קוקטיילים ואוכל", rating: 0, address: "שד׳ יצחק רבין, מתחם G, עפולה", icon: "🍹", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Cocktails.jpg?width=640" },
        { name: "BBB — בר", desc: "המבורגרים ובירות באווירה צעירה", rating: 0, address: "מתחם פרנדלי בעמק, עפולה", phone: "04-6424446", icon: "🍻", img: "https://commons.wikimedia.org/wiki/Special:FilePath/RedMeatBurger.jpg?width=640" },
      ],
      malls: [
        { name: "מתחם G עמק סנטר", desc: "מתחם קניות מרכזי עם רשתות אופנה, חנויות ומסעדות", rating: 0, address: "שד׳ יצחק רבין 18, עפולה", phone: "04-6401082", icon: "🏬", trending: true, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Westfield_London_-_panoramio_(8).jpg?width=640" },
        { name: "BIG עפולה", desc: "מרכז מסחרי גדול עם חנויות ושירותים", rating: 0, address: "השוק 13, עפולה", icon: "🛍️", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Storefront.jpg?width=640" },
        { name: "קניון פרנדלי בעמק", desc: "קניון עם חנויות אופנה, מזון ובידור", rating: 0, address: "שד׳ יצחק רבין 18, עפולה", icon: "🛒", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Storefront.jpg?width=640" },
      ],
      coffeeSpots: [
        { name: "גבעת המורה — תצפית", desc: "נקודת תצפית מרהיבה עם שולחנות פיקניק — מושלם לשקיעה", rating: 0, address: "גבעת המורה, עפולה", icon: "🌄", trending: true, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Jezreel_Valley_view.jpg?width=640" },
        { name: "עין גדעון", desc: "מעיין עתיק מוקף ירוק — שקט ומוצל", rating: 0, address: "ליד כפר גדעון, צפונית לעפולה", icon: "🌿", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Ein_Harod.JPG?width=640" },
        { name: "נחל חרוד — פיקניק", desc: "גדות הנחל עם צל עצים — אידיאלי לפק״ל בוקר", rating: 0, address: "נחל חרוד, מזרחית לעפולה", icon: "🏕️", trending: true, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Nahal_Harod.JPG?width=640" },
        { name: "פארק חי העמק — פינת יער", desc: "פינות ישיבה מוצלות בין העצים — נגיש", rating: 0, address: "פארק חי העמק, עפולה", icon: "☕", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Gilboa_mountains_and_Jezreel_valley.JPG?width=640" },
        { name: "הר תבור — חניון עליון", desc: "נוף 360° מהפסגה — שווה את העלייה", rating: 0, address: "הר תבור (כ-15 דק׳ מעפולה)", icon: "⛰️", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mt._Tabor_Israel.JPG?width=640" },
      ],
      culture: [
        { name: "היכל התרבות עפולה", desc: "אולם מופעים מרכזי — הופעות, הצגות ומוזיקה", rating: 0, address: "חטיבה תשע 9, עפולה", phone: "04-6595797", icon: "🎭", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Comedy_and_tragedy_masks_without_background.svg?width=640" },
        { name: "תחנת הרכבת העות׳מאנית", desc: "אתר היסטורי משוקם מתקופת רכבת העמק", rating: 0, address: "רח׳ הנשיא ויצמן, עפולה", icon: "🏛️", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Afula_station.jpg?width=640" },
      ],
      professionals: [
        { name: "חשמלאי העמק", desc: "חשמלאי מוסמך — שירות מהיר באזור עפולה", rating: 0, address: "שירות בכל אזור עפולה", phone: "050-1234567", icon: "⚡", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Electrician_at_work.jpg?width=640" },
        { name: "שרברב עפולה 24/7", desc: "שרברב מקצועי — פתיחת סתימות ותיקון צנרת", rating: 0, address: "שירות ניידים, עפולה", phone: "052-4445566", icon: "🔧", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Plumber_at_work.jpg?width=640" },
        { name: "מוסך העמק", desc: "מוסך מורשה לכל סוגי הרכבים", rating: 0, address: "אזור התעשייה, עפולה", phone: "04-6523456", icon: "🚗", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mechanic_in_overalls.jpg?width=640" },
      ],
    },
  };
  return DB[cityName] || {};
};

/* ═══════════════════════════════════════ */
const CATS = {
  attractions:   { Icon: Star,        label: "אטרקציות",    color: "#0891b2" },
  nightlife:     { Icon: Wine,        label: "מקומות בילוי",    color: "#db2777" },
  food:          { Icon: Utensils,    label: "מזון",        color: "#ea580c" },
  cafes:         { Icon: Utensils,      label: "בתי קפה",     color: "#a16207" },
  bars:          { Icon: Wine,        label: "ברים, פאבים ומועדונים", color: "#9333ea" },
  malls:         { Icon: ShoppingBag, label: "מתחמים וקניונים", color: "#d97706" },
  coffeeSpots:   { Icon: Sun,         label: "מקומות יפים לפק״ל קפה", color: "#16a34a" },
  culture:       { Icon: Landmark,    label: "תרבות",       color: "#4f46e5" },
  professionals: { Icon: Wrench,      label: "בעלי מקצוע",  color: "#7c3aed" },
};

/* ── Theme ── */
const LIGHT = {
  bg: "#F2F9F2", pill: "#E4F2E4", surface: "#fff",
  border: "#C6E0C6", borderLight: "#D8EDD8",
  accent: "#2d7720", accentSoft: "#DCFCE7",
  text: "#0F1F0F", textSoft: "#2D4A2D", textMuted: "#5A7A5A",
  shadow: "0 1px 2px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.05)",
  hover: "0 8px 32px rgba(0,0,0,.09), 0 2px 6px rgba(0,0,0,.03)",
  star: "#f5a200", card: "#fff", cardBorder: "#d4e8d4",
};
const DARK = {
  bg: "#0D1A0D", pill: "#162216", surface: "#1A2E1A",
  border: "#2D4A2D", borderLight: "#243C24",
  accent: "#4ade80", accentSoft: "#14532d",
  text: "#F0FBF0", textSoft: "#BBD9BB", textMuted: "#6A9A6A",
  shadow: "0 1px 2px rgba(0,0,0,.3), 0 4px 16px rgba(0,0,0,.4)",
  hover: "0 8px 32px rgba(0,0,0,.5), 0 2px 6px rgba(0,0,0,.3)",
  star: "#F59E0B", card: "#1E293B", cardBorder: "#334155",
};

/* ── Small components ── */
const Strs = ({ r, T }) => (
  r === 0 ? (
    <span style={{ fontSize:11, fontWeight:600, color:"#0369A1", background:"#E0F2FE", padding:"2px 8px", borderRadius:8 }}>חדש</span>
  ) : (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      {[1,2,3,4,5].map(s=><Star key={s} size={13} fill={s<=Math.round(r)?T.star:"none"} stroke={s<=Math.round(r)?T.star:"#f0c8b8"} strokeWidth={2}/>)}
      <span style={{ fontSize: 12, color: T.textSoft, fontWeight: 700, marginRight: 3 }}>{r}</span>
    </span>
  )
);

function Card({ p, cat, favs, toggle, click, T }) {
  const f = favs.has(p.name), cc = CATS[cat]?.color || "#888";
  const [imgErr, setImgErr] = useState(false);
  const hasImg = p.img && !imgErr;
  return (
    <div onClick={()=>click(p)} style={{ background: T.surface, borderRadius: 16, overflow: "hidden", cursor: "pointer", boxShadow: T.shadow, transition: "all .4s cubic-bezier(.25,.8,.25,1)", position: "relative" }}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=T.hover}}
      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=T.shadow}}>
      <div style={{ height: hasImg ? 150 : 90, display: "flex", alignItems: "center", justifyContent: "center", background: hasImg ? "#F3EDE8" : `linear-gradient(135deg, ${cc}10, ${cc}06)`, position: "relative", overflow: "hidden" }}>
        {hasImg ? (
          <img src={p.img} alt={p.name} onError={()=>setImgErr(true)} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .5s" }}
            onMouseEnter={e=>e.target.style.transform="scale(1.04)"}
            onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
        ) : (
          <span style={{ fontSize: 44, lineHeight: 1, display: "block" }}>{p.icon}</span>
        )}
        {hasImg && <div style={{ position:"absolute", inset:0, background:"linear-gradient(transparent 50%, rgba(0,0,0,0.35))" }}/>}
        <button onClick={e=>{e.stopPropagation();toggle(p.name)}} style={{ position: "absolute", top: 10, left: 10, background: "rgba(255,255,255,.92)", border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,.08)", transition: "transform .2s" }}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.12)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
          <Heart size={14} fill={f?"#E8613C":"none"} stroke={f?"#E8613C":"#f0c8b8"}/>
        </button>
        {p.trending&&<div style={{ position:"absolute",top:10,right:10,background:"linear-gradient(135deg,#F59E0B,#EF4444)",color:"#fff",fontSize:9.5,fontWeight:800,padding:"3px 8px",borderRadius:12,display:"flex",alignItems:"center",gap:3 }}><TrendingUp size={12}/>טרנדי</div>}
        {p.date&&<div style={{ position:"absolute",bottom:8,right:10,background:"rgba(0,0,0,.5)",color:"#fff",fontSize:9.5,fontWeight:600,padding:"3px 8px",borderRadius:8,display:"flex",alignItems:"center",gap:3,backdropFilter:"blur(4px)" }}><Clock size={12}/>{p.date}</div>}
      </div>
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <h3 style={{ margin: 0, fontSize: 14.5, fontWeight: 700, color: T.text, lineHeight: 1.3 }}>{p.name}</h3>
          {p.price&&<span style={{ fontSize: 10.5, fontWeight: 700, color: "#059669", background:"#ECFDF5", padding:"2px 6px", borderRadius:6 }}>{p.price}</span>}
        </div>
        <p style={{ margin: "0 0 7px", fontSize: 12, color: T.textSoft, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.desc}</p>
        <Strs r={p.rating} T={T}/>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 7, color: T.textMuted, fontSize: 11 }}><MapPin size={12}/><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.address}</span></div>
        {p.phone&&<div style={{ display:"flex",alignItems:"center",gap:4,marginTop:2,color:T.textMuted,fontSize:11 }}><Phone size={12}/><span dir="ltr">{p.phone}</span></div>}
      </div>
    </div>
  );
}

function Modal({ p, cat, close, favs, toggle, T }) {
  if (!p) return null;
  const f = favs.has(p.name), cc = CATS[cat]?.color||"#888";
  const [imgErr, setImgErr] = useState(false);
  const hasImg = p.img && !imgErr;
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(30,20,15,.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(8px)" }} onClick={close}>
      <div onClick={e=>e.stopPropagation()} style={{ background:T.surface,borderRadius:20,maxWidth:480,width:"100%",maxHeight:"85vh",overflow:"auto",animation:"modalIn .3s ease",boxShadow:"0 24px 64px rgba(0,0,0,.2)",position:"relative" }}>
        <div style={{ height: hasImg ? 200 : 140, display:"flex",alignItems:"center",justifyContent:"center",background: hasImg ? "#F3EDE8" : `linear-gradient(135deg,${cc}15,${cc}05)`,position:"relative",overflow:"hidden" }}>
          {hasImg ? (
            <img src={p.img} alt={p.name} onError={()=>setImgErr(true)} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
          ) : (
            <span style={{ fontSize:64, lineHeight: 1, display: "block" }}>{p.icon}</span>
          )}
          {hasImg && <div style={{ position:"absolute",inset:0,background:"linear-gradient(transparent 40%, rgba(0,0,0,0.45))" }}/>}
          <button onClick={()=>toggle(p.name)} style={{ position:"absolute",top:14,right:14,background:"rgba(255,255,255,.92)",border:"none",borderRadius:"50%",width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,.08)",zIndex:2 }}><Heart size={16} fill={f?"#E8613C":"none"} stroke={f?"#E8613C":"#f0c8b8"}/></button>
        </div>
        <button onClick={close} style={{ position:"absolute",top:14,left:14,background:"rgba(255,255,255,.95)",border:"none",borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 2px 10px rgba(0,0,0,.15)",zIndex:10 }}><X size={17} strokeWidth={2.5}/></button>
        <div style={{ padding:"20px 22px 24px" }}>
          <h2 style={{ margin:"0 0 8px",fontSize:20,fontWeight:800,color:T.text }}>{p.name}</h2>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14,flexWrap:"wrap" }}>
            <Strs r={p.rating} T={T}/>
            {p.price&&<span style={{ fontSize:12,fontWeight:700,color:"#059669",background:"#ECFDF5",padding:"2px 8px",borderRadius:8 }}>{p.price}</span>}
            {p.trending&&<span style={{ background:"#E0F2FE",color:"#0369A1",fontSize:10.5,fontWeight:700,padding:"2px 8px",borderRadius:10,display:"flex",alignItems:"center",gap:3 }}><TrendingUp size={12}/>טרנדי</span>}
          </div>
          <p style={{ margin:"0 0 16px",fontSize:14,color:T.textSoft,lineHeight:1.7 }}>{p.desc}</p>
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:T.pill,borderRadius:12 }}><MapPin size={15} color={cc}/><span style={{ fontSize:13,color:T.text }}>{p.address}</span></div>
            {p.phone&&<div style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:T.pill,borderRadius:12 }}><Phone size={15} color={cc}/><span dir="ltr" style={{ fontSize:13,color:T.text }}>{p.phone}</span></div>}
            {p.date&&<div style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:T.pill,borderRadius:12 }}><Calendar size={15} color={cc}/><span style={{ fontSize:13,color:T.text }}>{p.date}</span></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN
   ═══════════════════════════════════════ */
/* ═══════════════════════════════════════
   SUPABASE AUTH (REST API)
   ═══════════════════════════════════════ */
const SB_URL = "https://voetrktlczxhmmpohjcj.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvZXRya3RsY3p4aG1tcG9oamNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NTE2OTMsImV4cCI6MjA4OTMyNzY5M30.XDY24UJlbBjMPk570U-6TukhHkTf6zEfz9gFr8M4YBA";

const ERR_MAP = {
  "email rate limit exceeded": "נשלחו יותר מדי בקשות — נסו שוב בעוד מספר דקות",
  "user already registered": "כתובת האימייל כבר רשומה במערכת — נסו להתחבר",
  "invalid login credentials": "אימייל או סיסמה שגויים",
  "email not confirmed": "יש לאשר את האימייל לפני הכניסה",
  "password should be at least 6 characters": "הסיסמה חייבת להכיל לפחות 6 תווים",
  "invalid email": "כתובת אימייל לא תקינה",
  "signup disabled": "ההרשמה סגורה כרגע",
};

const toHebErr = (msg = "") => {
  const lower = msg.toLowerCase();
  for (const [key, val] of Object.entries(ERR_MAP)) {
    if (lower.includes(key)) return val;
  }
  return "אירעה שגיאה — נסו שוב";
};

const sbFetch = async (endpoint, body) => {
  const res = await fetch(`${SB_URL}/auth/v1/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type":"application/json", "apikey": SB_KEY, "Authorization": `Bearer ${SB_KEY}` },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const raw = data.error_description || data.msg || data.error?.message || data.message || "";
    return { error: toHebErr(raw) };
  }
  return data;
};

const sbSignUp = (email, password, name, phone) =>
  sbFetch("signup", { email, password, data: { name, phone } });

const sbSignIn = (email, password) =>
  sbFetch("token?grant_type=password", { email, password });

export default function App() {
  const city = "עפולה";
  const [q, setQ] = useState("");
  const [showSug, setShowSug] = useState(false);
  const [drop, setDrop] = useState(false);
  const [activeCat, setAC] = useState("all");
  const [favs, setFavs] = useState(new Set());
  const [modal, setModal] = useState(null);
  const [mCat, setMCat] = useState(null);
  const [fOnly, setFOnly] = useState(false);
  const [page, setPage] = useState("login"); // "register" | "login" | "app"
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const profileInputRef = useRef(null);
  const T = darkMode ? DARK : LIGHT;
  const [regForm, setRegForm] = useState({ name:"", email:"", phone:"", password:"", city:"עפולה" });
  const [regStep, setRegStep] = useState(0); // 0=form, 1=success
  const [authErr, setAuthErr] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignUp = async () => {
    if (!regForm.name || !regForm.email || !regForm.password) return;
    if (regForm.password.length < 6) { setAuthErr("הסיסמה חייבת להיות לפחות 6 תווים"); return; }
    setAuthLoading(true); setAuthErr("");
    try {
      const data = await sbSignUp(regForm.email, regForm.password, regForm.name, regForm.phone);
      if (data.error) {
        setAuthErr(typeof data.error === "string" ? data.error : "שגיאה בהרשמה");
      } else {
        setUser(data.user || data); setRegStep(1);
      }
    } catch (e) {
      setAuthErr("שגיאת רשת — נסו שוב או היכנסו כאורח");
    }
    setAuthLoading(false);
  };

  const handleSignIn = async () => {
    if (!regForm.email || !regForm.password) return;
    setAuthLoading(true); setAuthErr("");
    try {
      const data = await sbSignIn(regForm.email, regForm.password);
      if (data.error) {
        setAuthErr(typeof data.error === "string" ? data.error : "שגיאה בכניסה");
      } else {
        setUser(data.user || data); setPage("app");
      }
    } catch (e) {
      setAuthErr("שגיאת רשת — נסו שוב או היכנסו כאורח");
    }
    setAuthLoading(false);
  };

  const [addPlaceOpen, setAddPlaceOpen] = useState(false);
  const [addForm, setAddForm] = useState({ name:"", desc:"", address:"", phone:"", category:"attractions" });
  const [customPlaces, setCustomPlaces] = useState({});

  const cd = CITIES_DATA[city];
  const basePlaces = generatePlaces(city);
  const places = useMemo(() => {
    const merged = { ...basePlaces };
    Object.entries(customPlaces).forEach(([cat, items]) => {
      merged[cat] = [...(merged[cat]||[]), ...items];
    });
    return merged;
  }, [customPlaces]);

  const tog = useCallback(n => setFavs(p => { const s = new Set(p); s.has(n)?s.delete(n):s.add(n); return s; }), []);

  const suggestions = useMemo(() => {
    if (!q.trim()) return [];
    const ql = q.trim().toLowerCase();
    const results = [];
    Object.entries(places).forEach(([cat, items]) => {
      items.forEach(p => {
        if (p._sub) return;
        if ((p.name||"").toLowerCase().includes(ql) || (p.desc||"").toLowerCase().includes(ql)) {
          results.push({ ...p, _c: cat });
        }
      });
    });
    return results.slice(0, 6);
  }, [q, places]);

  const trending = useMemo(() => {
    let a = [];
    Object.entries(places).forEach(([c, items]) => items.filter(i => i.trending).forEach(i => a.push({ ...i, _c: c })));
    return a;
  }, [places]);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap');
    @keyframes modalIn{from{opacity:0;transform:scale(.97) translateY(10px)}to{opacity:1;transform:none}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
    @keyframes slideIn{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:none}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
    @keyframes heroIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
    @keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
    @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
    @keyframes badgeIn{from{opacity:0;transform:scale(.8) translateY(8px)}to{opacity:1;transform:none}}
    *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
    svg{shape-rendering:geometricPrecision}
    @media(max-width:600px){
      .hero-logo{width:72px!important;height:72px!important}
      .profile-pic{width:68px!important;height:68px!important}
      .login-logo{width:160px!important;height:160px!important}
      .hero-content{padding:70px 16px 40px!important}
      .hero-content p{font-size:14px!important}
      .cat-nav-inner{padding:0 8px!important}
      .main-content{padding:16px 12px 0!important}
      .top-bar{padding:12px 12px!important}
    }
    ::-webkit-scrollbar{width:5px;height:5px}
    ::-webkit-scrollbar-thumb{background:#C4D5E8;border-radius:10px}
    ::-webkit-scrollbar-track{background:transparent}
    body{margin:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
    img{-webkit-user-drag:none;user-select:none}
    button{-webkit-tap-highlight-color:transparent;font-family:'Rubik',sans-serif}
    .cat-scroll::-webkit-scrollbar{display:none}
    .cat-scroll{-ms-overflow-style:none;scrollbar-width:none}
  `;

  // ─── REGISTRATION PAGE ───
  if (page === "register" || page === "login") return (
    <div dir="rtl" style={{ fontFamily:"'Rubik',sans-serif",minHeight:"100vh",background:"linear-gradient(135deg, #2d7720, #1a6abf)",display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
      <style>{css}</style>
      <div style={{ width:"100%",maxWidth:520,animation:"heroIn .5s ease both" }}>
        {regStep === 0 ? (
          <>
            <div style={{ textAlign:"center",marginBottom:40 }}>
              <img src="/logo.png" alt="AfulaGo" className="login-logo" style={{ width:280,height:280,objectFit:"contain",marginBottom:8,filter:"drop-shadow(0 4px 24px rgba(0,0,0,.25))",animation:"float 3s ease-in-out infinite",maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)",WebkitMaskImage:"radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)" }}/>
              <p style={{ color:"rgba(255,255,255,.75)",fontSize:16,margin:"0 0 10px" }}>גלו את עפולה</p>
              {regForm.name && (
                <p style={{ color:"#fff",fontSize:20,fontWeight:700,margin:0,animation:"fadeUp .3s ease both",textShadow:"0 1px 8px rgba(0,0,0,.15)" }}>
                  שלום {regForm.name} 👋
                </p>
              )}
            </div>

            <div style={{ background:"#fff",borderRadius:24,padding:"36px 32px",boxShadow:"0 16px 48px rgba(0,0,0,.1)" }}>
              <h2 style={{ margin:"0 0 24px",fontSize:24,fontWeight:700,color:"#1A1A1A",textAlign:"center" }}>{page==="login"?"התחברות":"הרשמה"}</h2>

              {authErr&&<div style={{ background:"#FEF2F2",borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:13,color:"#DC2626",textAlign:"center" }}>{authErr}</div>}

              <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                {page==="register"&&(
                  <input value={regForm.name} onChange={e=>setRegForm({...regForm,name:e.target.value})} placeholder="שם מלא" style={{ width:"100%",padding:"14px 18px",background:"#F9FAFB",border:"1.5px solid #E5E7EB",borderRadius:14,fontSize:16,fontFamily:"'Rubik'",color:"#1A1A1A",outline:"none",boxSizing:"border-box",transition:"border .2s" }} onFocus={e=>e.target.style.borderColor="#2d7720"} onBlur={e=>e.target.style.borderColor="#E5E7EB"}/>
                )}
                <input value={regForm.email} onChange={e=>setRegForm({...regForm,email:e.target.value})} placeholder="אימייל" type="email" dir="ltr" style={{ width:"100%",padding:"14px 18px",background:"#F9FAFB",border:"1.5px solid #E5E7EB",borderRadius:14,fontSize:16,fontFamily:"'Rubik'",color:"#1A1A1A",outline:"none",textAlign:"left",boxSizing:"border-box",transition:"border .2s" }} onFocus={e=>e.target.style.borderColor="#2d7720"} onBlur={e=>e.target.style.borderColor="#E5E7EB"}/>
                <input value={regForm.password} onChange={e=>setRegForm({...regForm,password:e.target.value})} placeholder="סיסמה (לפחות 6 תווים)" type="password" dir="ltr" style={{ width:"100%",padding:"14px 18px",background:"#F9FAFB",border:"1.5px solid #E5E7EB",borderRadius:14,fontSize:16,fontFamily:"'Rubik'",color:"#1A1A1A",outline:"none",textAlign:"left",boxSizing:"border-box",transition:"border .2s" }} onFocus={e=>e.target.style.borderColor="#2d7720"} onBlur={e=>e.target.style.borderColor="#E5E7EB"}/>

                <button onClick={page==="login"?handleSignIn:handleSignUp} disabled={authLoading} style={{ width:"100%",padding:"16px",background:"linear-gradient(135deg, #2d7720, #1a6abf)",color:"#fff",border:"none",borderRadius:14,fontSize:17,fontWeight:700,fontFamily:"'Rubik'",cursor:authLoading?"default":"pointer",opacity:authLoading?.6:1,transition:"all .2s",marginTop:4 }}>
                  {authLoading?"⏳":page==="login"?"התחברות":"הרשמה"}
                </button>
              </div>

              <div style={{ textAlign:"center",marginTop:20 }}>
                <button onClick={()=>{setPage(page==="login"?"register":"login");setAuthErr("")}} style={{ background:"none",border:"none",color:"#2d7720",fontWeight:600,fontSize:15,cursor:"pointer",fontFamily:"'Rubik'" }}>
                  {page==="login"?"אין חשבון? הרשמה":"יש חשבון? התחברות"}
                </button>
              </div>

              <div style={{ display:"flex",alignItems:"center",gap:10,margin:"20px 0" }}>
                <div style={{ flex:1,height:1,background:"#EFEFEF" }}/><span style={{ fontSize:13,color:"#B0B0B0" }}>או</span><div style={{ flex:1,height:1,background:"#EFEFEF" }}/>
              </div>

              <button onClick={()=>setPage("app")} style={{ width:"100%",padding:"14px",background:"transparent",color:"#999",border:"1px solid #EFEFEF",borderRadius:14,fontSize:15,fontWeight:500,fontFamily:"'Rubik'",cursor:"pointer",transition:"all .2s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#4ade80";e.currentTarget.style.color="#2d7720"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#EFEFEF";e.currentTarget.style.color="#999"}}>
                כניסה כאורח
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign:"center",animation:"scaleIn .4s ease both" }}>
            <span style={{ fontSize:52,display:"block",marginBottom:20 }}>🎉</span>
            <h1 style={{ color:"#fff",fontSize:28,fontWeight:800,margin:"0 0 8px" }}>!ברוכים הבאים</h1>
            <p style={{ color:"rgba(255,255,255,.8)",fontSize:15,margin:"0 0 32px" }}>שלום {regForm.name||"אורח"} 👋</p>
            <button onClick={()=>setPage("app")} style={{ padding:"13px 40px",background:"#fff",color:"#2d7720",border:"none",borderRadius:14,fontSize:15,fontWeight:700,fontFamily:"'Rubik'",cursor:"pointer",boxShadow:"0 8px 24px rgba(0,0,0,.1)" }}>
              בואו נתחיל 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const submitPlace = () => {
    if (!addForm.name.trim()) return;
    const newPlace = { name:addForm.name, desc:addForm.desc, address:addForm.address, phone:addForm.phone, rating:0, icon:"📍", _custom:true };
    setCustomPlaces(p => ({ ...p, [addForm.category]: [...(p[addForm.category]||[]), newPlace] }));
    setAddForm({ name:"", desc:"", address:"", phone:"", category:"attractions" });
    setAddPlaceOpen(false);
  };

  // ─── MAIN PAGE ───
  return (
    <div dir="rtl" style={{ fontFamily:"'Rubik',sans-serif",minHeight:"100vh",background:T.bg,transition:"background .3s" }}>
      <style>{css}</style>
      {modal&&<Modal p={modal} cat={mCat} close={()=>setModal(null)} favs={favs} toggle={tog} T={T}/>}

      {/* ── Add Place Modal ── */}
      {addPlaceOpen&&(
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(8px)" }} onClick={()=>setAddPlaceOpen(false)}>
          <div onClick={e=>e.stopPropagation()} style={{ background:T.surface,borderRadius:20,maxWidth:460,width:"100%",overflow:"hidden",boxShadow:"0 24px 64px rgba(0,0,0,.25)",animation:"modalIn .3s ease" }}>
            <div style={{ background:"linear-gradient(135deg,#2d7720,#1a6abf)",padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <span style={{ color:"#fff",fontSize:18,fontWeight:800 }}>➕ הוספת מקום חדש</span>
              <button onClick={()=>setAddPlaceOpen(false)} style={{ background:"rgba(255,255,255,.2)",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}><X size={16} color="#fff"/></button>
            </div>
            <div style={{ padding:24,display:"flex",flexDirection:"column",gap:14 }}>
              {[
                { label:"שם המקום *", key:"name", placeholder:"למשל: קפה עמק" },
                { label:"תיאור", key:"desc", placeholder:"תיאור קצר..." },
                { label:"כתובת", key:"address", placeholder:"רחוב ומספר, עפולה" },
                { label:"טלפון", key:"phone", placeholder:"04-XXXXXXX" },
              ].map(({label,key,placeholder})=>(
                <div key={key}>
                  <label style={{ fontSize:13,fontWeight:700,color:T.textSoft,display:"block",marginBottom:5 }}>{label}</label>
                  <input value={addForm[key]} onChange={e=>setAddForm(f=>({...f,[key]:e.target.value}))} placeholder={placeholder}
                    style={{ width:"100%",padding:"11px 14px",borderRadius:12,border:`1.5px solid ${T.border}`,fontSize:14,fontFamily:"'Rubik'",color:T.text,background:T.bg,outline:"none",boxSizing:"border-box" }}/>
                </div>
              ))}
              <div>
                <label style={{ fontSize:13,fontWeight:700,color:T.textSoft,display:"block",marginBottom:5 }}>קטגוריה</label>
                <select value={addForm.category} onChange={e=>setAddForm(f=>({...f,category:e.target.value}))}
                  style={{ width:"100%",padding:"11px 14px",borderRadius:12,border:`1.5px solid ${T.border}`,fontSize:14,fontFamily:"'Rubik'",color:T.text,background:T.bg,outline:"none" }}>
                  {Object.entries(CATS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <button onClick={submitPlace} style={{ marginTop:4,padding:"13px",borderRadius:14,background:"linear-gradient(135deg,#2d7720,#1a6abf)",border:"none",color:"#fff",fontSize:15,fontWeight:700,fontFamily:"'Rubik'",cursor:"pointer",boxShadow:"0 4px 16px rgba(45,119,32,.3)" }}>
                שמור מקום
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <div style={{ position:"relative",overflow:"hidden",minHeight:320 }}>
        <img src={cd.photo} alt="" onError={e=>{e.target.style.display="none"}} style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",transform:"scale(1.04)" }}/>
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(160deg, rgba(26,106,31,.95) 0%, rgba(29,106,191,.88) 60%, rgba(20,80,160,.95) 100%)" }}/>
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 0%, rgba(245,162,0,.15) 0%, transparent 60%)" }}/>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:80,background:`linear-gradient(to top, ${T.bg}, transparent)` }}/>

        {/* ── Top bar ── */}
        <div className="top-bar" style={{ position:"absolute",top:0,left:0,right:0,zIndex:10,display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:"16px 24px",pointerEvents:"none" }}>
          {/* Left: Logo + Settings & Favorites below */}
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:10,pointerEvents:"auto" }}>
            <img src="/logo.png" alt="AfulaGo" className="hero-logo" style={{ width:130,height:130,objectFit:"cover",borderRadius:"50%",border:"3px solid rgba(255,255,255,.7)",boxShadow:"0 4px 20px rgba(0,0,0,.3)",flexShrink:0 }}/>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ position:"relative" }}>
                <button onClick={()=>setSettingsOpen(o=>!o)} style={{ background:"rgba(255,255,255,.2)",border:"1.5px solid rgba(255,255,255,.35)",borderRadius:"50%",width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",backdropFilter:"blur(10px)",transition:"all .2s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.35)"}
                  onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.2)"}>
                  <Settings size={18} color="#fff"/>
                </button>
                {settingsOpen && (
                  <div style={{ position:"absolute",top:52,right:0,background:T.surface,borderRadius:14,boxShadow:"0 8px 32px rgba(0,0,0,.15)",minWidth:200,overflow:"hidden",animation:"modalIn .2s ease" }}>
                    <div style={{ padding:"12px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10 }}>
                      <User size={15} color="#2d7720"/>
                      <span style={{ fontSize:13,fontWeight:700,color:T.text }}>{regForm.name || user?.user_metadata?.name || "אורח"}</span>
                    </div>
                    <button onClick={()=>setDarkMode(d=>!d)} style={{ width:"100%",padding:"11px 16px",background:"none",border:"none",display:"flex",alignItems:"center",gap:10,cursor:"pointer",fontSize:13,color:T.text,fontFamily:"'Rubik'",fontWeight:600 }}
                      onMouseEnter={e=>e.currentTarget.style.background=darkMode?"#1E293B":"#F8FAFC"}
                      onMouseLeave={e=>e.currentTarget.style.background="none"}>
                      {darkMode ? <Sun size={15} color="#F59E0B"/> : <Moon size={15} color="#1a6abf"/>}
                      {darkMode ? "מצב יום" : "מצב לילה"}
                    </button>
                    <button onClick={()=>{setPage("register");setSettingsOpen(false);}} style={{ width:"100%",padding:"11px 16px",background:"none",border:"none",display:"flex",alignItems:"center",gap:10,cursor:"pointer",fontSize:13,color:"#DC2626",fontFamily:"'Rubik'",fontWeight:600 }}
                      onMouseEnter={e=>e.currentTarget.style.background="#FEF2F2"}
                      onMouseLeave={e=>e.currentTarget.style.background="none"}>
                      <LogOut size={15}/> התנתקות
                    </button>
                  </div>
                )}
              </div>
              <button onClick={()=>{setFOnly(o=>!o);setSettingsOpen(false);}} style={{ background:fOnly?"rgba(255,255,255,.9)":"rgba(255,255,255,.2)",border:"1.5px solid rgba(255,255,255,.35)",borderRadius:"50%",width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",backdropFilter:"blur(10px)",transition:"all .2s" }}
                onMouseEnter={e=>e.currentTarget.style.background=fOnly?"rgba(255,255,255,.9)":"rgba(255,255,255,.35)"}
                onMouseLeave={e=>e.currentTarget.style.background=fOnly?"rgba(255,255,255,.9)":"rgba(255,255,255,.2)"}>
                <Heart size={18} fill={fOnly?"#E8613C":"none"} color={fOnly?"#E8613C":"#fff"}/>
              </button>
            </div>
          </div>

          {/* Right: Profile + greeting below */}
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:10,pointerEvents:"auto" }}>
            <input ref={profileInputRef} type="file" accept="image/*" style={{ display:"none" }}
              onChange={e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>setProfileImg(ev.target.result);r.readAsDataURL(f);}}}/>
            <div onClick={()=>profileInputRef.current.click()} className="profile-pic" style={{ position:"relative",width:110,height:110,borderRadius:"50%",border:"3px solid rgba(255,255,255,.8)",overflow:"hidden",background:"rgba(255,255,255,.2)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,.25)",transition:"transform .2s",flexShrink:0 }}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.07)"}
              onMouseLeave={e=>e.currentTarget.style.transform=""}>
              {profileImg ? <img src={profileImg} alt="פרופיל" style={{ width:"100%",height:"100%",objectFit:"cover" }}/> : <User size={44} color="#fff"/>}
              <div style={{ position:"absolute",bottom:1,right:1,width:18,height:18,background:"#fff",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <Plus size={10} color="#2d7720" strokeWidth={3}/>
              </div>
            </div>
            {editingName ? (
              <input
                autoFocus
                value={regForm.name}
                onChange={e=>setRegForm(f=>({...f,name:e.target.value}))}
                onBlur={()=>setEditingName(false)}
                onKeyDown={e=>e.key==="Enter"&&setEditingName(false)}
                placeholder="הכנס שם..."
                style={{ background:"rgba(255,255,255,.2)",border:"1.5px solid rgba(255,255,255,.5)",borderRadius:30,padding:"6px 16px",fontSize:13,fontWeight:600,color:"#fff",fontFamily:"'Rubik'",outline:"none",textAlign:"center",width:140,backdropFilter:"blur(12px)" }}
              />
            ) : (
              <div onClick={()=>setEditingName(true)} style={{ display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.15)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.25)",borderRadius:30,padding:"6px 14px",animation:"badgeIn .6s ease both",cursor:"pointer" }}
                title="לחץ לעריכת שם">
                <span style={{ fontSize:14 }}>👋</span>
                <span style={{ color:"#fff",fontSize:13,fontWeight:600 }}>שלום {regForm.name || user?.user_metadata?.name || "אורח"}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Centered content ── */}
        <div className="hero-content" style={{ position:"relative",zIndex:2,padding:"100px 48px 56px",maxWidth:700,margin:"0 auto",textAlign:"center" }}>
          <div style={{ animation:"heroIn .7s ease both" }}>
            <p style={{ color:"rgba(255,255,255,.85)",margin:"0 0 28px",fontSize:17,fontWeight:400,lineHeight:1.8 }}>מסעדות, אטרקציות, בילויים ועוד — הכל על עפולה במקום אחד</p>

            {/* Search bar */}
            <div style={{ maxWidth:520,margin:"0 auto 24px",position:"relative" }}>
              <Search size={18} color="#94A3B8" style={{ position:"absolute",top:18,right:18,pointerEvents:"none",zIndex:1 }}/>
              <input
                value={q}
                onChange={e=>{ setQ(e.target.value); setShowSug(true); }}
                onFocus={()=>setShowSug(true)}
                onBlur={()=>setTimeout(()=>setShowSug(false),150)}
                placeholder="חיפוש מקומות, מסעדות, אטרקציות..."
                style={{ width:"100%",padding:"16px 52px 16px 20px",borderRadius:showSug&&suggestions.length?`16px 16px 0 0`:16,border:"none",fontSize:15,fontFamily:"'Rubik'",background:"rgba(255,255,255,.95)",backdropFilter:"blur(12px)",outline:"none",boxShadow:"0 8px 32px rgba(0,0,0,.18)",boxSizing:"border-box",color:"#0F172A" }}/>
              {showSug && suggestions.length > 0 && (
                <div style={{ position:"absolute",top:"100%",left:0,right:0,background:"#fff",borderRadius:"0 0 16px 16px",boxShadow:"0 12px 32px rgba(0,0,0,.15)",overflow:"hidden",zIndex:100 }}>
                  {suggestions.map((p,i)=>(
                    <div key={i} onMouseDown={()=>{ setQ(p.name); setShowSug(false); }}
                      style={{ display:"flex",alignItems:"center",gap:12,padding:"11px 18px",cursor:"pointer",borderTop:"1px solid #F1F5F9",transition:"background .15s" }}
                      onMouseEnter={e=>e.currentTarget.style.background="#F8FAFC"}
                      onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                      <span style={{ fontSize:22,lineHeight:1,flexShrink:0 }}>{p.icon}</span>
                      <div style={{ textAlign:"right",overflow:"hidden" }}>
                        <div style={{ fontSize:14,fontWeight:700,color:"#0F172A",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{p.name}</div>
                        <div style={{ fontSize:12,color:"#64748B",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{CATS[p._c]?.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── Category nav ── */}
      <div style={{ position:"sticky",top:0,zIndex:50,background:T.surface,borderBottom:`1px solid ${T.border}`,boxShadow:`0 2px 16px rgba(0,0,0,${darkMode?.08:.04})` }}>
        <div className="cat-nav-inner" style={{ maxWidth:1400,margin:"0 auto",padding:"0 48px",display:"flex",alignItems:"center",gap:12 }}>
          <div className="cat-scroll" style={{ display:"flex",gap:4,overflowX:"auto",padding:"10px 0",flex:1 }}>
            {[{k:"all",label:"הכל",Icon:null},...Object.entries(CATS).map(([k,v])=>({k,...v}))].map(({k,label,Icon,color})=>{
              const active=activeCat===k;
              return(
                <button key={k} onClick={()=>setAC(k)} style={{ display:"flex",alignItems:"center",gap:6,padding:"8px 18px",borderRadius:30,border:"none",background:active?(color||T.accent):"transparent",color:active?"#fff":(color||T.textSoft),fontWeight:active?700:500,fontSize:13,cursor:"pointer",whiteSpace:"nowrap",transition:"all .2s",flexShrink:0,boxShadow:active?`0 4px 14px ${(color||T.accent)}40`:"none" }}>
                  {Icon&&<Icon size={14}/>}{label}
                </button>
              );
            })}
          </div>
        </div>
      </div>


      <div className="main-content" style={{ maxWidth:1400,margin:"0 auto",padding:"28px 48px 0" }}>

        {trending.length>0&&activeCat==="all"&&!fOnly&&(
          <div style={{ marginBottom:40 }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:18 }}>
              <div style={{ width:4,height:22,borderRadius:4,background:"linear-gradient(180deg,#F59E0B,#EF4444)" }}/>
              <h2 style={{ margin:0,fontSize:20,fontWeight:800,color:T.text }}>מקומות חמים</h2>
              <span style={{ fontSize:20 }}>🔥</span>
            </div>
            <div className="cat-scroll" style={{ display:"flex",gap:16,overflowX:"auto",paddingBottom:8 }}>
              {trending.map((p,i)=>{
                const cc=CATS[p._c]?.color||"#888";
                return(
                <div key={i} onClick={()=>{setModal(p);setMCat(p._c)}} style={{ minWidth:200,borderRadius:20,background:T.card,cursor:"pointer",transition:"all .25s",border:`1px solid ${T.cardBorder}`,boxShadow:`0 4px 20px rgba(0,0,0,${darkMode?.12:.06})`,flexShrink:0,overflow:"hidden",animation:`slideIn .4s ease ${i*.07}s both` }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 12px 32px ${cc}40`}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`0 4px 20px rgba(0,0,0,${darkMode?.12:.06})`}}>
                  <div style={{ height:90,display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${cc}22,${cc}0a)`,position:"relative" }}>
                    <span style={{ fontSize:42, lineHeight: 1, display: "block" }}>{p.icon}</span>
                    <div style={{ position:"absolute",top:8,right:8,background:cc,color:"#fff",fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:10 }}>{CATS[p._c]?.label}</div>
                  </div>
                  <div style={{ padding:"12px 14px 14px" }}>
                    <h4 style={{ margin:"0 0 6px",fontSize:14,fontWeight:700,color:T.text,lineHeight:1.3 }}>{p.name}</h4>
                    <Strs r={p.rating} T={T}/>
                  </div>
                  <div style={{ height:3,background:`linear-gradient(90deg,${cc},${cc}44)` }}/>
                </div>
              )})}
            </div>
          </div>
        )}


        <div style={{ marginBottom:48 }}>
          {(()=>{
            const ql=q.trim().toLowerCase();
            const cats=activeCat==="all"?Object.keys(places||{}):[activeCat];
            const empty=cats.every(c=>{let it=(places||{})[c]||[];if(fOnly)it=it.filter(i=>favs.has(i.name));if(ql)it=it.filter(i=>(i.name||"").toLowerCase().includes(ql)||(i.desc||"").toLowerCase().includes(ql));return!it.length});
            if(empty)return(<div style={{ textAlign:"center",padding:"50px 20px",color:T.textMuted }}><Search size={44} color={T.border} style={{ marginBottom:14 }}/><p style={{ fontSize:15,fontWeight:600 }}>{ql?`לא נמצאו תוצאות עבור "${q}"`:fOnly?"אין מועדפים עדיין — לחצו על ❤️ כדי לשמור":"לא נמצאו תוצאות"}</p></div>);
            return cats.map(cat=>{
              let items=(places||{})[cat]||[];
              if(fOnly)items=items.filter(i=>favs.has(i.name));
              if(ql)items=items.filter(i=>(i.name||"").toLowerCase().includes(ql)||(i.desc||"").toLowerCase().includes(ql));
              if(!items.length)return null;
              const{Icon,label,color}=CATS[cat]||{};
              return(
                <div key={cat} style={{ marginBottom:40 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:18 }}>
                    <div style={{ width:4,height:22,borderRadius:4,background:color||T.accent }}/>
                    <div style={{ width:36,height:36,borderRadius:10,background:`${color||T.accent}18`,display:"flex",alignItems:"center",justifyContent:"center" }}>{Icon&&<Icon size={18} color={color||T.accent}/>}</div>
                    <h2 style={{ margin:0,fontSize:20,fontWeight:800,color:T.text }}>{label}</h2>
                  </div>
                  {cat==="food" ? (()=>{
                    /* Split food items into sub-sections */
                    const sections = [];
                    let current = null;
                    items.forEach(p=>{
                      if(p._sub){ current = { label: p.name, items: [] }; sections.push(current); }
                      else if(current) current.items.push(p);
                    });
                    return sections.map((sec,si)=>(
                      <div key={si} style={{ marginBottom:si<sections.length-1?20:0 }}>
                        <div style={{ padding:"6px 0 8px" }}><span style={{ fontSize:15,fontWeight:800,color:T.text }}>{sec.label}</span></div>
                        <div style={{ display:"flex",gap:14,overflowX:"auto",paddingBottom:8 }}>
                          {sec.items.map((p,i)=>{
                            const cc=CATS[cat]?.color||"#888";
                            const hasImg=p.img;
                            const f=favs.has(p.name);
                            return(
                              <div key={i} onClick={()=>{setModal(p);setMCat(cat)}} style={{ width:280,minWidth:280,background:T.card,borderRadius:20,overflow:"hidden",cursor:"pointer",border:`1px solid ${T.cardBorder}`,boxShadow:`0 4px 20px rgba(0,0,0,${darkMode?.1:.05})`,transition:"all .3s cubic-bezier(.25,.8,.25,1)",flexShrink:0,animation:`fadeUp .4s ease ${i*.05}s both` }}
                                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 16px 40px ${cc}30`}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`0 4px 20px rgba(0,0,0,${darkMode?.1:.05})`}}>
                                <div style={{ height:170,display:"flex",alignItems:"center",justifyContent:"center",background:hasImg?"#F3EDE8":`linear-gradient(135deg, ${cc}20, ${cc}08)`,position:"relative",overflow:"hidden" }}>
                                  {hasImg ? (
                                    <>
                                      <img src={p.img} alt={p.name} style={{ width:"100%",height:"100%",objectFit:"cover" }} onError={e=>{e.target.style.display="none";e.target.nextElementSibling.style.display="block";}}/>
                                      <span style={{ fontSize:48,lineHeight:1,display:"none",position:"absolute" }}>{p.icon}</span>
                                    </>
                                  ) : (
                                    <span style={{ fontSize:48, lineHeight: 1, display: "block" }}>{p.icon}</span>
                                  )}
                                  {hasImg&&<div style={{ position:"absolute",inset:0,background:"linear-gradient(transparent 50%, rgba(0,0,0,0.3))" }}/>}
                                  {p.price&&<div style={{ position:"absolute",top:8,right:8,background:"rgba(255,255,255,.92)",color:"#059669",fontSize:10,fontWeight:700,padding:"2px 6px",borderRadius:6 }}>{p.price}</div>}
                                  <button onClick={e=>{e.stopPropagation();tog(p.name)}} style={{ position:"absolute",top:8,left:8,background:"rgba(255,255,255,.92)",border:"none",borderRadius:"50%",width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 1px 6px rgba(0,0,0,.08)" }}>
                                    <Heart size={14} fill={f?"#E8613C":"none"} stroke={f?"#E8613C":"#ccc"}/>
                                  </button>
                                </div>
                                <div style={{ padding:"10px 12px 12px" }}>
                                  <h3 style={{ margin:"0 0 4px",fontSize:14,fontWeight:700,color:T.text,lineHeight:1.3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{p.name}</h3>
                                  <p style={{ margin:0,fontSize:12,color:T.textSoft,lineHeight:1.4,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",minHeight:32 }}>{p.desc}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ));
                  })() : (
                  <div style={{ display:"flex",gap:14,overflowX:"auto",paddingBottom:8 }}>
                    {items.map((p,i)=>{
                      const cc=CATS[cat]?.color||"#888";
                      const hasImg=p.img;
                      const f=favs.has(p.name);
                      return(
                        <div key={i} onClick={()=>{setModal(p);setMCat(cat)}} style={{ width:280,minWidth:280,background:T.card,borderRadius:20,overflow:"hidden",cursor:"pointer",border:`1px solid ${T.cardBorder}`,boxShadow:`0 4px 20px rgba(0,0,0,${darkMode?.1:.05})`,transition:"all .3s cubic-bezier(.25,.8,.25,1)",flexShrink:0,animation:`fadeUp .4s ease ${i*.05}s both` }}
                          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 16px 40px ${cc}30`}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`0 4px 20px rgba(0,0,0,${darkMode?.1:.05})`}}>
                          <div style={{ height:170,display:"flex",alignItems:"center",justifyContent:"center",background:hasImg?"#F3EDE8":`linear-gradient(135deg, ${cc}20, ${cc}08)`,position:"relative",overflow:"hidden" }}>
                            {hasImg ? (
                              <>
                                <img src={p.img} alt={p.name} style={{ width:"100%",height:"100%",objectFit:"cover" }} onError={e=>{e.target.style.display="none";e.target.nextElementSibling.style.display="block";}}/>
                                <span style={{ fontSize:48,lineHeight:1,display:"none",position:"absolute" }}>{p.icon}</span>
                              </>
                            ) : (
                              <span style={{ fontSize:48, lineHeight: 1, display: "block" }}>{p.icon}</span>
                            )}
                            {hasImg&&<div style={{ position:"absolute",inset:0,background:"linear-gradient(transparent 50%, rgba(0,0,0,0.3))" }}/>}
                            {p.price&&<div style={{ position:"absolute",top:8,right:8,background:"rgba(255,255,255,.92)",color:"#059669",fontSize:10,fontWeight:700,padding:"2px 6px",borderRadius:6 }}>{p.price}</div>}
                            <button onClick={e=>{e.stopPropagation();tog(p.name)}} style={{ position:"absolute",top:8,left:8,background:"rgba(255,255,255,.92)",border:"none",borderRadius:"50%",width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 1px 6px rgba(0,0,0,.08)" }}>
                              <Heart size={14} fill={f?"#E8613C":"none"} stroke={f?"#E8613C":"#ccc"}/>
                            </button>
                          </div>
                          <div style={{ padding:"12px 14px 14px" }}>
                            <h3 style={{ margin:"0 0 5px",fontSize:14.5,fontWeight:700,color:T.text,lineHeight:1.3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{p.name}</h3>
                            <p style={{ margin:0,fontSize:12,color:T.textSoft,lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",minHeight:36 }}>{p.desc}</p>
                          </div>
                          <div style={{ height:3,background:`linear-gradient(90deg,${cc},${cc}33)` }}/>
                        </div>
                      );
                    })}
                  </div>
                  )}
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* ── About Afula — bottom of page ── */}
      <div style={{ background:T.pill,padding:"36px 24px",borderTop:`1px solid ${T.border}` }}>
        <div style={{ maxWidth:1400,margin:"0 auto" }}>
          <div style={{ background:T.card,borderRadius:14,padding:"24px 28px",border:`1px solid ${T.cardBorder}`,boxShadow:"0 4px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14 }}><BookOpen size={18} color={T.accent}/><h2 style={{ margin:0,fontSize:18,fontWeight:800,color:T.text }}>📖 על עפולה</h2></div>
            <p style={{ fontSize:14,color:T.textSoft,lineHeight:1.8,margin:"0 0 18px" }}>{cd.history}</p>
            <h3 style={{ fontSize:14,fontWeight:700,color:T.text,marginBottom:10,display:"flex",alignItems:"center",gap:6 }}><Info size={14} color={T.accent}/>עובדות מעניינות</h3>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:8,marginBottom:18 }}>
              {cd.facts.map((f,i)=>(
                <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:8,padding:"10px 12px",background:T.pill,borderRadius:12,fontSize:12.5,color:T.text,lineHeight:1.5,border:`1px solid ${T.borderLight}` }}><Sparkles size={12} color={T.accent} style={{ flexShrink:0,marginTop:2 }}/>{f}</div>
              ))}
            </div>
            <h3 style={{ fontSize:14,fontWeight:700,color:T.text,marginBottom:10,display:"flex",alignItems:"center",gap:6 }}><Award size={14} color={T.accent}/>אתרי חובה</h3>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
              {cd.landmarks.map((l,i)=>(<span key={i} style={{ padding:"5px 14px",background:T.accentSoft,color:"#0369A1",borderRadius:20,fontSize:12.5,fontWeight:700 }}>{l}</span>))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ background:"linear-gradient(135deg, #2d7720, #1a6abf)",padding:"36px 24px",textAlign:"center" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:6 }}>
          <span style={{ color:"rgba(255,255,255,.95)",fontSize:22,fontWeight:800,letterSpacing:"-0.5px" }}>AfulaGo</span>
        </div>
        <span style={{ color:"rgba(255,255,255,.65)",fontSize:15 }}>בירת העמק • 2026</span>
        <div style={{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",margin:"14px 0 8px" }}>
          {[{ic:Calendar,t:`נוסדה ב-${cd.founded||"1925"}`},{ic:MapPin,t:cd.area||"28 קמ״ר"}].map((x,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:7,color:"rgba(255,255,255,.9)",fontSize:13,fontWeight:600,background:"rgba(255,255,255,.15)",padding:"8px 18px",borderRadius:30,border:"1px solid rgba(255,255,255,.2)" }}><x.ic size={14}/>{x.t}</div>
          ))}
        </div>
        <p style={{ color:"rgba(255,255,255,.65)",fontSize:15,margin:"8px 0 0" }}>נוצר על ידי בנימין יונה</p>
      </div>
    </div>
  );
}
