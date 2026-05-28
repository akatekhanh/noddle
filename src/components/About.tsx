const stats = [
  { value: "3", label: "Shipped products" },
  { value: "270+", label: "API endpoints" },
  { value: "120", label: "Pro Skills built" },
  { value: "3", label: "Crew" },
];

export const About = () => {
  return (
    <section id="about" className="border-t border-border">
      <div className="container py-24 sm:py-32 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-3 flex flex-col gap-2">
          <div className="eyebrow">
            <span className="text-primary">01</span> &mdash; About
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-2">
            The person behind the catalogue.
          </p>
        </div>

        <div className="lg:col-span-9 space-y-10">
          <p className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tight text-balance font-medium">
            I build production data and AI products{" "}
            <span className="text-primary font-light">end-to-end</span>. Each
            system here is in active use &mdash; real infra, real payments,
            real users.
          </p>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4 text-muted-foreground max-w-2xl">
            <p className="leading-relaxed">
              Comfortable across the stack: Python &amp; FastAPI on the
              backend, Next.js and React 19 on the frontend, Spark &amp; Delta
              Lake for data engineering, Kubernetes on bare-metal, Stripe and
              Lemon Squeezy for billing.
            </p>
            <p className="leading-relaxed">
              The work below is the same small crew writing the SQL
              migrations, the React components, the Dockerfiles, and the
              deploy scripts. No prototypes, no AI-generated demos, no
              half-finished slices of someone else&rsquo;s codebase.
            </p>
          </div>

          {/* Stats — typography, not boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 pt-6 border-t border-border">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <div className="font-display text-4xl sm:text-5xl leading-none tracking-tightest">
                  {value}
                </div>
                <div className="eyebrow">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
