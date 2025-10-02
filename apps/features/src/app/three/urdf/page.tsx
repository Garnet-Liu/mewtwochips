"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Color } from "three";

import { Humanoid } from "@/app/three/urdf/humanoid";

const DEG2RAD = Math.PI / 180;
// const RAD2DEG = 1 / DEG2RAD;

export default function Page() {
  return (
    <div className="h-full w-full">
      <Canvas shadows camera={{ fov: 75, near: 0.1, far: 1000, position: [-5.5, 3.5, 5.5] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[1, 2, 3]} intensity={2} castShadow />

        <Humanoid />

        <OrbitControls />
      </Canvas>
    </div>
  );
}

const highlightColor = `#${new Color(0xffffff).lerp(new Color("#009688"), 0.35).getHexString()}`;
