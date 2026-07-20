import { useState } from "react";
import { Html, Float } from "@react-three/drei";
import { HOTSPOTS } from "../data/lore.js";

function Marker({ data, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Float speed={1.6} floatIntensity={0.8} rotationIntensity={0.4}>
      <group position={data.position}>
        <Html center distanceFactor={8} occlude>
          <button
            type="button"
            className={`hotspot-marker ${hovered ? "is-hovered" : ""}`}
            aria-label={`Read: ${data.label}`}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onClick={() => onSelect(data)}
          >
            <span className="hotspot-dot" />
          </button>
        </Html>
      </group>
    </Float>
  );
}

export default function Hotspots({ onOpen }) {
  return (
    <group>
      {HOTSPOTS.map((data) => (
        <Marker key={data.id} data={data} onSelect={onOpen} />
      ))}
    </group>
  );
}
