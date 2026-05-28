interface Member {
  name: string;
  initials: string;
  role: string;
  bio?: string;
  imageUrl?: string;
}

const members: Member[] = [
  {
    name: "Khanh Ngo",
    initials: "KN",
    role: "Founder",
    bio: "Started Noddle to ship production data & AI products end-to-end. Brings streaming-pipeline depth — Kafka, Flink, Spark Structured Streaming — into the catalogue. Sets product direction and owns the roadmap.",
    imageUrl: "/team/khanh.webp",
  },
  {
    name: "Khoi Nguyen",
    initials: "KH",
    role: "Principal Engineer",
    bio: "Owns backend systems and infrastructure across the catalogue. Backend Team Leader at Swop with AWS and microservices background — keeps APIs, billing flows, and deploy pipelines production-ready.",
    imageUrl: "/team/khoi.webp",
  },
  {
    name: "Tam Duong Ngoc",
    initials: "TD",
    role: "Principal Engineer",
    bio: "Designs the data architecture behind every product. Leads data at VIB (team of 5, vibe-coding culture) with LakeHouse depth — Databricks, EMR, LakeFormation, Glue — feeding into Noddle's medallion stack.",
    imageUrl: "/team/tam.webp",
  },
];

// Small circular avatar — real photo if provided, monogram fallback otherwise.
const Avatar = ({
  name,
  initials,
  imageUrl,
}: {
  name: string;
  initials: string;
  imageUrl?: string;
}) => (
  <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full overflow-hidden border border-border bg-muted/30">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt={name}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-2xl leading-none tracking-tightest text-foreground/30">
          {initials}
        </span>
      </div>
    )}
  </div>
);

export const Team = () => {
  return (
    <section id="team" className="border-t border-border">
      <div className="container py-24 sm:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          <div className="lg:col-span-3 flex flex-col gap-2">
            <div className="eyebrow">
              <span className="text-primary">04</span> &mdash; Team
            </div>
            <p className="font-mono text-xs text-muted-foreground mt-2">
              Small crew, full-stack ownership.
            </p>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tightest text-balance font-medium">
              The people{" "}
              <span className="font-light text-muted-foreground">
                behind the catalogue.
              </span>
            </h2>
          </div>
        </div>

        <ul className="border-t border-border">
          {members.map((m, i) => (
            <li
              key={m.name}
              className="group border-b border-border py-8 sm:py-10"
            >
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                {/* Index + portrait */}
                <div className="lg:col-span-3 flex items-center gap-5">
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors w-7">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Avatar
                    name={m.name}
                    initials={m.initials}
                    imageUrl={m.imageUrl}
                  />
                </div>

                {/* Name + role */}
                <div className="lg:col-span-4 flex flex-col gap-2 pt-1">
                  <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight">
                    {m.name}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary/80">
                    {m.role}
                  </p>
                </div>

                {/* Bio */}
                <div className="lg:col-span-5 pt-1">
                  {m.bio && (
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl">
                      {m.bio}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
