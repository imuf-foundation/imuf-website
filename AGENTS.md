# IMUF website — agent instructions

David Woods is the project head and final decision-maker. Follow `IMUF-Build-Brief.md` in this folder. Do not create a second competing copy of that brief.

## Stack

- Hand-written HTML/Nunjucks templates, plain CSS, and a small amount of vanilla JavaScript.
- Eleventy 3.1.7, pinned exactly, with a committed lockfile.
- Node.js 24 LTS locally and on Netlify (`>=24 <25`).
- Editable facts live in JSON under `src/_data/`. Hosted Pages CMS is the intended browser editor; it is not connected yet.
- Generated HTML belongs in `_site/`. Edit source files, not generated output.

Do not add React, Next.js, Astro, Tailwind, animation libraries, a database, serverless functions, or a self-hosted CMS unless David explicitly authorizes a change.

## Content and design

- Do not invent players, seasons, practice details, leadership, recruiting instructions, scholarship facts, testimonials, statistics, or donation claims.
- Keep production JSON arrays empty until the team supplies real information.
- Escape ordinary content. Do not render JSON values as raw HTML.
- David supplied and selected the team photographs and logos for this draft. Use the asset register in docs/ASSETS.md. Do not generate new logos or use stock athletes. The hero is an AI-assisted cutout based on DSC06303 and remains a visual draft pending David’s review.
- Visual design in this milestone is an initial direction for David to review, not a finished brand system.

## Validation and publishing

- Run `npm run validate` before builds. `npm run build` and `npm run dev` already do this.
- A failed validation must leave the previous successful site in place.
- An edited JSON file and a local build prove the content/template connection only. They do not prove hosted Pages CMS, GitHub permissions, or Netlify publishing.

## Accounts and deployment

Do not deploy, create remote repositories, connect GitHub/Netlify/Pages CMS, purchase subscriptions, change DNS, or modify the live Squarespace site without David’s direction.

## Review draft

This checkout includes the revision-20 design-review draft. Its local preview is not IMUF’s Netlify deployment or the public Squarespace website. Keep Netlify, GitHub organization setup, Pages CMS connection and DNS changes separate from design review. Supporting routes are content frames until their approved source material is migrated.
