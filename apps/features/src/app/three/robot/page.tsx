"use client";

import { CameraShake, OrbitControls, Stage, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";

export default function Page() {
  return (
    <div className="h-full w-full">
      <Canvas>
        <Robot />

        <OrbitControls makeDefault />

        <CameraShake
          maxYaw={0} // Max amount camera can yaw in either direction
          maxPitch={0.05} // Max amount camera can pitch in either direction
          maxRoll={0.05} // Max amount camera can roll in either direction
          yawFrequency={0.05} // Frequency of the the yaw rotation
          pitchFrequency={0.2} // Frequency of the pitch rotation
          rollFrequency={0.2} // Frequency of the roll rotation
          intensity={1} // initial intensity of the shake
          decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at />
        />
      </Canvas>
    </div>
  );
}

function Robot() {
  const { scene, animations } = useGLTF("/robot-draco.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    actions?.Idle?.play();
  }, [actions, scene]);

  return (
    <Suspense fallback={null}>
      <Stage shadows={{ type: "contact", opacity: 1, blur: 2 }}>
        <primitive object={scene} />
      </Stage>
    </Suspense>
  );
}
