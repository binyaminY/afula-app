import { Clock, ExternalLink, Globe, Heart, Info, Map as MapIcon, MapPin, Navigation, Phone, Share2, X } from "lucide-react";
import { Sheet } from "./Sheet";
import { TAG_LABELS } from "../data/places";
import { mapsUrl, sharePlace, telUrl, wazeUrl } from "../lib/links";

export function PlaceSheet({ place, category, saved, onToggleSave, onClose, notify, t, lang }) {
  const titleId = `place-title-${place.id}`;
  const share = async () => {
    const result = await sharePlace(place);
    if (result === "copied") notify(t.copied);
  };
  const tags = place.tags.filter(tag => TAG_LABELS[tag]);

  return (
    <Sheet labelledBy={titleId} onClose={onClose}>
      <div className="card-art sheet-art" style={{ "--tint": category?.tint }}>
        <span className="emoji" aria-hidden="true">{place.emoji}</span>
        <button type="button" className="icon-btn sheet-close" onClick={onClose} aria-label={t.close}><X size={20} aria-hidden="true" /></button>
        <button type="button" className="heart" onClick={() => onToggleSave(place.id)} aria-pressed={saved}
          aria-label={`${saved ? t.unsave : t.save}: ${place.name}`} style={{ top: 12, insetInlineEnd: 12, width: 42, height: 42 }}>
          <Heart size={20} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>

      <div className="sheet-body">
        <h2 id={titleId}>{place.name}</h2>
        <div className="sheet-sub">
          <span className="tag">{category?.emoji} {category?.label[lang]}</span>
          {place.sub && <span className="tag">{place.sub}</span>}
          {place.nearby && <span className="tag">{t.nearby}</span>}
          {tags.map(tag => <span key={tag} className="tag">{TAG_LABELS[tag][lang]}</span>)}
        </div>
        <p className="sheet-desc">{place.desc}</p>

        <div className="actions">
          <a className="action" href={wazeUrl(place)} target="_blank" rel="noopener noreferrer">
            <span className="action-icon"><Navigation size={19} aria-hidden="true" /></span>{t.navigate}
          </a>
          <a className="action" href={mapsUrl(place)} target="_blank" rel="noopener noreferrer">
            <span className="action-icon"><MapIcon size={19} aria-hidden="true" /></span>Google Maps
          </a>
          {place.phone && (
            <a className="action" href={telUrl(place.phone)}>
              <span className="action-icon"><Phone size={19} aria-hidden="true" /></span>{t.call}
            </a>
          )}
          {place.url && (
            <a className="action" href={place.url} target="_blank" rel="noopener noreferrer">
              <span className="action-icon"><Globe size={19} aria-hidden="true" /></span>{t.website}
            </a>
          )}
          <button type="button" className="action" onClick={share}>
            <span className="action-icon"><Share2 size={19} aria-hidden="true" /></span>{t.share}
          </button>
        </div>

        <div className="info">
          <div className="info-row"><MapPin size={18} aria-hidden="true" /><div><small>{t.address}</small>{place.address}</div></div>
          {place.phone && (
            <div className="info-row"><Phone size={18} aria-hidden="true" /><div><small>{t.phone}</small><a href={telUrl(place.phone)} dir="ltr">{place.phone}</a></div></div>
          )}
          {place.hours && (
            <div className="info-row"><Clock size={18} aria-hidden="true" /><div><small>{t.hours}</small>{place.hours}</div></div>
          )}
          {place.source && (
            <div className="info-row"><ExternalLink size={18} aria-hidden="true" /><div><small>{t.source}</small>
              <a href={place.source} target="_blank" rel="noopener noreferrer">{new URL(place.source).hostname.replace(/^www\./, "")}</a></div></div>
          )}
        </div>
        <p className="note"><Info size={15} aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />{t.checkHours}</p>
      </div>
    </Sheet>
  );
}
