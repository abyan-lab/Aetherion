import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const handleMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    const handleOver = (e) => {
      if (e.target.closest?.("button, a, .hotspot-marker, canvas")) {
        dotRef.current?.classList.add("is-active");
      }
    };
    const handleOut = (e) => {
      if (e.target.closest?.("button, a, .hotspot-marker, canvas")) {
        dotRef.current?.classList.remove("is-active");
      }
    };

    let raf;
    const tick = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.25;
      current.current.y += (pos.current.y - current.current.y) * 0.25;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    raf = requestAnimationFrame(tick);
    document.body.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return <div ref={dotRef} className="custom-cursor" aria-hidden="true" />;
}
