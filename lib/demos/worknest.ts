/**
 * Worknest — fictional sample data for the job-book demo.
 * The contractor, crew, jobs, and invoices are invented.
 */

import type { TourStep } from "@/lib/demos/tour";

export type WorknestView = "board" | "invoices" | "team";

export type WorknestStatus = "todo" | "doing" | "done";

export const WORKNEST_BUSINESS = {
  name: "Gandaki Electrical Works",
  address: "Milanchowk, Butwal-11, Rupandehi",
  hours: "Shift 08:00 – 17:00",
};

export type WorknestMember = {
  id: string;
  name: string;
  role: string;
};

export const WORKNEST_MEMBERS: WorknestMember[] = [
  { id: "wn-m1", name: "Prakash Tamang", role: "Licensed electrician" },
  { id: "wn-m2", name: "Anjana Koirala", role: "Client lead" },
  { id: "wn-m3", name: "Suman Ale", role: "Workshop and stores" },
  { id: "wn-m4", name: "Devi Shah", role: "Accounts" },
];

export type WorknestTask = {
  id: string;
  /** Written on the job slip; shown to the crew. */
  ref: string;
  title: string;
  site: string;
  memberId: string;
  priority: "low" | "normal" | "high";
  due: string;
  status: WorknestStatus;
};

export const WORKNEST_TASKS: WorknestTask[] = [
  { id: "wn-t01", ref: "JOB-2417", title: "Site survey at Kalika school", site: "Kalika English School, Butwal-8", memberId: "wn-m1", priority: "high", due: "Fri", status: "doing" },
  { id: "wn-t02", ref: "JOB-2418", title: "Prepare wiring estimate", site: "Kalika English School, Butwal-8", memberId: "wn-m3", priority: "normal", due: "Fri", status: "todo" },
  { id: "wn-t03", ref: "JOB-2419", title: "Collect conduit and junction boxes", site: "Workshop store", memberId: "wn-m3", priority: "normal", due: "Sat", status: "todo" },
  { id: "wn-t04", ref: "JOB-2420", title: "Gate layout change with client", site: "Sunrise Apartments, Devinagar", memberId: "wn-m2", priority: "high", due: "Today", status: "doing" },
  { id: "wn-t05", ref: "JOB-2421", title: "File monthly tax return", site: "Office", memberId: "wn-m4", priority: "high", due: "Sun", status: "todo" },
  { id: "wn-t06", ref: "JOB-2415", title: "Service the workshop generator", site: "Workshop", memberId: "wn-m1", priority: "low", due: "Done", status: "done" },
  { id: "wn-t07", ref: "JOB-2416", title: "Follow up invoice WN-1041", site: "Gyanjyoti Boarding", memberId: "wn-m4", priority: "normal", due: "Done", status: "done" },
];

export type WorknestInvoice = {
  id: string;
  client: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue";
  /** When it went out, or when it was paid. */
  issued: string;
  due: string;
};

export const WORKNEST_INVOICES: WorknestInvoice[] = [
  { id: "WN-1044", client: "Kalika English School", amount: 48000, status: "sent", issued: "issued 28 Oct", due: "in 12 days" },
  { id: "WN-1043", client: "Butwal Hardware Supplies", amount: 26500, status: "overdue", issued: "issued 12 Oct", due: "3 days ago" },
  { id: "WN-1042", client: "Sunrise Apartments", amount: 96000, status: "sent", issued: "issued 2 Nov", due: "in 5 days" },
  { id: "WN-1041", client: "Gyanjyoti Boarding", amount: 34000, status: "paid", issued: "issued 20 Oct", due: "paid 2 Nov" },
];

export const WORKNEST_STEPS: TourStep[] = [
  {
    id: "wn-welcome",
    title: "Welcome to Worknest",
    body:
      "A working job book for a fictional electrical contractor in Butwal. The crew, jobs, and invoices are sample records, and everything runs in your browser. The tour takes about two minutes and can be skipped at any step.",
  },
  {
    id: "wn-board",
    view: "board",
    target: "wn-board",
    title: "The dispatch book, not a chat thread",
    body:
      "Every job sits under booked, on site, or closed, and each slip carries its job number, site, crew, priority, and due day. Moving a job is one action, and the crew sheet follows immediately.",
    action: "Try it \u2014 start a booked job or close one that is on site.",
  },
  {
    id: "wn-addtask",
    view: "board",
    target: "wn-addtask",
    title: "A job slip carries its details",
    body:
      "A new slip records the site, the crew member who owns it, the priority, and the due day, so \u201cwho is on this and where?\u201d is written down instead of remembered.",
    action: "Try it \u2014 write a new job slip.",
  },
  {
    id: "wn-invoices",
    view: "invoices",
    target: "wn-invoices",
    title: "Money in the same book",
    body:
      "The payment book lists invoices with their status, amount, and due date, and the outstanding line is summed from them. Marking one paid stamps it and recomputes the line. Creating an invoice here records a draft; a production build generates and sends the document.",
    action: "Try it \u2014 mark the overdue invoice as paid.",
  },
  {
    id: "wn-team",
    view: "team",
    target: "wn-team",
    title: "Who has room for the next job",
    body:
      "Open and closed counts on the crew sheet are derived from the dispatch book you just edited, so the answer to \u201cwho can take this?\u201d comes before the work is handed over.",
  },
];
