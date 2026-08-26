/**
 * Source of truth: public/Automation_Squad_Rate_Card.pdf ("Updated August 2026").
 * Every number and description below is copied from that PDF. If the rate card
 * changes, update both — this file and the PDF should never disagree.
 */

export type CoreService = {
  id: string;
  name: string;
  description: string;
  setup: number;
  monthly: number;
  /** e.g. "+usage" appended after the monthly figure */
  monthlyNote?: string;
  /**
   * Column-width hint for the Pricing section's bento grid (lg breakpoint
   * only — see the `spanClass` map in sections/pricing.tsx). Widths only
   * vary here, never row heights: these cards hold real, variable-length
   * copy, so forcing a fixed row height risks clipping a longer description.
   */
  span: "full" | "half" | "third";
};

export const coreServices: CoreService[] = [
  {
    id: "website",
    name: "Business Website",
    description:
      "A responsive website built to convert visitors into contacts: a booking or quote form, WhatsApp button, Google Maps, and basic SEO included.",
    setup: 250,
    monthly: 20,
    span: "full",
  },
  {
    id: "assistant",
    name: "AI Customer Assistant",
    description:
      "A chatbot trained on your services, pricing, and FAQs. It answers questions, collects a name and number, and sends qualified leads straight to you.",
    setup: 275,
    monthly: 50,
    span: "half",
  },
  {
    id: "voice",
    name: "AI Voice Receptionist",
    description:
      "Answers your business line day and night, understands what the caller wants, and books the appointment directly into your calendar.",
    setup: 475,
    monthly: 85,
    monthlyNote: "+usage",
    span: "half",
  },
  {
    id: "leadgen",
    name: "Lead Generation System",
    description:
      "Finds businesses matching your ideal customer, pulls their contact details, and loads them into a dashboard ranked by fit.",
    setup: 650,
    monthly: 80,
    span: "third",
  },
  {
    id: "followup",
    name: "Automated Lead Follow-Up",
    description:
      "Every new lead gets an instant reply, then a scheduled follow-up sequence over the next two weeks until they respond.",
    setup: 375,
    monthly: 45,
    span: "third",
  },
  {
    id: "reputation",
    name: "Review & Reputation System",
    description:
      "Happy customers are sent to leave a public review. Unhappy ones are routed to a private form first, so you can fix it before it becomes one.",
    setup: 375,
    monthly: 40,
    span: "third",
  },
];

export type Bundle = {
  id: string;
  name: string;
  description: string;
  /** must match a CoreService.name above */
  includes: string[];
  setup: number;
  monthly: number;
  monthlyNote?: string;
  /** omitted for Foundation — it's a single service, so there is nothing to save */
  savings?: string;
};

export const bundles: Bundle[] = [
  {
    id: "foundation",
    name: "Foundation",
    description:
      "For businesses that just need a professional site and a way for people to reach them.",
    includes: ["Business Website"],
    setup: 250,
    monthly: 20,
  },
  {
    id: "growth",
    name: "Growth",
    description:
      "Turns the website into something that works while you're not looking: answering questions and capturing leads on its own.",
    includes: ["Business Website", "AI Customer Assistant"],
    setup: 450,
    monthly: 60,
    savings: "Save $75 on setup and $10 a month versus buying separately.",
  },
  {
    id: "sales-automation",
    name: "Sales Automation",
    description:
      "Brings in new customers and makes sure none of them go cold waiting for a reply.",
    includes: [
      "Business Website",
      "Lead Generation System",
      "Automated Lead Follow-Up",
    ],
    setup: 1050,
    monthly: 120,
    savings: "Save $225 on setup and $25 a month versus buying separately.",
  },
  {
    id: "full-system",
    name: "Full System",
    description:
      "Every service running together: website, chatbot, voice receptionist, lead generation, follow-up, and reputation management.",
    includes: [
      "Business Website",
      "AI Customer Assistant",
      "AI Voice Receptionist",
      "Lead Generation System",
      "Automated Lead Follow-Up",
      "Review & Reputation System",
    ],
    setup: 1950,
    monthly: 280,
    monthlyNote: "+usage",
    savings: "Save $450 on setup and $40 a month versus buying separately.",
  },
];

export type AddOn = {
  id: string;
  name: string;
  price: string;
};

export const addOns: AddOn[] = [
  {
    id: "language",
    name: "Extra language for the chatbot or voice assistant",
    price: "+$75 setup, +$10/mo",
  },
  {
    id: "crm",
    name: "Connecting to a CRM or spreadsheet you already use",
    price: "+$100 setup",
  },
  {
    id: "custom",
    name: "Anything outside the services above",
    price: "Quoted after a short call",
  },
];

export const pricingUpdated = "August 2026";

export const pricingIntro =
  "We build the systems small businesses actually need to stop losing customers to slow replies: websites, chatbots, voice receptionists, and the automation connecting them. Every service has two costs, a one-time setup fee for the build, and a small monthly fee for hosting, API usage, and upkeep. Combine services into a bundle and the monthly fee drops.";

export const pricingHowWeWork =
  "Every project starts with a short call about what you actually need. Scope and the setup fee are confirmed before any work begins, so there are no surprises on the invoice. Single-service builds are typically live within one to two weeks; bundles take two to four depending on scope.";

export const ratecard = {
  href: "/Automation_Squad_Rate_Card.pdf",
  downloadName: "Automation-Squad-Rate-Card.pdf",
} as const;

export function formatUSD(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}
