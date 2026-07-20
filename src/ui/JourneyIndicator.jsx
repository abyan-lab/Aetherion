import { useEffect, useRef, useState } from "react";
import { CHECKPOINTS } from "../data/journey.js";

export default function JourneyIndicator({ scrollProgress }) {
  const [active, setActive] = useState(0);
  const raf = useRef();

  useEffect(() => {
    const tick = () => {
      const p = scrollProgress.current.current;
      let closest = 0;
      let closestDist = Infinity;
      CHECKPOINTS.forEach((c, i) => {
        const d = Math.abs(c.progress - p);
        if (d < closestDist) {
          closestDist = d;
          closest = i;
        }
      });
      setActive(closest);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [scrollProgress]);

  return (
    <nav className="journey-indicator" aria-label="Journey progress">
      {CHECKPOINTS.map((c, i) => (
        <div key={c.id} className={`journey-dot ${i === active ? "is-active" : ""}`}>
          <span className="journey-dot-numeral">{c.eyebrow.replace(".", "")}</span>
        </div>
      ))}
    </nav>
  );
}
