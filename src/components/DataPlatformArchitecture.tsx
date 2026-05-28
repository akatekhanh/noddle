// Two editorial SVG diagrams for the Noddle Data Platform block.
// Designed in the Graphite & Ochre palette: thin strokes, mono labels,
// a single ochre accent. No decoration for decoration's sake.

const Stroke = "currentColor";
const Ochre = "hsl(var(--primary))";
const Muted = "hsl(var(--muted-foreground) / 0.4)";

const LayerBox = ({
  x,
  y,
  w,
  h,
  label,
  sub,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={4}
      fill="none"
      stroke={Stroke}
      strokeWidth={1.25}
    />
    <text
      x={x + 16}
      y={y + (sub ? 22 : h / 2 + 4)}
      fill="currentColor"
      fontSize={13}
      fontWeight={500}
      style={{ letterSpacing: "0.02em" }}
    >
      {label}
    </text>
    {sub && (
      <text
        x={x + 16}
        y={y + 40}
        fill="currentColor"
        opacity={0.55}
        fontSize={10}
        style={{ letterSpacing: "0.08em" }}
      >
        {sub.toUpperCase()}
      </text>
    )}
  </g>
);

const Connector = ({
  x,
  y1,
  y2,
}: {
  x: number;
  y1: number;
  y2: number;
}) => (
  <g>
    <line
      x1={x}
      y1={y1}
      x2={x}
      y2={y2 - 6}
      stroke={Muted}
      strokeWidth={1}
      strokeDasharray="2 3"
    />
    <polygon
      points={`${x - 4},${y2 - 6} ${x + 4},${y2 - 6} ${x},${y2}`}
      fill={Muted}
    />
  </g>
);

export const LayeredArchitecture = ({ className }: { className?: string }) => {
  // viewBox 880×560 — 6 stacked layers, 1 ochre platform label annotation
  return (
    <svg
      viewBox="0 0 880 560"
      xmlns="http://www.w3.org/2000/svg"
      className={`font-mono ${className ?? ""}`}
      aria-label="Noddle Data Platform layered architecture diagram"
      role="img"
    >
      {/* Side rail label */}
      <text
        x={20}
        y={40}
        fill="currentColor"
        opacity={0.55}
        fontSize={10}
        style={{ letterSpacing: "0.22em" }}
      >
        REQUEST FLOW ↓
      </text>

      {/* Layer 1 — Consumers (3 boxes) */}
      <LayerBox x={120} y={30} w={200} h={56} label="Web App" sub="React 19 · Next.js" />
      <LayerBox x={340} y={30} w={200} h={56} label="Python CLI" sub="PAT auth · streaming" />
      <LayerBox x={560} y={30} w={200} h={56} label="External APIs" sub="JDBC · webhooks" />

      <Connector x={220} y1={86} y2={120} />
      <Connector x={440} y1={86} y2={120} />
      <Connector x={660} y1={86} y2={120} />

      {/* Layer 2 — API Gateway */}
      <LayerBox
        x={120}
        y={120}
        w={640}
        h={62}
        label="FastAPI Gateway"
        sub="274 endpoints · 17 routers · OpenAPI"
      />
      {/* Ochre count chip */}
      <g transform="translate(680 140)">
        <rect width={70} height={26} rx={13} fill={Ochre} opacity={0.18} />
        <rect width={70} height={26} rx={13} fill="none" stroke={Ochre} strokeWidth={1} />
        <text x={35} y={17} fill={Ochre} fontSize={11} fontWeight={600} textAnchor="middle">
          274 EP
        </text>
      </g>

      <Connector x={440} y1={182} y2={216} />

      {/* Layer 3 — Orchestration & Governance (3 boxes) */}
      <LayerBox x={120} y={216} w={200} h={62} label="DAG Scheduler" sub="catchup · retry · cron" />
      <LayerBox x={340} y={216} w={200} h={62} label="RBAC + Tenants" sub="role matrix · audit" />
      <LayerBox x={560} y={216} w={200} h={62} label="AI Copilot" sub="catalog drafts · LLM" />

      <Connector x={440} y1={278} y2={312} />

      {/* Layer 4 — Compute */}
      <LayerBox
        x={120}
        y={312}
        w={640}
        h={62}
        label="Spark Connect"
        sub="distributed compute · executor pool · spark-submit jobs"
      />

      <Connector x={440} y1={374} y2={408} />

      {/* Layer 5 — Storage */}
      <LayerBox
        x={120}
        y={408}
        w={640}
        h={62}
        label="Delta Lake on MinIO"
        sub="medallion · time travel · ACID · S3-compatible"
      />

      <Connector x={440} y1={470} y2={504} />

      {/* Layer 6 — Platform */}
      <LayerBox
        x={120}
        y={504}
        w={640}
        h={50}
        label="Bare-metal Kubernetes · PostgreSQL Metastore"
      />
    </svg>
  );
};

export const DataFlowDiagram = ({ className }: { className?: string }) => {
  // viewBox 880×170 — horizontal medallion pipeline
  const stages = [
    { x: 24, label: "Sources", sub: "JDBC · S3 · API" },
    { x: 184, label: "Ingest", sub: "Spark · CDC" },
    { x: 344, label: "Bronze", sub: "raw" },
    { x: 504, label: "Silver", sub: "cleaned" },
    { x: 664, label: "Gold", sub: "aggregated" },
  ];
  return (
    <svg
      viewBox="0 0 880 170"
      xmlns="http://www.w3.org/2000/svg"
      className={`font-mono ${className ?? ""}`}
      aria-label="Noddle Data Platform medallion data flow diagram"
      role="img"
    >
      <text
        x={20}
        y={22}
        fill="currentColor"
        opacity={0.55}
        fontSize={10}
        style={{ letterSpacing: "0.22em" }}
      >
        DATA FLOW →
      </text>

      {stages.map((s, i) => {
        const isGold = s.label === "Gold";
        return (
          <g key={s.label} transform={`translate(${s.x} 60)`}>
            <rect
              width={140}
              height={64}
              rx={4}
              fill={isGold ? Ochre : "none"}
              fillOpacity={isGold ? 0.12 : 1}
              stroke={isGold ? Ochre : Stroke}
              strokeWidth={1.25}
            />
            <text
              x={16}
              y={26}
              fill={isGold ? Ochre : "currentColor"}
              fontSize={13}
              fontWeight={500}
              style={{ letterSpacing: "0.02em" }}
            >
              {s.label}
            </text>
            <text
              x={16}
              y={46}
              fill="currentColor"
              opacity={0.55}
              fontSize={10}
              style={{ letterSpacing: "0.08em" }}
            >
              {s.sub.toUpperCase()}
            </text>
            {/* Stage index in top-right */}
            <text
              x={124}
              y={18}
              fill="currentColor"
              opacity={0.45}
              fontSize={9}
              textAnchor="end"
              style={{ letterSpacing: "0.1em" }}
            >
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}

      {/* Arrows between stages */}
      {stages.slice(0, -1).map((s, i) => {
        const x = s.x + 140 + 4;
        const xEnd = stages[i + 1].x - 4;
        return (
          <g key={`arrow-${i}`}>
            <line x1={x} y1={92} x2={xEnd - 6} y2={92} stroke={Muted} strokeWidth={1} />
            <polygon
              points={`${xEnd - 6},88 ${xEnd - 6},96 ${xEnd},92`}
              fill={Muted}
            />
          </g>
        );
      })}

      {/* Serving label below Gold */}
      <text
        x={664 + 70}
        y={150}
        fill={Ochre}
        opacity={0.85}
        fontSize={10}
        textAnchor="middle"
        style={{ letterSpacing: "0.14em" }}
      >
        → API · BI · DOWNSTREAM
      </text>
    </svg>
  );
};
