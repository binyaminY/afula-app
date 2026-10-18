# AfulaGo

A Wolt-style guide to Afula and the Jezreel Valley: restaurants, cafés, fun, nature, culture, shopping and essentials, in Hebrew, English and Russian.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run lint
```

## Where things live

- `src/data/places.js`: every place (name, category, address, phone, tags, `source`), plus the categories and the home-screen collections. Collected in October 2026 from public directories and articles; each place links its source.
- `src/data/city.js`: facts about the city (stats, timeline, neighborhoods) with sources.
- `src/i18n.js`: interface strings for he / en / ru.
- `src/index.css`: design tokens (WhatsApp bottle green), light / dark, accessibility modes and all components.
- `src/components/`, `src/views/`: UI. `Logo.jsx` holds the logo; `public/favicon.svg` is the same mark as a file.

Saved places, places people add, language, theme and accessibility settings are stored in the browser (localStorage). The optional account uses Supabase auth.

To add a place, add an object to `PLACES` with a unique `id`, a `cat` from `CATEGORIES`, and a `source` URL.
