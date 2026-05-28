interface Product {
  no: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: "Production" | "Public" | "Beta";
  liveUrl?: string;
}

const products: Product[] = [
  {
    no: "01",
    name: "Noddle Data Platform",
    tagline: "Unified Data & Governance Platform",
    description:
      "Production-ready data platform on bare-metal Kubernetes. 274 API endpoints across 17 routers, Delta Lake on MinIO, Spark Connect for compute, medallion architecture, an AI Copilot for catalog drafts, a DAG scheduler with catchup and retry, and a multi-tenant role matrix.",
    stack: ["FastAPI", "React 19", "Spark Connect", "Delta Lake", "PostgreSQL", "K8s"],
    status: "Production",
  },
  {
    no: "02",
    name: "HeroPrompt",
    tagline: "AI Prompt Marketplace & Skills Platform",
    description:
      "Public SaaS at heroprompt.store. 80 curated prompts, 120 Pro Skills, 329 slash-commands across 7 role-based Persona Packs. Streaming AI Prompt Optimizer over Server-Sent Events, Python CLI with personal access tokens, four-tier subscription with Stripe and PayPal.",
    stack: ["Next.js 14", "FastAPI", "Anthropic", "Stripe", "PayPal", "Typer"],
    status: "Public",
    liveUrl: "https://heroprompt.store",
  },
  {
    no: "03",
    name: "Dinh Discovery",
    tagline: "Trail-running Race Planner SaaS",
    description:
      "Upload a GPX, simulate the race, analyse each segment, export a printable PDF and a 3D flyby video. A shared GPX parser is kept in sync between the Python backend and the TypeScript frontend. Lemon Squeezy billing, S3-compatible storage with local filesystem fallback, GitHub & Google OAuth.",
    stack: ["Next.js 14", "FastAPI", "MapLibre", "Chart.js", "Lemon Squeezy", "RQ"],
    status: "Beta",
  },
];

export const Features = () => {
  return (
    <section id="products" className="border-t border-border">
      <div className="container py-24 sm:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          <div className="lg:col-span-3 flex flex-col gap-2">
            <div className="eyebrow">
              <span className="text-primary">02</span> &mdash; Products
            </div>
            <p className="font-mono text-xs text-muted-foreground mt-2">
              Three shipped systems, full-stack ownership.
            </p>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tightest text-balance font-medium">
              The catalogue.{" "}
              <span className="font-light text-muted-foreground">
                Three of them, each in real use.
              </span>
            </h2>
          </div>
        </div>

        <ul className="border-t border-border">
          {products.map(({ no, name, tagline, description, stack, status, liveUrl }) => (
            <li key={no} className="group border-b border-border py-10 sm:py-14">
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
                <div className="lg:col-span-3 flex sm:flex-col sm:gap-3 items-baseline sm:items-start gap-4">
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    {no}
                  </span>
                  <span className="eyebrow inline-flex items-center gap-2">
                    <span
                      className={
                        status === "Public"
                          ? "w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                          : status === "Production"
                            ? "w-1.5 h-1.5 rounded-full bg-foreground"
                            : "w-1.5 h-1.5 rounded-full bg-muted-foreground"
                      }
                    />
                    {status}
                  </span>
                </div>

                <div className="lg:col-span-9 space-y-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
                      {name}
                    </h3>
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
                  <p className="text-sm uppercase tracking-wider text-primary/80 font-mono">
                    {tagline}
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-2">
                    {stack.map((s) => (
                      <span key={s} className="font-mono text-xs text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
