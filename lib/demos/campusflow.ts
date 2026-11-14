/**
 * CampusFlow — fictional sample data for the school management demo.
 * Students, guardians, and phone numbers are invented; the school is fictional.
 */

import type { TourStep } from "@/lib/demos/tour";

export type CampusFlowView = "dashboard" | "students" | "attendance" | "notices";

export const CAMPUSFLOW_SCHOOL = {
  name: "Sunrise Academy",
  place: "Butwal-8, Rupandehi",
  term: "Second term",
  year: "2083 BS",
};

export type CampusFlowClass = {
  id: string;
  label: string;
  room: string;
  teacher: string;
};

export const CAMPUSFLOW_CLASSES: CampusFlowClass[] = [
  { id: "cf-g5", label: "Grade 5", room: "Room 12", teacher: "Sunita Adhikari" },
  { id: "cf-g6", label: "Grade 6", room: "Room 14", teacher: "Madhav Koirala" },
  { id: "cf-g7", label: "Grade 7", room: "Room 21", teacher: "Prakriti Basnet" },
  { id: "cf-g8", label: "Grade 8", room: "Room 23", teacher: "Dinesh Yadav" },
];

export type CampusFlowStudent = {
  id: string;
  roll: number;
  name: string;
  classId: string;
  guardian: string;
  phone: string;
};

const STUDENT_NAMES: Array<[string, string]> = [
  ["Aarav Adhikari", "Sunita Adhikari"],
  ["Sita Karki", "Bhimsen Karki"],
  ["Bibek Thapa", "Radha Thapa"],
  ["Anjali Gurung", "Krishna Gurung"],
  ["Rohan Shrestha", "Mina Shrestha"],
  ["Priya Magar", "Lal Bahadur Magar"],
  ["Kiran Bhattarai", "Goma Bhattarai"],
  ["Sabina Rai", "Hari Rai"],
  ["Dipesh Lama", "Tika Lama"],
  ["Nisha Pun", "Bhupendra Pun"],
  ["Bikash Chaudhary", "Saru Chaudhary"],
  ["Manisha Yadav", "Ram Yadav"],
  ["Sujan Bhandari", "Kamala Bhandari"],
  ["Rekha Nepali", "Dhan Nepali"],
  ["Anil Tamang", "Chandra Tamang"],
  ["Kopila Damai", "Sita Damai"],
  ["Nabin Sapkota", "Gyan Sapkota"],
  ["Sarita Bhandari", "Prem Bhandari"],
  ["Umesh Kushwaha", "Rani Kushwaha"],
  ["Jyoti Danuwar", "Surya Danuwar"],
  ["Prakash Baral", "Anju Baral"],
  ["Sanjiv Poudel", "Shanti Poudel"],
  ["Muna Gharti", "Bir Gharti"],
  ["Ramesh BK", "Sarada BK"],
];

const GUARDIAN_PHONES = [
  "+977-98XXXXXXXX",
  "+977-98XXXXXXXX",
  "+977-97XXXXXXXX",
  "+977-98XXXXXXXX",
];

export const CAMPUSFLOW_STUDENTS: CampusFlowStudent[] = STUDENT_NAMES.map(
  ([name, guardian], index) => {
    const classIndex = Math.floor(index / 6);
    return {
      id: `cf-s${String(index + 1).padStart(2, "0")}`,
      roll: (index % 6) + 1,
      name,
      classId: CAMPUSFLOW_CLASSES[classIndex].id,
      guardian,
      phone: GUARDIAN_PHONES[index % GUARDIAN_PHONES.length],
    };
  }
);

export type CampusFlowMark = "P" | "A" | "L";

export type CampusFlowNotice = {
  id: string;
  title: string;
  body: string;
  priority: "info" | "important" | "urgent";
  audience: string;
  date: string;
  author: string;
};

export const CAMPUSFLOW_NOTICES: CampusFlowNotice[] = [
  {
    id: "cf-n01",
    title: "Second term exams begin 25 Mangsir",
    body:
      "The second term examination starts on 25 Mangsir. Students should reach their examination rooms by 9:45. The routine is posted on the office board.",
    priority: "important",
    audience: "All families",
    date: "Today",
    author: "Examination Committee",
  },
  {
    id: "cf-n02",
    title: "Parent meeting for Grades 6\u20138",
    body:
      "A parent-teacher meeting for Grades 6 to 8 is scheduled for Friday, 1:00 pm, in the main hall. Attendance of at least one guardian per student is requested.",
    priority: "info",
    audience: "Grades 6\u20138",
    date: "Yesterday",
    author: "Principal\u2019s Office",
  },
  {
    id: "cf-n03",
    title: "School closed for Bol Bom holiday",
    body:
      "The school remains closed on Monday for the public holiday. Regular classes resume Tuesday at the usual time.",
    priority: "info",
    audience: "All families",
    date: "3 days ago",
    author: "Principal\u2019s Office",
  },
];

/**
 * Attendance already recorded for one class today, so the dashboard
 * statistics derive from real saved marks from the first moment.
 */
export const CAMPUSFLOW_INITIAL_ATTENDANCE: Record<string, Record<string, CampusFlowMark>> = {
  "cf-g5": {
    "cf-s01": "P", "cf-s02": "P", "cf-s03": "A", "cf-s04": "P",
    "cf-s05": "L", "cf-s06": "P",
  },
};

export const CAMPUSFLOW_MARK_OPTIONS: Array<{ value: CampusFlowMark; label: string }> = [
  { value: "P", label: "Present" },
  { value: "A", label: "Absent" },
  { value: "L", label: "Late" },
];

export const CAMPUSFLOW_STEPS: TourStep[] = [
  {
    id: "cf-welcome",
    title: "Welcome to CampusFlow",
    body:
      "A working school office: the register, the roster and the notice board all run in your browser on fictional records for a fictional school. Nothing is sent anywhere. The tour takes about two minutes and can be skipped at any step.",
  },
  {
    id: "cf-dashboard",
    view: "dashboard",
    target: "cf-register",
    title: "The day sheet, not a dashboard of cards",
    body:
      "Today\u2019s classes are listed with their teacher, room and roll. The attendance figure beside each class is counted from the register you save \u2014 not typed in \u2014 and unrecorded classes stay visible until they are done.",
    action: "Try it \u2014 open an unrecorded class from the list.",
  },
  {
    id: "cf-students",
    view: "students",
    target: "cf-roster",
    title: "One roster, searchable",
    body:
      "Every student is a record with roll number, class, guardian and phone. The search covers both student and guardian names, and the class filter narrows the list. Preparing a roster for a meeting is typing, not copying.",
    action: "Try it \u2014 search for a guardian\u2019s name.",
  },
  {
    id: "cf-attendance",
    view: "attendance",
    target: "cf-attendance-sheet",
    title: "A register a teacher can finish",
    body:
      "Each student gets one mark for the day: present, absent or late. All present sets the class in one action, individual marks override it, and saving writes the register \u2014 the counting is done by the tool.",
    action: "Try it \u2014 mark one student absent, then save the class.",
  },
  {
    id: "cf-notices",
    view: "notices",
    target: "cf-notices",
    title: "Notices with a history",
    body:
      "A notice carries its audience, author, date and priority. Posting adds it to the top of the docket, so \u201cwhat did we send home, and to whom?\u201d has an answer weeks later.",
    action: "Try it \u2014 post a short notice to Grade 7.",
  },
];
