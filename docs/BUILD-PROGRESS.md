# Build progress

Local review build. Not a launch.

Backup before the content migration: `/Users/davidwoods/Documents/IMUF-Backups/imuf-content-migration-20261119-214036` (SHA-256 match). The earlier build backup remains at `imuf-local-build-20261119-211848`.

## Completed

1. Desktop hero only. In the existing `min-width: 901px` rule, Quigs is `right: 0`, height 130%, top 32px. Mobile and the rest of the homepage were left in place.
2. History chapters 1–3, the published board list, the About IMUF introduction, and verified video links were migrated from the public site. The source log is `docs/CONTENT-MIGRATION.md`.
3. Video filters are progressive: all three categories are in the HTML, and the controls appear only after JavaScript starts.
4. Validation, 33 validator tests, and the Eleventy 3.1.7 build passed. Production roster and schedule stayed empty.
5. At 320px the interior footer wordmark overflowed by 16px. The small-screen size is now `clamp(68px, 24vw, 88px)`. Homepage footer sizing was not changed.

## Current stage

Approved initial-release plan recorded in `docs/RELEASE-PLAN.md`. Local CMS connections checked in `docs/CMS-ACCEPTANCE.md`. Homepage design, interior design, and images were not changed.

Hosted Pages CMS, GitHub, and Netlify were not connected. This machine has no `gh` or `netlify` command, and the repository has no remote. No IMUF-owned account was available to create one. The review deployment and hosted editing proof are still outstanding.

The earlier content-review stage remains in the notes below. Missing source material is in `docs/CONTENT-NEEDED.md`.

## Release and CMS pass — November 24, 2026

Backup: `/Users/davidwoods/Documents/IMUF-Backups/imuf-release-baseline-20261124-213523`. 255 files, including `.git`, matched SHA-256. Dependencies and `_site` were excluded.

Local fixtures in team introduction, one practice, and one board member rendered, then the original JSON bytes were restored and rebuilt. Existing video thumbnail path and dimensions rendered. Hosted steps A–H were not performed.

## Changed in this pass

- `src/assets/css/home-editorial.css`
- `src/assets/css/site.css`
- `src/assets/js/navigation.js`
- `src/_data/history.json`
- `src/_data/board.json`
- `src/_data/videos.json`
- `src/assets/images/history/` (25 photographs)
- `src/history/index.njk`
- `src/imuf-board/index.njk`
- `src/about-imuf/index.njk`
- `src/videos/index.njk`
- `.pages.yml`
- `scripts/validate-content.mjs`
- `scripts/validate-content.test.mjs`
- `docs/BUILD-PROGRESS.md`
- `docs/CONTENT-MIGRATION.md`
- `docs/CONTENT-NEEDED.md`
- `docs/MORNING-REVIEW.md`

## Blockers

No code blocker. Current roster, schedule, practices, leadership, player-resource chapters, scholarship rules, the newsletter form, and the donation campaign are still unsupplied. Safari, video playback, and a live JavaScript-disabled browser pass were not completed. HTTP redirects are not configured.
