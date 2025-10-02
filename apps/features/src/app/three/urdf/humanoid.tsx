"use client";

import { useFrame } from "@react-three/fiber";
import { sleep } from "@repo/ui/lib/sleep";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";

import load_mujoco, { type mujoco as Mujoco, type Simulation } from "@/lib/mujoco/mujoco_wasm";

export function Humanoid() {
  const [mujoco, setMujoco] = useState<Mujoco | null>(null);
  const [sim, setSim] = useState<Simulation | null>(null);

  useEffect(() => {
    let active = true;
    load_mujoco().then(async (mj) => {
      if (active) {
        setMujoco(mj);

        const initialScene = "simple.xml";

        // 2. 创建虚拟文件系统并写入 urdf 文件
        mj.FS.mkdir("/working");
        mj.FS.mount(mj.MEMFS, { root: "." }, "/working");

        const urdf = await (await fetch(`/${initialScene}`)).text();

        try {
          console.log(urdf);

          mj.FS.writeFile(`/working/${initialScene}`, urdf);

          console.log(mj);

          const Model = mj.Model;
          // 3. 加载 URDF -> 模型 + 仿真
          const model = new Model(`/working/${initialScene}`);
          const state = new mj.State(model);
          const simulation = new mj.Simulation(model, state);
          console.log(simulation);
        } catch (e) {
          console.log(e);
        }
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const robotRef = useRef<Group>(null);

  // 每帧驱动仿真
  useFrame(() => {
    if (sim && robotRef.current) {
      sim.step(); // 物理前进一步

      // TODO: 从 sim.state 里读取关节/位姿，然后更新 three.js 的 mesh
      // 例如 robotRef.current.children[i].position.set(...)
    }
  });

  return (
    <group ref={robotRef}>
      {/* 先放一个占位 cube，后面可以用 sim 的几何信息替换 */}
      <mesh>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </group>
  );
}
