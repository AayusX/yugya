/**
 * Savor — fictional sample data for the restaurant website demo.
 *
 * The restaurant, its address, prices, staff names and bookings are invented.
 * Photography is openly licensed and credited in the demo footer; the plates
 * are illustrative and do not depict this (fictional) kitchen.
 */

import type { TourStep } from "@/lib/demos/tour";

export type SavorView = "home" | "menu" | "reserve" | "visit";

export type SavorCourse =
  | "Small plates"
  | "Momo & noodles"
  | "Grill & mains"
  | "Rice & thali"
  | "Sweet"
  | "Drinks";

export type SavorDish = {
  id: string;
  name: string;
  desc: string;
  price: number;
  course: SavorCourse;
  veg: boolean;
  spicy?: boolean;
};

export const SAVOR_COURSES: SavorCourse[] = [
  "Small plates",
  "Momo & noodles",
  "Grill & mains",
  "Rice & thali",
  "Sweet",
  "Drinks",
];

export const SAVOR_MENU: SavorDish[] = [
  {
    id: "sv-d01",
    name: "Sekuwa platter",
    desc: "Pork sekuwa grilled over charcoal, timur salt, tomato achar, beaten rice",
    price: 480,
    course: "Small plates",
    veg: false,
    spicy: true,
  },
  {
    id: "sv-d02",
    name: "Chatamari",
    desc: "Newari rice crepe baked with minced buff, egg and spring onion",
    price: 280,
    course: "Small plates",
    veg: false,
  },
  {
    id: "sv-d03",
    name: "Aloo chop",
    desc: "Potato fritters with sesame, tamarind chutney",
    price: 180,
    course: "Small plates",
    veg: true,
  },
  {
    id: "sv-d04",
    name: "Bhatmas sadeko",
    desc: "Fried soybeans tossed with red onion, green chilli and lemon",
    price: 170,
    course: "Small plates",
    veg: true,
    spicy: true,
  },
  {
    id: "sv-d05",
    name: "Gundruk sadeko",
    desc: "Fermented mustard greens, tomato, mustard oil",
    price: 160,
    course: "Small plates",
    veg: true,
  },
  {
    id: "sv-d06",
    name: "Steamed buff momo",
    desc: "Ten pieces, folded to order, sesame and tomato achar",
    price: 240,
    course: "Momo & noodles",
    veg: false,
  },
  {
    id: "sv-d07",
    name: "Jhol momo",
    desc: "Buff momo in a warm tomato and peanut jhol",
    price: 290,
    course: "Momo & noodles",
    veg: false,
    spicy: true,
  },
  {
    id: "sv-d08",
    name: "Kothey chicken momo",
    desc: "Pan-fried, eight pieces, with a clear chicken broth",
    price: 280,
    course: "Momo & noodles",
    veg: false,
  },
  {
    id: "sv-d09",
    name: "Veg thukpa",
    desc: "Hand-pulled noodles, seasonal vegetables, dark vegetable stock",
    price: 260,
    course: "Momo & noodles",
    veg: true,
  },
  {
    id: "sv-d10",
    name: "Chicken chilli",
    desc: "Wok-tossed with capsicum and onion, steamed rice",
    price: 380,
    course: "Grill & mains",
    veg: false,
    spicy: true,
  },
  {
    id: "sv-d11",
    name: "Grilled river fish",
    desc: "Whole fish, lemon butter, roasted seasonal vegetables",
    price: 560,
    course: "Grill & mains",
    veg: false,
  },
  {
    id: "sv-d12",
    name: "Khasi ko masu",
    desc: "Goat curry, bone broth, timur, steamed rice",
    price: 520,
    course: "Grill & mains",
    veg: false,
    spicy: true,
  },
  {
    id: "sv-d13",
    name: "Pork choila",
    desc: "Charred pork, mustard oil, chilli, beaten rice",
    price: 420,
    course: "Grill & mains",
    veg: false,
    spicy: true,
  },
  {
    id: "sv-d14",
    name: "Paneer tarkari",
    desc: "Paneer in tomato and cashew gravy, seasonal vegetables",
    price: 380,
    course: "Grill & mains",
    veg: true,
  },
  {
    id: "sv-d15",
    name: "Daal bhat set",
    desc: "Black lentil daal, rice, tarkari, gundruk achar, papad",
    price: 350,
    course: "Rice & thali",
    veg: true,
  },
  {
    id: "sv-d16",
    name: "Dhido set",
    desc: "Millet dhido, gundruk, butter, buttermilk",
    price: 380,
    course: "Rice & thali",
    veg: true,
  },
  {
    id: "sv-d17",
    name: "Chicken thali",
    desc: "Chicken curry, daal, rice, tarkari and achar",
    price: 450,
    course: "Rice & thali",
    veg: false,
  },
  {
    id: "sv-d18",
    name: "Juju dhau",
    desc: "Bhaktapur-style set yoghurt, served in clay",
    price: 160,
    course: "Sweet",
    veg: true,
  },
  {
    id: "sv-d19",
    name: "Sikarni",
    desc: "Whipped yoghurt, cardamom, toasted walnut",
    price: 170,
    course: "Sweet",
    veg: true,
  },
  {
    id: "sv-d20",
    name: "Yomari",
    desc: "Steamed rice dumpling, molasses and sesame",
    price: 160,
    course: "Sweet",
    veg: true,
  },
  {
    id: "sv-d21",
    name: "Masala chiya",
    desc: "Spiced milk tea, brewed to order",
    price: 80,
    course: "Drinks",
    veg: true,
  },
  {
    id: "sv-d22",
    name: "Tongba",
    desc: "Fermented millet, hot water, refills",
    price: 320,
    course: "Drinks",
    veg: true,
  },
  {
    id: "sv-d23",
    name: "Fresh lime soda",
    desc: "Sweet or salted",
    price: 130,
    course: "Drinks",
    veg: true,
  },
  {
    id: "sv-d24",
    name: "Lassi",
    desc: "Sweet or salted, churned to order",
    price: 150,
    course: "Drinks",
    veg: true,
  },
];

export const SAVOR_HOURS = [
  ["Sun \u2013 Thu", "11:00 \u2013 22:00"],
  ["Fri \u2013 Sat", "11:00 \u2013 22:30"],
];

export const SAVOR_ADDRESS = "Ward 6, near Traffic Chowk, Butwal, Rupandehi";
export const SAVOR_PHONE = "+977 71 000 000";

export const SAVOR_SERVICE = [
  { name: "Lunch", times: ["12:00", "12:30", "13:00", "13:30", "14:00"] },
  {
    name: "Dinner",
    times: ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
  },
];

export const SAVOR_TIME_SLOTS = SAVOR_SERVICE.flatMap((service) => service.times);

export const SAVOR_PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];

/** Three dishes that open the home page, with the photograph each one uses. */
export const SAVOR_SIGNATURES = [
  {
    dishId: "sv-d01",
    image: "/assets/demos/savor/sekuwa.jpg",
    alt: "Charcoal-grilled sekuwa with beaten rice and tomato achar",
    note: "Ordered at the table, finished at the grill.",
  },
  {
    dishId: "sv-d06",
    image: "/assets/demos/savor/momo.jpg",
    alt: "Steamed momo dumplings in a bamboo steamer",
    note: "Folded through the afternoon; steamed to order.",
  },
  {
    dishId: "sv-d15",
    image: "/assets/demos/savor/daal-bhat.jpg",
    alt: "A Nepali daal bhat thali with rice, lentils and vegetables",
    note: "The lunch set, served until the daal runs out.",
  },
];

export type SavorPhoto = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  license: string;
  href: string;
};

/** Gallery / visit photography. All files are openly licensed; see credits. */
export const SAVOR_PHOTOS: SavorPhoto[] = [
  {
    src: "/assets/demos/savor/room.jpg",
    alt: "A warmly lit dining room with wooden tables and low pendant lights",
    caption: "The front room, set before service.",
    credit: "Ralff Nestor Nacor",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Bistro_Remedios_Interior,_May_2025_(1).jpg",
  },
  {
    src: "/assets/demos/savor/charcoal-grill.jpg",
    alt: "Skewers of marinated meat grilling over glowing charcoal",
    caption: "Sekuwa over coals, from five in the afternoon.",
    credit: "Pedemann",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Skewers_on_the_charcoal_grill.jpg",
  },
  {
    src: "/assets/demos/savor/momo-steamer.jpg",
    alt: "A plate of steamed momo dumplings with tomato achar",
    caption: "Momo, folded and steamed to order.",
    credit: "Gaurav Dhwaj Khadka",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Momo_2.jpg",
  },
  {
    src: "/assets/demos/savor/thali.jpg",
    alt: "A Nepali thali with rice, lentil soup, vegetables and pickle",
    caption: "The thali at lunch, with gundruk achar.",
    credit: "Subhashish Panigrahi",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Nepali_dal-bhat-tarkari.jpg",
  },
  {
    src: "/assets/demos/savor/chatamari.jpg",
    alt: "A Newari rice crepe topped with minced meat and egg",
    caption: "Chatamari, straight from the pan.",
    credit: "Raunak Maskay",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Meat_Chatamari.jpg",
  },
  {
    src: "/assets/demos/savor/river-fish.jpg",
    alt: "A whole grilled fish on a plate with lemon and vegetables",
    caption: "River fish, grilled whole and finished with lemon butter.",
    credit: "pompi",
    license: "CC0",
    href: "https://commons.wikimedia.org/wiki/File:Plated_grilled_fish.jpg",
  },
];

/** Every photo used on the site, for the credits panel. */
export const SAVOR_CREDITS = [
  ...SAVOR_PHOTOS.map((photo) => ({
    title: photo.caption,
    credit: photo.credit,
    license: photo.license,
    href: photo.href,
  })),
  {
    title: "Sekuwa set (hero photograph)",
    credit: "Gaurav Dhwaj Khadka",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Sekuwa_Set.jpg",
  },
  {
    title: "Sekuwa platter (signature photograph)",
    credit: "Gaurav Dhwaj Khadka",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Buff_Sekuwa_with_Puff_Rice.jpg",
  },
  {
    title: "Momo (signature photograph)",
    credit: "Gaurav Dhwaj Khadka",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Buff_Momos.jpg",
  },
  {
    title: "Daal bhat (signature photograph)",
    credit: "Gaurav Dhwaj Khadka",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Dal_Bhat_Tarkari_2.jpg",
  },
];

export type SavorReservation = {
  id: string;
  name: string;
  party: number;
  time: string;
  note: string;
  /** 0 is tonight, 1 tomorrow, and so on — the demo only looks a week ahead. */
  dayOffset: number;
};

/** A handful of requests already on the host stand, so the list has a shape. */
export const SAVOR_RESERVATIONS: SavorReservation[] = [
  {
    id: "SVR-2480",
    name: "Rita Gurung",
    party: 4,
    time: "18:30",
    note: "Window table if possible",
    dayOffset: 0,
  },
  {
    id: "SVR-2481",
    name: "Bikash Shrestha",
    party: 2,
    time: "19:15",
    note: "",
    dayOffset: 0,
  },
  {
    id: "SVR-2482",
    name: "Anita Karki",
    party: 3,
    time: "13:00",
    note: "One high chair",
    dayOffset: 1,
  },
  {
    id: "SVR-2483",
    name: "Suman Rai",
    party: 2,
    time: "18:00",
    note: "",
    dayOffset: 2,
  },
];

/** Guided tour: welcome, four highlights, then the completion panel. */
export const SAVOR_STEPS: TourStep[] = [
  {
    id: "sv-welcome",
    title: "Welcome to Savor",
    body:
      "A working restaurant website: the menu, the booking request and the host stand all run in your browser on sample data. Nothing is sent anywhere. The tour takes about two minutes and can be skipped at any step.",
  },
  {
    id: "sv-menu",
    view: "menu",
    target: "sv-menu",
    title: "The menu is structured",
    body:
      "Courses, prices and dietary tags are records, not a photograph of a printed menu. The filter re-renders the real list, so an item that sells out can be changed in one place.",
    action: "Try it \u2014 choose a course and watch the list re-render.",
  },
  {
    id: "sv-reserve",
    view: "reserve",
    target: "sv-reserve-form",
    title: "Requests without phone tag",
    body:
      "The form is open at any hour. Name, phone and seating time are checked before a request is accepted, and the chosen day and party size stay visible while the guest fills it in.",
    action: "Try it \u2014 pick a day, a party size and a seating time, then send the request.",
  },
  {
    id: "sv-confirm",
    view: "reserve",
    target: "sv-submit",
    title: "A request, clearly labelled",
    body:
      "The confirmation and reference number are simulated \u2014 this demo has no restaurant to notify. A production build would pass the request to the channel the restaurant already checks: phone, SMS or email.",
  },
  {
    id: "sv-host",
    view: "reserve",
    target: "sv-host",
    title: "One list for the floor",
    body:
      "Accepted requests collect on the host stand for the chosen day, with party size, time and notes. The totals are counted from the list you see \u2014 no hand tally at the door.",
  },
  {
    id: "sv-visit",
    view: "visit",
    target: "sv-visit",
    title: "The rest of the visit",
    body:
      "Photographs, hours and directions answer the routine questions before they reach the counter. The photographs here are openly licensed stand-ins for the restaurant\u2019s own.",
  },
];
