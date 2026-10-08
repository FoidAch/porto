/* ==========================================================================
   Site content - EDIT THIS FILE ONLY
   Everything below drives the rendered pages. No markup changes needed.
   Source: https://github.com/FoidAch
   ========================================================================== */

const PROFILE = {
  name: "FoidAch",
  monogram: "FA",
  title: "Developer & Student",
  role: "Learning in public, building along the way",
  email: "foidach@example.com",
  location: "Indonesia",
  timezone: "WIB · UTC+7",
  available: true,
  availabilityNote: "Open to learning & collaboration",
  heroLines: [
    "Learning to build",
    "one commit at a time."
  ],
  lede:
    "I'm a developer learning in public. Every repository here started as curiosity and turned into something I use. I care about clean code, honest learning notes, and shipping small things often.",
  bio: [
    "I started writing code to automate small parts of my own day, and never really stopped. What began as <strong>experiments and learning projects</strong> turned into a habit of building, breaking, and rebuilding.",
    "Most of my work lives on GitHub. Some of it is polished, some of it is a scratchpad — and I think both are valuable. I'm currently focused on <strong>TypeScript, JavaScript, and C#</strong>, sharpening the fundamentals before chasing frameworks.",
    "This space is where I keep notes on what I learn and the projects I finish. Expect the content to grow."
  ],
  facts: [
    { key: "Focus", value: "JavaScript, TypeScript, C#" },
    { key: "Learning", value: "Building in public" },
    { key: "Repos", value: "5 public projects" },
    { key: "Member since", value: "October 2025" }
  ],
  socials: [
    { label: "GitHub", icon: "github", handle: "@FoidAch", url: "https://github.com/FoidAch" },
    {
      label: "Repositories",
      icon: "grid",
      handle: "5 public repos",
      url: "https://github.com/FoidAch?tab=repositories"
    }
  ]
};

/* Stats strip */
const STATS = [
  { value: "5", label: "Public repos" },
  { value: "3", label: "Languages" },
  { value: "2025", label: "Joined GitHub" },
  { value: "∞", label: "Curiosity" }
];

/* --------------------------------------------------------------------------
   Projects - sourced from https://github.com/FoidAch
   `tint` drives the generated artwork hue; `featured` highlights on home
   -------------------------------------------------------------------------- */

const PROJECTS = [
  {
    title: "portofolio-restu",
    description:
      "A TypeScript portfolio experiment. The starting point for building and iterating on my personal site - exploring structure, styling, and layout.",
    year: "2026",
    role: "TypeScript",
    tags: ["TypeScript", "Portfolio", "Web"],
    category: "web",
    href: "https://github.com/FoidAch/portofolio-restu",
    featured: true,
    tint: "indigo",
    index: "01"
  },
  {
    title: "pelatihanenuma",
    description:
      "A JavaScript training project - working through exercises and small utilities to build stronger JavaScript fundamentals.",
    year: "2026",
    role: "JavaScript",
    tags: ["JavaScript", "Learning", "Practice"],
    category: "opensource",
    href: "https://github.com/FoidAch/pelatihanenuma",
    featured: true,
    tint: "violet",
    index: "02"
  },
  {
    title: "TaskFlow",
    description:
      "An app concept for keeping track of tasks and schedules - designed to help organise daily work without clutter.",
    year: "2026",
    role: "Project",
    tags: ["Productivity", "App", "Planning"],
    category: "mobile",
    href: "https://github.com/FoidAch/TaskFlow",
    featured: true,
    tint: "cyan",
    index: "03"
  },
  {
    title: "MAKerrr",
    description:
      "A Visual Studio C# project - learning the language through visual and interactive work.",
    year: "2026",
    role: "C#",
    tags: ["C#", "Visual Studio", "Desktop"],
    category: "design",
    href: "https://github.com/FoidAch/MAKerrr",
    featured: false,
    tint: "emerald",
    index: "04"
  },
  {
    title: "my-portofolio",
    description:
      "An earlier iteration of a personal portfolio - the first attempt at putting a profile online.",
    year: "2026",
    role: "Project",
    tags: ["Portfolio", "Web", "Experiment"],
    category: "web",
    href: "https://github.com/FoidAch/my-portofolio",
    featured: false,
    tint: "amber",
    index: "05"
  }
];

/* Filter categories - `key` matches PROJECTS[].category */
const FILTERS = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Apps" },
  { key: "design", label: "C# / .NET" },
  { key: "opensource", label: "Learning" }
];

/* --------------------------------------------------------------------------
   Experience timeline
   -------------------------------------------------------------------------- */

const EXPERIENCE = [
  {
    period: "2026 - Present",
    role: "Self-directed Learning & Building",
    company: "GitHub",
    highlights: [
      "Working through JavaScript and TypeScript fundamentals",
      "Building small projects in public to track progress",
      "Exploring C# and desktop development with Visual Studio"
    ]
  },
  {
    period: "2025 - 2026",
    role: "First Public Projects",
    company: "GitHub",
    highlights: [
      "Created the FoidAch account and published a first portfolio experiment",
      "Started a JavaScript training repository",
      "Designed and planned the TaskFlow productivity app"
    ]
  }
];

/* --------------------------------------------------------------------------
   Skills - `level` is a percentage 0-100 driving the proficiency bar
   -------------------------------------------------------------------------- */

const SKILLS = [
  { name: "JavaScript", level: 70, icon: "code" },
  { name: "TypeScript", level: 60, icon: "layers" },
  { name: "C#", level: 45, icon: "grid" },
  { name: "HTML & CSS", level: 65, icon: "sparkle" },
  { name: "Git & GitHub", level: 55, icon: "server" },
  { name: "Problem Solving", level: 75, icon: "chart" }
];

/* Marquee strip */
const TOOLKIT = [
  "TypeScript",
  "JavaScript",
  "C#",
  "HTML",
  "CSS",
  "Git",
  "GitHub",
  "Visual Studio",
  "Node.js",
  "Learning",
  "Building",
  "Iterating"
];

/* --------------------------------------------------------------------------
   Icon registry (inline SVG paths, 24x24 viewBox, stroke-based)
   -------------------------------------------------------------------------- */

const ICONS = {
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  sparkle:
    '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
  server:
    '<rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01M6 17h.01"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  send: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  github:
    '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  x: '<path d="M4 4l16 16M20 4 4 20"/>'
};

/* --------------------------------------------------------------------------
   Abstract artwork for project thumbnails - pure SVG, no image assets
   -------------------------------------------------------------------------- */

const TINTS = {
  indigo: { a: "#5e6ad2", b: "#7c8cff", c: "#a78bfa" },
  cyan: { a: "#0e7490", b: "#22d3ee", c: "#67e8f9" },
  violet: { a: "#7c3aed", b: "#a78bfa", c: "#f0abfc" },
  emerald: { a: "#047857", b: "#34d399", c: "#6ee7b7" },
  amber: { a: "#b45309", b: "#f59e0b", c: "#fcd34d" },
  rose: { a: "#be123c", b: "#fb7185", c: "#fda4af" }
};

/**
 * Builds the inline SVG artwork for a project card thumbnail.
 * @param {string} tint - key from TINTS
 * @param {number} seed - integer to vary the composition
 * @returns {string} SVG markup
 */
function projectArtwork(tint, seed) {
  const t = TINTS[tint] || TINTS.indigo;
  const id = "g" + seed;
  const bars = Array.from({ length: 5 }, (_, i) => {
    const h = 18 + ((seed * 7 + i * 13) % 46);
    return `<rect x="${8 + i * 8}" y="${60 - h}" width="4" height="${h}" rx="2" fill="rgba(255,255,255,${0.1 + (i % 3) * 0.06})"/>`;
  }).join("");

  return `
<svg class="project-thumb-art" viewBox="0 0 80 60" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Abstract project artwork" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.a}"/>
      <stop offset="55%" stop-color="${t.b}"/>
      <stop offset="100%" stop-color="${t.c}"/>
    </linearGradient>
    <radialGradient id="${id}g" cx="0.7" cy="0.2" r="0.9">
      <stop offset="0%" stop-color="rgba(255,255,255,0.35)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="80" height="60" fill="#0b0c0e"/>
  <rect width="80" height="60" fill="url(#${id})" opacity="0.9"/>
  <rect width="80" height="60" fill="url(#${id}g)"/>
  <g transform="translate(46,12) rotate(-12)">
    <rect width="20" height="20" rx="3" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.2"/>
    <path d="M20 20 L32 32" stroke="rgba(255,255,255,0.5)" stroke-width="1.2"/>
  </g>
  <circle cx="${14 + (seed % 5) * 4}" cy="${12 + (seed % 3) * 5}" r="${3 + (seed % 4)}" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="1.1"/>
  <g transform="translate(4,52)">${bars}</g>
  <g stroke="rgba(255,255,255,0.12)" stroke-width="0.6">
    <path d="M0 20h80M0 40h80"/>
  </g>
</svg>`.trim();
}

/** Portrait artwork for the About page - abstract layered gradient bust. */
function portraitArtwork() {
  return `
<svg class="portrait-art" viewBox="0 0 160 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Abstract portrait" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pg1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5e6ad2"/>
      <stop offset="50%" stop-color="#7c8cff"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
    <linearGradient id="pg2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.28)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </linearGradient>
    <radialGradient id="pg3" cx="0.5" cy="0.32" r="0.6">
      <stop offset="0%" stop-color="rgba(167,139,250,0.45)"/>
      <stop offset="100%" stop-color="rgba(167,139,250,0)"/>
    </radialGradient>
  </defs>
  <rect width="160" height="200" fill="#0b0c0e"/>
  <rect width="160" height="200" fill="url(#pg3)"/>
  <g transform="translate(80,200)">
    <path d="M-58 0c0-34 26-56 58-56s58 22 58 56Z" fill="url(#pg1)" opacity="0.92"/>
    <circle cx="0" cy="-88" r="34" fill="url(#pg1)" opacity="0.92"/>
    <path d="M-58 0c0-34 26-56 58-56s58 22 58 56Z" fill="url(#pg2)"/>
  </g>
  <g stroke="rgba(255,255,255,0.08)" stroke-width="0.8">
    <path d="M0 40h160M0 80h160M0 120h160M0 160h160"/>
  </g>
  <circle cx="128" cy="34" r="12" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
  <circle cx="30" cy="150" r="20" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
</svg>`.trim();
}

/** Renders an inline icon from the registry. */
function icon(name, size) {
  const path = ICONS[name];
  if (!path) return "";
  const s = size || 24;
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${path}</svg>`;
}
