---
title: "BitBash Keyword-to-Section Map"
updated: "2025-11-18"
owner: "Growth / SEO"
---

## Purpose

Clarify which search intents each high-traffic page section covers so copy, metadata, and schema stay aligned as content evolves.

## Priority Keywords & Targets

| Keyword / Intent | Funnel Stage | Primary Section | Supporting Content |
| --- | --- | --- | --- |
| software development agency | Awareness | `src/components/Hero.tsx` hero blurb & CTA | `src/components/Features.tsx` intro paragraph |
| full stack app development | Consideration | `Features` cards (“Full-Stack Development”) | `src/pages/DevelopmentServices.tsx` |
| AI automation services | Consideration | `Features` card (“AI Solutions”) | `src/pages/AutomationServices.tsx`, `TECHNICAL-SUMMARY.md` AI highlights |
| business process automation | Consideration | `Features` card (“Automation System”) | Case studies in `src/components/Showcase.tsx` |
| enterprise data scraping | Consideration | `Features` card (“Data Scraping”) | `scripts/export-strapi-data.js` notes on data hygiene |
| SaaS MVP development | Consideration | `Features` card (“SaaS & MVP Development”) | `src/pages/Projects.tsx` featured MVPs |
| Strapi deployment workflow | Bottom | `PRODUCTION-DEPLOYMENT.md` (internal reference) | FAQ entry “How do I get started?” |
| bitbash deployment checklist | Bottom | `TECHNICAL-SUMMARY.md` key takeaways | CTA buttons linking to contact |
| pricing for AI automation | Bottom | `src/pages/Pricing.tsx` & FAQ payment entries | `FAQ` component “What payment methods do you accept?” |

## Gaps & Next Steps

- **AI + security**: add subheading in `Hero` covering “enterprise-grade AI security” to capture “secure AI automation”.
- **Deployment documentation**: surface highlights from `PRODUCTION-DEPLOYMENT.md` in CTA copy or downloadable PDFs instead of a dedicated /docs route.
- **Schema copy sync**: ensure new `Service` JSON-LD blocks reuse the same text snippets listed here (centralized in `src/data/services.ts`).

