import { Logo } from "./Logo";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="container py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex flex-col gap-2 lg:col-span-2">
          <a href="/" className="flex items-center gap-2 group">
            <Logo size={26} className="text-foreground" />
            <span className="font-display text-2xl tracking-tighter leading-none">
              Noddle
            </span>
            <span className="eyebrow opacity-70 ml-1">est. 2026</span>
          </a>
          <p className="font-mono text-xs text-muted-foreground max-w-sm leading-relaxed mt-2">
            A small catalogue of shipped data &amp; AI work. Built quietly,
            end-to-end.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="eyebrow mb-1">Products</div>
          <a href="#products" className="font-mono text-xs text-muted-foreground hover:text-foreground link-underline w-fit">
            Noddle Data Platform
          </a>
          <a
            href="https://heroprompt.store"
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-xs text-muted-foreground hover:text-foreground link-underline w-fit"
          >
            HeroPrompt ↗
          </a>
          <a href="#products" className="font-mono text-xs text-muted-foreground hover:text-foreground link-underline w-fit">
            Dinh Discovery
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <div className="eyebrow mb-1">Index</div>
          <a href="#about" className="font-mono text-xs text-muted-foreground hover:text-foreground link-underline w-fit">
            01 — About
          </a>
          <a href="#products" className="font-mono text-xs text-muted-foreground hover:text-foreground link-underline w-fit">
            02 — Products
          </a>
          <a href="#showcase" className="font-mono text-xs text-muted-foreground hover:text-foreground link-underline w-fit">
            03 — Showcase
          </a>
          <a href="#team" className="font-mono text-xs text-muted-foreground hover:text-foreground link-underline w-fit">
            04 — Team
          </a>
          <a href="#engineering" className="font-mono text-xs text-muted-foreground hover:text-foreground link-underline w-fit">
            05 — Engineering
          </a>
          <a href="#contact" className="font-mono text-xs text-muted-foreground hover:text-foreground link-underline w-fit">
            06 — Contact
          </a>
        </div>
      </div>

      <div className="container pb-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-t border-border pt-6 mt-2">
        <p className="font-mono text-[11px] text-muted-foreground">
          © {year} Noddle &mdash; Built with React, Tailwind, and patience.
        </p>
        <a
          href="mailto:hello@noddle.work"
          className="font-mono text-[11px] text-muted-foreground hover:text-foreground link-underline w-fit"
        >
          hello@noddle.work ↗
        </a>
      </div>
    </footer>
  );
};
