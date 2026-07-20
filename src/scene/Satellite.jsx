import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const ORBIT_RADIUS = 17;
const ORBIT_TILT = 0.35;
const ORBIT_HEIGHT = 4;
const ORBIT_SPEED = 0.018;

export default function Satellite() {
  const groupRef = useRef();
  const panelRef = useRef();
  const blinkRef = useRef();
  const angle = useRef(2.1);

  useFrame((state, delta) => {
    angle.current += delta * ORBIT_SPEED;
    const x = Math.cos(angle.current) * ORBIT_RADIUS;
    const z = Math.sin(angle.current) * ORBIT_RADIUS * Math.cos(ORBIT_TILT) - 16;
    const y = ORBIT_HEIGHT + Math.sin(angle.current) * ORBIT_RADIUS * Math.sin(ORBIT_TILT);

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
    }

    // Gentle breathing pulse on the status light - slow, never a hard strobe.
    if (blinkRef.current) {
      const pulse = 0.6 + Math.sin(state.clock.elapsedTime * 1.4) * 0.4;
      blinkRef.current.material.emissiveIntensity = 0.8 + pulse * 1.2;
    }
  });

  return (
    <group ref={groupRef} scale={0.55}>
      {/* main body */}
      <mesh>
        <boxGeometry args={[0.5, 0.32, 0.32]} />
        <meshStandardMaterial color="#8a8496" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* dish */}
      <mesh position={[0.4, 0.1, 0]} rotation={[0, 0, Math.PI / 3]}>
        <coneGeometry args={[0.22, 0.12, 16, 1, true]} />
        <meshStandardMaterial color="#c8c4d6" roughness={0.4} metalness={0.3} side={2} />
      </mesh>

      {/* solar panels */}
      <group ref={panelRef}>
        <mesh position={[0, 0, 0.55]}>
          <boxGeometry args={[0.06, 0.5, 0.7]} />
          <meshStandardMaterial color="#1b2a4a" emissive="#4dd8e6" emissiveIntensity={0.25} roughness={0.3} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0, -0.55]}>
          <boxGeometry args={[0.06, 0.5, 0.7]} />
          <meshStandardMaterial color="#1b2a4a" emissive="#4dd8e6" emissiveIntensity={0.25} roughness={0.3} metalness={0.4} />
        </mesh>
      </group>

      {/* status light */}
      <mesh ref={blinkRef} position={[-0.28, 0, 0]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#f0b429" emissive="#f0b429" emissiveIntensity={1} toneMapped={false} />
      </mesh>
    </group>
  );
}
