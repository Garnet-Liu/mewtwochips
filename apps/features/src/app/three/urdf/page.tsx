"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group, MathUtils, Mesh, MeshPhongMaterial } from "three";
import URDFLoader, { URDFRobot } from "urdf-loader";

const DEG2RAD = Math.PI / 180;
// const RAD2DEG = 1 / DEG2RAD;

export default function Page() {
  return (
    <div className="h-full w-full">
      <Canvas shadows camera={{ position: [-5.5, 3.5, 5.5] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[1, 2, 3]} intensity={2} castShadow />

        <Humanoid />

        <OrbitControls />
      </Canvas>
    </div>
  );
}

function Humanoid() {
  const groupRef = useRef<Group>(null);
  const robotRef = useRef<URDFRobot>(null);
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    const loader = new URDFLoader();
    loader.load("/urdf/T12/urdf/T12_flipped.URDF", (robot) => {
      if (groupRef.current) {
        groupRef.current.add(robot);

        robot.lookAt(0, -1, 0);

        robotRef.current = robot;

        console.log("group", groupRef.current);
        console.log("robot", robot);
      }
    });
  }, []);

  useFrame(({ raycaster, scene }) => {
    if (!robotRef.current) return;

    const [intersects] = raycaster.intersectObjects(scene.children);

    if (meshRef.current) {
      (meshRef.current.material as MeshPhongMaterial).color.copy(
        meshRef.current.userData.originalColor,
      );
    }

    if (intersects) {
      const mesh = intersects.object as Mesh;
      mesh.userData.originalColor = (mesh.material as MeshPhongMaterial).color.clone();
      (mesh.material as MeshPhongMaterial).color.set(0xff0000);
      meshRef.current = mesh;
    }

    // animate the legs
    const time = Date.now() / 3e2;
    for (let i = 1; i <= 6; i++) {
      const offset = (i * Math.PI) / 3;
      const ratio = Math.max(0, Math.sin(time + offset));

      robotRef.current.setJointValue(`HP${i}`, MathUtils.lerp(30, 0, ratio) * DEG2RAD);
      robotRef.current.setJointValue(`KP${i}`, MathUtils.lerp(90, 150, ratio) * DEG2RAD);
      robotRef.current.setJointValue(`AP${i}`, MathUtils.lerp(-30, -60, ratio) * DEG2RAD);

      robotRef.current.setJointValue(`TC${i}A`, MathUtils.lerp(0, 0.065, ratio));
      robotRef.current.setJointValue(`TC${i}B`, MathUtils.lerp(0, 0.065, ratio));

      robotRef.current.setJointValue(`W${i}`, window.performance.now() * 0.001);
    }
  });

  return <group ref={groupRef} />;
}
