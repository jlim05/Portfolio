"use client";

import { useRef } from "react";
import type { Project } from "@/content/site";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const MAX_TILT_DEG = 5;

/**
 * Pointer-follow tilt written straight to `style.transform` — no state, no
 * re-renders, no tilt library. Falls back to a plain lift on touch devices,
 * which never fire `pointermove` before a tap.
 */
export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion || event.pointerType !== "mouse") return;

    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `perspective(900px) rotateX(${(-py * MAX_TILT_DEG).toFixed(
      2,
    )}deg) rotateY(${(px * MAX_TILT_DEG).toFixed(2)}deg) translateY(-4px)`;
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "";
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      className="group relative flex h-full flex-col rounded-xl border border-white/6 bg-ink-900/60 p-6 transition-[transform,border-color,background-color] duration-300 ease-out will-change-transform hover:border-accent/25 hover:bg-ink-800/60 sm:p-7"
    >
      {/* Accent wash that only shows on hover. */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br from-accent/6 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-4">
        <h3 className="text-lg font-medium tracking-tight text-mist-100">
          {project.title}
        </h3>
        {project.meta ? (
          <span className="font-mono text-[11px] text-mist-500">{project.meta}</span>
        ) : null}
      </div>

      <p className="relative mt-3 text-sm leading-relaxed text-pretty text-mist-500">
        {project.description}
      </p>

      <ul className="relative mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-white/8 px-2.5 py-1 font-mono text-[10px] tracking-wide text-mist-300"
          >
            {tech}
          </li>
        ))}
      </ul>

      {/* Skipped entirely when a project has neither link, so cards without
          them do not carry an empty strip of padding at the bottom. */}
      {project.github || project.live ? (
        <div className="relative mt-6 flex flex-wrap gap-4 pt-4 text-sm">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-mist-300 underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              GitHub ↗
            </a>
          ) : null}
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
              className="text-mist-300 underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Live ↗
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
