"use client";

import { Float, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import type { Quote } from "@/content/site";

/** Self-hosted so troika never reaches out to a font CDN at runtime. */
const BODY_FONT = "/fonts/inter-latin-400-normal.woff";

type FloatingQuotesProps = {
  quotes: Quote[];
  /** When true the quotes hold still instead of drifting. */
  still?: boolean;
};

/**
 * Flat SDF text laid out at varying depths around the name. Because they sit
 * at different z values, the camera's pointer sway gives real parallax for
 * free — no per-quote parallax maths needed.
 */
export function FloatingQuotes({ quotes, still = false }: FloatingQuotesProps) {
  const canvasWidth = useThree((state) => state.size.width);

  // Positions are authored for a wide viewport; pull them in on narrow ones.
  const spread = canvasWidth < 768 ? 0.55 : canvasWidth < 1280 ? 0.8 : 1;
  const fontSize = canvasWidth < 768 ? 0.14 : 0.17;

  return (
    <group>
      {quotes.map((quote, index) => {
        const [x, y, z] = quote.position;
        const drift = quote.drift ?? 1;

        return (
          <Float
            key={`${quote.text}-${index}`}
            position={[x * spread, y * spread, z]}
            speed={still ? 0 : 0.8 * drift}
            rotationIntensity={still ? 0 : 0.18}
            floatIntensity={still ? 0 : 0.5 * drift}
            floatingRange={[-0.12, 0.12]}
          >
            {/* Anchored bottom/top around y=0 rather than both centred: the
                quote block grows upwards as it wraps, so the attribution sits
                just under the final line no matter how many lines there are. */}
            <Text
              font={BODY_FONT}
              fontSize={fontSize}
              maxWidth={(quote.width ?? 2.6) * spread}
              lineHeight={1.45}
              textAlign="center"
              anchorX="center"
              anchorY="bottom"
              color="#aab6d0"
              fillOpacity={0.6}
              // Flat text should ignore the scene lights entirely.
              material-toneMapped={false}
            >
              {quote.text}
            </Text>

            {quote.author ? (
              <Text
                font={BODY_FONT}
                position={[0, -0.09, 0]}
                fontSize={fontSize * 0.72}
                anchorX="center"
                anchorY="top"
                color="#8ba9ff"
                fillOpacity={0.5}
                material-toneMapped={false}
              >
                {`— ${quote.author}`}
              </Text>
            ) : null}
          </Float>
        );
      })}
    </group>
  );
}
