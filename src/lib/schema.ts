import type { ServiceOffering } from "@/data/services";
import type { FAQEntry } from "@/data/faqs";
const SITE_URL = "https://bitbash.dev";
export interface SchemaBreadcrumb {
  name: string;
  href: string;
}

export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BitBash",
  "url": SITE_URL,
  "logo": `${SITE_URL}/favicon.png`,
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "hello@bitbash.dev",
      "availableLanguage": ["en"],
      "areaServed": "Global"
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/bitbash-dev",
    "https://github.com/bitbash-dev"
  ]
});

export const buildWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "BitBash",
  "url": SITE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
});

export const buildWebPageSchema = (path = "/", description?: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "BitBash - Transform Your Business with Intelligent Solutions",
  "url": `${SITE_URL}${path}`,
  "description": description ??
    "The Complete Platform for Modern Teams and Innovators. Experience lightning-fast performance, enterprise security, and AI-powered automation.",
  "isPartOf": {
    "@type": "WebSite",
    "name": "BitBash",
    "url": SITE_URL
  },
  "breadcrumb": `${SITE_URL}/#breadcrumbs`
});

export const buildBreadcrumbSchema = (trail: SchemaBreadcrumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": trail.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.href
  }))
});

export const buildServiceSchemas = (services: ServiceOffering[]) =>
  services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "serviceType": service.category,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "BitBash",
      "url": SITE_URL
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "0",
        "longitude": "0"
      },
      "geoRadius": "20000"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": service.priceCurrency,
      "price": service.startingPrice,
      "availability": "https://schema.org/InStock",
      "url": `${SITE_URL}${service.ctaHref}`
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${service.name} deliverables`,
      "itemListElement": service.deliverables.map((item) => ({
        "@type": "OfferCatalog",
        "name": item
      }))
    },
    "image": `${SITE_URL}${service.image}`
  }));

export const buildFAQSchema = (faqs: FAQEntry[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

