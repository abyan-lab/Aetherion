import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom, Vignette, GodRays, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import CameraRig from "./CameraRig.jsx";
import Heartstone from "./Heartstone.jsx";
import Islands from "./Islands.jsx";
import Bridges from "./Bridges.jsx";
import Ambient from "./Ambient.jsx";
import Nebula from "./Nebula.jsx";
import LightShafts from "./LightShafts.jsx";
import Asteroids from "./Asteroids.jsx";
import Satellite from "./Satellite.jsx";
import Hotspots from "./Hotspots.jsx";
import SceneErrorBoundary from "./SceneErrorBoundary.jsx";

function Effects({ sunRef }) {
  const [sun, setSun] = useState(null);

  // GodRays needs the sun mesh to already exist before it mounts.
  if (!sun && sunRef.current) setSun(sunRef.current);

  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.55} luminanceThreshold={0.32} luminanceSmoothing={0.4} mipmapBlur radius={0.7} />
      {sun ? (
        <GodRays
          sun={sun}
          blendFunction={BlendFunction.SCREEN}
          samples={24}
          density={0.75}
          decay={0.92}
          weight={0.15}
          exposure={0.1}
          clampMax={0.6}
        />
      ) : (
        <></>
      )}
      <ChromaticAberration offset={[0.0005, 0.0005]} radialModulation={false} modulationOffset={0} />
      <Vignette eskil={false} offset={0.2} darkness={0.7} />
    </EffectComposer>
  );
}

export default function Scene({ scrollProgress, onReady, onSelectHotspot, entered }) {
  const sunRef = useRef();

  return (
    <Canvas
      camera={{ position: [0, 6, 16], fov: 50, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.85,
      }}
      dpr={[1, 1.5]}
      onCreated={() => onReady?.()}
    >
      <color attach="background" args={["#0b0b1a"]} />
      <Suspense fallback={null}>
        <Ambient sunRef={sunRef} />
        <Nebula />
        <Asteroids />
        <Satellite />
        <Heartstone />
        <LightShafts />
        <Islands />
        <Bridges />
        <Hotspots onOpen={onSelectHotspot} />
        <CameraRig scrollProgress={scrollProgress} entered={entered} />
        <SceneErrorBoundary>
          <Effects sunRef={sunRef} />
        </SceneErrorBoundary>
      </Suspense>
    </Canvas>
  );
}
