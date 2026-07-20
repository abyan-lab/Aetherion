import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import "./shaders/HeartstoneMaterial.js";
import "./shaders/GlowShellMaterial.jsx";

export default function Heartstone() {
  const coreRef = useRef();
  const shaderRef = useRef();
  const shellRef = useRef();
  const ringGroupRef = useRef();
  const glowRef = useRef();
  const lightRef = useRef();
  const dragVelocity = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!dragging.current) {
      dragVelocity.current += (0.25 - dragVelocity.current) * delta * 1.5;
    }

    // Slow self-contained breathing pulse, so the core still feels alive
    // even without any audio driving it.
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.12;

    if (shaderRef.current) {
      shaderRef.current.uTime += delta;
      shaderRef.current.uIntensity = (hovered ? 1.6 : 1.15) * pulse;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += dragVelocity.current * delta;
      coreRef.current.rotation.x += delta * 0.08;
      const s = hovered ? 1.08 : 1;
      coreRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.15);
    }
    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.06;
    }
    if (glowRef.current) {
      glowRef.current.material.uIntensity = 1.1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.35;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 6 + Math.sin(state.clock.elapsedTime * 0.9) * 2.5;
    }
    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.y -= delta * 0.18;
      ringGroupRef.current.rotation.z += delta * 0.05;
    }
  });

  const onPointerDown = (e) => {
    e.stopPropagation();
    dragging.current = true;
    lastX.current = e.clientX;
    e.target.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    dragVelocity.current = dx * 0.02;
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
        <mesh
          ref={coreRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerOut={onPointerUp}
          onPointerOver={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <icosahedronGeometry args={[0.78, 6]} />
          <heartstoneMaterial ref={shaderRef} />
        </mesh>

        {/* thin glass shell around the core - reflective, no transmission (transmission forces an extra scene render per frame and glitches badly alongside postprocessing) */}
        <mesh ref={shellRef} scale={1.22}>
          <icosahedronGeometry args={[0.78, 3]} />
          <meshPhysicalMaterial
            roughness={0.15}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1.2}
            color="#f5f3ff"
            transparent
            opacity={0.28}
          />
        </mesh>

        {/* outer energy field - pure fresnel glow, additive */}
        <mesh ref={glowRef} scale={1.55}>
          <icosahedronGeometry args={[0.78, 2]} />
          <glowShellMaterialImpl
            uColor={new THREE.Color("#a78bfa")}
            uIntensity={1.1}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <pointLight ref={lightRef} color="#a78bfa" intensity={6} distance={6} />

        <group ref={ringGroupRef}>
          <mesh rotation={[Math.PI / 2.4, 0, 0]}>
            <torusGeometry args={[1.5, 0.015, 16, 100]} />
            <meshStandardMaterial color="#4dd8e6" emissive="#4dd8e6" emissiveIntensity={2} toneMapped={false} />
          </mesh>
          <mesh rotation={[Math.PI / 1.6, Math.PI / 5, 0]}>
            <torusGeometry args={[1.9, 0.01, 16, 100]} />
            <meshStandardMaterial color="#f0b429" emissive="#f0b429" emissiveIntensity={2} toneMapped={false} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
