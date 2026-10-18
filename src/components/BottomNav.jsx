import { Compass, Heart, Landmark, Search } from "lucide-react";

export function BottomNav({ tab, setTab, t, savedCount }) {
  const items = [
    { id: "home", label: t.tabHome, Icon: Compass },
    { id: "search", label: t.tabSearch, Icon: Search },
    { id: "saved", label: t.tabSaved, Icon: Heart, count: savedCount },
    { id: "city", label: t.tabCity, Icon: Landmark },
  ];
  return (
    <nav className="bottom-nav" aria-label={t.tabHome}>
      {items.map(item => {
        const NavIcon = item.Icon;
        return (
          <button key={item.id} type="button" className="nav-item" aria-current={tab === item.id ? "page" : undefined} onClick={() => setTab(item.id)}>
            <span className="nav-icon"><NavIcon size={22} aria-hidden="true" /></span>
            {item.label}
            {item.count > 0 && <span className="nav-count" aria-hidden="true">{item.count}</span>}
          </button>
        );
      })}
    </nav>
  );
}
