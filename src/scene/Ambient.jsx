import { Sparkles, Stars } from "@react-three/drei";
import { forwardRef } from "react";

const Sun = forwardRef(function Sun(props, ref) {
  return (
    <mesh ref={ref} position={[-10, 9, -18]}>
      <sphereGeometry args={[0.45, 24, 24]} />
      <meshBasicMaterial color="#d9bf8c" />
    </mesh>
  );
});

export default function Ambient({ sunRef }) {
  return (
    <group>
      <fog attach="fog" args={["#0b0b1a", 8, 26]} />
      <ambientLight intensity={0.3} color="#4a3f7a" />
      <directionalLight position={[6, 8, 4]} intensity={0.6} color="#f0b429" />
      <directionalLight position={[-6, -2, -4]} intensity={0.4} color="#4dd8e6" />

      <Sun ref={sunRef} />

      <Stars radius={60} depth={40} count={1600} factor={2.2} saturation={0} fade speed={0.4} />

      <Sparkles count={80} scale={[16, 8, 20]} size={2} speed={0.3} color="#a78bfa" opacity={0.55} />
      <Sparkles count={35} scale={[10, 4, 14]} size={2.6} speed={0.5} color="#4dd8e6" opacity={0.45} />
    </group>
  );
}
