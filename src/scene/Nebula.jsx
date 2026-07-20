import { useMemo } from "react";
import * as THREE from "three";

function makeCloudTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,255,255,0.55)");
  grad.addColorStop(0.5, "rgba(255,255,255,0.12)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

const CLOUDS = [
  { pos: [-8, 3, -18], scale: 14, color: "#8b5cf6", opacity: 0.18 },
  { pos: [10, -4, -22], scale: 18, color: "#4dd8e6", opacity: 0.14 },
  { pos: [0, 6, -26], scale: 20, color: "#f0b429", opacity: 0.08 },
  { pos: [-14, -6, -14], scale: 12, color: "#8b5cf6", opacity: 0.15 },
  { pos: [6, 2, -30], scale: 22, color: "#4dd8e6", opacity: 0.1 },
];

export default function Nebula() {
  const texture = useMemo(() => makeCloudTexture(), []);

  return (
    <group>
      {CLOUDS.map((c, i) => (
        <sprite key={i} position={c.pos} scale={[c.scale, c.scale, 1]}>
          <spriteMaterial
            map={texture}
            color={c.color}
            transparent
            opacity={c.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}
