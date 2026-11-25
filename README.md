# IMUF website

Local prototype for the Indiana Men’s Ultimate Foundation website rebuild. The public site remains at [hoosiermamas.org](https://www.hoosiermamas.org/). This folder is not deployed.

Project direction is in [`IMUF-Build-Brief.md`](IMUF-Build-Brief.md).

## Requirements

- Node.js 24.x (this repo includes `.nvmrc`)
- npm 10+ (npm 11 is fine)
- Git

## Local commands

```bash
cd /Users/davidwoods/Documents/imuf-website
nvm use   # if you use nvm
npm install
npm run validate
npm run build
npm run dev
```

`npm run dev` serves the site at http://localhost:8080/ after validation.

`npm run build` validates content, then writes static HTML to `_site/`.

## Project structure

```text
src/_data/          Editable JSON content
src/_includes/      Nunjucks layout and header/footer
src/assets/         CSS, browser JavaScript, later images
src/index.njk       Home
src/team/index.njk  Team Hub
src/team/roster.njk Mama’s Roster
scripts/            Content validation
_site/              Generated output (do not edit)
```

## Editable data

| File | Used on |
| --- | --- |
| `src/_data/team.json` | Team Hub introduction, join text, practices, and leadership |
| `src/_data/roster.json` | Roster page |
| `src/_data/schedule.json` | Empty season record. The schedule page does not render it yet |
| `src/_data/site.json` | Shared names and external URLs (not a Pages CMS form in this milestone) |

Ordinary updates should go through those JSON files, not the templates. Hosted Pages CMS forms are defined in `.pages.yml` but are not connected or verified yet.

## Routes

Home uses the revision-20 design source. Supporting pages are the supplied content frames. Search indexing stays off, and newsletter submission stays disabled.

- `/` Home
- `/team/` Team Hub
- `/team/roster/` Mama’s Roster
- `/team/schedule/` Season Schedule
- `/team/player-resources/` Player Resources
- `/about-imuf/` About IMUF
- `/imuf-board/` IMUF Board
- `/contact-us/` Contact
- `/history/` Team History
- `/videos/` Video Archive
- `/newsletters/` Newsletters
- `/scholarships/mike-moore/` Mike Moore Scholarship
- `/donate-now/` Donate

The external store and social links remain in the footer. Asset and design notes are in `docs/ASSETS.md` and `docs/BUILD-PRIORITIES.md`.
