import { projects } from "@/lib/projects";
import { keywords, site } from "@/lib/site";

/**
 * JSON-LD for Google. Validate any change at https://validator.schema.org
 * and https://search.google.com/test/rich-results before deploying.
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
      {
        "@type": "CollectionPage",
        "@id": `${site.url}/#projects`,
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
