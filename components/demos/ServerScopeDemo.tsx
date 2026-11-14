"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  SERVERSCOPE_APPS,
  SERVERSCOPE_CHECKS,
  SERVERSCOPE_DEPLOY_SEQUENCE,
  SERVERSCOPE_ENVIRONMENTS,
  SERVERSCOPE_FLEET,
  SERVERSCOPE_INCIDENTS,
  SERVERSCOPE_INITIAL_APPLIED,
  SERVERSCOPE_SERVERS,
  SERVERSCOPE_TARGETS,
  type ServerScopeEnvironment,
  type ServerScopeIncident,
  type ServerScopeView,
} from "@/lib/demos/serverscope";
import { useDemoWindow } from "./demo-shared";

const VIEWS: Array<{ id: ServerScopeView; label: string }> = [
  { id: "overview", label: "fleet" },
  { id: "security", label: "runbook" },
  { id: "deploy", label: "deploy" },
  { id: "alerts", label: "incidents" },
];

function sessionClock(): string {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}

function countLabel(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

/** A reading bar drawn as segments, so no number is implied by a gradient. */
function Segments({ value }: { value: number }) {
  const clamped = Math.min(Math.max(value, 0), 100);
  const filled = Math.round((clamped / 100) * 16);
  const tone = clamped >= 85 ? "bad" : clamped >= 70 ? "warn" : "ok";
  return (
    <span className={`ss-seg ss-seg-${tone}`} aria-hidden="true">
      {Array.from({ length: 16 }, (_, index) => (
        <i key={index} className={index < filled ? "is-on" : undefined} />
      ))}
    </span>
  );
}

type DeployRun = {
  appId: string;
  env: ServerScopeEnvironment;
};

type HistoryEntry = { time: string; text: string };

export default function ServerScopeDemo() {
  const { activeView, setView } = useDemoWindow();
  const [applied, setApplied] = useState<string[]>(SERVERSCOPE_INITIAL_APPLIED);
  const [selectedId, setSelectedId] = useState(SERVERSCOPE_SERVERS[0].id);
  const [incidents, setIncidents] = useState<ServerScopeIncident[]>(SERVERSCOPE_INCIDENTS);
  const [deployForm, setDeployForm] = useState<{
    appId: string;
    env: ServerScopeEnvironment;
  }>({ appId: SERVERSCOPE_APPS[0].id, env: "staging" });
  const [run, setRun] = useState<DeployRun | null>(null);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const pushHistory = useCallback((text: string) => {
    setHistory((current) => [{ time: sessionClock(), text }, ...current]);
  }, []);

  const selected =
    SERVERSCOPE_SERVERS.find((server) => server.id === selectedId) ?? SERVERSCOPE_SERVERS[0];

  const score = useMemo(() => {
    const appliedCount = SERVERSCOPE_CHECKS.filter((check) => applied.includes(check.id)).length;
    return {
      applied: appliedCount,
      total: SERVERSCOPE_CHECKS.length,
      percent: Math.round((appliedCount / SERVERSCOPE_CHECKS.length) * 100),
    };
  }, [applied]);

  const openIncidents = incidents.filter((incident) => incident.status === "open").length;
  const acknowledgedIncidents = incidents.filter(
    (incident) => incident.status === "acknowledged"
  ).length;

  const degraded = SERVERSCOPE_SERVERS.filter((server) => server.status !== "operational").length;

  const selectedApp =
    SERVERSCOPE_APPS.find((app) => app.id === deployForm.appId) ?? SERVERSCOPE_APPS[0];

  const toggleCheck = (checkId: string) => {
    const check = SERVERSCOPE_CHECKS.find((item) => item.id === checkId);
    if (!check) return;
    if (applied.includes(checkId)) {
      setApplied((current) => current.filter((id) => id !== checkId));
      pushHistory(`${check.ref} reverted \u2014 ${check.title}.`);
    } else {
      setApplied((current) => [...current, checkId]);
      pushHistory(`${check.ref} applied \u2014 ${check.title}.`);
    }
  };

  const advanceIncident = (incidentId: string) => {
    const incident = incidents.find((item) => item.id === incidentId);
    if (!incident || incident.status === "resolved") return;
    const next = incident.status === "open" ? "acknowledged" : "resolved";
    setIncidents((current) =>
      current.map((item) => (item.id === incidentId ? { ...item, status: next } : item))
    );
    pushHistory(
      `${incident.ref} ${next} \u2014 ${incident.title} (${incident.host}).`
    );
  };

  const startDeploy = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTranscript([]);
    setRun({ appId: deployForm.appId, env: deployForm.env });
  };

  // The simulated deployment: fixed steps on timers, cancelled if the window
  // closes or the run is replaced. State changes happen in the timer
  // callbacks, never synchronously in the effect body.
  useEffect(() => {
    if (!run) return;

    const app = SERVERSCOPE_APPS.find((item) => item.id === run.appId);
    const target = SERVERSCOPE_TARGETS[run.env];
    const host = SERVERSCOPE_SERVERS.find((server) => server.host === target.host);
    const timers: number[] = [];

    SERVERSCOPE_DEPLOY_SEQUENCE.forEach((entry) => {
      const text = entry.text
        .replaceAll("{slug}", app?.slug ?? "app")
        .replaceAll("{build}", app?.build ?? "build")
        .replaceAll("{env}", run.env)
        .replaceAll("{host}", target.host)
        .replaceAll("{path}", target.path)
        .replaceAll("{disk}", String(host?.disk ?? 0));
      timers.push(
        window.setTimeout(() => {
          setTranscript((current) => [...current, `[${sessionClock()}] ${text}`]);
        }, entry.delay)
      );
    });

    const last = SERVERSCOPE_DEPLOY_SEQUENCE[SERVERSCOPE_DEPLOY_SEQUENCE.length - 1];
    timers.push(
      window.setTimeout(() => {
        setRun(null);
        pushHistory(
          `${app?.slug} deployed to ${run.env} on ${target.host} \u2014 simulated run.`
        );
      }, last.delay + 700)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [run, pushHistory]);

  // Keep the newest transcript line in view. DOM write only.
  useEffect(() => {
    const log = transcriptRef.current;
    if (log) {
      log.scrollTop = log.scrollHeight;
    }
  }, [transcript]);

  const fleetCount = SERVERSCOPE_SERVERS.length;

  return (
    <div className="ss-shell">
      <header className="ss-top">
        <div className="ss-toprow">
          <p className="ss-brand">
            <span className="ss-promptmark" aria-hidden="true">
              $
            </span>
            <span className="ss-brandname">
              <strong>serverscope</strong>
              <small>
                {SERVERSCOPE_FLEET.name} · {SERVERSCOPE_FLEET.region}
              </small>
            </span>
          </p>
          <p className="ss-topstat">
            <span>{countLabel(fleetCount, "host")}</span>
            <span className={degraded > 0 ? "ss-topstat-warn" : undefined}>
              {degraded} degraded
            </span>
            <span>{countLabel(openIncidents, "open incident")}</span>
          </p>
        </div>

        <nav className="ss-cmdnav" aria-label="ServerScope sections">
          {VIEWS.map((view) => (
            <button
              key={view.id}
              type="button"
              className="ss-cmd"
              aria-current={activeView === view.id ? "page" : undefined}
              onClick={() => setView(view.id)}
            >
              <span className="ss-cmd-mark" aria-hidden="true">
                {activeView === view.id ? ">" : "\u00a0"}
              </span>
              {view.label}
              {view.id === "security" ? (
                <span className="ss-cmd-count">
                  {score.applied}/{score.total}
                </span>
              ) : null}
              {view.id === "alerts" ? (
                <span className="ss-cmd-count">{openIncidents}</span>
              ) : null}
            </button>
          ))}
        </nav>
      </header>

      <div className="ss-console">
        {activeView === "overview" ? (
          <section className="ss-view" aria-labelledby="ss-fleet-title">
            <div className="ss-viewhead">
              <p className="ss-eyebrow">
                fleet · reading {SERVERSCOPE_FLEET.reading} {SERVERSCOPE_FLEET.offset}
              </p>
              <h1 id="ss-fleet-title">One reading for three hosts</h1>
              <p className="ss-lede">
                Roles, load, disk, and the services behind them on a single screen, so a host is
                not known only by whoever last logged into it. The readings are sample data; the
                selection and the notes are yours.
              </p>
            </div>

            <div className="ss-fleetgrid" data-tour="ss-fleet">
              <section className="ss-panel ss-fleetpanel" aria-labelledby="ss-hosts-title">
                <header className="ss-panelhead">
                  <h2 id="ss-hosts-title">hosts</h2>
                  <p>3 registered · 1 reading each</p>
                </header>
                <div className="ss-tablewrap">
                  <table className="ss-fleettable">
                    <caption className="ss-sr">
                      Servers with role, CPU and memory load, disk use, and state
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">host</th>
                        <th scope="col">role</th>
                        <th scope="col">cpu / mem</th>
                        <th scope="col">disk</th>
                        <th scope="col">state</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SERVERSCOPE_SERVERS.map((server) => {
                        const isSelected = server.id === selected.id;
                        return (
                          <tr key={server.id} data-selected={isSelected || undefined}>
                            <th scope="row">
                              <button
                                type="button"
                                className="ss-hostbtn"
                                aria-pressed={isSelected}
                                onClick={() => setSelectedId(server.id)}
                              >
                                <span className="ss-hostname">{server.host}</span>
                                <small>{server.ip}</small>
                              </button>
                            </th>
                            <td className="ss-hostrole">{server.role}</td>
                            <td className="ss-hostload">
                              <span>
                                <span className="ss-loadkey">cpu</span>
                                <Segments value={server.cpu} />
                                <b>{server.cpu}%</b>
                              </span>
                              <span>
                                <span className="ss-loadkey">mem</span>
                                <Segments value={server.mem} />
                                <b>{server.mem}%</b>
                              </span>
                            </td>
                            <td className="ss-hostdisk">
                              <Segments value={server.disk} />
                              <b>{server.disk}%</b>
                            </td>
                            <td>
                              <span className={`ss-state ss-state-${server.status}`}>
                                {server.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="ss-panelfoot">
                  Readings are a snapshot, not a live feed — a production build polls the
                  exporters these hosts already run.
                </p>
              </section>

              <aside className="ss-panel ss-inspector" aria-live="polite">
                <header className="ss-panelhead">
                  <h2>inspect · {selected.host}</h2>
                  <span className={`ss-state ss-state-${selected.status}`}>
                    {selected.status}
                  </span>
                </header>

                <dl className="ss-inspectmeta">
                  <div>
                    <dt>address</dt>
                    <dd>{selected.ip}</dd>
                  </div>
                  <div>
                    <dt>region</dt>
                    <dd>{selected.region}</dd>
                  </div>
                  <div>
                    <dt>kernel</dt>
                    <dd>{selected.kernel}</dd>
                  </div>
                  <div>
                    <dt>uptime</dt>
                    <dd>{selected.uptime}</dd>
                  </div>
                  <div>
                    <dt>last deploy</dt>
                    <dd>{selected.lastDeploy}</dd>
                  </div>
                </dl>

                <div className="ss-inspectblock">
                  <h3>services</h3>
                  <ul className="ss-services">
                    {selected.services.map((service) => (
                      <li key={service.name}>
                        <span
                          className={`ss-servicemark ss-servicemark-${service.state}`}
                          aria-hidden="true"
                        />
                        <span className="ss-servicename">{service.name}</span>
                        <span className="ss-servicestate">{service.state}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ss-inspectblock">
                  <h3>volumes</h3>
                  <ul className="ss-volumes">
                    {selected.volumes.map((volume) => (
                      <li key={volume.mount}>
                        <span className="ss-volumemount">{volume.mount}</span>
                        <Segments value={volume.used} />
                        <span className="ss-volumepct">
                          {volume.used}% of {volume.size}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="ss-inspectnote">{selected.note}</p>
              </aside>
            </div>
          </section>
        ) : null}

        {activeView === "security" ? (
          <section className="ss-view" aria-labelledby="ss-runbook-title">
            <div className="ss-viewhead">
              <p className="ss-eyebrow">{SERVERSCOPE_FLEET.baseline} · reviewed 02 Nov</p>
              <h1 id="ss-runbook-title">The hardening runbook</h1>
              <p className="ss-lede">
                Every line records whether the step is applied, what it protects, and the command
                that proves it. Apply or revert a step and the score and the session log follow;
                the checklist state is real in this page, and nothing is sent to a host.
              </p>
            </div>

            <div className="ss-runbook" data-tour="ss-security">
              <header className="ss-runbookhead">
                <p className="ss-score">
                  <strong>{score.applied}</strong>
                  <span>/ {score.total} applied</span>
                </p>
                <div className="ss-scorebar">
                  <Segments value={score.percent} />
                </div>
                <p className="ss-scoremood">
                  {score.applied === score.total
                    ? "every step recorded \u2014 screenshot it and keep the commands"
                    : `${score.total - score.applied} outstanding \u00b7 ${score.percent}% of the baseline recorded`}
                </p>
              </header>

              <ol className="ss-checks">
                {SERVERSCOPE_CHECKS.map((check) => {
                  const isApplied = applied.includes(check.id);
                  return (
                    <li key={check.id} data-applied={isApplied || undefined}>
                      <span className="ss-checkmark" aria-hidden="true">
                        {isApplied ? "[\u00d7]" : "[ ]"}
                      </span>
                      <div className="ss-checkbody">
                        <p className="ss-checktitle">
                          <span className="ss-ref">{check.ref}</span>
                          {check.title}
                        </p>
                        <p className="ss-checkdetail">{check.detail}</p>
                        <code className="ss-verify">$ {check.verify}</code>
                      </div>
                      <button
                        type="button"
                        className="ss-toggle"
                        aria-pressed={isApplied}
                        onClick={() => toggleCheck(check.id)}
                      >
                        <span aria-hidden="true">{isApplied ? "Applied" : "Apply"}</span>
                        <span className="ss-sr">
                          {isApplied ? `Revert ${check.title}` : `Apply ${check.title}`}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <p className="ss-panelfoot">
                In production each line is read from the host and the audit trail behind it; here it
                is a checklist you can operate, with the same evidence written down.
              </p>
            </div>
          </section>
        ) : null}

        {activeView === "deploy" ? (
          <section className="ss-view" aria-labelledby="ss-deploy-title">
            <div className="ss-viewhead">
              <p className="ss-eyebrow">
                deploy · {SERVERSCOPE_TARGETS[deployForm.env].host} · simulated
              </p>
              <h1 id="ss-deploy-title">Deployments, walked once</h1>
              <p className="ss-lede">
                The command is built from what you choose, then walked step by step into a
                timestamped transcript. Nothing is contacted by this demo; a production build runs
                the same sequence over SSH or a pipeline and streams the output you see here.
              </p>
            </div>

            <div className="ss-deploygrid">
              <form className="ss-panel ss-builder" data-tour="ss-deploy" onSubmit={startDeploy}>
                <header className="ss-panelhead">
                  <h2>launch</h2>
                  <p>one branch, two environments</p>
                </header>

                <div className="ss-builderbody">
                  <label className="ss-flag">
                    <span className="ss-flagname">--app</span>
                    <select
                      value={deployForm.appId}
                      onChange={(event) =>
                        setDeployForm((current) => ({ ...current, appId: event.target.value }))
                      }
                    >
                      {SERVERSCOPE_APPS.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.slug} · {app.stack}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="ss-flag">
                    <span className="ss-flagname">--env</span>
                    <select
                      value={deployForm.env}
                      onChange={(event) =>
                        setDeployForm((current) => ({
                          ...current,
                          env: event.target.value as ServerScopeEnvironment,
                        }))
                      }
                    >
                      {SERVERSCOPE_ENVIRONMENTS.map((env) => (
                        <option key={env} value={env}>
                          {env} · {SERVERSCOPE_TARGETS[env].host}
                        </option>
                      ))}
                    </select>
                  </label>

                  <p className="ss-command">
                    <span aria-hidden="true">$</span> deploy {selectedApp.slug} --env{" "}
                    {deployForm.env} --branch main
                  </p>

                  <div className="ss-builderfoot">
                    <button type="submit" className="ss-run" disabled={run !== null}>
                      {run ? "running\u2026" : "Run deployment"}
                    </button>
                    <span className="ss-sim">simulated · no server is contacted</span>
                  </div>
                  <p className="ss-buildernote">
                    {run
                      ? "Streaming the fixed sequence \u2014 about six seconds."
                      : `${selectedApp.build} on ${SERVERSCOPE_TARGETS[deployForm.env].host}:${SERVERSCOPE_TARGETS[deployForm.env].path}`}
                  </p>
                </div>
              </form>

              <section className="ss-panel ss-transcript" aria-labelledby="ss-transcript-title">
                <header className="ss-panelhead">
                  <h2 id="ss-transcript-title">transcript</h2>
                  <p>
                    {run
                      ? "running \u00b7 simulated"
                      : transcript.length > 0
                        ? "complete \u00b7 simulated"
                        : "no run yet"}
                  </p>
                </header>
                <div
                  className="ss-transcriptscroll"
                  role="region"
                  aria-label="Deployment transcript"
                  tabIndex={0}
                  ref={transcriptRef}
                >
                  <pre>
                    <code>
                      {transcript.length > 0
                        ? transcript.join("\n")
                        : "$ waiting for a deployment run"}
                    </code>
                  </pre>
                </div>
                <p className="ss-panelfoot">
                  Each line is a fixed step of the sequence. A real run would add the exit codes it
                  receives from the host.
                </p>
              </section>
            </div>
          </section>
        ) : null}

        {activeView === "alerts" ? (
          <section className="ss-view" aria-labelledby="ss-incidents-title">
            <div className="ss-viewhead">
              <p className="ss-eyebrow">
                incidents · {openIncidents} open · {acknowledgedIncidents} acknowledged
              </p>
              <h1 id="ss-incidents-title">The incident log</h1>
              <p className="ss-lede">
                Incidents carry a reference, the host they belong to, when they were raised, and
                who owns them. Acknowledging one is recorded in this session; the critical disk
                incident is the same 87% reading you saw on bkp-01.
              </p>
            </div>

            <section className="ss-panel ss-incidentpanel" data-tour="ss-alerts">
              <header className="ss-panelhead">
                <h2>log</h2>
                <p>sample feed · newest first</p>
              </header>
              <div className="ss-tablewrap">
                <table className="ss-inctable">
                  <caption className="ss-sr">
                    Incidents with severity, description, host, time raised, and status
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">level</th>
                      <th scope="col">incident</th>
                      <th scope="col">host</th>
                      <th scope="col">raised</th>
                      <th scope="col">status</th>
                      <th scope="col">
                        <span className="ss-sr">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {incidents.map((incident) => (
                      <tr key={incident.id} data-status={incident.status}>
                        <td className="ss-incidents-sev">
                          <span className={`ss-level ss-level-${incident.severity}`}>
                            {incident.severity}
                          </span>
                        </td>
                        <th scope="row" className="ss-incidentcell">
                          <span className="ss-ref">{incident.ref}</span>
                          <span className="ss-inctitle">{incident.title}</span>
                          <small>{incident.detail}</small>
                        </th>
                        <td className="ss-inchost">{incident.host}</td>
                        <td className="ss-incraised">{incident.raised}</td>
                        <td>
                          <span className={`ss-status ss-status-${incident.status}`}>
                            {incident.status}
                          </span>
                        </td>
                        <td className="ss-incaction">
                          {incident.status === "resolved" ? (
                            <span className="ss-muted">closed</span>
                          ) : (
                            <button
                              type="button"
                              className="ss-act"
                              onClick={() => advanceIncident(incident.id)}
                            >
                              {incident.status === "open" ? "Acknowledge" : "Resolve"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="ss-panelfoot">
                Severity is the level the check raised, not a promise about impact. The log is
                sample history; only the status changes you make here are yours.
              </p>
            </section>
          </section>
        ) : null}

        <footer className="ss-statusbar">
          <p className="ss-history">
            <span className="ss-promptmark" aria-hidden="true">
              $
            </span>
            {history.length > 0 ? (
              <span>
                <time>{history[0].time}</time> {history[0].text}
              </span>
            ) : (
              <span>ready — nothing changed in this session yet</span>
            )}
          </p>
          <p className="ss-session">
            {countLabel(history.length, "action")} · session not saved
          </p>
        </footer>

        <p className="ss-foot">
          Fictional fleet and sample readings. Changes live only in this page; no server is
          contacted and nothing is stored.
        </p>
      </div>
    </div>
  );
}
