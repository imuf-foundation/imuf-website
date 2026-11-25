# CMS acceptance

Record of what an ordinary editor can change, what was proven locally, and what still requires hosted Pages CMS. Editing a JSON file on this computer is not a hosted CMS test. No hosted test was performed in this pass because no IMUF GitHub or Netlify account is available here.

Checked on November 24, 2026. Original `team.json` and `board.json` bytes were restored after the local fixtures, and a second build confirmed the test strings were gone.

## Editing connection

| Content | Source file | CMS field | Consuming template | Local test | Hosted test | Remaining issue |
| --- | --- | --- | --- | --- | --- | --- |
| Team introduction | `src/_data/team.json` | Team Information → Team introduction (`intro`) | `src/team/index.njk` | Passed. A labeled fixture rendered in `/team/` and was removed. | Not performed | Hosted save, GitHub commit, and Netlify rebuild are unproven. |
| Join text | `src/_data/team.json` | Join the Team text (`joinText`) | `src/team/index.njk` | Not separately fixture-tested. Empty value shows the pending notice. | Not performed | Recruiting instructions are still unsupplied. |
| Recruiting email | `src/_data/team.json` | Recruiting email (`recruitingEmail`) | `src/team/index.njk` | Not separately fixture-tested. Blank value links to Contact. | Not performed | No approved address. The CMS pattern allows blank or one email. |
| Team updated date | `src/_data/team.json` | Last updated (`updatedOn`) | `src/team/index.njk` | Schema matches the template. Blank omits the line. | Not performed | None in the template. |
| Practices | `src/_data/team.json` | Practices (`when`, `where`, `note`) | `src/team/index.njk` | Passed. One labeled practice rendered, then the file was restored to an empty list. | Not performed | Real practice details are not supplied. |
| Leadership | `src/_data/team.json` | Team leadership (`name`, `role`, `title`) | `src/team/index.njk` | Schema matches. The empty list shows the pending notice. | Not performed | Role choices are only Captain, Officer, or Coach. |
| Roster | `src/_data/roster.json` | Roster (`season`, `updatedOn`, `players`) | `src/team/roster.njk` | Schema matches. Empty players show the unpublished notice. | Not performed | Deferred from the nine-page launch. Do not invent players. |
| Schedule | `src/_data/schedule.json` | Season Schedule (`season`, `events`) | `src/team/schedule.njk` | Schema matches. Empty events show the pending notice. | Not performed | Deferred from the nine-page launch. |
| Board records | `src/_data/board.json` | IMUF Board → members (`name`, `role`, `classYear`) | `src/imuf-board/index.njk` | Passed. A labeled fixture member rendered and was removed. | Not performed | Published roles still need confirmation. No biographies. |
| History chapters, captions, and figures | `src/_data/history.json` | None | `src/history/index.njk` | Existing chapters render. No fixture was written into history. | Not performed | Not in `.pages.yml`. A partial schema could drop blocks on save, so it was not added. The opening photograph is whichever figure uses `/assets/images/history/woodlawn.jpg`. |
| Video records | `src/_data/videos.json` | Video Archive → Callahan, Highlights, Lowlights (`title`, `url`, `note`) | `src/videos/index.njk` | Existing titles and https links render. | Not performed | The single Callahan entry also shows the hard-coded label “Watch Kip's Callahan film”. |
| Video thumbnails | `src/_data/videos.json` and `src/assets/images/videos/` | Thumbnail path, width, and height as text and numbers | `src/videos/index.njk` | Passed for the existing Callahan image path, width 960, and height 639. | Not performed | The field is a string path, not an image picker. Alt text is hard-coded as empty. |
| Public social and store links | `src/_data/site.json` `urls` | None | `src/_includes/partials/footer.njk` and `footer-home.njk` | Existing URLs render. | Not performed | Not in `.pages.yml`. A partial schema was not added because a Pages save could drop the rest of `site.json`. |
| Contact page | Hard-coded in `src/contact-us/index.njk` | None | That template | Not a JSON field. | Not performed | Destination remains `https://www.hoosiermamas.org/contact-us/`. |
| Donation page | Hard-coded in `src/donate-now/index.njk` | None | That template | Not a JSON field. | Not performed | Destination remains the current public donate page. The photograph is a fixed template asset. |
| About IMUF copy and values | Hard-coded in `src/about-imuf/index.njk` | None | That template | Not a JSON field. | Not performed | Ordinary editors cannot change this copy or its photograph through CMS. |
| Newsletter archive link | Hard-coded in `src/newsletters/index.njk` and the footers | None | Those templates | Signup control is disabled and does not submit. | Not performed | No CMS field and no approved form. |
| Homepage words, links, and art | Hard-coded in `src/index.njk` and homepage CSS | None | `src/index.njk` | Frozen. Not edited. | Not performed | Launch link cleanup is recorded in `docs/RELEASE-PLAN.md` and was not implemented. |
| Header labels | Hard-coded in `src/_includes/partials/header.njk` | None | Shared header | Not edited. | Not performed | Proposed launch navigation is not the current header. `site.json` `nav` is not what the header renders. |

No schema or template mismatch required a code change. The configured JSON fields match the templates that read them. The gaps are content that was never given a CMS form.

## Hard-coded launch material

An ordinary editor cannot maintain these through the current forms:

- Homepage sentences, section links, hero labels, and the athlete artwork.
- Header group labels and destinations.
- About IMUF introduction, IRS-status sentence, six value sections, and the opening photograph.
- Contact and donate sentences and their outbound links.
- Newsletter introduction and the ActiveCampaign archive link.
- Footer wordmark and the “Indiana Men's Ultimate Foundation” image alt text.
- History opening treatment tied to `woodlawn.jpg`.
- Video thumbnail alt text, and the Callahan watch label used when that list has one entry.
- Donate and several interior photographs chosen in the templates, including width and height written in the photo macro.

Layout positions, CSS, masks, and image effects are intentionally not CMS fields.

## Media

`.pages.yml` sets the media input to `src/assets/images` and the public prefix to `/assets/images`.

What that does today:

- An editor cannot select an existing image from a content field. Thumbnail and history paths are plain text. History is not in the CMS at all.
- An editor cannot upload a new image through a content field. A hosted media library might still store files under `src/assets/images` after Pages CMS is connected, but that library was not opened and is not attached to these fields.
- Width, height, and alt are not read from the file. Video entries need `thumbnailWidth` and `thumbnailHeight` typed by hand. Video alt text is always empty. History figures store `alt`, `width`, and `height` inside each figure block.
- Uploads are not optimized by this project. Eleventy copies files in `src/assets/images` through unchanged. There is no image-processing dependency. Preparation stays manual.

Selecting or uploading an image was not tested in hosted Pages CMS.

## Hosted workflow

| Step | Result | Evidence |
| --- | --- | --- |
| A. Edit one real text field in Pages CMS | Not performed | No IMUF GitHub repository or Pages CMS project is connected. |
| B. Save and verify the GitHub change | Not performed | `git remote` is empty. The `gh` command is not installed. |
| C. Netlify builds automatically | Not performed | The `netlify` command is not installed. No site exists here. |
| D. Deployed page shows the saved value | Not performed | No review URL. |
| E. Edit one structured record in Pages CMS | Not performed | Same account gap. The local board fixture does not count. |
| F. Select or upload an image and verify it | Not performed | No image field and no hosted library test. |
| G. Restore the original values through CMS | Not performed | Local fixtures were restored from the original file bytes, not through CMS. |
| H. Restoration deploys successfully | Not performed | No review deployment. |

A second person has not used the editor. That exercise is not complete.

## What must happen before the hosted proof

1. An IMUF-owned GitHub organization creates the website repository. Do not use a personal account as the owner.
2. Push this baseline to that repository.
3. An IMUF-owned Netlify account creates a site from that repository, with `npm run build`, publish directory `_site`, and Node 24, as `netlify.toml` already says. Use the generated `netlify.app` address. Do not attach the production domain. Leave `noindex` in place.
4. Hosted Pages CMS is opened against that repository so `.pages.yml` is the editor configuration.
5. Repeat steps A–H on the review site, then restore the original text and record through the same editor.
