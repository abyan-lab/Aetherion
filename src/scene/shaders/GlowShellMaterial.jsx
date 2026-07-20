import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 1.8);
    gl_FragColor = vec4(uColor * fresnel * uIntensity, fresnel);
  }
`;

const GlowShellMaterialImpl = shaderMaterial(
  { uColor: new THREE.Color("#a78bfa"), uIntensity: 1.2 },
  vertexShader,
  fragmentShader
);

extend({ GlowShellMaterialImpl });

export default GlowShellMaterialImpl;
