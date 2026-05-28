interface LogoProps {
  className?: string;
  size?: number;
}

// Geometric "N" monogram with an ochre node — a small mark that reads as
// both "Noddle" (the N) and a shipped/live indicator (the dot).
export const Logo = ({ className, size = 24 }: LogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M5 19 V5 L19 19 V5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <circle cx="19" cy="5" r="3" fill="hsl(var(--primary))" />
    </svg>
  );
};
