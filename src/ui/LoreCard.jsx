export default function LoreCard({ hotspot, onClose }) {
  if (!hotspot) return null;

  return (
    <div className="lore-backdrop" onClick={onClose}>
      <div className="lore-card" onClick={(e) => e.stopPropagation()}>
        <button className="lore-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <span className="lore-eyebrow">Field Note</span>
        <h3 className="lore-title">{hotspot.label}</h3>
        <p className="lore-text">{hotspot.text}</p>
      </div>
    </div>
  );
}
