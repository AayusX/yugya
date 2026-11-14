"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  WORKNEST_BUSINESS,
  WORKNEST_INVOICES,
  WORKNEST_MEMBERS,
  WORKNEST_TASKS,
  type WorknestInvoice,
  type WorknestStatus,
  type WorknestTask,
  type WorknestView,
} from "@/lib/demos/worknest";
import { useDemoWindow } from "./demo-shared";

const VIEWS: Array<{ id: WorknestView; label: string }> = [
  { id: "board", label: "Dispatch" },
  { id: "invoices", label: "Payments" },
  { id: "team", label: "Crew" },
];

const STATUS_ORDER: WorknestStatus[] = ["todo", "doing", "done"];
const STATUS_LABEL: Record<WorknestStatus, string> = {
  todo: "Booked",
  doing: "On site",
  done: "Closed",
};
const STATUS_ACTION: Record<WorknestStatus, { forward?: string; back?: string }> = {
  todo: { forward: "Start job" },
  doing: { forward: "Close job", back: "Send back" },
  done: { back: "Reopen" },
};

function rs(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

function countLabel(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

function activityStamp(): string {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default function WorknestDemo() {
  const { activeView, setView } = useDemoWindow();
  const [tasks, setTasks] = useState<WorknestTask[]>(WORKNEST_TASKS);
  const [invoices, setInvoices] = useState<WorknestInvoice[]>(WORKNEST_INVOICES);
  const [nextRef, setNextRef] = useState(2422);
  const [taskForm, setTaskForm] = useState({
    title: "",
    site: "",
    memberId: WORKNEST_MEMBERS[0].id,
    priority: "normal",
    due: "",
  });
  const [taskError, setTaskError] = useState("");
  const [invoiceForm, setInvoiceForm] = useState({ client: "", amount: "" });
  const [invoiceError, setInvoiceError] = useState("");
  const [activity, setActivity] = useState<Array<{ time: string; text: string }>>([]);
  // Mounted only inside the demo overlay, so this never renders on the server.
  const [today] = useState(() => new Date());

  const dateLabel = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const memberName = (memberId: string) =>
    WORKNEST_MEMBERS.find((member) => member.id === memberId)?.name ?? "Unassigned";

  const pushActivity = (text: string) => {
    setActivity((current) => [{ time: activityStamp(), text }, ...current]);
  };

  const statusCounts = useMemo(
    () =>
      STATUS_ORDER.reduce<Record<WorknestStatus, number>>(
        (counts, status) => ({
          ...counts,
          [status]: tasks.filter((task) => task.status === status).length,
        }),
        { todo: 0, doing: 0, done: 0 }
      ),
    [tasks]
  );

  const openTasks = statusCounts.todo + statusCounts.doing;

  const outstanding = useMemo(
    () =>
      invoices
        .filter((invoice) => invoice.status === "sent" || invoice.status === "overdue")
        .reduce((total, invoice) => total + invoice.amount, 0),
    [invoices]
  );

  const overdueCount = invoices.filter((invoice) => invoice.status === "overdue").length;

  const teamRows = useMemo(
    () =>
      WORKNEST_MEMBERS.map((member) => {
        const assigned = tasks.filter((task) => task.memberId === member.id);
        const open = assigned.filter((task) => task.status !== "done");
        return {
          member,
          open: open.length,
          done: assigned.length - open.length,
          next: open[0] ?? null,
        };
      }),
    [tasks]
  );

  const moveTask = (taskId: string, direction: 1 | -1) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;
    const currentIndex = STATUS_ORDER.indexOf(task.status);
    const nextIndex = Math.min(Math.max(currentIndex + direction, 0), STATUS_ORDER.length - 1);
    if (nextIndex === currentIndex) return;

    const nextStatus = STATUS_ORDER[nextIndex];
    setTasks((current) =>
      current.map((item) =>
        item.id === taskId ? { ...item, status: nextStatus } : item
      )
    );
    pushActivity(
      `${task.ref} moved to ${STATUS_LABEL[nextStatus].toLowerCase()} — ${task.title}.`
    );
  };

  const setTaskField = <K extends keyof typeof taskForm>(
    field: K,
    value: (typeof taskForm)[K]
  ) => {
    setTaskForm((current) => ({ ...current, [field]: value }));
    setTaskError("");
  };

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = taskForm.title.trim();
    const site = taskForm.site.trim();
    const due = taskForm.due.trim();
    if (title.length < 3) {
      setTaskError("Write down what the job is, in a few words.");
      return;
    }
    if (site.length < 3) {
      setTaskError("Write the site or place the crew will go to.");
      return;
    }
    if (!due) {
      setTaskError("Give the due day, such as Today, Fri, or 18 Nov.");
      return;
    }
    const ref = `JOB-${nextRef}`;
    const task: WorknestTask = {
      id: `wn-t${nextRef}`,
      ref,
      title,
      site,
      memberId: taskForm.memberId,
      priority: taskForm.priority as WorknestTask["priority"],
      due,
      status: "todo",
    };
    setTasks((current) => [task, ...current]);
    setNextRef((value) => value + 1);
    setTaskForm({ ...taskForm, title: "", site: "", due: "" });
    setTaskError("");
    pushActivity(`New slip ${ref} — ${title} · ${memberName(taskForm.memberId)} · due ${due}.`);
  };

  const markPaid = (invoiceId: string) => {
    const invoice = invoices.find((item) => item.id === invoiceId);
    if (!invoice || invoice.status === "paid") return;
    const paidOn = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
    setInvoices((current) =>
      current.map((item) =>
        item.id === invoiceId ? { ...item, status: "paid", due: `paid ${paidOn}` } : item
      )
    );
    pushActivity(`Invoice ${invoice.id} (${invoice.client}) marked paid — ${rs(invoice.amount)}.`);
  };

  const addInvoice = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const client = invoiceForm.client.trim();
    const amount = Number(invoiceForm.amount);
    if (client.length < 3) {
      setInvoiceError("Give the client name as it should appear on the invoice.");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setInvoiceError("Give the invoice amount in rupees.");
      return;
    }
    const lastNumber = invoices.reduce(
      (highest, invoice) => Math.max(highest, Number(invoice.id.slice(3))),
      1040
    );
    const id = `WN-${lastNumber + 1}`;
    setInvoices((current) => [
      { id, client, amount, status: "draft", issued: "drafted today", due: "not sent yet" },
      ...current,
    ]);
    setInvoiceForm({ client: "", amount: "" });
    setInvoiceError("");
    pushActivity(`Draft invoice ${id} written — ${client} · ${rs(amount)}.`);
  };

  return (
    <div className="wn-shell">
      <header className="wn-head">
        <div className="wn-head-row">
          <p className="wn-brand">
            <span className="wn-brand-mark" aria-hidden="true">
              GE
            </span>
            <span className="wn-brand-name">
              <strong>{WORKNEST_BUSINESS.name}</strong>
              <small>{WORKNEST_BUSINESS.address}</small>
            </span>
          </p>
          <p className="wn-head-meta">
            <span>{dateLabel}</span>
            <small>{WORKNEST_BUSINESS.hours}</small>
          </p>
        </div>

        <div className="wn-tabrow">
          <nav className="wn-tabs" aria-label="Worknest sections">
            {VIEWS.map((view) => (
              <button
                key={view.id}
                type="button"
                className="wn-tab"
                aria-current={activeView === view.id ? "page" : undefined}
                onClick={() => setView(view.id)}
              >
                {view.label}
              </button>
            ))}
          </nav>
          <p className="wn-shiftline">
            {countLabel(openTasks, "open job")} · {countLabel(overdueCount, "overdue invoice")}
          </p>
        </div>
      </header>

      <div className="wn-book">
        {activeView === "board" ? (
          <section className="wn-view" aria-labelledby="wn-board-title">
            <div className="wn-viewhead">
              <p className="wn-kicker">Dispatch · {dateLabel}</p>
              <h1 id="wn-board-title">Today’s job book</h1>
              <p className="wn-lede">
                {countLabel(tasks.length, "job")} on the book — {statusCounts.todo} booked,{" "}
                {statusCounts.doing} on site, {statusCounts.done} closed. Each slip carries the
                site, the crew member, and the day it is due.
              </p>
            </div>

            <div className="wn-dispatch" data-tour="wn-board">
              {STATUS_ORDER.map((status) => {
                const columnTasks = tasks.filter((task) => task.status === status);
                const actions = STATUS_ACTION[status];
                return (
                  <section
                    className={`wn-lane wn-lane-${status}`}
                    key={status}
                    aria-labelledby={`wn-lane-${status}`}
                  >
                    <header className="wn-lane-head">
                      <h2 id={`wn-lane-${status}`}>{STATUS_LABEL[status]}</h2>
                      <span>{columnTasks.length}</span>
                    </header>

                    <ol className="wn-jobs">
                      {columnTasks.map((task) => (
                        <li className="wn-job" key={task.id}>
                          <div className="wn-job-top">
                            <span className="wn-job-ref">{task.ref}</span>
                            <span className={`wn-job-priority wn-priority-${task.priority}`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="wn-job-title">{task.title}</p>
                          <p className="wn-job-site">{task.site}</p>
                          <dl className="wn-job-meta">
                            <div>
                              <dt>Crew</dt>
                              <dd>
                                <span className="wn-crew-mark" aria-hidden="true">
                                  {initials(memberName(task.memberId))}
                                </span>
                                {memberName(task.memberId)}
                              </dd>
                            </div>
                            <div>
                              <dt>Due</dt>
                              <dd>{task.due}</dd>
                            </div>
                          </dl>
                          <div className="wn-job-actions">
                            {actions.back ? (
                              <button
                                type="button"
                                className="wn-job-btn"
                                onClick={() => moveTask(task.id, -1)}
                                aria-label={`${actions.back}: ${task.ref} ${task.title}`}
                              >
                                ← {actions.back}
                              </button>
                            ) : null}
                            {actions.forward ? (
                              <button
                                type="button"
                                className="wn-job-btn wn-job-btn-go"
                                onClick={() => moveTask(task.id, 1)}
                                aria-label={`${actions.forward}: ${task.ref} ${task.title}`}
                              >
                                {actions.forward} →
                              </button>
                            ) : null}
                          </div>
                        </li>
                      ))}
                      {columnTasks.length === 0 ? (
                        <li className="wn-job-empty">No jobs in this lane.</li>
                      ) : null}
                    </ol>
                  </section>
                );
              })}
            </div>

            <div className="wn-boardfoot">
              <form className="wn-docketform" data-tour="wn-addtask" onSubmit={addTask} noValidate>
                <header className="wn-docket-head">
                  <h2>New job slip</h2>
                  <span>Written at the desk</span>
                </header>
                <div className="wn-docket-body">
                  <label className="wn-field">
                    <span className="wn-label">Job</span>
                    <input
                      value={taskForm.title}
                      onChange={(event) => setTaskField("title", event.target.value)}
                      placeholder="e.g. Replace distribution board"
                      autoComplete="off"
                    />
                  </label>
                  <label className="wn-field">
                    <span className="wn-label">Site</span>
                    <input
                      value={taskForm.site}
                      onChange={(event) => setTaskField("site", event.target.value)}
                      placeholder="e.g. Shanti Tole, House 14"
                      autoComplete="off"
                    />
                  </label>
                  <div className="wn-field-row">
                    <label className="wn-field">
                      <span className="wn-label">Crew</span>
                      <select
                        value={taskForm.memberId}
                        onChange={(event) => setTaskField("memberId", event.target.value)}
                      >
                        {WORKNEST_MEMBERS.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="wn-field">
                      <span className="wn-label">Priority</span>
                      <select
                        value={taskForm.priority}
                        onChange={(event) => setTaskField("priority", event.target.value)}
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                      </select>
                    </label>
                    <label className="wn-field">
                      <span className="wn-label">Due</span>
                      <input
                        value={taskForm.due}
                        onChange={(event) => setTaskField("due", event.target.value)}
                        placeholder="e.g. Fri"
                        autoComplete="off"
                      />
                    </label>
                  </div>

                  {taskError ? (
                    <p className="wn-error" role="alert">
                      {taskError}
                    </p>
                  ) : null}

                  <div className="wn-formfoot">
                    <button type="submit" className="wn-primary">
                      Add to the book
                    </button>
                    <span className="wn-formnote">Runs in your browser · sample records</span>
                  </div>
                </div>
              </form>

              <section className="wn-notebook" aria-labelledby="wn-log-title">
                <header className="wn-notebook-head">
                  <h2 id="wn-log-title">Today’s notes</h2>
                  <span>{countLabel(activity.length, "entry")}</span>
                </header>
                {activity.length > 0 ? (
                  <ol className="wn-log">
                    {activity.slice(0, 7).map((entry) => (
                      <li key={`${entry.time}-${entry.text}`}>
                        <time>{entry.time}</time>
                        <span>{entry.text}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="wn-note">
                    Moving a job, writing a slip, or stamping an invoice is noted here with the
                    time it happened.
                  </p>
                )}
              </section>
            </div>
          </section>
        ) : null}

        {activeView === "invoices" ? (
          <section className="wn-view" aria-labelledby="wn-invoices-title">
            <div className="wn-viewhead">
              <p className="wn-kicker">Payments · {dateLabel}</p>
              <h1 id="wn-invoices-title">The payment book</h1>
              <p className="wn-lede">
                {countLabel(invoices.length, "invoice")} on file, {overdueCount} overdue. The
                outstanding line is summed from the sent and overdue rows — marking one paid
                stamps it and recomputes the line.
              </p>
            </div>

            <div className="wn-receipt" data-tour="wn-invoices">
              <header className="wn-receipt-head">
                <p className="wn-outstanding">
                  <span>Outstanding</span> <strong>{rs(outstanding)}</strong>
                  <small>sent and overdue</small>
                </p>
                <p className="wn-receipt-count">
                  {countLabel(invoices.length, "invoice")} ·{" "}
                  {countLabel(
                    invoices.filter((invoice) => invoice.status === "paid").length,
                    "paid invoice"
                  )}
                </p>
              </header>

              <div className="wn-tablewrap">
                <table className="wn-invtable">
                  <caption className="wn-sr">
                    Invoices with client, amount, status, and due date
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Invoice</th>
                      <th scope="col">Client</th>
                      <th scope="col" className="wn-num">
                        Amount
                      </th>
                      <th scope="col">Status</th>
                      <th scope="col">Due</th>
                      <th scope="col">
                        <span className="wn-sr">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <th scope="row" className="wn-inv-ref">
                          <span>{invoice.id}</span>
                          <small>{invoice.issued}</small>
                        </th>
                        <td className="wn-inv-client">{invoice.client}</td>
                        <td className="wn-num wn-inv-amount">{rs(invoice.amount)}</td>
                        <td>
                          <span className={`wn-stamp wn-stamp-${invoice.status}`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className={`wn-inv-due wn-due-${invoice.status}`}>{invoice.due}</td>
                        <td className="wn-inv-action">
                          {invoice.status !== "paid" ? (
                            <button
                              type="button"
                              className="wn-stampbtn"
                              onClick={() => markPaid(invoice.id)}
                            >
                              Mark paid
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row" colSpan={2}>
                        Outstanding in the book
                      </th>
                      <td className="wn-num wn-inv-amount">{rs(outstanding)}</td>
                      <td colSpan={3} />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <form className="wn-docketform wn-docketform-wide" onSubmit={addInvoice} noValidate>
              <header className="wn-docket-head">
                <h2>Write an invoice</h2>
                <span>Draft only — nothing is sent</span>
              </header>
              <div className="wn-docket-body">
                <div className="wn-field-row wn-field-row-invoice">
                  <label className="wn-field">
                    <span className="wn-label">Client</span>
                    <input
                      value={invoiceForm.client}
                      onChange={(event) => {
                        setInvoiceForm((current) => ({
                          ...current,
                          client: event.target.value,
                        }));
                        setInvoiceError("");
                      }}
                      placeholder="e.g. Shanti Tole Apartments"
                      autoComplete="off"
                    />
                  </label>
                  <label className="wn-field">
                    <span className="wn-label">Amount (Rs.)</span>
                    <input
                      inputMode="numeric"
                      value={invoiceForm.amount}
                      onChange={(event) => {
                        setInvoiceForm((current) => ({
                          ...current,
                          amount: event.target.value,
                        }));
                        setInvoiceError("");
                      }}
                      placeholder="e.g. 25000"
                      autoComplete="off"
                    />
                  </label>
                </div>

                {invoiceError ? (
                  <p className="wn-error" role="alert">
                    {invoiceError}
                  </p>
                ) : null}

                <div className="wn-formfoot">
                  <button type="submit" className="wn-primary">
                    Stamp as draft
                  </button>
                  <span className="wn-formnote">
                    A production build generates and sends the document.
                  </span>
                </div>
              </div>
            </form>
          </section>
        ) : null}

        {activeView === "team" ? (
          <section className="wn-view" aria-labelledby="wn-crew-title">
            <div className="wn-viewhead">
              <p className="wn-kicker">Crew</p>
              <h1 id="wn-crew-title">The crew sheet</h1>
              <p className="wn-lede">
                Open and closed counts come from the dispatch book you just edited. The next job
                column is the first open slip on each person’s list.
              </p>
            </div>

            <div className="wn-crew" data-tour="wn-team">
              <div className="wn-tablewrap">
                <table className="wn-crewtable">
                  <caption className="wn-sr">
                    Crew members with role, open jobs, closed jobs, and next job
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Crew</th>
                      <th scope="col">Role</th>
                      <th scope="col" className="wn-num">
                        Open
                      </th>
                      <th scope="col" className="wn-num">
                        Closed
                      </th>
                      <th scope="col">Next job</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamRows.map(({ member, open, done, next }) => (
                      <tr key={member.id}>
                        <th scope="row" className="wn-crew-name">
                          <span className="wn-crew-mark" aria-hidden="true">
                            {initials(member.name)}
                          </span>
                          {member.name}
                        </th>
                        <td className="wn-crew-role">{member.role}</td>
                        <td className="wn-num wn-crew-count">{open}</td>
                        <td className="wn-num wn-crew-count">{done}</td>
                        <td className="wn-crew-next">
                          {next ? (
                            <>
                              <span className="wn-job-ref">{next.ref}</span>
                              {next.title}
                            </>
                          ) : (
                            <span className="wn-muted">Nothing open</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="wn-note wn-note-strong">
              Hand a job to someone with room: move a slip on the dispatch board and these counts
              follow.
            </p>
          </section>
        ) : null}

        <p className="wn-foot">
          {WORKNEST_BUSINESS.name} is a fictional contractor. Sample jobs, crew, and invoices;
          this session is not saved anywhere.
        </p>
      </div>
    </div>
  );
}
