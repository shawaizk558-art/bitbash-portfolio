import { StructuredData } from "@/components/StructuredData";
import { defaultFaqs } from "@/data/faqs";
import { coreServices } from "@/data/services";
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildOrganizationSchema,
  buildServiceSchemas,
  buildWebPageSchema,
  buildWebsiteSchema
} from "@/lib/schema";

const SITE_URL = "https://bitbash.dev";

const homepageBreadcrumbs = [
  { name: "Home", href: `${SITE_URL}/` },
  { name: "Solutions", href: `${SITE_URL}/#features` }
];

export const HomepageSchema = () => {
  const schemas = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema("/", "The No 1 Automation Company in the World, Built for Success. The Complete Platform for Modern Teams and Innovators. Experience lightning-fast performance, enterprise security, and AI-powered automation."),
    buildBreadcrumbSchema(homepageBreadcrumbs),
    buildFAQSchema(defaultFaqs),
    ...buildServiceSchemas(coreServices)
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}
    </>
  );
};

