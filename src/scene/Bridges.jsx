import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BRIDGE_LINKS = [
  { a: [-4.5, 1.6, -2], b: [3.2, -0.6, -4.5], color: "#4dd8e6" },
  { a: [3.2, -0.6, -4.5], b: [0, -2.2, -11], color: "#8b5cf6" },
  { a: [-6.5, -1.2, -7], b: [0, -2.2, -11], color: "#f0b429" },
  { a: [5.5, 2.4, -8], b: [0, -2.2, -11], color: "#4dd8e6" },
];

// A small procedural stripe texture read as "flowing current" once animated.
function useFlowTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, size, 0);
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(0.5, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, 1);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 1);
    return tex;
  }, []);
}

function Bridge({ a, b, color }) {
  const flowTexture = useFlowTexture();

  const geometry = useMemo(() => {
    const start = new THREE.Vector3(...a);
    const end = new THREE.Vector3(...b);
    const mid = start.clone().lerp(end, 0.5).add(new THREE.Vector3(0, -1.1, 0));
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return new THREE.TubeGeometry(curve, 40, 0.035, 8, false);
  }, [a, b]);

  useFrame((state, delta) => {
    flowTexture.offset.x -= delta * 0.35;
  });

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        map={flowTexture}
        color={color}
        transparent
        opacity={0.9}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function Bridges() {
  return (
    <group>
      {BRIDGE_LINKS.map((link, i) => (
        <Bridge key={i} {...link} />
      ))}
    </group>
  );
}
