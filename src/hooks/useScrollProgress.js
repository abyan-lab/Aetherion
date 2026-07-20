import { useEffect, useRef } from "react";

/**
 * Returns a ref { current, target } holding scroll progress in [0,1].
 * `target` updates immediately on scroll; `current` should be lerped
 * toward `target` inside a useFrame loop for cinematic smoothing.
 */
export function useScrollProgress() {
  const progress = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const raw = max > 0 ? window.scrollY / max : 0;
      progress.current.target = Math.min(Math.max(raw, 0), 1);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return progress;
}
