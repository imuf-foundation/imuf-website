# Status — milestone 01

Date: 2 November 2026 (Los Angeles)

## What this milestone implemented

Local Eleventy 3.1.7 foundation with three prototype routes: Home `/`, Team Hub `/team/`, and Mama’s Roster `/team/roster/`. Shared Nunjucks layout, temporary navigation, plain CSS, JSON content files, content validation, Pages CMS form config, and Netlify build settings. Donate still points at the current public website.

## Tests actually performed

Recorded after the local build and browser pass in this milestone:

| Check | Result |
| --- | --- |
| `node --version` / `npm --version` / `git --version` | Standalone Node v24.22.2, npm 11.19.1, git 2.50.1 |
| `npm install` of `@11ty/eleventy@3.1.7` | Performed; lockfile generated |
| `npm run validate` on empty production content | Performed |
| `npm run build` on empty production content | Performed |
| Temporary test player and test practice, then rebuild | Performed, then restored |
| Escaping of `<` and `>` in generated HTML | Performed during the test-data rebuild |
| Restore empty `team.json` and `roster.json` | Performed |
| Final clean `npm run build` | Performed |
| Browser check of `/`, `/team/`, `/team/roster/` at 1440px, 390px, 320px | Performed in Cursor’s Chromium browser. No horizontal overflow. Mobile menu, Escape, and empty states checked. Safari was not used. |
| Hosted Pages CMS login | Not performed |
| GitHub permissions / commit from CMS | Not performed |
| Netlify automatic publish | Not performed |
| Trainee editing session | Not performed |

## Local content/template proof vs hosted publishing

**Local proof (this milestone):** changing `src/_data/team.json` and `src/_data/roster.json` updates the generated Team Hub and roster pages after a local build.

**Hosted publishing:** not connected. `.pages.yml` and `netlify.toml` are files only. They are not evidence that an invited editor can save in Pages CMS, that GitHub records the change, or that Netlify publishes it.

## Remaining input and account dependencies

See `docs/CONTENT-REGISTER.md`. Still needed before later milestones can be finished: real roster/practice/leadership/recruiting content, approved photos and logo, donation destination confirmation, GitHub organization, Netlify owner, Pages CMS invite, Notion export, scholarship source material, and domain/account confirmation.

## Next milestone

After David reviews this visual direction: expand toward the agreed sitemap (About, Board, Contact, Player Resources, schedule, history, videos, newsletters, scholarship, donate) using the same layout and content model. Do not deploy until David directs it.

## Design source integration — 17 November 2026

Revision 20 from `IMUF-Cursor-Build-01` is integrated as a local baseline. Home, shared layout, fonts, optimized images, and the supplied content-frame routes are in place. No layout corrections were made during this pass.

Preserved from the existing project: `IMUF-Build-Brief.md`, the content validator and its tests, Eleventy 3.1.7 and the lockfile, Netlify settings, Git configuration, and the populated JSON strings in `team.json`, `roster.json`, and `site.json`. Practice, leadership, roster, and schedule arrays remain empty. The export’s Team Hub introduction sentence was not copied over the existing introduction.

`docs/BUILD-PRIORITIES.md` records the next Home layout pass. That pass has not been started. Newsletter submission remains disabled. noindex remains enabled. Nothing was deployed.
