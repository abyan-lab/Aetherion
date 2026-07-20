import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function makeShaftTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,255,255,0.9)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.25)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

export default function LightShafts() {
  const groupRef = useRef();
  const texture = useMemo(() => makeShaftTexture(), []);

  const shafts = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        rotation: (i / 5) * Math.PI * 2,
        tilt: 0.3 + Math.random() * 0.4,
        length: 6 + Math.random() * 3,
        width: 0.6 + Math.random() * 0.5,
      })),
    []
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {shafts.map((s, i) => (
        <mesh key={i} rotation={[s.tilt, s.rotation, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[s.width, s.length]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.16}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
            color="#c9b8ff"
          />
        </mesh>
      ))}
    </group>
  );
}
