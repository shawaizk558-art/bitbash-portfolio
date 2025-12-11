import { coreServices } from "../src/data/services.js";
import { defaultFaqs } from "../src/data/faqs.js";
import {
  buildFAQSchema,
  buildServiceSchemas
} from "../src/lib/schema.js";

const errors: string[] = [];

// Validate services
const serviceSchemas = buildServiceSchemas(coreServices);
serviceSchemas.forEach((schema, index) => {
  if (!schema.name) {
    errors.push(`Service schema at index ${index} is missing name`);
  }
  if (!schema.offers?.price) {
    errors.push(`Service schema (${schema.name}) missing offer price`);
  }
});

// Validate FAQ coverage
const faqSchema = buildFAQSchema(defaultFaqs);
if (!faqSchema.mainEntity?.length) {
  errors.push("FAQ schema has no entries");
}

const snapshot = {
  services: serviceSchemas,
  faq: faqSchema
};

if (errors.length) {
  console.error("Schema validation failed:\n" + errors.map((err) => ` - ${err}`).join("\n"));
  process.exit(1);
}

console.log("Schema payloads validated:", {
  services: serviceSchemas.length,
  faqs: faqSchema.mainEntity?.length
});

if (process.argv.includes("--write")) {
  const { writeFileSync } = await import("node:fs");
  writeFileSync("public/data/schema-snapshot.json", JSON.stringify(snapshot, null, 2));
  console.log("Wrote schema snapshot to public/data/schema-snapshot.json");
}

