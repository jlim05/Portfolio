/**
 * A tiny module store shared between the DOM world and the R3F world.
 *
 * Scroll progress and pointer position are written by plain DOM listeners and
 * read inside `useFrame`. Routing them through module-level values instead of
 * React state means the 3D scene reacts to scroll and mouse movement without
 * triggering a single re-render, and sidesteps the question of whether React
 * context crosses the R3F reconciler boundary.
 */

const signals = {
  /** 0 at the top of the hero, 1 once it has scrolled fully out of view. */
  heroProgress: 0,
  /** Normalised to -1..1, origin at the centre of the viewport. */
  pointerX: 0,
  pointerY: 0,
};

export function setHeroProgress(value: number) {
  signals.heroProgress = value;
}

export function getHeroProgress() {
  return signals.heroProgress;
}

export function setPointer(x: number, y: number) {
  signals.pointerX = x;
  signals.pointerY = y;
}

export function getPointer() {
  return signals;
}

/**
 * Frame-rate independent interpolation — the amount of easing applied is a
 * function of elapsed time, so a 144Hz display eases at the same rate a 60Hz
 * one does.
 */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}
