export function ScrollIndicator() {
  return (
    <a
      href="#about"
      className="group absolute inset-x-0 bottom-8 z-20 mx-auto flex w-fit flex-col items-center gap-2"
      aria-label="Scroll to the next section"
    >
      <span className="font-mono text-[10px] tracking-[0.28em] text-mist-500 uppercase transition-colors group-hover:text-mist-300">
        Scroll
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="animate-chevron h-5 w-5 text-mist-500 transition-colors group-hover:text-accent"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </a>
  );
}
