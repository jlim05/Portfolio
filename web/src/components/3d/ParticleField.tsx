"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

type ParticleFieldProps = {
  count?: number;
  /** Outer radius of the spherical shell the points are scattered through. */
  radius?: number;
  color?: string;
  opacity?: number;
  size?: number;
  /** Radians per second of idle rotation. 0 freezes the field. */
  speed?: number;
  /** Change to reshuffle the scatter. */
  seed?: number;
};

/**
 * mulberry32. Seeded rather than `Math.random` so the same props always give
 * the same field — the scatter survives re-renders and matches between server
 * and client if this ever gets prerendered.
 */
function createRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A single draw-call starfield: one `THREE.Points` over a static position
 * buffer. Cheaper than instanced meshes for this many specks, and the
 * geometry/material are declarative so R3F disposes them on unmount.
 */
export function ParticleField({
  count = 700,
  radius = 16,
  color = "#9fb2d8",
  opacity = 0.5,
  size = 0.035,
  speed = 0.012,
  seed = 1337,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const random = createRandom(seed);
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Uniform direction on the sphere, then a biased radius so the field
      // feels denser towards the outside than a solid ball would.
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const r = radius * (0.45 + 0.55 * Math.cbrt(random()));

      array[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      array[i * 3 + 2] = r * Math.cos(phi);
    }
    return array;
  }, [count, radius, seed]);

  useFrame((_, delta) => {
    if (!speed || !pointsRef.current) return;
    pointsRef.current.rotation.y += delta * speed;
    pointsRef.current.rotation.x += delta * speed * 0.35;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      {/* drei's PointMaterial rather than a bare `pointsMaterial`: the latter
          draws each point as a square sprite, which is obvious on any point
          close enough to the camera to span more than a few pixels. This one
          discards the corners so they render as round specks. */}
      <PointMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}
