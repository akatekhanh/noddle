import { useState, useEffect } from "react";

export const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={goToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-primary transition-all bg-background/80 backdrop-blur px-3 py-2 border border-border rounded ${
        show
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      ↑ Top
    </button>
  );
};
