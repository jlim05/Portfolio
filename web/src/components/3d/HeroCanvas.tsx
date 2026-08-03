"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { HeroScene } from "./HeroScene";

type HeroCanvasProps = {
  /** Paused (`frameloop="never"`) once the hero scrolls out of view. */
  active: boolean;
  still: boolean;
  onReady: () => void;
};

/**
 * Default-exported so it can be pulled in with `next/dynamic({ ssr: false })`
 * — three.js touches `window` at module scope, and none of this belongs in the
 * initial bundle anyway.
 */
export default function HeroCanvas({ active, still, onReady }: HeroCanvasProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 45, near: 0.1, far: 60 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
      }}
      // Give the renderer room to drop resolution before it drops frames.
      performance={{ min: 0.5 }}
      // Nothing in the scene is interactive, and the canvas sits behind real
      // DOM content — so it never swallows clicks and never raycasts.
      style={{ pointerEvents: "none" }}
    >
      <HeroScene still={still} onReady={onReady} />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
}
