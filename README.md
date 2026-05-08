# Gilley Construction Website Revamp

Modern Next.js marketing site and media-forward gallery experience for Gilley Construction & Restoration, Inc.

## Stack

- Next.js 14 App Router
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Included In This Pass

- Full homepage redesign with modern visual language
- Sticky navigation, hero, services, testimonials, and CTA sections
- Multi-facet gallery filtering with cumulative filter logic
- Local media + imported media from current live site
- Cloudinary tagging standard documented for scalable production filtering

## Gallery Filter Model

Filters are organized by facets:

- `market`
- `project`
- `feature`
- `style`

Filtering behavior:

- AND across facets
- AND within selected values for each facet

This enables drill-down workflows like:

`Residential` + `Driveway` + `Stamped Concrete`

## Content/Data Files

- `data/site-content.ts`: services, testimonials, gallery items, and taxonomy
- `docs/cloudinary-tagging-strategy.md`: recommended Cloudinary tagging/metadata standard

## Build Check

```bash
npm run lint
npm run build
```
