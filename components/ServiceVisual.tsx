/**
 * Inline technical diagrams for the service scopes on /services/.
 *
 * These are explanations, not dashboards: no live readings, no invented
 * infrastructure, no decorative illustration. Every label restates a control
 * or step that is described in the visible service copy. Colours come from
 * the site tokens, so the diagrams follow the light and dark themes.
 */

export type ServiceVisualVariant = "server" | "dns" | "automation" | "maintenance";

const COPY: Record<ServiceVisualVariant, { title: string; description: string }> = {
  server: {
    title: "Reference server architecture",
    description:
      "A documented Ubuntu VPS baseline: a Git repository, a deploy hook, Caddy with TLS, a systemd application service, and a security baseline with SSH keys, UFW, Fail2ban and certificate renewal.",
  },
  dns: {
    title: "DNS and email routing",
    description:
      "A domain holder, the registry, authoritative DNS, and the A, AAAA, MX and TXT records that point a domain at a website and at email.",
  },
  automation: {
    title: "Documented automation pattern",
    description:
      "An input, a script, a validation and logging step, an output, and an optional human review step for workflows where the outcome matters.",
  },
  maintenance: {
    title: "Monthly maintenance routine",
    description:
      "A monthly cycle of operating system patching, TLS and DNS checks, backup verification, link and form checks, and a written report.",
  },
};

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  tone?: "default" | "accent";
};

function Box({ x, y, w, h, title, sub, tone = "default" }: BoxProps) {
  const accent = tone === "accent";

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={2}
        fill={accent ? "var(--color-surface-soft)" : "var(--color-background)"}
        stroke={accent ? "var(--color-accent)" : "var(--color-border-strong)"}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 9 : y + h / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-text)"
        fontSize="20"
        fontWeight="500"
      >
        {title}
      </text>
      {sub ? (
        <text
          x={x + w / 2}
          y={y + h / 2 + 16}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--color-muted)"
          fontSize="15"
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Connector({
  d,
  arrowId,
  dashed = false,
}: {
  d: string;
  arrowId: string;
  dashed?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--color-sage)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray={dashed ? "5 5" : undefined}
      markerEnd={`url(#${arrowId})`}
    />
  );
}

function SectionLabel({
  x,
  y,
  children,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill="var(--color-muted)"
      fontSize="12"
      letterSpacing="0.08em"
    >
      {children}
    </text>
  );
}

function Check({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y - 7} width="10" height="10" fill="var(--color-sage)" />
      <text x={x + 20} y={y} dominantBaseline="middle" fill="var(--color-muted)" fontSize="14">
        {label}
      </text>
    </g>
  );
}

function ServerDiagram({ arrowId }: { arrowId: string }) {
  return (
    <g>
      <rect
        x="60"
        y="64"
        width="840"
        height="412"
        rx="4"
        fill="none"
        stroke="var(--color-border-strong)"
        strokeDasharray="5 6"
      />
      <SectionLabel x={84} y={96}>UBUNTU LTS VPS</SectionLabel>
      <SectionLabel x={876} y={96} anchor="end">REFERENCE ARCHITECTURE</SectionLabel>

      <Box x={84} y={132} w={210} h={82} title="Git repository" sub="source + history" />
      <Box x={330} y={132} w={210} h={82} title="Deploy hook" sub="build + release" />
      <Box x={576} y={132} w={290} h={82} title="Caddy / Nginx" sub="HTTPS + TLS renewal" tone="accent" />
      <Box x={576} y={258} w={290} h={82} title="systemd app" sub="restart on failure" />

      <rect
        x="84"
        y="258"
        width="456"
        height="150"
        rx="2"
        fill="var(--color-surface-soft)"
        stroke="var(--color-accent)"
      />
      <SectionLabel x={104} y={286}>SECURITY BASELINE</SectionLabel>
      <Check x={104} y={320} label="SSH keys only" />
      <Check x={320} y={320} label="UFW 22 / 80 / 443" />
      <Check x={104} y={358} label="Fail2ban" />
      <Check x={320} y={358} label="TLS auto-renew" />

      <line x1="84" y1="432" x2="876" y2="432" stroke="var(--color-border)" />
      <SectionLabel x={84} y={458}>DOCUMENTED RUNBOOK · BACKUPS · LOGS</SectionLabel>

      <Connector d="M294 173 H330" arrowId={arrowId} />
      <Connector d="M540 173 H576" arrowId={arrowId} />
      <Connector d="M721 214 V258" arrowId={arrowId} />
    </g>
  );
}

function DnsDiagram({ arrowId }: { arrowId: string }) {
  return (
    <g>
      <SectionLabel x={60} y={64}>DNS AND EMAIL ROUTING</SectionLabel>

      <Box x={60} y={100} w={220} h={82} title="Domain holder" sub="you own the account" />
      <Box x={340} y={100} w={240} h={82} title="Registry" sub=".np / .com.np" />
      <Box x={640} y={100} w={260} h={82} title="Authoritative DNS" sub="Cloudflare / provider" tone="accent" />

      <Connector d="M280 141 H340" arrowId={arrowId} />
      <Connector d="M580 141 H640" arrowId={arrowId} />

      <path d="M770 182 V232" fill="none" stroke="var(--color-sage)" strokeWidth="1.5" />
      <path d="M190 232 H770" fill="none" stroke="var(--color-sage)" strokeWidth="1.5" />
      <Connector d="M190 232 V290" arrowId={arrowId} />
      <Connector d="M475 232 V290" arrowId={arrowId} />
      <Connector d="M770 232 V290" arrowId={arrowId} />

      <Box x={60} y={290} w={260} h={92} title="A / AAAA" sub="website host" />
      <Box x={350} y={290} w={250} h={92} title="MX" sub="mail routing" />
      <Box x={640} y={290} w={260} h={92} title="TXT" sub="SPF · DKIM · DMARC" />

      <SectionLabel x={60} y={440}>DNSSEC OPTIONAL · RECORD CHANGES DOCUMENTED</SectionLabel>
    </g>
  );
}

function AutomationDiagram({ arrowId }: { arrowId: string }) {
  return (
    <g>
      <SectionLabel x={40} y={64}>DOCUMENTED AUTOMATION PATTERN</SectionLabel>

      <Box x={40} y={120} w={190} h={100} title="Input" sub="form · CSV · email" />
      <Box x={270} y={120} w={170} h={100} title="Script" sub="Python / Node" />
      <Box x={480} y={120} w={180} h={100} title="Validate + log" sub="rules + run log" />
      <Box x={700} y={120} w={210} h={100} title="Output" sub="DB · webhook · email" tone="accent" />

      <Connector d="M230 170 H270" arrowId={arrowId} />
      <Connector d="M440 170 H480" arrowId={arrowId} />
      <Connector d="M660 170 H700" arrowId={arrowId} />

      <rect
        x="40"
        y="310"
        width="430"
        height="100"
        rx="2"
        fill="none"
        stroke="var(--color-border-strong)"
        strokeDasharray="5 5"
      />
      <SectionLabel x={60} y={340}>HUMAN REVIEW WHERE NEEDED</SectionLabel>
      <text x={60} y={372} fill="var(--color-muted)" fontSize="15">
        approve · correct · hold
      </text>
      <Connector d="M570 220 V360 H470" arrowId={arrowId} dashed />

      <SectionLabel x={40} y={456}>CRON SCHEDULE · RETRIES · ERROR ALERT</SectionLabel>
    </g>
  );
}

function MaintenanceDiagram({ arrowId }: { arrowId: string }) {
  return (
    <g>
      <SectionLabel x={40} y={64}>MONTHLY MAINTENANCE ROUTINE</SectionLabel>

      <text x="115" y="132" textAnchor="middle" fill="var(--color-secondary)" fontSize="13">01</text>
      <text x="295" y="132" textAnchor="middle" fill="var(--color-secondary)" fontSize="13">02</text>
      <text x="480" y="132" textAnchor="middle" fill="var(--color-secondary)" fontSize="13">03</text>
      <text x="665" y="132" textAnchor="middle" fill="var(--color-secondary)" fontSize="13">04</text>
      <text x="845" y="132" textAnchor="middle" fill="var(--color-secondary)" fontSize="13">05</text>

      <Box x={40} y={150} w={150} h={100} title="Patch OS" sub="security updates" />
      <Box x={220} y={150} w={150} h={100} title="TLS / DNS" sub="expiry + records" />
      <Box x={400} y={150} w={160} h={100} title="Backups" sub="restore check" />
      <Box x={590} y={150} w={150} h={100} title="Link check" sub="forms + pages" />
      <Box x={770} y={150} w={150} h={100} title="Report" sub="actions + status" tone="accent" />

      <Connector d="M190 200 H220" arrowId={arrowId} />
      <Connector d="M370 200 H400" arrowId={arrowId} />
      <Connector d="M560 200 H590" arrowId={arrowId} />
      <Connector d="M740 200 H770" arrowId={arrowId} />

      <Connector d="M845 250 C845 330, 115 330, 115 250" arrowId={arrowId} dashed />
      <text x="480" y="362" textAnchor="middle" fill="var(--color-muted)" fontSize="13" letterSpacing="0.06em">
        REPEAT MONTHLY
      </text>

      <SectionLabel x={40} y={456}>FINDINGS DOCUMENTED · DIRECT ENGINEER CONTACT</SectionLabel>
    </g>
  );
}

export function ServiceDiagramFigure({
  variant,
  caption,
  note,
}: {
  variant: ServiceVisualVariant;
  caption: string;
  note: string;
}) {
  return (
    <figure className="service-visual reveal">
      <p className="service-visual-hint">
        Scroll the diagram sideways <span aria-hidden="true">→</span>
      </p>
      <div className="service-visual-frame is-diagram">
        <ServiceVisual variant={variant} />
      </div>
      <figcaption>
        <span>{caption}</span>
        <span>{note}</span>
      </figcaption>
    </figure>
  );
}

export default function ServiceVisual({ variant }: { variant: ServiceVisualVariant }) {
  const copy = COPY[variant];
  const titleId = `service-visual-${variant}-title`;
  const descriptionId = `service-visual-${variant}-description`;
  const arrowId = `service-visual-${variant}-arrow`;

  return (
    <svg
      className="service-diagram"
      viewBox="0 0 960 540"
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
    >
      <title id={titleId}>{copy.title}</title>
      <desc id={descriptionId}>{copy.description}</desc>
      <defs>
        <marker
          id={arrowId}
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--color-sage)" />
        </marker>
      </defs>
      {variant === "server" ? <ServerDiagram arrowId={arrowId} /> : null}
      {variant === "dns" ? <DnsDiagram arrowId={arrowId} /> : null}
      {variant === "automation" ? <AutomationDiagram arrowId={arrowId} /> : null}
      {variant === "maintenance" ? <MaintenanceDiagram arrowId={arrowId} /> : null}
    </svg>
  );
}
