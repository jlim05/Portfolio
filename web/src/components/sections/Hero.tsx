"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { person, quotes } from "@/content/site";
import {
  useIsHydrated,
  useIsSmallScreen,
  usePrefersReducedMotion,
} from "@/hooks/useMediaQuery";
import { setHeroProgress, setPointer } from "@/lib/sceneSignals";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { HeroBackdrop } from "./HeroBackdrop";

/**
 * three.js + drei is by far the heaviest thing on the page, so it is split out
 * of the initial bundle and never even requested on devices that will be shown
 * the static hero instead.
 */
const HeroCanvas = dynamic(() => import("@/components/3d/HeroCanvas"), {
  ssr: false,
  // The CSS backdrop below is already painted; no spinner needed.
  loading: () => null,
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sceneReady, setSceneReady] = useState(false);

  const isHydrated = useIsHydrated();
  const isSmallScreen = useIsSmallScreen();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Media-query hooks report `false` for the hydration render, so gate on
  // hydration too — otherwise phones would start downloading the three.js
  // chunk before we know they are phones.
  const use3D = isHydrated && !isSmallScreen && !prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Feed the camera rig. Written to a module value, not React state.
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setHeroProgress(value);
  });

  // Fade the whole hero out as it leaves, handing over to normal 2D scrolling.
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pause the render loop the moment the hero is off screen.
  const [inView, setInView] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setInView((current) => {
      const next = value < 0.99;
      return current === next ? current : next;
    });
  });

  useEffect(() => {
    if (!use3D) return;

    const onPointerMove = (event: PointerEvent) => {
      setPointer(
        (event.clientX / window.innerWidth) * 2 - 1,
        1 - (event.clientY / window.innerHeight) * 2,
      );
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      setPointer(0, 0);
    };
  }, [use3D]);

  const handleSceneReady = useCallback(() => setSceneReady(true), []);

  // Once the 3D name is on screen the DOM heading is redundant visually, but it
  // stays in the document for screen readers, search engines and text search.
  const showDomName = !(use3D && sceneReady);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-dvh w-full overflow-hidden"
    >
      <motion.div
        style={{ opacity: prefersReducedMotion ? 1 : heroOpacity }}
        className="absolute inset-0"
      >
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            sceneReady ? "opacity-0" : "opacity-100"
          }`}
        >
          <HeroBackdrop />
        </div>

        {use3D ? (
          <div className="absolute inset-0">
            <HeroCanvas active={inView} still={false} onReady={handleSceneReady} />
          </div>
        ) : null}

        {showDomName ? (
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-mist-100 sm:text-6xl lg:text-7xl">
              {person.name}
            </h1>

            {/* The floating 3D quotes have no equivalent in the static hero,
                so a short stack of them stands in. */}
            <ul className="mt-10 flex max-w-sm flex-col gap-3 text-xs text-mist-500/80 sm:text-sm">
              {quotes.slice(0, 3).map((quote) => (
                <li key={quote.text} className="text-balance italic">
                  “{quote.text}”
                </li>
              ))}
            </ul>
          </div>
        ) : (
          /* The name itself is the 3D mesh; this keeps a real heading in the
             document for screen readers, search engines and text search. */
          <h1 className="sr-only">{person.name}</h1>
        )}

        {/* Inside the fading wrapper so it leaves with the rest of the hero
            rather than hanging over the section below. */}
        <ScrollIndicator />
      </motion.div>

      {/* Blends the hero into the section below it. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-ink-950" />
    </section>
  );
}
