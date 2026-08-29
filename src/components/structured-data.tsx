import { projects } from "@/lib/projects";
import { keywords, site } from "@/lib/site";

/**
 * JSON-LD for Google. Validate any change at https://validator.schema.org
 * and https://search.google.com/test/rich-results before deploying.
 *
 * Site-wide entities only — rendered from the root layout, so these appear on
 * every page. The projects CollectionPage is *not* here: it describes one
 * specific page and moved to <ProjectsCollectionData> below when the site went
 * multi-page, so it is emitted only on /projects.
 */
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        email: site.email,
        description: site.about,
        slogan: site.eyebrow,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/logo-lockup.png`,
          contentUrl: `${site.url}/logo-lockup.png`,
        },
        image: `${site.url}/opengraph-image`,
        knowsAbout: keywords,
        sameAs: [],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: site.name,
        url: site.url,
        email: site.email,
        description: site.about,
        parentOrganization: { "@id": `${site.url}/#organization` },
        areaServed: "Worldwide",
        serviceType: [
          "Website development",
          "AI automation development",
          "AI agent development",
          "Custom software development",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

/**
 * The projects CollectionPage. Rendered only by app/projects/page.tsx — its
 * `@id` is that URL, so emitting it site-wide (as it was when everything lived
 * on `/`) would claim every page is the projects collection.
 */
export function ProjectsCollectionData() {
  const graph = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.url}/projects#collection`,
    url: `${site.url}/projects`,
    name: "Featured Projects",
    isPartOf: { "@id": `${site.url}/#website` },
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      url: project.href,
      image: `${site.url}${project.image}`,
      genre: project.category,
      keywords: project.tags.join(", "),
      creator: { "@id": `${site.url}/#organization` },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
