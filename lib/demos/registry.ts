/**
 * Demo portfolio registry — the single source of truth for the five interactive
 * demos. Pure data only: no component imports, no sample records (those live in
 * `lib/demos/<demo>.ts`). Server components and client components both read
 * from here, so it must stay dependency-free.
 */

export type DemoId = "savor" | "campusflow" | "stockwise" | "worknest" | "serverscope";

/**
 * Interaction honesty types, shown to visitors on intro pages and inside demos:
 * - "real"      — Type A: logic genuinely runs in the visitor's browser.
 * - "simulated" — Type B: a workflow that would need a backend, clearly labelled.
 * - "sample"    — Type C: static fictional data representing live-system values.
 */
export type DemoInteraction = "real" | "simulated" | "sample";

export type DemoModule = {
  name: string;
  kind: DemoInteraction;
  detail: string;
};

export type DemoInfo = {
  id: DemoId;
  name: string;
  path: string;
  kind: string;
  tagline: string;
  audience: string;
  problem: string[];
  solution: string[];
  features: DemoModule[];
  defaultView: string;
  tourNote: string;
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
  /** Preselects the matching option in the contact enquiry form. */
  serviceParam: "web" | "vps";
  /** Per-product accent used by the demo application UI. */
  accent: string;
  accentDark: string;
  /** Genuine screenshot of the demo application, 720 × 411. */
  preview: string;
  /** 360 × 206 thumbnail used by the demo index. */
  previewThumb: string;
  previewAlt: string;
  metaTitle: string;
  metaDescription: string;
  ogDescription: string;
};

export const DEMO_DISCLAIMER =
  "This is an interactive demonstration by Yugya. It uses sample data and simulated workflows. It is not connected to a live business system.";

export const INTERACTION_LABELS: Record<DemoInteraction, string> = {
  real: "Real in-browser logic",
  simulated: "Simulated workflow",
  sample: "Sample data",
};

export const DEMOS: DemoInfo[] = [
  {
    id: "savor",
    name: "Savor",
    path: "/work/savor/",
    kind: "Restaurant website",
    tagline: "A restaurant website with a maintained menu and table reservations.",
    audience:
      "Restaurants, caf\u00e9s, and eateries that currently take bookings by phone and keep their menu on a social media page.",
    problem: [
      "The menu lives on a social media page that the kitchen cannot update the same day an item sells out, so customers arrive asking for dishes that are no longer available.",
      "Reserving a table means calling during business hours. Missed calls during a busy service turn into lost tables, and the staff have no single list of today\u2019s requests.",
      "Opening hours, location, and contact details are spread across profiles and verbal answers, so every question reaches the counter.",
    ],
    solution: [
      "A clean public website the restaurant controls: the menu is structured data, so courses, prices, and availability are one edit away instead of a repost.",
      "A reservation request form that is open at any hour. In this demo the confirmation step is simulated; in a production build it can deliver to a phone notification or a simple inbox the kitchen checks each morning.",
      "Hours, directions, and photographs on one page, so routine questions are answered before anyone has to pick up the phone.",
    ],
    features: [
      { name: "Structured menu with course filtering", kind: "real", detail: "Twenty-four dishes are records with course, price, and dietary tags. Filtering and course grouping re-render the live list in your browser." },
      { name: "Reservation request with seating times", kind: "real", detail: "A seven-day rail, lunch and dinner seatings, party size, name, and phone number are checked before a request is accepted." },
      { name: "Booking confirmation", kind: "simulated", detail: "The confirmation screen and reference number are simulated \u2014 a real build would notify the restaurant through its chosen channel." },
      { name: "Host-stand list for the chosen day", kind: "real", detail: "Accepted requests collect on the host stand with party size and notes; the totals are counted from the requests shown." },
      { name: "Photographs, hours and directions", kind: "sample", detail: "Fictional copy for a fictional restaurant in Butwal, illustrated with openly licensed photography that is credited in the demo." },
    ],
    defaultView: "home",
    tourNote: "about two minutes",
    ctaTitle: "Want a website like Savor for your restaurant?",
    ctaBody:
      "Tell us about your menu, your booking flow, and how you want requests to reach the kitchen. We will scope a site your staff can update without our help.",
    ctaLabel: "Discuss a restaurant website",
    serviceParam: "web",
    accent: "#A14E2A",
    accentDark: "#D08152",
    preview: "/assets/demos/savor.webp",
    previewThumb: "/assets/demos/savor-360.webp",
    previewAlt:
      "Savor restaurant website demo showing the home page, menu navigation, and a Nepali thali photograph",
    metaTitle: "Savor — Interactive Restaurant Website Demo — Yugya",
    metaDescription:
      "An interactive demonstration by Yugya: a restaurant website with a structured menu, course filtering, and table reservation requests running in your browser with sample data.",
    ogDescription:
      "Operate a restaurant website demo built by Yugya \u2014 the menu, the booking request, and the host stand, running entirely in your browser.",
  },
  {
    id: "campusflow",
    name: "CampusFlow",
    path: "/work/campusflow/",
    kind: "School management tool",
    tagline: "A school office tool for the daily register, the student roster, and the notice board.",
    audience:
      "Small schools and colleges in Nepal that keep attendance in register books and send notices home on paper.",
    problem: [
      "Attendance is written in a register, so a parent asking about a student\u2019s pattern means flipping through months of pages to count by hand.",
      "Student details live across admission forms and notebooks, so preparing a clean roster for a class or a report takes an afternoon of copying.",
      "Notices go home on paper with no record of what was sent, when, or to whom.",
    ],
    solution: [
      "The day sheet lists today\u2019s classes and their recorded state, so the office can see what is still unmarked before the day ends.",
      "Each class becomes a register with present, absent, and late marks; saving writes it and the totals follow from the marks set.",
      "Student records are searchable by student or guardian, and notices keep their audience, author, date, and priority in one docket.",
    ],
    features: [
      { name: "Daily register with one mark per student", kind: "real", detail: "Present, absent, and late marks per student, with an all-present shortcut and a running tally. Saving writes the class register." },
      { name: "Day sheet counted from saved registers", kind: "real", detail: "The day sheet\u2019s present counts and attendance figure are computed from the registers you save, not typed in." },
      { name: "Student roster with search and class filter", kind: "real", detail: "Search by student or guardian name, filter by class, and see today\u2019s mark beside each record." },
      { name: "Notice board with audience and history", kind: "real", detail: "A notice carries its audience, author, date, and priority. Posting adds it to the top of the docket for the session." },
      { name: "Student and guardian records", kind: "sample", detail: "Fictional students, guardians, and phone numbers for a fictional school in Butwal." },
    ],
    defaultView: "dashboard",
    tourNote: "about two minutes",
    ctaTitle: "Want a tool like CampusFlow for your school?",
    ctaBody:
      "Tell us how your school records attendance and communicates with parents today. We will scope a tool your teachers can run without training sessions.",
    ctaLabel: "Discuss a school tool",
    serviceParam: "web",
    accent: "#2F6D62",
    accentDark: "#6FB3A5",
    preview: "/assets/demos/campusflow.webp",
    previewThumb: "/assets/demos/campusflow-360.webp",
    previewAlt:
      "CampusFlow school tool demo showing the day sheet, class attendance counts, and the student register",
    metaTitle: "CampusFlow — Interactive School Management Demo — Yugya",
    metaDescription:
      "An interactive demonstration by Yugya: a school office tool with a daily register, a searchable student roster, and a notice board, running in your browser with sample data.",
    ogDescription:
      "Operate a school office demo built by Yugya \u2014 the daily register, student records, and the notice board, running entirely in your browser.",
  },
  {
    id: "stockwise",
    name: "Stockwise",
    path: "/work/stockwise/",
    kind: "Shop stock ledger",
    tagline:
      "A counter and stock ledger for a shop: bills, shelf counts, and a supplier reorder list.",
    audience:
      "Retail shops and small warehouses that count stock in notebooks and discover shortages when a customer is already waiting.",
    problem: [
      "Stock counts live in a notebook, so the same items are recounted from shelves whenever a question comes up, and the counts drift from what is actually sold.",
      "There is no early warning before an item runs out \u2014 the shortage is discovered at the counter, mid-sale.",
      "Sales totals for a day are added up by hand at closing time, so the shop learns what moved only after the shutters are down.",
    ],
    solution: [
      "Every item is a stock card with its SKU, rack, supplier, cost, and selling price on the same record as the count, so the ledger answers a shelf question without a recount.",
      "A bill is written line by line at the counter; completing it files the bill in the day book and takes the quantities off stock, so takings are a by-product of selling.",
      "Items at or below their reorder level are grouped by the supplier who delivers them, with a suggested quantity, so restocking is a list instead of a memory.",
    ],
    features: [
      { name: "Stock ledger with SKU, rack and supplier", kind: "real", detail: "Search by item, SKU, or supplier, filter by category, or show low stock only. Counts change when a bill is completed or a delivery is received." },
      { name: "Counter bill with multiple lines", kind: "real", detail: "Add lines, see each amount and the bill total computed, mark cash or online, and complete it. Selling more than the shelf holds is refused with the count that is actually there." },
      { name: "Day book summed from the bills", kind: "real", detail: "Bills, items sold, takings, and the reorder count are sums of the records in the session, not typed figures." },
      { name: "Reorder list grouped by supplier", kind: "real", detail: "Items at or below their reorder level are grouped by supplier with a suggested quantity; receiving adds the units to stock and clears the item." },
      { name: "Shop, suppliers and stock records", kind: "sample", detail: "A fictional hardware shop in Butwal, five fictional suppliers, and invented SKUs and prices in rupees." },
    ],
    defaultView: "dashboard",
    tourNote: "about two minutes",
    ctaTitle: "Want a counter ledger like Stockwise for your shop?",
    ctaBody:
      "Tell us what you sell, how you count stock today, and how bills are written at the counter. We will scope a stock ledger that fits the way your shop already works.",
    ctaLabel: "Discuss a stock ledger",
    serviceParam: "web",
    accent: "#8A5A16",
    accentDark: "#C99B4E",
    preview: "/assets/demos/stockwise.webp",
    previewThumb: "/assets/demos/stockwise-360.webp",
    previewAlt:
      "Stockwise shop ledger demo showing the day book, bills written today, and a supplier reorder list",
    metaTitle: "Stockwise — Interactive Shop Stock Ledger Demo — Yugya",
    metaDescription:
      "An interactive demonstration by Yugya: a shop counter and stock ledger with a day book, stock cards, multi-line bills, and supplier reorder lists, running in your browser with sample data.",
    ogDescription:
      "Operate a shop stock ledger demo built by Yugya \u2014 write a bill, watch the day book and shelf counts update, and build a reorder list by supplier, entirely in your browser.",
  },
  {
    id: "worknest",
    name: "Worknest",
    path: "/work/worknest/",
    kind: "Contractor's job book",
    tagline:
      "A job book for a trade contractor: dispatched jobs, payments owed, and who is on what.",
    audience:
      "Small trade and service contractors who dispatch crews from a notebook and discover unbilled work at the end of the month.",
    problem: [
      "Job details live in phone calls and a diary, so \u201cwho is on this, and where?\u201d has no answer anyone can check without ringing around.",
      "Work is booked, started, and finished without a written status, so the same job gets chased twice or quietly dropped.",
      "Invoices go out late and follow-up depends on memory, so money already earned sits uncollected while the crew moves on to the next site.",
    ],
    solution: [
      "Every job is a slip with its number, site, crew member, priority, and due day, moved between booked, on site, and closed \u2014 so status is written down rather than remembered.",
      "A payment book lists invoices with status, amount, and due date, and the outstanding line is summed from the rows; stamping one paid recomputes it.",
      "A crew sheet derives open and closed counts from the dispatch book, so handing out the next job is a glance at who has room.",
    ],
    features: [
      { name: "Dispatch book with job slips", kind: "real", detail: "Move a job between booked, on site, and closed; the lane counts, the crew sheet, and the day\u2019s notes follow immediately." },
      { name: "New job slip with site and crew", kind: "real", detail: "A slip records the job, the site, the crew member, the priority, and the due day, and joins the book with its own job number." },
      { name: "Payment book with mark-paid", kind: "real", detail: "Outstanding is summed from the sent and overdue rows; marking an invoice paid stamps it with the date and recomputes the line." },
      { name: "Invoice writing", kind: "simulated", detail: "Writing an invoice here records a stamped draft; a production build generates and sends the document." },
      { name: "Crew sheet and day\u2019s notes", kind: "real", detail: "Open and closed counts per person come from the board you are editing, and every action is noted with the time it happened." },
      { name: "Contractor, crew, jobs and invoices", kind: "sample", detail: "A fictional electrical contractor in Butwal with four crew members, seven jobs, and four invoices in rupees." },
    ],
    defaultView: "board",
    tourNote: "about two minutes",
    ctaTitle: "Want a job book like Worknest for your trade?",
    ctaBody:
      "Tell us how jobs reach your crew today, how sites get confirmed, and when invoices go out. We will scope a job book around the way your work already moves.",
    ctaLabel: "Discuss a job book",
    serviceParam: "web",
    accent: "#2E4A68",
    accentDark: "#9DB9D6",
    preview: "/assets/demos/worknest.webp",
    previewThumb: "/assets/demos/worknest-360.webp",
    previewAlt:
      "Worknest contractor job book demo showing job slips across booked, on site, and closed lanes",
    metaTitle: "Worknest — Interactive Contractor Job Book Demo — Yugya",
    metaDescription:
      "An interactive demonstration by Yugya: a contractor\u2019s job book with a dispatch board, job slips, a payment book, and a crew sheet, running in your browser with sample data.",
    ogDescription:
      "Operate a contractor job book demo built by Yugya \u2014 dispatch a job, write a slip, stamp an invoice paid, and see the crew sheet follow, entirely in your browser.",
  },
  {
    id: "serverscope",
    name: "ServerScope",
    path: "/work/serverscope/",
    kind: "Operations console",
    tagline:
      "A console for a small server fleet: readings, a hardening runbook, and a deployment transcript.",
    audience:
      "Teams and individuals running Linux servers who manage them through scattered notes and shell history.",
    problem: [
      "Server state lives in scattered notes and shell history, so \u201cwhich hardening steps were actually applied here?\u201d has no answer that two people agree on.",
      "Deployments are run from memory, so steps get skipped under pressure and the recovery is archaeology through logs.",
      "Incidents are noticed and then forgotten, so the same disk warning is rediscovered by whoever happens to look next.",
    ],
    solution: [
      "One reading per host \u2014 role, load, disk, kernel, uptime, and services \u2014 so a server is not known only by whoever last logged into it.",
      "A runbook where each line records whether the step is applied and the command that proves it, with a score computed from that state.",
      "Deployments built from a command and walked step by step into a timestamped transcript, plus an incident log with a status someone owns.",
    ],
    features: [
      { name: "Fleet reading with host inspector", kind: "sample", detail: "Roles, regions, load, disk, kernels, uptime, and service lists for three fictional hosts. Selecting a host inspects it; the numbers are sample data standing in for live readings." },
      { name: "Hardening runbook with evidence", kind: "real", detail: "Apply or revert each step; the score is computed from your checklist state, and every line keeps the command that verifies it." },
      { name: "Command-built deployment with transcript", kind: "simulated", detail: "Choose an application and environment, see the command, and run the fixed sequence. The transcript is labelled simulated and no server is contacted." },
      { name: "Incident log with acknowledge", kind: "sample", detail: "A sample incident history with severity, host, and time raised; acknowledging or resolving a row is recorded in the session." },
      { name: "Session history", kind: "real", detail: "Runbook changes, deployments, and incident decisions are written to the status line with the time they happened." },
    ],
    defaultView: "overview",
    tourNote: "about two minutes",
    ctaTitle: "Want a documented server you can hand over?",
    ctaBody:
      "Tell us what your servers run today and how deployments happen now. We will set up a documented, reproducible baseline you keep full control of.",
    ctaLabel: "Discuss a server setup",
    serviceParam: "vps",
    accent: "#2F7A5F",
    accentDark: "#8AD9B4",
    preview: "/assets/demos/serverscope.webp",
    previewThumb: "/assets/demos/serverscope-360.webp",
    previewAlt:
      "ServerScope operations console demo showing three hosts, a host inspector, and a hardening runbook",
    metaTitle: "ServerScope — Interactive Operations Console Demo — Yugya",
    metaDescription:
      "An interactive demonstration by Yugya: an operations console with a fleet reading, a hardening runbook, a simulated deployment transcript, and an incident log, running in your browser.",
    ogDescription:
      "Operate a server operations console demo built by Yugya \u2014 inspect three hosts, apply runbook steps, run a labelled simulated deployment, and acknowledge an incident, entirely in your browser.",
  },
];

export function getDemo(id: DemoId): DemoInfo {
  const demo = DEMOS.find((entry) => entry.id === id);
  if (!demo) {
    throw new Error(`Unknown demo: ${id}`);
  }
  return demo;
}
