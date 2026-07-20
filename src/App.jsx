import { useState } from "react";
import Scene from "./scene/Scene.jsx";
import Loader from "./ui/Loader.jsx";
import Section from "./ui/Section.jsx";
import JourneyIndicator from "./ui/JourneyIndicator.jsx";
import LoreCard from "./ui/LoreCard.jsx";
import CustomCursor from "./ui/CustomCursor.jsx";
import { useScrollProgress } from "./hooks/useScrollProgress.js";
import { CHECKPOINTS } from "./data/journey.js";
import "./App.css";

export default function App() {
  const scrollProgress = useScrollProgress();
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const handleEnter = () => {
    setEntered(true);
  };

  return (
    <div className="app">
      <CustomCursor />
      <Loader visible={!entered} onEnter={handleEnter} ready={ready} />
      <LoreCard hotspot={activeHotspot} onClose={() => setActiveHotspot(null)} />

      <div className="canvas-layer">
        <Scene
          scrollProgress={scrollProgress}
          onReady={() => setReady(true)}
          onSelectHotspot={setActiveHotspot}
          entered={entered}
        />
      </div>

      <header className="site-header">
        <span className="wordmark">AETHERION</span>
        <span className="site-tag">3D Websites Hackathon</span>
      </header>

      {entered && <JourneyIndicator scrollProgress={scrollProgress} />}

      <main className="scroll-track">
        {CHECKPOINTS.map((checkpoint, i) => (
          <Section
            key={checkpoint.id}
            data={checkpoint}
            align={i % 2 === 0 ? "left" : "right"}
            cta={
              i === CHECKPOINTS.length - 1 ? (
                <a className="cta-button" href="#top" onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}>
                  Return to the Sky
                </a>
              ) : null
            }
          />
        ))}
      </main>

      <div className="scroll-cue">
        <span>scroll</span>
        <div className="scroll-cue-line" />
      </div>
    </div>
  );
}
