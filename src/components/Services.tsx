interface Highlight {
  no: string;
  title: string;
  description: string;
}

const highlights: Highlight[] = [
  {
    no: "01",
    title: "Medallion data architecture",
    description:
      "Raw → staging → intermediate → mart Delta Lake layers on MinIO. Spark Connect over gRPC for compute, lazy PySpark imports so the API starts even when Spark is down. Lineage tracking and SQL parsing baked in.",
  },
  {
    no: "02",
    title: "AI Copilot & streaming optimizers",
    description:
      "Anthropic-backed assistants embedded in both the data platform (catalog drafts, quality suggestions) and HeroPrompt (5-mode prompt optimizer over Server-Sent Events). Budget guards and provider abstraction included.",
  },
  {
    no: "03",
    title: "Self-hosted auth, billing & deploys",
    description:
      "JWT + GitHub / Google OAuth, Stripe and Lemon Squeezy webhooks with idempotency tables, Railway and bare-metal Kubernetes deployments, S3-compatible storage with local filesystem fallback.",
  },
  {
    no: "04",
    title: "Sync between Python and TypeScript",
    description:
      "Shared GPX parser kept in lockstep between FastAPI and Next.js. CanonicalType system for source-neutral data ingestion. Same person writing the SQL migrations, the React components, the Dockerfiles, and the deploy scripts.",
  },
];

const stack = [
  ["Backend", "FastAPI · SQLAlchemy / psycopg2 · Alembic · RQ workers"],
  ["Frontend", "Next.js 14 · React 19 · Vite · Tailwind · shadcn/ui"],
  ["Data", "Spark Connect · Delta Lake · MinIO · PostgreSQL 16"],
  ["Infra", "Docker Compose · Kubernetes (bare-metal + Vultr VKE) · Railway"],
  ["Payments", "Stripe · PayPal · Lemon Squeezy (HMAC webhooks)"],
  ["AI", "Anthropic Claude · Minimax · Server-Sent Events"],
];

export const Services = () => {
  return (
    <section id="engineering" className="border-t border-border">
      <div className="container py-24 sm:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          <div className="lg:col-span-3 flex flex-col gap-2">
            <div className="eyebrow">
              <span className="text-primary">05</span> &mdash; Engineering
            </div>
            <p className="font-mono text-xs text-muted-foreground mt-2">
              Recurring patterns across the work.
            </p>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tightest text-balance font-medium">
              The shape of the{" "}
              <span className="font-light text-muted-foreground">work.</span>
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Highlights — left, editorial entries */}
          <ol className="lg:col-span-7 border-t border-border">
            {highlights.map(({ no, title, description }) => (
              <li
                key={no}
                className="group border-b border-border py-8 grid grid-cols-[3rem_1fr] gap-4 sm:gap-8"
              >
                <span className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors pt-1">
                  {no}
                </span>
                <div className="space-y-3">
                  <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight">
                    {title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Stack — right, tabular reference card */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 border border-border rounded-md bg-card">
              <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                <span className="eyebrow">Stack &mdash; Reference</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  6 lines
                </span>
              </div>
              <dl className="divide-y divide-border">
                {stack.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[5.5rem_1fr] gap-3 px-5 py-3 items-baseline"
                  >
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="font-mono text-xs text-foreground/90 leading-relaxed">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
