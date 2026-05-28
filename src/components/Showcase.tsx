import type { ReactNode } from "react";
import { BrowserFrame } from "./BrowserFrame";
import {
  LayeredArchitecture,
  DataFlowDiagram,
} from "./DataPlatformArchitecture";
import heroPromptHome from "../assets/screenshots/heroprompt/home.webp";
import heroPromptPrompts from "../assets/screenshots/heroprompt/prompts.webp";
import heroPromptSkills from "../assets/screenshots/heroprompt/skills.webp";
import heroPromptPacks from "../assets/screenshots/heroprompt/packs.webp";
import dinhRace from "../assets/screenshots/dinh-discovery/race.webp";
import dinhHome from "../assets/screenshots/dinh-discovery/home.webp";
import dinhDiscover from "../assets/screenshots/dinh-discovery/discover.webp";
import dinhFlyby from "../assets/videos/dinh-flyby.mp4";

interface Shot {
  src: string;
  alt: string;
  url: string;
  caption?: string;
  /** If set, renders <video> using src as poster and videoSrc as source. */
  videoSrc?: string;
  /** Optional badge in the top-right of the frame (e.g. "3D Flyby"). */
  liveBadge?: string;
}

interface ProductBlockProps {
  index: string;
  name: string;
  tagline: string;
  liveUrl?: string;
  bullets: string[];
  hero: Shot;
  supporting: Shot[];
}

const FramedScreenshot = ({
  shot,
  maxHeight,
  hover = false,
}: {
  shot: Shot;
  maxHeight: string;
  hover?: boolean;
}) => (
  <div className={hover ? "group space-y-2" : "space-y-2"}>
    <BrowserFrame
      url={shot.url}
      className={
        hover
          ? "transition-transform duration-500 group-hover:-translate-y-1"
          : ""
      }
    >
      <div
        className="bg-white overflow-hidden relative"
        style={{ maxHeight }}
      >
        {shot.videoSrc ? (
          <video
            src={shot.videoSrc}
            poster={shot.src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={shot.alt}
            className="w-full block"
          />
        ) : (
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            className="w-full block"
          />
        )}
        {shot.liveBadge && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-background/85 backdrop-blur-sm border border-border rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-live-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
              {shot.liveBadge}
            </span>
          </div>
        )}
      </div>
    </BrowserFrame>
    {shot.caption && (
      <p className="font-mono text-[11px] text-muted-foreground pl-1">
        {shot.caption}
      </p>
    )}
  </div>
);

const ProductBlock = ({
  index,
  name,
  tagline,
  liveUrl,
  bullets,
  hero,
  supporting,
}: ProductBlockProps) => (
  <div className="space-y-10">
    {/* Header row */}
    <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-border">
      <div className="flex items-baseline gap-5">
        <span className="font-mono text-xs text-primary">{index}</span>
        <h3 className="font-display text-3xl sm:text-4xl tracking-tightest leading-none font-medium">
          {name}
        </h3>
        <span className="hidden sm:inline font-mono text-xs text-muted-foreground">
          {tagline}
        </span>
      </div>
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors link-underline"
        >
          {liveUrl.replace(/^https?:\/\//, "")} ↗
        </a>
      )}
    </div>

    {/* Hero shot — full width for screenshots; constrained for video so it doesn't dominate. */}
    {hero.videoSrc ? (
      <div className="max-w-4xl mx-auto">
        <FramedScreenshot shot={hero} maxHeight="640px" />
      </div>
    ) : (
      <FramedScreenshot shot={hero} maxHeight="880px" />
    )}

    {/* Bullets — 2-col grid below hero, compact mono */}
    <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3 max-w-4xl">
      {bullets.map((b) => (
        <li
          key={b}
          className="flex gap-3 items-start text-muted-foreground text-sm leading-relaxed"
        >
          <span
            aria-hidden
            className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0"
          />
          <span>{b}</span>
        </li>
      ))}
    </ul>

    {/* Supporting — bigger crops */}
    {supporting.length > 0 && (
      <div
        className={`grid gap-5 ${
          supporting.length === 3
            ? "md:grid-cols-3"
            : supporting.length === 2
              ? "md:grid-cols-2"
              : ""
        }`}
      >
        {supporting.map((shot) => (
          <FramedScreenshot
            key={shot.alt}
            shot={shot}
            maxHeight={supporting.length === 3 ? "440px" : "560px"}
            hover
          />
        ))}
      </div>
    )}
  </div>
);

const heroPrompt: ProductBlockProps = {
  index: "02",
  name: "HeroPrompt",
  tagline: "AI prompt marketplace · live SaaS",
  liveUrl: "https://heroprompt.store",
  bullets: [
    "Public SaaS at heroprompt.store with paying users",
    "80 prompts · 120 Pro Skills · 329 commands · 7 Persona Packs",
    "Streaming AI Prompt Optimizer over Server-Sent Events",
    "Python CLI with personal access tokens",
    "Four-tier subscription · Stripe + PayPal billing",
    "Next.js 14 · FastAPI · PostgreSQL · Anthropic",
  ],
  hero: {
    src: heroPromptHome,
    alt: "HeroPrompt homepage",
    url: "heroprompt.store",
  },
  supporting: [
    {
      src: heroPromptPacks,
      alt: "HeroPrompt Persona Packs",
      url: "heroprompt.store/packs",
      caption: "/packs — 7 role-based installs",
    },
    {
      src: heroPromptSkills,
      alt: "HeroPrompt Pro Skills catalog",
      url: "heroprompt.store/skills",
      caption: "/skills — 120 multi-step workflows",
    },
    {
      src: heroPromptPrompts,
      alt: "HeroPrompt prompts catalog",
      url: "heroprompt.store/prompts",
      caption: "/prompts — 14-category catalogue",
    },
  ],
};

const dinhDiscovery: ProductBlockProps = {
  index: "03",
  name: "Dinh Discovery",
  tagline: "Trail race planner · GPX → 3D + PDF",
  bullets: [
    "Upload a GPX → printable race plan + 3D flyby preview",
    "Real-terrain map with segment-by-segment difficulty",
    "Shared GPX parser kept in sync between Python and TypeScript",
    "S3-compatible storage with local filesystem fallback",
    "Lemon Squeezy billing, GitHub + Google OAuth",
    "Next.js 14 · FastAPI · MapLibre · Chart.js",
  ],
  hero: {
    src: dinhRace,
    videoSrc: dinhFlyby,
    alt: "Dinh Discovery 3D flyby of the Dinh 45km trail-running route",
    url: "dinh.run/race/dinh-45km",
    caption: "Live 3D flyby — recorded from the running product. Dinh 45km route, real terrain DEM, real GPX track.",
    liveBadge: "3D Flyby",
  },
  supporting: [
    {
      src: dinhRace,
      alt: "Dinh Discovery 2D simulation — race detail with simulator panel and pace table",
      url: "dinh.run/race/dinh-45km",
      caption: "2D simulation — playback at 1×/4×/16×/64×, segment pace table, elevation profile",
    },
    {
      src: dinhHome,
      alt: "Dinh Discovery homepage",
      url: "dinh.run",
      caption: "Homepage with simulator + 3D flyby preview",
    },
    {
      src: dinhDiscover,
      alt: "Dinh Discovery race catalog",
      url: "dinh.run/discover",
      caption: "Race catalog — Dinh 45km, VMM 100km, more",
    },
  ],
};

export const Showcase = () => (
  <section id="showcase" className="border-t border-border">
    <div className="container py-24 sm:py-32 space-y-28">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-3 flex flex-col gap-2">
          <div className="eyebrow">
            <span className="text-primary">03</span> &mdash; Showcase
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-2">
            Real screens, captured live.
          </p>
        </div>
        <div className="lg:col-span-9">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tightest text-balance font-medium">
            Every pixel is{" "}
            <span className="text-primary font-light">real.</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl">
            Captured directly from the running products with Playwright at
            2&times; retina. No mockups, no Figma &mdash; these are the actual
            screens users see.
          </p>
        </div>
      </div>

      <NoddleDataPlatformBlock />
      <ProductBlock {...heroPrompt} />
      <ProductBlock {...dinhDiscovery} />
    </div>
  </section>
);

// ── Noddle Data Platform — diagram-led block (no screenshot capture) ───────
const DiagramFrame = ({
  label,
  meta,
  children,
}: {
  label: string;
  meta?: string;
  children: ReactNode;
}) => (
  <div className="rounded-md border border-border bg-muted/20 overflow-hidden">
    <div className="flex items-center justify-between border-b border-border px-4 py-2 bg-muted/40">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      {meta && (
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
          {meta}
        </span>
      )}
    </div>
    <div className="p-6 sm:p-10">{children}</div>
  </div>
);

const ndpBullets = [
  "Deployed on bare-metal Kubernetes serving an internal customer",
  "274 API endpoints across 17 routers · FastAPI · OpenAPI",
  "Spark Connect compute · Delta Lake on MinIO · medallion architecture",
  "DAG scheduler with catchup, retry, cron · audit trail",
  "Multi-tenant RBAC role matrix · row-level governance",
  "AI Copilot for catalog drafts · streaming over SSE",
];

const NoddleDataPlatformBlock = () => (
  <div className="space-y-10">
    {/* Header row — matches ProductBlock visual rhythm */}
    <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-border">
      <div className="flex items-baseline gap-5">
        <span className="font-mono text-xs text-primary">01</span>
        <h3 className="font-display text-3xl sm:text-4xl tracking-tightest leading-none font-medium">
          Noddle Data Platform
        </h3>
        <span className="hidden sm:inline font-mono text-xs text-muted-foreground">
          Unified Data &amp; Governance · on-prem K8s
        </span>
      </div>
      <span className="font-mono text-xs text-muted-foreground inline-flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
        Production · internal
      </span>
    </div>

    {/* Hero diagram — layered architecture */}
    <DiagramFrame label="Architecture" meta="Layered · request flow ↓">
      <LayeredArchitecture className="w-full h-auto text-foreground" />
    </DiagramFrame>

    {/* Bullets */}
    <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3 max-w-4xl">
      {ndpBullets.map((b) => (
        <li
          key={b}
          className="flex gap-3 items-start text-muted-foreground text-sm leading-relaxed"
        >
          <span
            aria-hidden
            className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0"
          />
          <span>{b}</span>
        </li>
      ))}
    </ul>

    {/* Supporting — data flow diagram + metrics card */}
    <div className="grid lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2">
        <DiagramFrame label="Data flow" meta="Medallion · Bronze → Silver → Gold">
          <DataFlowDiagram className="w-full h-auto text-foreground" />
        </DiagramFrame>
      </div>
      <DiagramFrame label="At a glance" meta="2026">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 font-mono">
          {[
            { v: "274", l: "Endpoints" },
            { v: "17", l: "Routers" },
            { v: "3", l: "Storage tiers" },
            { v: "K8s", l: "Bare-metal" },
          ].map(({ v, l }) => (
            <div key={l} className="flex flex-col gap-1">
              <dt className="font-display text-3xl tracking-tightest leading-none text-foreground">
                {v}
              </dt>
              <dd className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {l}
              </dd>
            </div>
          ))}
        </dl>
      </DiagramFrame>
    </div>
  </div>
);
