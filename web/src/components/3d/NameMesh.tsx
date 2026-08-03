"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";
import type { Group } from "three";
import { damp, getPointer } from "@/lib/sceneSignals";

const FONT_URL = "/fonts/helvetiker_bold.typeface.json";

/**
 * Text3D rebuilds its geometry when `size` changes, so this steps between
 * discrete values on resize rather than tracking the viewport continuously.
 * Sized to leave the quotes room to breathe on either side of the name.
 */
function sizeForWidth(width: number) {
  if (width < 480) return 0.4;
  if (width < 768) return 0.52;
  if (width < 1280) return 0.72;
  return 0.92;
}

type NameMeshProps = {
  name: string;
  /** When true the mesh sits still — no pointer tilt. */
  still?: boolean;
};

export function NameMesh({ name, still = false }: NameMeshProps) {
  const groupRef = useRef<Group>(null);
  const canvasWidth = useThree((state) => state.size.width);
  const size = sizeForWidth(canvasWidth);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Parallax tilt: the mesh leans towards the cursor and eases back to rest.
    const pointer = getPointer();
    const targetY = still ? 0 : pointer.pointerX * 0.28;
    const targetX = still ? 0 : -pointer.pointerY * 0.16;

    group.rotation.y = damp(group.rotation.y, targetY, 3.5, delta);
    group.rotation.x = damp(group.rotation.x, targetX, 3.5, delta);
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font={FONT_URL}
          size={size}
          height={size * 0.16}
          curveSegments={5}
          bevelEnabled
          bevelThickness={size * 0.02}
          bevelSize={size * 0.016}
          bevelOffset={0}
          bevelSegments={3}
          letterSpacing={-0.02}
        >
          {name}
          <meshStandardMaterial
            color="#dfe5f2"
            roughness={0.28}
            metalness={0.45}
            envMapIntensity={0.6}
          />
        </Text3D>
      </Center>
    </group>
  );
}
