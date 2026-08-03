"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to stagger this element behind its neighbours. */
  delay?: number;
  /** Pixels to travel on the way in. */
  y?: number;
};

/**
 * Fade-and-slide on first entry into the viewport. Under reduced motion the
 * element still appears — it just arrives instantly instead of travelling.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  // Deliberately not framer-motion's `useReducedMotion`: that one reads
  // matchMedia during the first client render, so the server emits animated
  // markup while the client emits static markup and hydration mismatches.
  // Ours reports `false` through hydration, then re-renders.
  const prefersReducedMotion = usePrefersReducedMotion();

  const visible = prefersReducedMotion || isInView;

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
