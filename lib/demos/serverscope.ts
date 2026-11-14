/**
 * ServerScope — fictional sample data for the operations-console demo.
 * The fleet, readings, incidents, and deployment log are invented.
 */

import type { TourStep } from "@/lib/demos/tour";

export type ServerScopeView = "overview" | "security" | "deploy" | "alerts";

export const SERVERSCOPE_FLEET = {
  name: "butwal-fleet-1",
  region: "npl-1 \u00b7 Butwal",
  baseline: "baseline v3",
  reading: "09:41",
  offset: "+05:45",
};

export type ServerScopeService = {
  name: string;
  state: "running" | "stopped" | "failed";
};

export type ServerScopeVolume = {
  mount: string;
  used: number;
  size: string;
};

export type ServerScopeServer = {
  id: string;
  host: string;
  role: string;
  ip: string;
  region: string;
  kernel: string;
  uptime: string;
  status: "operational" | "degraded" | "offline";
  cpu: number;
  mem: number;
  disk: number;
  lastDeploy: string;
  services: ServerScopeService[];
  volumes: ServerScopeVolume[];
  note: string;
};

export const SERVERSCOPE_SERVERS: ServerScopeServer[] = [
  {
    id: "ss-web01",
    host: "web-01",
    role: "Caddy reverse proxy \u00b7 two vhosts",
    ip: "10.0.0.11",
    region: "npl-1 \u00b7 Butwal",
    kernel: "6.8.0-45-generic",
    uptime: "84 days",
    status: "operational",
    cpu: 22,
    mem: 41,
    disk: 63,
    lastDeploy: "status-page \u00b7 6 days ago",
    services: [
      { name: "caddy", state: "running" },
      { name: "sshd", state: "running" },
      { name: "fail2ban", state: "running" },
    ],
    volumes: [
      { mount: "/", used: 63, size: "38 GB" },
      { mount: "/var/log", used: 41, size: "8 GB" },
    ],
    note: "Terminates TLS and forwards to app-01. Certificate renewal runs from a systemd timer.",
  },
  {
    id: "ss-app01",
    host: "app-01",
    role: "Gunicorn \u00b7 PostgreSQL 16",
    ip: "10.0.0.12",
    region: "npl-1 \u00b7 Butwal",
    kernel: "6.8.0-45-generic",
    uptime: "31 days",
    status: "operational",
    cpu: 58,
    mem: 72,
    disk: 48,
    lastDeploy: "inventory-api \u00b7 2 days ago",
    services: [
      { name: "gunicorn", state: "running" },
      { name: "postgresql", state: "running" },
      { name: "redis", state: "running" },
      { name: "borgmatic", state: "stopped" },
    ],
    volumes: [
      { mount: "/", used: 48, size: "76 GB" },
      { mount: "/var/lib/postgresql", used: 55, size: "120 GB" },
    ],
    note: "Application host. The database volume is the largest thing on the box; growth is watched weekly.",
  },
  {
    id: "ss-bkp01",
    host: "bkp-01",
    role: "Borg repository \u00b7 daily snapshots",
    ip: "10.1.0.21",
    region: "fra-1 \u00b7 Frankfurt",
    kernel: "6.8.0-40-generic",
    uptime: "9 days",
    status: "degraded",
    cpu: 12,
    mem: 30,
    disk: 87,
    lastDeploy: "no deploys \u00b7 backup target only",
    services: [
      { name: "sshd", state: "running" },
      { name: "borgmatic.timer", state: "running" },
      { name: "node_exporter", state: "running" },
    ],
    volumes: [{ mount: "/srv/borg", used: 87, size: "500 GB" }],
    note: "Disk above the 85% threshold. Pruning snapshots older than 90 days clears it; the incident is open.",
  },
];

export type ServerScopeCheck = {
  id: string;
  ref: string;
  title: string;
  detail: string;
  verify: string;
};

export const SERVERSCOPE_CHECKS: ServerScopeCheck[] = [
  {
    id: "ss-c1",
    ref: "RB-01",
    title: "SSH public-key authentication only",
    detail:
      "Password login disabled for root and every operator account; keys installed per person.",
    verify: "sshd -T | grep passwordauthentication",
  },
  {
    id: "ss-c2",
    ref: "RB-02",
    title: "Firewall default-deny",
    detail: "Only 22, 80, and 443 reachable; every other port is dropped and the rules are in the baseline.",
    verify: "ufw status numbered",
  },
  {
    id: "ss-c3",
    ref: "RB-03",
    title: "fail2ban with jails for sshd and the proxy",
    detail: "Repeated failed logins are banned on a short timer instead of being read about later.",
    verify: "fail2ban-client status",
  },
  {
    id: "ss-c4",
    ref: "RB-04",
    title: "Unattended security upgrades",
    detail: "Security patches apply in the nightly window, and the applied set is logged.",
    verify: "apt-get -s upgrade | grep -i security",
  },
  {
    id: "ss-c5",
    ref: "RB-05",
    title: "TLS issued and renewed automatically",
    detail: "The proxy renews certificates on a timer; expiry is monitored rather than assumed.",
    verify: "systemctl list-timers | grep cert",
  },
  {
    id: "ss-c6",
    ref: "RB-06",
    title: "Off-server backups, restore tested",
    detail: "Snapshots leave the machine, and the last restore ran on a spare host and was compared.",
    verify: "borgmatic list --last 1",
  },
  {
    id: "ss-c7",
    ref: "RB-07",
    title: "Security headers set at the proxy",
    detail: "HSTS, nosniff, frame restrictions, and a referrer policy are applied once, at the edge.",
    verify: "curl -sI localhost | grep -i strict",
  },
  {
    id: "ss-c8",
    ref: "RB-08",
    title: "Services run as non-root users",
    detail: "Each service has a dedicated account with the least privilege it needs to run.",
    verify: "ps -eo user,comm | grep gunicorn",
  },
];

/** Baseline state: the parts of the runbook already recorded as applied. */
export const SERVERSCOPE_INITIAL_APPLIED: string[] = ["ss-c1", "ss-c2", "ss-c5", "ss-c7"];

export type ServerScopeDeployApp = {
  id: string;
  slug: string;
  name: string;
  stack: string;
  build: string;
};

export const SERVERSCOPE_APPS: ServerScopeDeployApp[] = [
  {
    id: "ss-a1",
    slug: "inventory-api",
    name: "inventory-api",
    stack: "Python \u00b7 gunicorn",
    build: "pip install -r requirements.txt",
  },
  {
    id: "ss-a2",
    slug: "school-portal",
    name: "school-portal",
    stack: "Node.js \u00b7 Caddy proxy",
    build: "npm ci && npm run build",
  },
  {
    id: "ss-a3",
    slug: "status-page",
    name: "status-page",
    stack: "Static build \u00b7 Caddy",
    build: "npm run export",
  },
];

export const SERVERSCOPE_ENVIRONMENTS = ["staging", "production"] as const;

export type ServerScopeEnvironment = (typeof SERVERSCOPE_ENVIRONMENTS)[number];

/** Where each environment lives, and the release directory it points at. */
export const SERVERSCOPE_TARGETS: Record<
  ServerScopeEnvironment,
  { host: string; path: string }
> = {
  staging: { host: "web-01", path: "/srv/staging" },
  production: { host: "app-01", path: "/srv/production" },
};

/**
 * The simulated deployment sequence. Each entry carries the delay at which it
 * appears; the component stamps the session clock on arrival. No server is
 * contacted, and the transcript says so.
 */
export const SERVERSCOPE_DEPLOY_SEQUENCE: Array<{ delay: number; text: string }> = [
  { delay: 0, text: "$ deploy {slug} --env {env} --branch main" },
  { delay: 450, text: "resolve commit ................ f4c2e91" },
  { delay: 1000, text: "pre-flight .................... database reachable, {disk}% disk used" },
  { delay: 1700, text: "build ......................... {build} (38.2s)" },
  { delay: 2500, text: "artifact ...................... {slug}-f4c2e91.tar.gz (12.4 MB)" },
  { delay: 3200, text: "upload ........................ {host}:{path}/releases/f4c2e91" },
  { delay: 3900, text: "switch ........................ current -> f4c2e91" },
  { delay: 4500, text: "reload ........................ systemctl reload gunicorn \u2014 ok" },
  { delay: 5100, text: "health ........................ GET /healthz \u2014 200 in 84ms" },
  { delay: 5700, text: "done .......................... {env} serves f4c2e91 (simulated)" },
];

export type ServerScopeIncident = {
  id: string;
  ref: string;
  severity: "critical" | "warning" | "info";
  title: string;
  detail: string;
  host: string;
  raised: string;
  status: "open" | "acknowledged" | "resolved";
};

export const SERVERSCOPE_INCIDENTS: ServerScopeIncident[] = [
  {
    id: "ss-al1",
    ref: "INC-014",
    severity: "critical",
    title: "Disk 87% on /srv/borg",
    detail: "Backup repository above the 85% threshold. Pruning snapshots older than 90 days clears it.",
    host: "bkp-01",
    raised: "06:14",
    status: "open",
  },
  {
    id: "ss-al2",
    ref: "INC-013",
    severity: "warning",
    title: "Certificate for the portal host expires in 14 days",
    detail: "Renewal is scheduled on a timer; this is the reminder that checks the timer kept running.",
    host: "web-01",
    raised: "Yesterday 23:00",
    status: "acknowledged",
  },
  {
    id: "ss-al3",
    ref: "INC-012",
    severity: "info",
    title: "Unattended upgrades applied 4 packages",
    detail: "Security updates applied on the application host during the nightly window.",
    host: "app-01",
    raised: "Yesterday 02:30",
    status: "resolved",
  },
  {
    id: "ss-al4",
    ref: "INC-011",
    severity: "info",
    title: "Nightly snapshot restored and compared",
    detail: "The backup was restored to a spare host and checked; the result is in the runbook evidence.",
    host: "bkp-01",
    raised: "Mon 03:10",
    status: "resolved",
  },
];

export const SERVERSCOPE_STEPS: TourStep[] = [
  {
    id: "ss-welcome",
    title: "Welcome to ServerScope",
    body:
      "A working operations console for a fictional three-host fleet. Readings and incidents are sample data; the runbook state and the deployment transcript are live in this page. The tour takes about two minutes and can be skipped at any step.",
  },
  {
    id: "ss-overview",
    view: "overview",
    target: "ss-fleet",
    title: "Read the fleet, not a memory",
    body:
      "Each host carries its role, load, disk, kernel, uptime, and services on one reading. Select a host to inspect it. The readings here are sample data standing in for what a production build collects from the machines.",
    action: "Try it \u2014 open bkp-01 and look at its disk.",
  },
  {
    id: "ss-security",
    view: "security",
    target: "ss-security",
    title: "A runbook with evidence",
    body:
      "Every line records whether the step is applied, what it checks, and the command that proves it \u2014 so \u201cwhat was actually done here?\u201d has an answer that two people can read. The score is computed from your own state.",
    action: "Try it \u2014 apply an outstanding step and watch the score and the session log.",
  },
  {
    id: "ss-deploy",
    view: "deploy",
    target: "ss-deploy",
    title: "The same deployment, every time",
    body:
      "The command is built from the choices, then walked step by step into a timestamped transcript. This run is simulated and says so in the log; a production build drives the same steps over SSH or a pipeline.",
    action: "Try it \u2014 run a deployment to staging.",
  },
  {
    id: "ss-alerts",
    view: "alerts",
    target: "ss-alerts",
    title: "An incident log someone owns",
    body:
      "Incidents carry a reference, a host, the time they were raised, and a status. The critical disk incident is the same bkp-01 reading you saw on the fleet view \u2014 acknowledge it and the log records who looked.",
  },
];
