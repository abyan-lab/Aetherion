import { useEffect, useState } from "react";

export default function Loader({ visible, onEnter, ready }) {
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(6);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (minTimeElapsed && ready) {
      setDisplayProgress(100);
      return undefined;
    }
    // Cosmetic climb toward ~90% while we wait - the scene has no real
    // assets to track progress against, so this is just a materializing beat.
    const interval = setInterval(() => {
      setDisplayProgress((p) => (p < 90 ? p + (90 - p) * 0.15 : p));
    }, 100);
    return () => clearInterval(interval);
  }, [minTimeElapsed, ready]);

  const canEnter = minTimeElapsed && ready;

  return (
    <div className={`loader ${visible ? "" : "loader-hidden"}`} aria-hidden={!visible}>
      <div className="loader-mark">AETHERION</div>

      {canEnter ? (
        <button className="enter-button" onClick={onEnter}>
          Enter the Realm
        </button>
      ) : (
        <>
          <div className="loader-bar">
            <div className="loader-bar-fill" style={{ width: `${displayProgress}%` }} />
          </div>
          <div className="loader-hint">awakening the realm — {Math.floor(displayProgress)}%</div>
        </>
      )}
    </div>
  );
}
