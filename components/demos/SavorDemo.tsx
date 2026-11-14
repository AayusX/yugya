"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  SAVOR_ADDRESS,
  SAVOR_COURSES,
  SAVOR_CREDITS,
  SAVOR_HOURS,
  SAVOR_MENU,
  SAVOR_PARTY_SIZES,
  SAVOR_PHONE,
  SAVOR_PHOTOS,
  SAVOR_RESERVATIONS,
  SAVOR_SERVICE,
  SAVOR_SIGNATURES,
  SAVOR_TIME_SLOTS,
  type SavorCourse,
  type SavorReservation,
  type SavorView,
} from "@/lib/demos/savor";
import { useDemoWindow } from "./demo-shared";

const VIEWS: Array<{ id: SavorView; label: string }> = [
  { id: "home", label: "Home" },
  { id: "menu", label: "Menu" },
  { id: "reserve", label: "Reserve" },
  { id: "visit", label: "Visit" },
];

const SIGNATURE_DISHES = SAVOR_SIGNATURES.map((signature) => {
  const dish = SAVOR_MENU.find((item) => item.id === signature.dishId);
  if (!dish) {
    throw new Error(`Unknown Savor signature dish: ${signature.dishId}`);
  }
  return { ...signature, dish };
});

const COURSE_COUNTS = new Map<SavorCourse, number>(
  SAVOR_COURSES.map((course) => [
    course,
    SAVOR_MENU.filter((dish) => dish.course === course).length,
  ])
);

const TEL_HREF = `tel:${SAVOR_PHONE.replace(/[^+\d]/g, "")}`;

const DIRECTIONS =
  "From Traffic Chowk, take the road towards Milanchowk. Savor is on the left after the second set of shops, set back behind a low courtyard wall.";

type RequestForm = {
  name: string;
  phone: string;
  party: string;
  time: string;
  note: string;
};

const EMPTY_FORM: RequestForm = {
  name: "",
  phone: "",
  party: "2",
  time: "19:00",
  note: "",
};

const PHONE_PATTERN = /^\+?[0-9][0-9\s-]{6,}$/;

function formatPrice(price: number): string {
  return `Rs. ${price}`;
}

export default function SavorDemo() {
  const { activeView, setView } = useDemoWindow();
  const [course, setCourse] = useState<SavorCourse | "All">("All");
  const [reservations, setReservations] = useState<SavorReservation[]>(SAVOR_RESERVATIONS);
  const [dayOffset, setDayOffset] = useState(0);
  const [form, setForm] = useState<RequestForm>(EMPTY_FORM);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<{
    ref: string;
    name: string;
    party: number;
    time: string;
    day: string;
    date: string;
  } | null>(null);
  // Captured once when the demo mounts. The overlay only mounts in the
  // browser, so there is no server render to disagree with.
  const [today] = useState(() => new Date());

  const days = useMemo(
    () =>
      Array.from({ length: 7 }, (_, offset) => {
        const date = new Date(today);
        date.setDate(today.getDate() + offset);
        const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });
        const month = date.toLocaleDateString("en-GB", { month: "short" });
        return {
          offset,
          name: offset === 0 ? "Tonight" : offset === 1 ? "Tomorrow" : weekday,
          weekday,
          day: date.getDate(),
          month,
          dateLabel: `${weekday} ${date.getDate()} ${month}`,
        };
      }),
    [today]
  );

  const selectedDay = days[dayOffset];
  const bookings = reservations.filter((booking) => booking.dayOffset === dayOffset);
  const guestCount = bookings.reduce((total, booking) => total + booking.party, 0);
  const dinnerCount = bookings.filter((booking) => Number(booking.time.slice(0, 2)) >= 17).length;

  const menuGroups = useMemo(() => {
    const courses = course === "All" ? SAVOR_COURSES : [course];
    return courses.map((entry) => ({
      course: entry,
      dishes: SAVOR_MENU.filter((dish) => dish.course === entry),
    }));
  }, [course]);

  const setField = (field: keyof RequestForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.name.trim();
    if (name.length < 2) {
      setError("Please give the name the table should be held under.");
      return;
    }
    if (!PHONE_PATTERN.test(form.phone.trim())) {
      setError("Please give a phone number the host can confirm with, for example +977-98XXXXXXXX.");
      return;
    }
    if (!SAVOR_TIME_SLOTS.includes(form.time)) {
      setError("Please choose a seating time.");
      return;
    }

    const party = Number(form.party);
    if (!Number.isInteger(party) || party < 1) {
      setError("Please choose the number of guests.");
      return;
    }

    const lastNumber = reservations.reduce(
      (max, booking) => Math.max(max, Number(booking.id.slice(4))),
      2479
    );
    const ref = `SVR-${lastNumber + 1}`;

    setReservations((current) => [
      ...current,
      { id: ref, name, party, time: form.time, note: form.note.trim(), dayOffset },
    ]);
    setConfirmed({
      ref,
      name,
      party,
      time: form.time,
      day: selectedDay.name,
      date: selectedDay.dateLabel,
    });
    setForm(EMPTY_FORM);
    setError("");
  };

  return (
    <div className="sv-app">
      <header className="sv-appbar">
        <div className="sv-appbar-inner">
          <button
            type="button"
            className="sv-brand"
            onClick={() => setView("home")}
            aria-label="Savor — go to the home page"
          >
            <span className="sv-wordmark">Savor</span>
            <span className="sv-brand-sub">Nepali kitchen · Butwal</span>
          </button>

          <nav className="sv-nav" aria-label="Savor sections">
            {VIEWS.map((view) => (
              <button
                key={view.id}
                type="button"
                aria-current={activeView === view.id ? "true" : undefined}
                onClick={() => setView(view.id)}
              >
                {view.label}
              </button>
            ))}
          </nav>

          <div className="sv-appbar-side">
            <span className="sv-today">
              <span className="sv-today-dot" aria-hidden="true" />
              Today · 11:00–22:00
            </span>
            <button
              type="button"
              className="sv-btn sv-btn-solid sv-btn-small"
              onClick={() => setView("reserve")}
            >
              Book a table
            </button>
          </div>
        </div>
      </header>

      {activeView === "home" ? (
        <div className="sv-page">
          <section className="sv-hero" aria-labelledby="sv-home-title">
            <div className="sv-hero-copy">
              <p className="sv-eyebrow">Butwal, Rupandehi · Nepali kitchen</p>
              <h1 id="sv-home-title">
                A Nepali kitchen{" "}
                <br />
                in the old bazaar.
              </h1>
              <p className="sv-hero-lead">
                Sekuwa, momo and slow-cooked curries near Traffic Chowk. Lunch from
                eleven; dinner until ten.
              </p>
              <div className="sv-actions">
                <button
                  type="button"
                  className="sv-btn sv-btn-solid"
                  onClick={() => setView("reserve")}
                >
                  Book a table
                </button>
                <button
                  type="button"
                  className="sv-btn sv-btn-quiet"
                  onClick={() => setView("menu")}
                >
                  Read the menu <span aria-hidden="true">→</span>
                </button>
              </div>
              <p className="sv-hero-fine">
                Walk-ins welcome ·{" "}
                <a href={TEL_HREF}>{SAVOR_PHONE}</a>
              </p>
            </div>

            <figure className="sv-hero-media">
              <img
                src="/assets/demos/savor/hero-sekuwa-set.jpg"
                alt="A sekuwa platter with beaten rice and tomato achar on a dark table"
                width={1280}
                height={1707}
              />
              <figcaption>From the grill · sekuwa with beaten rice</figcaption>
            </figure>
          </section>

          <dl className="sv-strip" aria-label="Restaurant details">
            <div>
              <dt>Open today</dt>
              <dd>11:00 – 22:00</dd>
            </div>
            <div>
              <dt>Find us</dt>
              <dd>{SAVOR_ADDRESS}</dd>
            </div>
            <div>
              <dt>Call</dt>
              <dd>
                <a href={TEL_HREF}>{SAVOR_PHONE}</a>
              </dd>
            </div>
          </dl>

          <section className="sv-section" aria-labelledby="sv-signatures-title">
            <div className="sv-section-head">
              <p className="sv-eyebrow">From the kitchen</p>
              <h2 id="sv-signatures-title">Three plates to start with.</h2>
              <p className="sv-section-lead">
                The menu follows the market and the season. These are the plates that
                stay on it.
              </p>
            </div>

            <div className="sv-signatures">
              {SIGNATURE_DISHES.map(({ dish, image, alt, note }) => (
                <article className="sv-signature" key={dish.id}>
                  <img src={image} alt={alt} loading="lazy" width={1280} height={1707} />
                  <div className="sv-signature-head">
                    <h3>{dish.name}</h3>
                    <p>{formatPrice(dish.price)}</p>
                  </div>
                  <p className="sv-signature-desc">{dish.desc}</p>
                  <p className="sv-signature-note">{note}</p>
                </article>
              ))}
            </div>

            <button type="button" className="sv-textlink" onClick={() => setView("menu")}>
              See the full menu <span aria-hidden="true">→</span>
            </button>
          </section>

          <section className="sv-room" aria-labelledby="sv-room-title">
            <figure className="sv-room-media">
              <img
                src="/assets/demos/savor/room.jpg"
                alt="A warmly lit dining room with wooden tables and low pendant lights"
                loading="lazy"
                width={1280}
                height={964}
              />
            </figure>
            <div className="sv-room-copy">
              <p className="sv-eyebrow">The room</p>
              <h2 id="sv-room-title">Small tables in front, longer tables at the back.</h2>
              <p>
                The front room is for two or four; the back room takes the longer
                tables. In the evening the charcoal grill is lit at the pass, and the
                smell reaches the street before the plates do.
              </p>
              <button
                type="button"
                className="sv-btn sv-btn-quiet"
                onClick={() => setView("visit")}
              >
                The room and directions <span aria-hidden="true">→</span>
              </button>
            </div>
          </section>

          <section className="sv-band" aria-labelledby="sv-band-title">
            <div>
              <p className="sv-eyebrow sv-eyebrow-inverse">Reservations</p>
              <h2 id="sv-band-title">A table for tonight.</h2>
              <p>
                Tell us the time and the party; the host confirms by phone during
                service. Requests are open at any hour.
              </p>
              <button
                type="button"
                className="sv-btn sv-btn-solid"
                onClick={() => setView("reserve")}
              >
                Request a table
              </button>
            </div>
            <dl className="sv-band-facts">
              <div>
                <dt>Today</dt>
                <dd>{days[0].dateLabel}</dd>
              </div>
              <div>
                <dt>Kitchen</dt>
                <dd>12:00 – 14:30 · 17:30 – 21:30</dd>
              </div>
              <div>
                <dt>House</dt>
                <dd>
                  {SAVOR_ADDRESS}
                  <br />
                  <a href={TEL_HREF}>{SAVOR_PHONE}</a>
                </dd>
              </div>
            </dl>
          </section>
        </div>
      ) : null}

      {activeView === "menu" ? (
        <div className="sv-page">
          <header className="sv-pagehead">
            <p className="sv-eyebrow">Menu</p>
            <h1>What is cooking.</h1>
            <p>
              The kitchen takes orders 12:00 – 14:30 and 17:30 – 21:30. Prices are in
              rupees and include everything.
            </p>
          </header>

          <div className="sv-menu-layout">
            <div className="sv-menu-main">
              <div
                className="sv-filters"
                role="group"
                aria-label="Filter the menu by course"
                data-tour="sv-menu"
              >
                <button
                  type="button"
                  className="sv-filter"
                  aria-pressed={course === "All"}
                  onClick={() => setCourse("All")}
                >
                  All <span>{SAVOR_MENU.length}</span>
                </button>
                {SAVOR_COURSES.map((entry) => (
                  <button
                    key={entry}
                    type="button"
                    className="sv-filter"
                    aria-pressed={course === entry}
                    onClick={() => setCourse(entry)}
                  >
                    {entry} <span>{COURSE_COUNTS.get(entry) ?? 0}</span>
                  </button>
                ))}
              </div>

              <div className="sv-menu-groups">
                {menuGroups.map((group) => (
                  <section
                    className="sv-course"
                    key={group.course}
                    aria-labelledby={`sv-course-${group.course.replace(/[^a-z0-9]+/gi, "-")}`}
                  >
                    <div className="sv-course-head">
                      <h2 id={`sv-course-${group.course.replace(/[^a-z0-9]+/gi, "-")}`}>
                        {group.course}
                      </h2>
                      <span>
                        {group.dishes.length} {group.dishes.length === 1 ? "plate" : "plates"}
                      </span>
                    </div>
                    <ul className="sv-menu">
                      {group.dishes.map((dish) => (
                        <li className="sv-dish" key={dish.id}>
                          <div className="sv-dish-line">
                            <span className="sv-dish-name">{dish.name}</span>
                            {dish.veg ? (
                              <abbr className="sv-mark" title="Vegetarian">
                                V
                              </abbr>
                            ) : null}
                            {dish.spicy ? (
                              <abbr className="sv-mark sv-mark-hot" title="Spicy">
                                S
                              </abbr>
                            ) : null}
                            <span className="sv-dish-dots" aria-hidden="true" />
                            <span className="sv-dish-price">{formatPrice(dish.price)}</span>
                          </div>
                          <p className="sv-dish-desc">{dish.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              <p className="sv-menu-note">
                <strong>V</strong> vegetarian · <strong>S</strong> spicy. Tell the host
                about allergies before ordering; the kitchen will tell you what can be
                adjusted. This is a sample menu for a demonstration restaurant.
              </p>
            </div>

            <aside className="sv-menu-aside">
              <p className="sv-eyebrow">Today</p>
              <p className="sv-aside-lead">
                The grill is lit from five. The thali is served until the daal runs
                out.
              </p>
              <dl className="sv-hours">
                {SAVOR_HOURS.map(([label, hours]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{hours}</dd>
                  </div>
                ))}
              </dl>
              <p className="sv-aside-note">Kitchen closes 30 minutes before the room.</p>
              <button
                type="button"
                className="sv-btn sv-btn-solid"
                onClick={() => setView("reserve")}
              >
                Book a table
              </button>
            </aside>
          </div>
        </div>
      ) : null}

      {activeView === "reserve" ? (
        <div className="sv-page">
          <header className="sv-pagehead">
            <p className="sv-eyebrow">Reservations</p>
            <h1>Book a table.</h1>
            <p>
              Requests are open at any hour. The host replies by phone during service,
              and the list below is what the floor works from.
            </p>
          </header>

          <div className="sv-reserve-layout">
            <div className="sv-reserve-main">
              <form
                className="sv-form"
                data-tour="sv-reserve-form"
                onSubmit={submitRequest}
                noValidate
              >
                <fieldset className="sv-fieldset">
                  <legend className="sv-legend">Day</legend>
                  <div className="sv-days">
                    {days.map((day) => (
                      <button
                        key={day.offset}
                        type="button"
                        className="sv-day"
                        aria-pressed={dayOffset === day.offset}
                        onClick={() => setDayOffset(day.offset)}
                      >
                        <span>{day.name}</span>
                        <small>
                          {day.day} {day.month}
                        </small>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="sv-form-row">
                  <label className="sv-field">
                    <span>Name for the table</span>
                    <input
                      className="sv-input"
                      value={form.name}
                      onChange={(event) => setField("name", event.target.value)}
                      autoComplete="off"
                    />
                  </label>
                  <label className="sv-field">
                    <span>Phone for confirmation</span>
                    <input
                      className="sv-input"
                      value={form.phone}
                      onChange={(event) => setField("phone", event.target.value)}
                      placeholder="+977-98XXXXXXXX"
                      inputMode="tel"
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="sv-party-time">
                  <label className="sv-field sv-party">
                    <span>Guests</span>
                    <select
                      className="sv-select"
                      value={form.party}
                      onChange={(event) => setField("party", event.target.value)}
                    >
                      {SAVOR_PARTY_SIZES.map((size) => (
                        <option key={size} value={String(size)}>
                          {size} {size === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="sv-field">
                    <p className="sv-legend">Seating time</p>
                    <div className="sv-service-times">
                      {SAVOR_SERVICE.map((service) => (
                        <div className="sv-service" key={service.name}>
                          <p className="sv-service-name">{service.name}</p>
                          <div
                            className="sv-times"
                            role="group"
                            aria-label={`${service.name} seating times`}
                          >
                            {service.times.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                className="sv-time"
                                aria-pressed={form.time === slot}
                                onClick={() => setField("time", slot)}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <label className="sv-field">
                  <span>Anything the host should know (optional)</span>
                  <textarea
                    className="sv-textarea"
                    value={form.note}
                    onChange={(event) => setField("note", event.target.value)}
                    placeholder="Window table, birthday, allergies …"
                  />
                </label>

                <p className="sv-summary">
                  <span>
                    Table for <strong>{form.party}</strong> · {selectedDay.name},{" "}
                    {selectedDay.dateLabel} · <strong>{form.time}</strong>
                  </span>
                  <span className="sv-summary-kind">Request, not a confirmation</span>
                </p>

                {error ? (
                  <p className="sv-error" role="alert">
                    {error}
                  </p>
                ) : null}

                <div className="sv-submit-row" data-tour="sv-submit">
                  <button type="submit" className="sv-btn sv-btn-solid">
                    Request the table
                  </button>
                  <span className="sv-sim">Confirmation is simulated in this demo</span>
                </div>
              </form>

              {confirmed ? (
                <div className="sv-confirmation" role="status">
                  <p className="sv-eyebrow">Request received · simulated</p>
                  <h2>{confirmed.name}, the request is on the list.</h2>
                  <p>
                    {confirmed.party} {confirmed.party === 1 ? "guest" : "guests"} ·{" "}
                    {confirmed.day}, {confirmed.date} · {confirmed.time}
                  </p>
                  <p className="sv-ref">Reference {confirmed.ref}</p>
                  <p className="sv-fine">
                    No message is sent from this demo. A production build would pass
                    the request to the channel the restaurant already checks, and the
                    host would confirm from there.
                  </p>
                </div>
              ) : null}

              <p className="sv-fine sv-reserve-fine">
                For parties larger than eight, call the restaurant on{" "}
                <a href={TEL_HREF}>{SAVOR_PHONE}</a>. Tables are held for a short
                window past the requested time.
              </p>
            </div>

            <aside className="sv-host" data-tour="sv-host" aria-labelledby="sv-host-title">
              <div className="sv-host-head">
                <p className="sv-eyebrow">Host stand</p>
                <h2 id="sv-host-title">{selectedDay.name}</h2>
                <p className="sv-host-date">{selectedDay.dateLabel}</p>
              </div>

              <dl className="sv-host-totals">
                <div>
                  <dt>Requests</dt>
                  <dd>{bookings.length}</dd>
                </div>
                <div>
                  <dt>Guests</dt>
                  <dd>{guestCount}</dd>
                </div>
                <div>
                  <dt>Dinner</dt>
                  <dd>{dinnerCount}</dd>
                </div>
              </dl>

              <ul className="sv-host-list">
                {bookings.map((booking) => (
                  <li key={booking.id}>
                    <span className="sv-host-time">{booking.time}</span>
                    <span className="sv-host-body">
                      <strong>{booking.name}</strong>
                      <small>
                        Party of {booking.party} · {booking.id}
                      </small>
                      {booking.note ? <em>{booking.note}</em> : null}
                    </span>
                  </li>
                ))}
                {bookings.length === 0 ? (
                  <li className="sv-host-empty">
                    No requests for this day yet. Send one from the form.
                  </li>
                ) : null}
              </ul>

              <p className="sv-host-note">
                The list the floor reviews during service. Totals are counted from the
                requests shown, not typed in.
              </p>
            </aside>
          </div>
        </div>
      ) : null}

      {activeView === "visit" ? (
        <div className="sv-page">
          <header className="sv-pagehead">
            <p className="sv-eyebrow">Visit</p>
            <h1>The room, the grill, and the way here.</h1>
            <p>
              Photographs of the room and the plates, plus the details the counter
              answers most often.
            </p>
          </header>

          <section
            className="sv-gallery"
            data-tour="sv-visit"
            aria-label="Photographs of the restaurant and its food"
          >
            {SAVOR_PHOTOS.map((photo, index) => (
              <figure className={`sv-shot sv-shot-${index + 1}`} key={photo.src}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  width={1280}
                  height={960}
                />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </section>

          <section className="sv-visit-grid" aria-labelledby="sv-visit-title">
            <div>
              <p className="sv-eyebrow">Find us</p>
              <h2 id="sv-visit-title">{SAVOR_ADDRESS}</h2>
              <p>{DIRECTIONS}</p>
              <button
                type="button"
                className="sv-btn sv-btn-quiet"
                onClick={() => setView("reserve")}
              >
                Book a table <span aria-hidden="true">→</span>
              </button>
            </div>

            <dl className="sv-visit-details">
              <div>
                <dt>Hours</dt>
                {SAVOR_HOURS.map(([label, hours]) => (
                  <dd key={label}>
                    {label} · {hours}
                  </dd>
                ))}
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={TEL_HREF}>{SAVOR_PHONE}</a>
                </dd>
              </div>
              <div>
                <dt>Lunch</dt>
                <dd>12:00 – 14:30</dd>
              </div>
              <div>
                <dt>Dinner</dt>
                <dd>17:30 – 21:30</dd>
              </div>
            </dl>
          </section>
        </div>
      ) : null}

      <footer className="sv-footer">
        <div className="sv-footer-top">
          <div>
            <p className="sv-wordmark">Savor</p>
            <p className="sv-footer-address">
              {SAVOR_ADDRESS}
              <br />
              <a href={TEL_HREF}>{SAVOR_PHONE}</a>
            </p>
          </div>
          <div>
            <p className="sv-footer-label">Hours</p>
            <dl className="sv-hours">
              {SAVOR_HOURS.map(([label, hours]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{hours}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="sv-footer-actions">
            <button
              type="button"
              className="sv-btn sv-btn-solid"
              onClick={() => setView("reserve")}
            >
              Book a table
            </button>
            <button type="button" className="sv-btn" onClick={() => setView("menu")}>
              Menu
            </button>
          </div>
        </div>

        <p className="sv-footer-note">
          Sample website for a fictional restaurant, built by Yugya as an interactive
          demonstration. No booking is real and no message is sent. Photography is
          openly licensed and does not depict this restaurant.
        </p>

        <details className="sv-credits">
          <summary>Photography credits</summary>
          <ul>
            {SAVOR_CREDITS.map((item) => (
              <li key={`${item.href}-${item.title}`}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>{" "}
                — {item.credit}, {item.license}
              </li>
            ))}
          </ul>
        </details>
      </footer>
    </div>
  );
}
