"use client";

import { useEffect, useState } from "react";
import { nav, person } from "@/content/site";

/** Fixed, near-invisible until you scroll past the hero. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-ink-950/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <a
          href="#top"
          className={`font-mono text-xs tracking-[0.2em] uppercase transition-opacity duration-500 hover:text-mist-100 ${
            scrolled ? "text-mist-300 opacity-100" : "opacity-0"
          }`}
        >
          {person.name}
        </a>

        <ul className="flex items-center gap-5 text-xs sm:gap-7 sm:text-sm">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-mist-500 transition-colors hover:text-mist-100"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
