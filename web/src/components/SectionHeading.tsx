import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  children: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <Reveal className={className}>
      <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance text-mist-100 sm:text-4xl">
        {children}
      </h2>
    </Reveal>
  );
}
