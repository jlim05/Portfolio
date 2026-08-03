"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { hobbies, sections } from "@/content/site";
import {
  useIsHydrated,
  useIsSmallScreen,
  usePrefersReducedMotion,
} from "@/hooks/useMediaQuery";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const AmbientCanvas = dynamic(() => import("@/components/3d/AmbientCanvas"), {
  ssr: false,
  loading: () => null,
});

export function Hobbies() {
  const sectionRef = useRef<HTMLElement>(null);

  const isHydrated = useIsHydrated();
  const isSmallScreen = useIsSmallScreen();
  const prefersReducedMotion = usePrefersReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.15 });

  // Same trade-off as the hero: the particle backdrop is decorative, so small
  // screens and reduced-motion visitors never pay to download it. The chunk is
  // shared with the hero, so on desktop this is usually already cached.
  const showParticles = isHydrated && !isSmallScreen && !prefersReducedMotion;

  return (
    <section
      id="personal"
      ref={sectionRef}
      className="relative overflow-hidden py-32 md:py-40"
    >
      {showParticles ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <AmbientCanvas active={inView} still={prefersReducedMotion} />
        </div>
      ) : null}

      {/* Softens the particles into the neighbouring sections without washing
          them out entirely. */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-ink-950 via-ink-950/20 to-ink-950" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading eyebrow={sections.hobbies.eyebrow}>
          {sections.hobbies.heading}
        </SectionHeading>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hobbies.map((hobby, index) => (
            <Reveal key={hobby.title} delay={Math.min(index, 3) * 0.06}>
              <div className="h-full rounded-xl border border-white/6 bg-ink-900/40 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-accent/20 hover:bg-ink-800/40">
                <span className="text-2xl" aria-hidden="true">
                  {hobby.icon}
                </span>
                <h3 className="mt-4 text-base font-medium text-mist-100">
                  {hobby.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-500">
                  {hobby.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
