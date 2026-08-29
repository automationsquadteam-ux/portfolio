import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Automation Squad. Email us to talk about websites, AI automations, AI agents, and custom web applications.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
