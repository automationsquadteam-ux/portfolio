import type { Metadata } from "next";
import { Projects } from "@/components/sections/projects";
import { ProjectsCollectionData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work from Automation Squad: business websites, AI-powered web applications, and custom software built for growing companies.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsCollectionData />
      <Projects />
    </>
  );
}
