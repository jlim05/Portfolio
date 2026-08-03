/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ALL EDITABLE CONTENT LIVES HERE.
 * Swap the placeholder strings below for your real copy — no component logic
 * needs to change.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const person = {
  /** Rendered as the 3D text mesh in the hero. Keep it short — long names get small. */
  name: "Jason Lim",
  /**
   * Not shown on the page — used for the browser tab description and link
   * previews only, where an empty description would hurt.
   */
  metaDescription: "Personal portfolio of Jason Lim — projects, interests and contact.",
  email: "jasonlimnzz@gmail.com",
  location: "Auckland, New Zealand",
};

export type Quote = {
  /** Under ~15 words reads best at these depths. */
  text: string;
  author?: string;
  /** [x, y, z] in world units. z is depth: negative = further from camera. */
  position: [number, number, number];
  /** Multiplier on the idle drift speed. ~0.5–1.5. */
  drift?: number;
  /** Wrap width in world units. Widen it for longer quotes. Defaults to 2.6. */
  width?: number;
};

/**
 * Floating quotes orbiting the hero name — on doing the thing, and on doing it
 * consistently, to echo the personal statement below.
 *
 * Heads up on the Twain line: it is near-universally credited to him, but there
 * is no record of him writing or saying it. Its earliest known appearance is
 * H. Jackson Brown Jr.'s 1991 book "P.S. I Love You", where he credits his
 * mother, Sarah Frances Brown. Keep it as-is if you like the association, or
 * swap the author to "H. Jackson Brown Jr.'s mother" — or drop the attribution.
 */
export const quotes: Quote[] = [
  {
    text:
      "In twenty years, you will be more disappointed by the things you didn't do than by the ones you did.",
    author: "Mark Twain",
    position: [-5.2, 2.2, -3],
    drift: 0.9,
    width: 3.6,
  },
  {
    text:
      "Success doesn't come from what you do occasionally, but from what you do consistently.",
    author: "Marie Forleo",
    position: [5.3, 1.6, -4],
    drift: 1.15,
    width: 3.1,
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
    position: [-4.8, -2.2, -5.5],
    drift: 0.7,
    width: 2.9,
  },
  {
    text: "Energy and persistence conquer all things.",
    author: "Benjamin Franklin",
    position: [4.7, -2.5, -1.8],
    drift: 1.3,
    width: 2.5,
  },
  {
    text: "Fall seven times, stand up eight.",
    author: "Japanese proverb",
    position: [0.2, 3.5, -6.5],
    drift: 0.55,
    width: 2.4,
  },
];

/** Split into paragraphs; each one animates in on scroll. */
export const personalStatement = {
  eyebrow: "About",
  heading: "A short version of the long story.",
  paragraphs: [
    "I'm a third-year Computer Science student who genuinely enjoys figuring out how things work and finding ways to keep improving. I stay active through sports and regular gym training, and I've found that the discipline it takes to show up consistently translates directly into how I approach problem-solving and code.",
    "I enjoy stepping outside my comfort zone, whether that means taking on a new project, learning a new skill, or picking up a new hobby. I'm not chasing perfection. I'm focused on consistent, incremental progress, and that's the mindset I bring to my work: show up, put in the effort, and get a little better every day.",
  ],
};

export type Project = {
  title: string;
  description: string;
  /** Rendered as small pills under the description. */
  tech: string[];
  github?: string;
  live?: string;
  /** Optional short label in the card corner, e.g. "2025" or "Work". */
  meta?: string;
};

/**
 * Taken from your CV. The PDF only carried the link *text* ("Live Demo"), not
 * the URLs behind it, so no `github` or `live` values are set — a card hides
 * its link row when both are absent, so nothing is broken, but nothing is
 * clickable either. Fill these in and the buttons appear:
 *
 *   CalorieDuo               → live demo + repo
 *   WDCC UOAVC Web App       → repo (and a live URL if it is public)
 *   Mendo Construction       → live demo + repo
 *   Recipe Web App           → repo
 *
 * Your repos live under https://github.com/jlim05 — it is just the repo names
 * I do not have.
 */
export const projects: Project[] = [
  {
    title: "CalorieDuo",
    description:
      "Paired calorie tracking for two people keeping each other accountable, built on the idea that a deficit is much harder to hold alone. Real-time meal logging, live progress and an iMessage-style chat, all synced through Firestore onSnapshot listeners.",
    tech: ["React", "Firebase", "Tailwind CSS"],
  },
  {
    title: "WDCC UOAVC Web App",
    description:
      "Built executive collections in Payload CMS so committee data could be managed as structured content, and turned Figma designs into reusable responsive event cards. Delivered in Agile sprints with the wider team.",
    tech: ["React", "Next.js", "Tailwind CSS", "Payload CMS"],
  },
  {
    title: "Mendo Construction Web App",
    description:
      "A production site for a construction client, covering services, company values, projects and contact. A dynamic Payload CMS collection lets them update project images and details themselves, with no developer in the loop.",
    tech: ["React", "Next.js", "Tailwind CSS", "Payload CMS"],
  },
  {
    title: "Recipe Web App",
    description:
      "Search and favouriting implemented end to end, from Flask routes and business logic through to the UI, with pytest suites over the domain model and service layer to pin down the edge cases.",
    tech: ["Python", "Flask", "Tailwind CSS"],
    meta: "2025",
  },
];

/**
 * Section headings. These used to be hardcoded in the components; they live
 * here so every string on the page is editable from one file.
 */
export const sections = {
  projects: {
    eyebrow: "Work",
    heading: "Things I have built.",
    // Once the project links below are filled in, this reads well as:
    // "A selection of projects — click through for source or a live build."
    blurb: "A selection of things I have built recently.",
  },
  hobbies: {
    eyebrow: "Personal",
    heading: "Away from the keyboard.",
  },
};

export type Hobby = {
  /** Single emoji or short glyph — kept as text so there are no icon deps. */
  icon: string;
  title: string;
  description: string;
};

/** Descriptions are my wording, not yours — rewrite them in your own voice. */
export const hobbies: Hobby[] = [
  {
    icon: "🏋️",
    title: "Gym",
    description: "Regular training, and the discipline that comes with showing up.",
  },
  {
    icon: "🥊",
    title: "Martial arts",
    description: "Boxing and Brazilian jiu-jitsu.",
  },
  {
    icon: "🎮",
    title: "Gaming",
    description: "Unwinding with friends after a long day.",
  },
  {
    icon: "🍜",
    title: "Eating",
    description: "Enthusiastically, and in volume.",
  },
];

export type SocialLink = {
  label: string;
  href: string;
  /** Shown in the footer next to the label. */
  handle: string;
};

export const socials: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:jasonlimnzz@gmail.com",
    handle: "jasonlimnzz@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/jlim05",
    handle: "@jlim05",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jason-lim-1458b0375/",
    handle: "in/jason-lim",
  },
];

export const contact = {
  eyebrow: "Contact",
  heading: "Say hello.",
  blurb: "The inbox is the fastest way to reach me.",
  closingLine: "Built with Next.js, React Three Fiber",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Personal", href: "#personal" },
  { label: "Contact", href: "#contact" },
];
