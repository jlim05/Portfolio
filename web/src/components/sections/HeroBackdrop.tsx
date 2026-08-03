/**
 * Pure-CSS stand-in for the WebGL hero: an accent glow plus a scattering of
 * static specks. It is what mobile, reduced-motion and pre-hydration visitors
 * see, and it doubles as the loading state underneath the canvas.
 *
 * Star coordinates are hard-coded rather than randomised so server and client
 * markup always agree.
 */
const STARS: Array<{ left: string; top: string; size: number; delay: string }> = [
  { left: "8%", top: "22%", size: 2, delay: "0s" },
  { left: "16%", top: "68%", size: 1, delay: "1.4s" },
  { left: "24%", top: "12%", size: 1, delay: "2.6s" },
  { left: "33%", top: "84%", size: 2, delay: "0.6s" },
  { left: "41%", top: "34%", size: 1, delay: "3.1s" },
  { left: "48%", top: "8%", size: 1, delay: "1.9s" },
  { left: "57%", top: "72%", size: 2, delay: "2.2s" },
  { left: "64%", top: "26%", size: 1, delay: "0.3s" },
  { left: "71%", top: "58%", size: 1, delay: "4.2s" },
  { left: "78%", top: "16%", size: 2, delay: "1.1s" },
  { left: "85%", top: "78%", size: 1, delay: "3.6s" },
  { left: "92%", top: "40%", size: 2, delay: "2.9s" },
  { left: "12%", top: "46%", size: 1, delay: "5.0s" },
  { left: "88%", top: "60%", size: 1, delay: "0.9s" },
  { left: "52%", top: "90%", size: 1, delay: "4.7s" },
];

export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute top-1/2 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[120px]" />
      <div className="absolute top-1/3 left-1/4 h-[35vh] w-[35vh] rounded-full bg-accent-dim/8 blur-[100px]" />

      {STARS.map((star, index) => (
        <span
          key={index}
          className="animate-twinkle absolute rounded-full bg-mist-300/60"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
