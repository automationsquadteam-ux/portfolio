import type { Metadata } from "next";
import { About } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Automation Squad is a software house building websites, AI automations, AI agents, and modern web applications for growing businesses.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <About />;
}
