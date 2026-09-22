/**
 * WaveDivider — A subtle SVG wave between sections.
 * `fromColor`: Tailwind arbitrary CSS color for the section above.
 * `toColor`:   Tailwind arbitrary CSS color for the section below.
 * The wave fills in `toColor` and sits on a `fromColor` background.
 */

type WaveDividerProps = {
  /** Fill color of the wave shape (should match the background of the section BELOW) */
  fill?: string;
  /** Background color behind the wave (should match the section ABOVE) */
  bg?: string;
  /** Flip the wave horizontally for variety */
  flip?: boolean;
  /** Extra classes on the wrapper */
  className?: string;
};

export function WaveDivider({
  fill = "#ffffff",
  bg = "transparent",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`wave-divider relative -mt-px ${className}`}
      style={{ background: bg }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
      >
        <path
          d="M0,32 C180,56 360,8 540,28 C720,48 900,8 1080,28 C1260,48 1380,20 1440,24 L1440,56 L0,56 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/** Subtle divider for dark-on-light transitions (hero → about) */
export function WaveDarkToLight({ className = "" }: { className?: string }) {
  return <WaveDivider fill="var(--background)" bg="var(--navy-deep)" className={className} />;
}

/** Subtle divider for light-on-dark transitions */
export function WaveLightToDark({ className = "" }: { className?: string }) {
  return <WaveDivider fill="var(--navy-deep)" bg="var(--background)" flip className={className} />;
}

/** Divider from haze/card sections to white sections */
export function WaveHazeToWhite({ className = "" }: { className?: string }) {
  return <WaveDivider fill="#ffffff" bg="var(--haze)" className={className} />;
}

/** Divider from white sections to haze sections */
export function WaveWhiteToHaze({ className = "" }: { className?: string }) {
  return <WaveDivider fill="var(--haze)" bg="#ffffff" className={className} />;
}
