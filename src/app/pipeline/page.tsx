import type { Metadata } from "next";
import { Pipeline } from "@/components/sections/pipeline";

export const metadata: Metadata = {
  title: "Lead Pipeline",
  description:
    "The live outreach pipeline Automation Squad runs on its own lead generation system, with every lead status shown in the open.",
  alternates: { canonical: "/pipeline" },
};

export default function PipelinePage() {
  return <Pipeline />;
}
