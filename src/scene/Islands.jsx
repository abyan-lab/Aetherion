import { useMemo } from "react";
import { Float } from "@react-three/drei";

const ISLAND_LAYOUT = [
  { pos: [-4.5, 1.6, -2], scale: 1.3, crystals: 3, color: "#4dd8e6", speed: 0.9 },
  { pos: [3.2, -0.6, -4.5], scale: 1.7, crystals: 4, color: "#8b5cf6", speed: 0.7 },
  { pos: [-6.5, -1.2, -7], scale: 1.1, crystals: 2, color: "#f0b429", speed: 1.1 },
  { pos: [5.5, 2.4, -8], scale: 0.9, crystals: 2, color: "#8b5cf6", speed: 1.2 },
  { pos: [0, -2.2, -11], scale: 2.2, crystals: 5, color: "#4dd8e6", speed: 0.5 },
  { pos: [-2.5, 3.4, -13], scale: 1, crystals: 2, color: "#f0b429", speed: 1 },
];

function Crystal({ position, color, height = 1, radius = 0.12 }) {
  return (
    <mesh position={position} rotation={[0, Math.random() * Math.PI, 0]} castShadow>
      <coneGeometry args={[radius, height, 6]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.7}
        roughness={0.05}
        metalness={0.1}
        transmission={0.55}
        thickness={0.6}
        ior={1.4}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transparent
        opacity={0.96}
      />
    </mesh>
  );
}

function Island({ pos, scale, crystals, color, speed }) {
  const crystalPositions = useMemo(
    () =>
      Array.from({ length: crystals }, () => [
        (Math.random() - 0.5) * scale * 1.2,
        0.4 + Math.random() * 0.3,
        (Math.random() - 0.5) * scale * 1.2,
      ]),
    [crystals, scale]
  );

  return (
    <Float speed={speed} rotationIntensity={0.06} floatIntensity={0.5}>
      <group position={pos} scale={scale}>
        {/* rock base — two overlapping low-poly forms read as an irregular outcrop */}
        <mesh castShadow receiveShadow rotation={[0.1, 0.4, 0]}>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshStandardMaterial color="#241d3a" roughness={0.9} metalness={0.1} flatShading />
        </mesh>
        <mesh position={[0.25, -0.3, 0.1]} rotation={[0.3, 1, 0.2]} scale={0.6}>
          <icosahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial color="#1a1530" roughness={0.95} metalness={0.05} flatShading />
        </mesh>

        {crystalPositions.map((p, i) => (
          <Crystal key={i} position={p} color={color} height={0.6 + Math.random() * 0.6} />
        ))}
      </group>
    </Float>
  );
}

export default function Islands() {
  return (
    <group>
      {ISLAND_LAYOUT.map((island, i) => (
        <Island key={i} {...island} />
      ))}
    </group>
  );
}
