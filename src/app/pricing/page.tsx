import type { Metadata } from "next";
import { Pricing } from "@/components/sections/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Setup and monthly pricing for every Automation Squad service: websites, AI agents, voice receptionists, lead generation, follow-up, and reputation management. Bundles included.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return <Pricing />;
}
