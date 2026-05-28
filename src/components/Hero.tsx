import { useEffect, useState } from "react";
import { BrowserFrame } from "./BrowserFrame";
import heroPromptHome from "../assets/screenshots/heroprompt/home.webp";
import heroPromptPrompts from "../assets/screenshots/heroprompt/prompts.webp";
import heroPromptSkills from "../assets/screenshots/heroprompt/skills.webp";
import heroPromptPacks from "../assets/screenshots/heroprompt/packs.webp";

const peekShots = [
  { src: heroPromptHome, path: "heroprompt.store" },
  { src: heroPromptPrompts, path: "heroprompt.store/prompts" },
  { src: heroPromptSkills, path: "heroprompt.store/skills" },
  { src: heroPromptPacks, path: "heroprompt.store/packs" },
];

const products = [
  {
    no: "01",
    name: "Noddle Data Platform",
    blurb: "Unified data & governance · on-prem K8s · 270+ endpoints",
    href: "#products",
  },
  {
    no: "02",
    name: "HeroPrompt",
    blurb: "AI prompt marketplace · live at heroprompt.store",
    href: "https://heroprompt.store",
    external: true,
  },
  {
    no: "03",
    name: "Dinh Discovery",
    blurb: "Trail-running race planner · GPX → 3D flyby + PDF plan",
    href: "#products",
  },
];

export const Hero = () => {
  const [peekIndex, setPeekIndex] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setTimeout(() => {
      setPeekIndex((i) => (i + 1) % peekShots.length);
    }, 3000);
    return () => window.clearTimeout(id);
  }, [peekIndex]);

  const goPrev = () =>
    setPeekIndex((i) => (i - 1 + peekShots.length) % peekShots.length);
  const goNext = () => setPeekIndex((i) => (i + 1) % peekShots.length);

  return (
    <section className="container pt-20 pb-24 md:pt-28 md:pb-36 relative">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7 space-y-10">
          <div className="flex items-center gap-3 eyebrow">
            <span className="inline-block w-6 h-px bg-primary" />
            <span>00 / Portfolio / 2026</span>
          </div>

          <h1 className="font-display text-[2.75rem] sm:text-6xl md:text-7xl leading-[0.95] tracking-tightest text-balance font-medium">
            Production{" "}
            <span className="font-light text-primary">data</span> and{" "}
            <span className="font-light text-primary">AI</span> products,
            <br className="hidden md:block" />
            built end&#8209;to&#8209;end.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            A working catalogue of three shipped systems — backend, frontend,
            data engineering, billing, infra. A small crew wrote the SQL
            migrations and the deploy scripts. No prototypes, no AI-generated
            demos.
          </p>

          <div className="flex items-center gap-6 pt-2">
            <a
              href="#products"
              className="font-mono text-sm inline-flex items-center gap-2 text-foreground border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors"
            >
              See the work
              <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Book a walkthrough
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-end">
          <div className="eyebrow mb-5">Inside</div>
          <ul className="divide-y divide-border border-y border-border">
            {products.map(({ no, name, blurb, href, external }) => (
              <li key={no}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer noopener" : undefined}
                  className="group flex items-baseline gap-4 py-4 hover:bg-muted/40 transition-colors px-1 -mx-1"
                >
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors w-7">
                    {no}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-xl tracking-tight leading-tight">
                      {name}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 truncate">
                      {blurb}
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="font-mono text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Product peek — tilted product screenshot bleeding into the next section. */}
      <div className="relative mt-20 md:mt-28 -mb-32 md:-mb-48 max-w-5xl mx-auto">
        <div
          aria-hidden
          className="pointer-events-none select-none"
          style={{
            maskImage:
              "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
          }}
        >
          <div
            className="origin-bottom"
            style={{ transform: "perspective(1600px) rotateX(8deg)" }}
          >
            <BrowserFrame
              url={peekShots[peekIndex].path}
              className="shadow-2xl shadow-black/40"
            >
              <div
                className="relative bg-white overflow-hidden"
                style={{ height: 560 }}
              >
                {peekShots.map((shot, i) => (
                  <img
                    key={shot.path}
                    src={shot.src}
                    alt=""
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full block transition-opacity duration-700 ease-in-out"
                    style={{ opacity: i === peekIndex ? 1 : 0 }}
                  />
                ))}
              </div>
            </BrowserFrame>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="pointer-events-none absolute inset-x-0 top-[38%] -translate-y-1/2 flex items-center justify-between px-3 md:px-6">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous screenshot"
            className="pointer-events-auto h-10 w-10 md:h-11 md:w-11 rounded-full bg-background/80 backdrop-blur-md border border-border text-foreground hover:bg-background hover:text-primary transition-colors shadow-lg shadow-black/30 flex items-center justify-center font-mono text-lg"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next screenshot"
            className="pointer-events-auto h-10 w-10 md:h-11 md:w-11 rounded-full bg-background/80 backdrop-blur-md border border-border text-foreground hover:bg-background hover:text-primary transition-colors shadow-lg shadow-black/30 flex items-center justify-center font-mono text-lg"
          >
            ›
          </button>
        </div>

        {/* Dot indicators */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-2 md:bottom-3 z-10 flex items-center gap-2">
          {peekShots.map((shot, i) => (
            <button
              key={shot.path}
              type="button"
              onClick={() => setPeekIndex(i)}
              aria-label={`Show ${shot.path}`}
              className="pointer-events-auto h-1.5 rounded-full transition-all"
              style={{
                width: i === peekIndex ? 24 : 6,
                backgroundColor:
                  i === peekIndex
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground) / 0.4)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
