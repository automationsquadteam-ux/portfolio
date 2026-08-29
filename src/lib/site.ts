export const site = {
  name: "Automation Squad",
  /** Apex domain is canonical; www redirects to it (see BUILD_SPEC.md §12). */
  url: "https://team-automationsolutions.me",
  domain: "team-automationsolutions.me",
  email: "send@team-automationsolutions.me",
  eyebrow: "Software House · AI Automations · Web Development",
  title: "Automation Squad · Websites, Automations & AI Agents",
  description:
    "Automation Squad is a software house that builds websites, AI automations, AI agents, and custom web applications for growing businesses.",
  about:
    "Automation Squad builds websites, AI automations, AI agents, and modern web applications that save businesses time while delivering polished user experiences.",
} as const;

/** Mutable copy — Next's Metadata type does not accept a readonly array. */
export const keywords: string[] = [
  "software house",
  "website development",
  "web development agency",
  "AI automation agency",
  "AI automation",
  "AI automation services",
  "workflow automation",
  "AI agents",
  "AI agent development",
  "full-stack development",
  "web application development",
  "Next.js development",
  "React development",
  "custom software",
  "business process automation",
  "custom websites",
  "Automation Squad",
];

const SUBJECT = "Project enquiry for Automation Squad";
const BODY = "Hi Automation Squad,\n\nI'd like to talk about:\n";

/** Opens the Gmail web composer, pre-filled. Use with target="_blank". */
export const gmailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent(site.email)}` +
  `&su=${encodeURIComponent(SUBJECT)}` +
  `&body=${encodeURIComponent(BODY)}`;

/** Native mail-client fallback. */
export const mailtoUrl = `mailto:${site.email}?subject=${encodeURIComponent(
  SUBJECT,
)}`;

/**
 * Our own cold-outreach dashboard. Public, read-only, and the numbers on it are
 * live — which is why the section on this site shows the status vocabulary and
 * links out rather than repeating counts that would go stale within a day.
 */
export const leadsDashboard = {
  url: "https://leads-website-alpha.vercel.app/",
  host: "leads-website-alpha.vercel.app",
} as const;

/**
 * Routes, not hash anchors — the site became multi-page on 2026-08-27.
 * `segment` is what `useSelectedLayoutSegment()` returns for that route and
 * is what drives the header's active state. Home's segment is `null`, which is
 * exactly what the hook returns on `/`, so the same equality check covers it.
 */
export const navLinks = [
  { label: "Home", href: "/", segment: null },
  { label: "Projects", href: "/projects", segment: "projects" },
  { label: "Pipeline", href: "/pipeline", segment: "pipeline" },
  { label: "Pricing", href: "/pricing", segment: "pricing" },
  { label: "About", href: "/about", segment: "about" },
  { label: "Contact", href: "/contact", segment: "contact" },
] as const;
