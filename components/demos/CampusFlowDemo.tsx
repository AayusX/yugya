"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  CAMPUSFLOW_CLASSES,
  CAMPUSFLOW_INITIAL_ATTENDANCE,
  CAMPUSFLOW_MARK_OPTIONS,
  CAMPUSFLOW_NOTICES,
  CAMPUSFLOW_SCHOOL,
  CAMPUSFLOW_STUDENTS,
  type CampusFlowMark,
  type CampusFlowNotice,
  type CampusFlowView,
} from "@/lib/demos/campusflow";
import { useDemoWindow } from "./demo-shared";

const VIEWS: Array<{ id: CampusFlowView; label: string }> = [
  { id: "dashboard", label: "Day sheet" },
  { id: "students", label: "Roster" },
  { id: "attendance", label: "Register" },
  { id: "notices", label: "Notices" },
];

const AUDIENCES = ["All families", ...CAMPUSFLOW_CLASSES.map((cfClass) => cfClass.label)];

const PRIORITY_LABEL: Record<CampusFlowNotice["priority"], string> = {
  info: "Info",
  important: "Important",
  urgent: "Urgent",
};

const MARK_LABEL: Record<CampusFlowMark, string> = {
  P: "Present",
  A: "Absent",
  L: "Late",
};

const SAVED_AT: Record<string, string> = { "cf-g5": "08:40" };

type Attendance = Record<string, Record<string, CampusFlowMark>>;

type NoticeDraft = {
  title: string;
  body: string;
  priority: CampusFlowNotice["priority"];
  audience: string;
};

const EMPTY_NOTICE: NoticeDraft = {
  title: "",
  body: "",
  priority: "info",
  audience: AUDIENCES[0],
};

function classLabel(classId: string): string {
  return CAMPUSFLOW_CLASSES.find((cfClass) => cfClass.id === classId)?.label ?? classId;
}

function strengthOf(classId: string): number {
  return CAMPUSFLOW_STUDENTS.filter((student) => student.classId === classId).length;
}

function defaultDraft(classId: string, attendance: Attendance): Record<string, CampusFlowMark> {
  const saved = attendance[classId];
  if (saved) return { ...saved };
  const draft: Record<string, CampusFlowMark> = {};
  CAMPUSFLOW_STUDENTS.filter((student) => student.classId === classId).forEach((student) => {
    draft[student.id] = "P";
  });
  return draft;
}

function tally(marks: Record<string, CampusFlowMark> | undefined) {
  const counts = { P: 0, A: 0, L: 0 };
  if (marks) Object.values(marks).forEach((mark) => { counts[mark] += 1; });
  return counts;
}

function activityStamp(): string {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function CampusFlowDemo() {
  const { activeView, setView } = useDemoWindow();
  const [attendance, setAttendance] = useState<Attendance>(CAMPUSFLOW_INITIAL_ATTENDANCE);
  const [savedAt, setSavedAt] = useState<Record<string, string>>(SAVED_AT);
  const [selectedClass, setSelectedClass] = useState(CAMPUSFLOW_CLASSES[0].id);
  const [draft, setDraft] = useState<Record<string, CampusFlowMark>>(() =>
    defaultDraft(CAMPUSFLOW_CLASSES[0].id, CAMPUSFLOW_INITIAL_ATTENDANCE)
  );
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [notices, setNotices] = useState<CampusFlowNotice[]>(CAMPUSFLOW_NOTICES);
  const [noticeDraft, setNoticeDraft] = useState<NoticeDraft>(EMPTY_NOTICE);
  const [noticeError, setNoticeError] = useState("");
  const [activity, setActivity] = useState<Array<{ time: string; text: string }>>([]);
  // Mounted only inside the demo overlay, so this never renders on the server.
  const [today] = useState(() => new Date());

  const dayName = today.toLocaleDateString("en-GB", { weekday: "long" });
  const dateLabel = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const classStudents = useMemo(
    () => CAMPUSFLOW_STUDENTS.filter((student) => student.classId === selectedClass),
    [selectedClass]
  );

  const roster = useMemo(() => {
    const query = search.trim().toLowerCase();
    return CAMPUSFLOW_STUDENTS.filter((student) => {
      if (classFilter !== "all" && student.classId !== classFilter) return false;
      if (!query) return true;
      return (
        student.name.toLowerCase().includes(query) ||
        student.guardian.toLowerCase().includes(query)
      );
    }).map((student) => ({
      student,
      mark: attendance[student.classId]?.[student.id] ?? null,
    }));
  }, [search, classFilter, attendance]);

  const overall = useMemo(() => {
    let present = 0;
    let recorded = 0;
    Object.values(attendance).forEach((marks) => {
      Object.values(marks).forEach((mark) => {
        recorded += 1;
        if (mark === "P") present += 1;
      });
    });
    return { present, recorded, rate: recorded === 0 ? 0 : Math.round((present / recorded) * 100) };
  }, [attendance]);

  const recordedClasses = useMemo(
    () => CAMPUSFLOW_CLASSES.filter((cfClass) => attendance[cfClass.id]).length,
    [attendance]
  );

  const draftSummary = useMemo(() => tally(draft), [draft]);

  const draftIsSaved = useMemo(() => {
    const saved = attendance[selectedClass];
    return !!saved && JSON.stringify(draft) === JSON.stringify(saved);
  }, [attendance, draft, selectedClass]);

  const selectedMeta = CAMPUSFLOW_CLASSES.find((cfClass) => cfClass.id === selectedClass);
  const latestNotice = notices[0];

  const openRegister = (classId: string) => {
    setSelectedClass(classId);
    setDraft(defaultDraft(classId, attendance));
    setView("attendance");
  };

  const selectClass = (classId: string) => {
    setSelectedClass(classId);
    setDraft(defaultDraft(classId, attendance));
  };

  const setMark = (studentId: string, mark: CampusFlowMark) => {
    setDraft((current) => ({ ...current, [studentId]: mark }));
  };

  const markAllPresent = () => {
    setDraft((current) => {
      const next: Record<string, CampusFlowMark> = { ...current };
      classStudents.forEach((student) => { next[student.id] = "P"; });
      return next;
    });
  };

  const saveAttendance = () => {
    const time = activityStamp();
    setAttendance((current) => ({ ...current, [selectedClass]: { ...draft } }));
    setSavedAt((current) => ({ ...current, [selectedClass]: time }));
    setActivity((current) => [
      {
        time,
        text: `Register saved for ${classLabel(selectedClass)} — ${draftSummary.P} present, ${draftSummary.A} absent, ${draftSummary.L} late.`,
      },
      ...current,
    ]);
  };

  const setNoticeField = <K extends keyof NoticeDraft>(field: K, value: NoticeDraft[K]) => {
    setNoticeDraft((current) => ({ ...current, [field]: value }));
  };

  const postNotice = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = noticeDraft.title.trim();
    if (title.length < 3) {
      setNoticeError("Give the notice a title of at least three characters.");
      return;
    }
    if (noticeDraft.body.trim().length < 10) {
      setNoticeError("Give the notice a body of at least one full line.");
      return;
    }
    const notice: CampusFlowNotice = {
      id: `cf-n${Date.now()}`,
      title,
      body: noticeDraft.body.trim(),
      priority: noticeDraft.priority,
      audience: noticeDraft.audience,
      date: "Today",
      author: "Office (demo session)",
    };
    setNotices((current) => [notice, ...current]);
    setNoticeDraft(EMPTY_NOTICE);
    setNoticeError("");
    setActivity((current) => [
      { time: activityStamp(), text: `Notice posted — “${title}” to ${notice.audience}.` },
      ...current,
    ]);
  };

  return (
    <div className="cf-shell">
      <aside className="cf-rail">
        <div className="cf-rail-inner">
          <div className="cf-brand">
            <span className="cf-monogram" aria-hidden="true">SA</span>
            <span className="cf-brand-text">
              <strong>{CAMPUSFLOW_SCHOOL.name}</strong>
              <small>{CAMPUSFLOW_SCHOOL.place}</small>
            </span>
          </div>

          <nav className="cf-nav" aria-label="CampusFlow sections">
            {VIEWS.map((view) => (
              <button
                key={view.id}
                type="button"
                className="cf-nav-btn"
                aria-current={activeView === view.id ? "page" : undefined}
                onClick={() => setView(view.id)}
              >
                <span>{view.label}</span>
                <small>
                  {view.id === "students"
                    ? CAMPUSFLOW_STUDENTS.length
                    : view.id === "attendance"
                      ? `${recordedClasses}/${CAMPUSFLOW_CLASSES.length}`
                      : view.id === "notices"
                        ? notices.length
                        : dayName.slice(0, 3)}
                </small>
              </button>
            ))}
          </nav>

          <div className="cf-rail-foot">
            <p className="cf-term">
              {CAMPUSFLOW_SCHOOL.term}
              <strong>{CAMPUSFLOW_SCHOOL.year}</strong>
            </p>
            <p className="cf-rail-note">
              Sample records for a fictional school. This session is not saved anywhere.
            </p>
          </div>
        </div>
      </aside>

      <div className="cf-workspace">
        <header className="cf-topbar">
          <p className="cf-date">
            <span>{dayName}</span>
            <small>{dateLabel}</small>
          </p>
          <p className="cf-session">
            <span className="cf-dot" aria-hidden="true" />
            Office session
          </p>
        </header>

        <div className="cf-main">
          {activeView === "dashboard" ? (
            <section className="cf-view" aria-labelledby="cf-day-title">
              <div className="cf-viewhead">
                <p className="cf-kicker">Attendance · today</p>
                <h1 id="cf-day-title">The day sheet</h1>
                <p className="cf-viewlead">
                  {recordedClasses} of {CAMPUSFLOW_CLASSES.length} classes recorded ·{" "}
                  {overall.present} present of {overall.recorded} marked ·{" "}
                  {overall.rate}% attendance
                </p>
              </div>

              <div className="cf-daygrid">
                <div className="cf-sheet" data-tour="cf-register">
                  <table className="cf-ledger">
                    <caption>
                      Classes for {dayName}, {dateLabel}
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Class</th>
                        <th scope="col">Teacher</th>
                        <th scope="col">Room</th>
                        <th scope="col" className="cf-col-num">On roll</th>
                        <th scope="col">Register</th>
                        <th scope="col" className="cf-col-num">Present</th>
                        <th scope="col"><span className="cf-sr">Open</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {CAMPUSFLOW_CLASSES.map((cfClass) => {
                        const marks = attendance[cfClass.id];
                        const counts = tally(marks);
                        return (
                          <tr key={cfClass.id} className={marks ? undefined : "cf-row-open"}>
                            <th scope="row">{cfClass.label}</th>
                            <td>{cfClass.teacher}</td>
                            <td>{cfClass.room}</td>
                            <td className="cf-col-num cf-num">{strengthOf(cfClass.id)}</td>
                            <td>
                              {marks ? (
                                <span className="cf-status cf-status-done">
                                  Saved{savedAt[cfClass.id] ? ` ${savedAt[cfClass.id]}` : ""}
                                </span>
                              ) : (
                                <span className="cf-status">Not recorded</span>
                              )}
                            </td>
                            <td className="cf-col-num cf-num">
                              {marks ? `${counts.P}/${strengthOf(cfClass.id)}` : "—"}
                            </td>
                            <td className="cf-col-action">
                              <button
                                type="button"
                                className="cf-inline-action"
                                onClick={() => openRegister(cfClass.id)}
                              >
                                {marks ? "Review" : "Record"}
                                <span aria-hidden="true"> →</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <p className="cf-sheet-note">
                    Present counts and the attendance figure are computed from saved
                    registers. Opening a class does not change it.
                  </p>
                </div>

                <div className="cf-side">
                  <section className="cf-sideblock" aria-labelledby="cf-board-title">
                    <h2 id="cf-board-title">On the board</h2>
                    <p className="cf-side-title">{latestNotice.title}</p>
                    <p className="cf-side-meta">
                      {PRIORITY_LABEL[latestNotice.priority]} · {latestNotice.audience} ·{" "}
                      {latestNotice.date}
                    </p>
                    <button type="button" className="cf-textlink" onClick={() => setView("notices")}>
                      All notices <span aria-hidden="true">→</span>
                    </button>
                  </section>

                  <section className="cf-sideblock" aria-labelledby="cf-log-title">
                    <h2 id="cf-log-title">This session</h2>
                    {activity.length > 0 ? (
                      <ol className="cf-log">
                        {activity.slice(0, 6).map((entry) => (
                          <li key={`${entry.time}-${entry.text}`}>
                            <time>{entry.time}</time>
                            <span>{entry.text}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="cf-side-empty">
                        Saving a register or posting a notice is written here with the time
                        it happened.
                      </p>
                    )}
                  </section>
                </div>
              </div>
            </section>
          ) : null}

          {activeView === "students" ? (
            <section className="cf-view" aria-labelledby="cf-roster-title">
              <div className="cf-viewhead">
                <p className="cf-kicker">Records</p>
                <h1 id="cf-roster-title">Student roster</h1>
                <p className="cf-viewlead">
                  {CAMPUSFLOW_STUDENTS.length} students across {CAMPUSFLOW_CLASSES.length} classes
                  · one guardian number on file per student
                </p>
              </div>

              <div className="cf-roster" data-tour="cf-roster">
                <div className="cf-toolbar">
                  <label className="cf-search">
                    <span className="cf-label">Search</span>
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Student or guardian name"
                      autoComplete="off"
                    />
                  </label>
                  <label className="cf-selectfield">
                    <span className="cf-label">Class</span>
                    <select
                      value={classFilter}
                      onChange={(event) => setClassFilter(event.target.value)}
                    >
                      <option value="all">All classes</option>
                      {CAMPUSFLOW_CLASSES.map((cfClass) => (
                        <option key={cfClass.id} value={cfClass.id}>
                          {cfClass.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <p className="cf-count">
                    {roster.length} of {CAMPUSFLOW_STUDENTS.length} shown
                  </p>
                </div>

                <div className="cf-tablewrap">
                  <table className="cf-table">
                    <caption className="cf-sr">
                      Students, guardians and today&apos;s attendance mark
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" className="cf-col-roll">Roll</th>
                        <th scope="col">Student</th>
                        <th scope="col">Class</th>
                        <th scope="col">Guardian</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Today</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roster.map(({ student, mark }) => (
                        <tr key={student.id}>
                          <td className="cf-col-roll cf-num">{student.roll}</td>
                          <th scope="row">{student.name}</th>
                          <td>{classLabel(student.classId)}</td>
                          <td>{student.guardian}</td>
                          <td className="cf-num cf-phone">{student.phone}</td>
                          <td>
                            {mark ? (
                              <span className={`cf-chip cf-chip-${mark}`}>{MARK_LABEL[mark]}</span>
                            ) : (
                              <span className="cf-dash" aria-label="Not recorded">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {roster.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="cf-empty-row">
                            No student or guardian matches “{search}”. Clear the search or choose
                            another class.
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>

                <p className="cf-footnote">
                  “Today” carries the mark from the class register once it is saved. Phone
                  numbers are masked in this sample.
                </p>
              </div>
            </section>
          ) : null}

          {activeView === "attendance" ? (
            <section className="cf-view" aria-labelledby="cf-register-title">
              <div className="cf-viewhead">
                <p className="cf-kicker">Register · {dayName}</p>
                <h1 id="cf-register-title">Daily attendance</h1>
                <p className="cf-viewlead">
                  One mark per student. Saving updates the day sheet, the roster and the
                  tally below.
                </p>
              </div>

              <div className="cf-classtabs" role="group" aria-label="Choose a class to record">
                {CAMPUSFLOW_CLASSES.map((cfClass) => (
                  <button
                    key={cfClass.id}
                    type="button"
                    className="cf-classtab"
                    aria-pressed={selectedClass === cfClass.id}
                    onClick={() => selectClass(cfClass.id)}
                  >
                    <span>{cfClass.label}</span>
                    <small>
                      {attendance[cfClass.id] ? "Recorded" : `${strengthOf(cfClass.id)} on roll`}
                    </small>
                  </button>
                ))}
              </div>

              <div className="cf-sheet cf-register" data-tour="cf-attendance-sheet">
                <div className="cf-register-head">
                  <div>
                    <p className="cf-register-class">{selectedMeta?.label}</p>
                    <p className="cf-register-meta">
                      {selectedMeta?.teacher} · {selectedMeta?.room} · {dayName}, {dateLabel}
                    </p>
                  </div>
                  <div className="cf-register-state">
                    {draftIsSaved ? (
                      <span className="cf-status cf-status-done">
                        Saved{savedAt[selectedClass] ? ` ${savedAt[selectedClass]}` : ""}
                      </span>
                    ) : (
                      <span className="cf-status">Unsaved changes</span>
                    )}
                  </div>
                </div>

                <div className="cf-register-tools">
                  <button type="button" className="cf-mini" onClick={markAllPresent}>
                    All present
                  </button>
                  <p className="cf-register-help">
                    Tap a mark to change it. Present, absent and late are counted in the footer.
                  </p>
                </div>

                <div className="cf-register-list">
                  <div className="cf-register-row cf-register-row-head" aria-hidden="true">
                    <span>Roll</span>
                    <span>Student</span>
                    <span>Mark</span>
                  </div>
                  {classStudents.map((student) => {
                    const mark = draft[student.id] ?? "P";
                    return (
                      <div
                        className={`cf-register-row cf-register-row-${mark.toLowerCase()}`}
                        key={student.id}
                      >
                        <span className="cf-roll cf-num">{student.roll}</span>
                        <span className="cf-student">
                          {student.name}
                          <small>
                            {student.guardian} · {student.phone}
                          </small>
                        </span>
                        <div
                          className="cf-marks"
                          role="group"
                          aria-label={`Attendance for ${student.name}`}
                        >
                          {CAMPUSFLOW_MARK_OPTIONS.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              className={`cf-mark cf-mark-${option.value.toLowerCase()}`}
                              aria-pressed={mark === option.value}
                              onClick={() => setMark(student.id, option.value)}
                            >
                              <span aria-hidden="true">{option.value}</span>
                              <span className="cf-sr">{option.label}</span>
                              <span className="cf-mark-word">{option.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="cf-register-foot">
                  <p
                    className="cf-tally"
                    role="status"
                    aria-label={`${draftSummary.P} present, ${draftSummary.A} absent, ${draftSummary.L} late, of ${classStudents.length} on roll`}
                  >
                    <span>
                      <strong>{draftSummary.P}</strong> present
                    </span>
                    <span>
                      <strong>{draftSummary.A}</strong> absent
                    </span>
                    <span>
                      <strong>{draftSummary.L}</strong> late
                    </span>
                    <span className="cf-tally-total">
                      of {classStudents.length} on roll
                    </span>
                  </p>
                  <button type="button" className="cf-primary" onClick={saveAttendance}>
                    Save register
                  </button>
                </div>
              </div>
            </section>
          ) : null}

          {activeView === "notices" ? (
            <section className="cf-view" aria-labelledby="cf-notices-title">
              <div className="cf-viewhead">
                <p className="cf-kicker">Notice board</p>
                <h1 id="cf-notices-title">Sent home and on file</h1>
                <p className="cf-viewlead">
                  Every notice keeps its audience, author, date and priority. New notices
                  appear at the top of the docket.
                </p>
              </div>

              <div className="cf-noticegrid">
                <ol className="cf-docket" data-tour="cf-notices">
                  {notices.map((notice) => (
                    <li
                      className={`cf-notice cf-notice-${notice.priority}`}
                      key={notice.id}
                    >
                      <div className="cf-notice-date">
                        <time>{notice.date}</time>
                        <small>{notice.audience}</small>
                      </div>
                      <div className="cf-notice-body">
                        <p className="cf-notice-flag">{PRIORITY_LABEL[notice.priority]} notice</p>
                        <h2>{notice.title}</h2>
                        <p>{notice.body}</p>
                        <p className="cf-notice-by">{notice.author}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <form
                  className="cf-compose"
                  onSubmit={postNotice}
                  noValidate
                  aria-labelledby="cf-compose-title"
                >
                  <h2 id="cf-compose-title">Write a notice</h2>
                  <label className="cf-field">
                    <span className="cf-label">Title</span>
                    <input
                      value={noticeDraft.title}
                      onChange={(event) => setNoticeField("title", event.target.value)}
                      placeholder="e.g. Sports day practice"
                      autoComplete="off"
                    />
                  </label>
                  <div className="cf-field-row">
                    <label className="cf-field">
                      <span className="cf-label">Audience</span>
                      <select
                        value={noticeDraft.audience}
                        onChange={(event) => setNoticeField("audience", event.target.value)}
                      >
                        {AUDIENCES.map((audience) => (
                          <option key={audience} value={audience}>
                            {audience}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="cf-field">
                      <span className="cf-label">Priority</span>
                      <select
                        value={noticeDraft.priority}
                        onChange={(event) =>
                          setNoticeField(
                            "priority",
                            event.target.value as CampusFlowNotice["priority"]
                          )
                        }
                      >
                        <option value="info">Info</option>
                        <option value="important">Important</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </label>
                  </div>
                  <label className="cf-field">
                    <span className="cf-label">Notice</span>
                    <textarea
                      value={noticeDraft.body}
                      onChange={(event) => setNoticeField("body", event.target.value)}
                      placeholder="What families need to know…"
                    />
                  </label>
                  {noticeError ? (
                    <p className="cf-error" role="alert">
                      {noticeError}
                    </p>
                  ) : null}
                  <div className="cf-compose-foot">
                    <button type="submit" className="cf-primary">
                      Post to the board
                    </button>
                    <span className="cf-sim">Kept in this browser only</span>
                  </div>
                </form>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
