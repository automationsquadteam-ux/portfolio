export type Project = {
  id: string;
  index: string;
  badge: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  image: string;
  imageAlt: string;
  /** true = card spans the full grid width */
  wide?: boolean;
};

/**
 * Display order is grid order. The lead card is `wide`, so it spans both
 * columns on md+ and the two that follow sit side by side beneath it.
 * `index` / `badge` are positional labels — renumber them if you reorder.
 */
export const projects: Project[] = [
  {
    id: "charmeem",
    index: "01",
    badge: "CHAR MEEM / 01",
    category: "Website",
    title: "Char Meem Clothing",
    description:
      "A modern business website built for a clothing manufacturing company with a clean UI, responsive design, and optimized performance.",
    tags: ["Next.js", "Tailwind CSS", "Supabase"],
    href: "https://khud-clothing-eight.vercel.app",
    image: "/projects/charmeem.png",
    imageAlt: "Char Meem storefront hero reading Wear Your Imprint",
    wide: true,
  },
  {
    id: "anchor",
    index: "02",
    badge: "ANCHOR / 02",
    category: "Web Development",
    title: "Anchor Builders",
    description:
      "A modern business website built for an anchor manufacturing company with a clean UI, responsive design, and optimized performance.",
    tags: ["Next.js", "TypeScript", "Supabase"],
    href: "https://www.anchorassociatesandbuilders.com",
    image: "/projects/anchor.png",
    imageAlt: "Anchor Builders homepage showing a full-bleed project photograph",
  },
  {
    id: "lumberwiz",
    index: "03",
    badge: "LUMBER WIZ / 03",
    category: "AI + Web Application",
    title: "Lumber Wiz",
    description:
      "An AI-powered platform that simplifies lumber calculations and workflows, helping users make faster and more accurate decisions.",
    tags: ["React", "AI Workflows", "TypeScript"],
    href: "https://lumberwiz-2-0.vercel.app/",
    image: "/projects/lumberwiz.png",
    imageAlt: "LumberWiz homepage with a terracotta hero section",
  },
];
