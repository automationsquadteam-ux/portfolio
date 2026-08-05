import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData } from "@/components/structured-data";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Pipeline } from "@/components/sections/pipeline";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main>
        <Hero />
        <Projects />
        <Pipeline />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
