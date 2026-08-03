"use client";

import { useCallback, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * `false` during SSR and the hydration render, `true` from the first client
 * render onwards. Use it to gate anything that must not run on the server —
 * notably mounting a WebGL canvas.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * SSR-safe media query subscription. Reports `false` on the server and during
 * hydration, then settles to the real value — so nothing render-critical above
 * the fold should depend on it.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** True when the user has asked the OS to minimise motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Narrow viewport *or* a coarse pointer — both are good proxies for "this
 * device will not enjoy a full WebGL scene".
 */
export function useIsSmallScreen(): boolean {
  return useMediaQuery("(max-width: 767px), (pointer: coarse)");
}
