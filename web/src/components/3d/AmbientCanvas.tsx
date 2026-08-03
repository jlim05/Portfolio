"use client";

import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";

type AmbientCanvasProps = {
  /** Paused when the host section is off screen. */
  active: boolean;
  still: boolean;
};

/**
 * A stripped-down second canvas that reuses the hero's particle motif as a
 * background texture for the hobbies section. Deliberately minimal: no lights,
 * no materials that need them, one draw call.
 */
export default function AmbientCanvas({ active, still }: AmbientCanvasProps) {
  return (
    <Canvas
      frameloop={active && !still ? "always" : "demand"}
      dpr={[1, 1.5]}
      // Camera well clear of the field's outer radius: with size attenuation,
      // a point that drifts near the camera blows up to tens of pixels.
      camera={{ position: [0, 0, 22], fov: 50 }}
      gl={{ antialias: false, powerPreference: "low-power", alpha: true }}
      performance={{ min: 0.4 }}
      style={{ pointerEvents: "none" }}
    >
      <ParticleField
        count={400}
        radius={10}
        color="#8ba9ff"
        opacity={0.55}
        size={0.06}
        speed={still ? 0 : 0.02}
        seed={90210}
      />
    </Canvas>
  );
}
