"use client";

import { Suspense, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { NameMesh } from "./NameMesh";
import { FloatingQuotes } from "./FloatingQuotes";
import { ParticleField } from "./ParticleField";
import { damp, getHeroProgress, getPointer } from "@/lib/sceneSignals";
import { person, quotes } from "@/content/site";

const CAMERA_START_Z = 9;
const CAMERA_DOLLY = 3.1;

/**
 * Drives the camera: a gentle pointer sway plus a dolly-in tied to how far the
 * hero has been scrolled. Runs entirely in `useFrame` off a module-level
 * scroll value, so scrolling never re-renders React.
 */
function CameraRig({ still }: { still: boolean }) {
  useFrame((state, delta) => {
    const { camera } = state;
    const pointer = getPointer();
    const progress = getHeroProgress();

    // Ease the dolly so most of the movement happens early in the scroll.
    const eased = progress * progress * (3 - 2 * progress);

    const targetZ = CAMERA_START_Z - eased * CAMERA_DOLLY;
    const targetX = still ? 0 : pointer.pointerX * 0.7;
    const targetY = (still ? 0 : pointer.pointerY * 0.4) - eased * 0.9;

    const lambda = still ? 12 : 3;
    camera.position.x = damp(camera.position.x, targetX, lambda, delta);
    camera.position.y = damp(camera.position.y, targetY, lambda, delta);
    camera.position.z = damp(camera.position.z, targetZ, 4, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/** Fires once the suspended children (font loads) have resolved. */
function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return null;
}

type HeroSceneProps = {
  /** Reduced-motion: keep the composition, drop the movement. */
  still: boolean;
  onReady: () => void;
};

export function HeroScene({ still, onReady }: HeroSceneProps) {
  return (
    <>
      <color attach="background" args={["#08090c"]} />
      <fog attach="fog" args={["#08090c", 12, 26]} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 8]} intensity={1.5} />
      <pointLight position={[-6, -2, 4]} intensity={40} color="#8ba9ff" distance={22} />
      <pointLight position={[6, 3, -2]} intensity={22} color="#ffffff" distance={20} />

      <CameraRig still={still} />

      <ParticleField
        count={still ? 320 : 700}
        radius={16}
        opacity={0.45}
        speed={still ? 0 : 0.012}
      />

      <Suspense fallback={null}>
        <NameMesh name={person.name} still={still} />
        <FloatingQuotes quotes={quotes} still={still} />
        <SceneReady onReady={onReady} />
        <Preload all />
      </Suspense>
    </>
  );
}
