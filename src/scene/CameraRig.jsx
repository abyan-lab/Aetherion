import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CAMERA_POINTS, LOOKAT_POINTS } from "../data/journey.js";

export default function CameraRig({ scrollProgress, entered }) {
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3(...LOOKAT_POINTS[0]));

  const cameraCurve = useMemo(
    () => new THREE.CatmullRomCurve3(CAMERA_POINTS.map((p) => new THREE.Vector3(...p)), false, "catmullrom", 0.4),
    []
  );
  const lookCurve = useMemo(
    () => new THREE.CatmullRomCurve3(LOOKAT_POINTS.map((p) => new THREE.Vector3(...p)), false, "catmullrom", 0.4),
    []
  );

  useFrame((state, delta) => {
    if (!entered) {
      // Idle establishing shot: slow drift while the loader/enter screen is up.
      camera.position.lerp(new THREE.Vector3(0, 6, 16), 0.01);
      camera.lookAt(0, 1, 0);
      return;
    }

    const p = scrollProgress.current;
    // Smooth the raw scroll target so motion feels cinematic, not scrollbar-jittery.
    p.current += (p.target - p.current) * Math.min(delta * 2.2, 1);

    const t = Math.min(Math.max(p.current, 0), 1);
    const camPos = cameraCurve.getPoint(t);
    const lookPos = lookCurve.getPoint(t);

    camera.position.lerp(camPos, 1);
    lookTarget.current.lerp(lookPos, 1);

    // Gentle handheld drift so the shot never feels locked-off.
    const driftX = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    const driftY = Math.cos(state.clock.elapsedTime * 0.12) * 0.05;

    camera.lookAt(
      lookTarget.current.x + driftX,
      lookTarget.current.y + driftY,
      lookTarget.current.z
    );
  });

  return null;
}
