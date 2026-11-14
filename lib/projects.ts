/**
 * Live client projects. Only include work that the owner has confirmed and
 * that can be linked to a real, public site. Descriptions use visible facts
 * from the live sites only — no metrics, outcomes, stack claims or invented
 * features.
 */

export type LiveProject = {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  domain: string;
  status: "Live";
  desktopImage: string;
  desktopAlt: string;
  mobileImage: string;
  mobileAlt: string;
  thumbImage: string;
  captured: string;
  facts: Array<{ label: string; value: string }>;
};

export const LIVE_PROJECTS: LiveProject[] = [
  {
    id: "kohinoor-restaurant",
    name: "Kohinoor Restaurant",
    category: "Restaurant & Hospitality",
    description:
      "A live website for Kohinoor Restaurant in Tilottama, Kotihawa, presenting its lakeside setting, private cabins, rooms, sekuwa kitchen, gallery and contact details.",
    url: "https://www.kohinoorrestaurant.com.np/",
    domain: "kohinoorrestaurant.com.np",
    status: "Live",
    desktopImage: "/assets/projects/kohinoor-desktop.webp",
    desktopAlt:
      "Kohinoor Restaurant home page showing the night-time hero, restaurant logo, navigation and call button",
    mobileImage: "/assets/projects/kohinoor-mobile.webp",
    mobileAlt:
      "Kohinoor Restaurant website on a mobile viewport showing the hero and bottom navigation",
    thumbImage: "/assets/projects/kohinoor-thumb.webp",
    captured: "Nov 2026",
    facts: [
      { label: "Project type", value: "Website development" },
      { label: "Category", value: "Restaurant & hospitality" },
      { label: "Location", value: "Tilottama-13, Kotihawa" },
      { label: "Status", value: "Live" },
    ],
  },
  {
    id: "samajik-abhiyaan",
    name: "Samajik Abhiyaan",
    category: "News & Media",
    description:
      "A live Nepali-language news publication covering politics, business, education, society, culture and sport, with category archives and individual article pages.",
    url: "https://www.samajikabhiyaan.com/",
    domain: "samajikabhiyaan.com",
    status: "Live",
    desktopImage: "/assets/projects/samajik-desktop.webp",
    desktopAlt:
      "Samajik Abhiyaan Nepali-language news website home page showing the lead story, category navigation and trending sidebar",
    mobileImage: "/assets/projects/samajik-mobile.webp",
    mobileAlt:
      "Samajik Abhiyaan news website on a mobile viewport showing the lead story and article image",
    thumbImage: "/assets/projects/samajik-thumb.webp",
    captured: "Nov 2026",
    facts: [
      { label: "Project type", value: "Website development" },
      { label: "Category", value: "News & media" },
      { label: "Location", value: "Banganga-7, Kapilvastu" },
      { label: "Status", value: "Live" },
    ],
  },
  {
    id: "aama-pathshala",
    name: "Aama Pathshala",
    category: "Education",
    description:
      "A live bilingual preschool website for Aama Pathshala in Badganga, Kapilvastu, presenting its facilities, classrooms, gallery, admissions process and contact details.",
    url: "https://aama-scl.netlify.app/",
    domain: "aama-scl.netlify.app",
    status: "Live",
    desktopImage: "/assets/projects/aama-desktop.webp",
    desktopAlt:
      "Aama Pathshala bilingual preschool website home page showing the school hero, logo, English/Nepali toggle and admissions buttons",
    mobileImage: "/assets/projects/aama-mobile.webp",
    mobileAlt:
      "Aama Pathshala website on a mobile viewport showing the bilingual hero, logo and admissions buttons",
    thumbImage: "/assets/projects/aama-thumb.webp",
    captured: "Nov 2026",
    facts: [
      { label: "Project type", value: "Website development" },
      { label: "Category", value: "Education" },
      { label: "Location", value: "Badganga-1, Kapilvastu" },
      { label: "Status", value: "Live" },
    ],
  },
];
