export const Cta = () => {
  return (
    <section id="contact" className="border-t border-border">
      <div className="container py-24 sm:py-32">
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-10 sm:p-14 lg:p-16">
          {/* Subtle radial highlight in the top-right corner. */}
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl"
          />

          <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary-foreground/70">
                06 &mdash; Contact
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tightest font-medium">
                Want a live{" "}
                <span className="text-primary-foreground/70 font-light">
                  walkthrough?
                </span>
              </h2>
              <p className="text-primary-foreground/85 text-base sm:text-lg leading-relaxed max-w-xl">
                I&rsquo;ll demo any of the three products end-to-end &mdash;
                code, infra, billing flows, deploy pipeline. ~30 minutes, no
                slides, real screens. Useful if you&rsquo;re hiring,
                partnering, or evaluating technical work.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end">
              <a
                href="mailto:hello@noddle.work?subject=Demo%20request%20—%20Noddle"
                className="group inline-flex items-center gap-3 bg-background text-foreground rounded-full pl-6 pr-3 py-3 font-mono text-sm hover:bg-background/90 transition-colors shadow-lg shadow-black/20 self-start lg:self-end"
              >
                <span>Book a demo</span>
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href="mailto:hello@noddle.work"
                className="font-mono text-xs text-primary-foreground/80 hover:text-primary-foreground link-underline self-start lg:self-end"
              >
                hello@noddle.work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
