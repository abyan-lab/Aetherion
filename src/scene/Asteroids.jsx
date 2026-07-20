import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ASTEROID_COUNT = 9;

function makeAsteroids() {
  return Array.from({ length: ASTEROID_COUNT }, (_, i) => ({
    radius: 14 + Math.random() * 12,
    tilt: (Math.random() - 0.5) * 1.2,
    speed: 0.008 + Math.random() * 0.014,
    phase: (i / ASTEROID_COUNT) * Math.PI * 2 + Math.random(),
    height: (Math.random() - 0.5) * 10,
    scale: 0.14 + Math.random() * 0.32,
    spinAxis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
    spinSpeed: 0.15 + Math.random() * 0.35,
  }));
}

function Asteroid({ data }) {
  const ref = useRef();
  const angle = useRef(data.phase);

  useFrame((state, delta) => {
    angle.current += delta * data.speed;
    const x = Math.cos(angle.current) * data.radius;
    const z = Math.sin(angle.current) * data.radius * Math.cos(data.tilt) - 14;
    const y = data.height + Math.sin(angle.current) * data.radius * Math.sin(data.tilt);

    if (ref.current) {
      ref.current.position.set(x, y, z);
      ref.current.rotateOnAxis(data.spinAxis, delta * data.spinSpeed);
    }
  });

  return (
    <mesh ref={ref} scale={data.scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#2a2340" roughness={0.95} metalness={0.05} flatShading />
    </mesh>
  );
}

export default function Asteroids() {
  const asteroids = useMemo(() => makeAsteroids(), []);
  return (
    <group>
      {asteroids.map((data, i) => (
        <Asteroid key={i} data={data} />
      ))}
    </group>
  );
}
