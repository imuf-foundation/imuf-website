# CMS acceptance

What an ordinary editor can change, what was proven on this computer, and what a hosted Pages CMS save has shown. A local JSON edit is not a hosted CMS test.

Checked on November 24, 2026. Labeled fixtures were removed and the original `pages.json`, `history.json`, and `videos.json` bytes were restored. The nine launch pages then matched the saved HTML baseline byte for byte.

Later the same day, hosted Pages CMS read, saved, refreshed, and restored Team Information through GitHub. Commit `fa1dd4f` added `IMUF CMS CONNECTION TEST` to `intro`. Commit `6ff2f56` removed that sentence and restored the introduction: Information for current and prospective Indiana men's ultimate players. Both commits are by d11woods and are marked `(via Pages CMS)`. Netlify deployment and automatic rebuild were not part of this check and remain untested.

## Editable content

| Content | Source file | CMS field | Consuming template | Local test | Hosted test | Remaining issue |
| --- | --- | --- | --- | --- | --- | --- |
| Team introduction, join text, recruiting email, practices, leadership | `src/_data/team.json` | Team Information | `src/team/index.njk` | Passed earlier for the introduction and one practice. Restored. | Read, save, refresh, and restoration passed. `fa1dd4f` added the connection-test sentence; `6ff2f56` removed it. | Recruiting text, practices, and leadership are still blank. Pages CMS omits those empty fields. |
| Roster and schedule | `src/_data/roster.json`, `src/_data/schedule.json` | Roster, Season Schedule | `src/team/roster.njk`, `src/team/schedule.njk` | Schema matches. Records stay empty. An omitted empty list is valid. | Not performed | Deferred from the nine-page launch. |
| Board records | `src/_data/board.json` | IMUF Board | `src/imuf-board/index.njk` | Passed earlier for one labeled member. Restored. | Not performed | Published roles are unconfirmed. |
| Shared addresses | `src/_data/site.json` `urls` | Site settings → Shared addresses | Header, footer, and links that use `urlKey` | Existing addresses render. An unsafe store URL is rejected by validation. | Not performed | `site.nav` is kept so a save does not delete it. It is not the header. |
| Page routes, including foundation contact, donation destination, newsletter archive, and video archive | `src/_data/pages.json` `routes` | Pages → Page routes | Header, footer, homepage, contact, donate, newsletters, videos | Passed. The donation address was temporarily `https://example.com/imuf-cms-local-test` and then restored. | Not performed | These are the only copies of those addresses. |
| Header labels and navigation | `src/_data/pages.json` `header`, `navigation` | Pages → Header, Navigation | `src/_includes/partials/header.njk` | Passed. The Team label rendered as `IMUF CMS LOCAL TEST nav`, then restored. | Not performed | The Team highlight rule stays in the template. |
| Footer labels and newsletter note | `src/_data/pages.json` `footer` | Pages → Footer | `footer.njk`, `footer-home.njk` | Passed. The signup note rendered, and both subscribe buttons stayed disabled. | Not performed | Signup still does not submit. The homepage and interior footers stay separate. |
| Homepage headings, copy, and actions | `src/_data/pages.json` `home` | Pages → Homepage copy | `src/index.njk` | Passed for the tagline. Restored. | Not performed | Athlete artwork is not a field. |
| About introduction, values, and photograph | `src/_data/pages.json` `about` | Pages → About IMUF | `src/about-imuf/index.njk` | Passed for the introduction, one value label, and the photograph alt text. | Not performed | The photograph is a prepared 640/960/1600 stem, not one uploaded file. |
| Contact copy and destination | `src/_data/pages.json` `contact` and `routes.foundationContact` | Pages → Contact | `src/contact-us/index.njk` | Passed. Restored. | Not performed | The approved destination is still the current public contact page. |
| Donate copy and destination | `src/_data/pages.json` `donate` and `routes.foundationDonate` | Pages → Donate | `src/donate-now/index.njk` | Passed for the sentence and the destination. Restored. | Not performed | The page has no payment form. |
| Newsletter introduction and archive | `src/_data/pages.json` `newsletters` and `routes.newsletterArchive` | Pages → Newsletters | `src/newsletters/index.njk` | Passed. Restored. | Not performed | No signup form is connected. |
| History heading | `src/_data/pages.json` `history` | Pages → History page heading | `src/history/index.njk` | Passed. Restored. | Not performed | The opening photograph is still whichever figure uses `/assets/images/history/woodlawn.jpg`. |
| History chapters, paragraphs, and captions | `src/_data/history.json` | Team History | `src/history/index.njk` | Passed for one chapter title, paragraph, and caption. Restored. | Not performed | Block types stay `p`, `h3`, `h4`, `quote`, and `figure`. |
| Video records | `src/_data/videos.json` | Video Archive | `src/videos/index.njk` | Passed for one title. Restored. | Not performed | Links must stay https. |
| Video page heading and archive link | `src/_data/pages.json` `videos` | Pages → Video page heading | `src/videos/index.njk` | Passed for the introduction. Restored. | Not performed | Category filter labels stay in the template because the script matches them. |
| Video thumbnail and alt text | `src/_data/videos.json` `thumbnail`, `thumbnailAlt`, width, height | Video Archive → Thumbnail, an image field | `src/videos/index.njk` | Passed. The existing Callahan file rendered with alt text `IMUF CMS LOCAL TEST image`, then the alt was removed. | Not performed | Width and height are still typed numbers. |
| History figure image and alt text | `src/_data/history.json` figure `src`, `alt`, `width`, `height`, `caption` | Team History → Image | `src/history/index.njk` | The existing figure path still renders. Alt and caption are editable text. A hosted image picker was not opened. | Not performed | Width and height are still typed numbers. |

## Developer-managed

These stay out of the editor:

- Homepage athlete files, srcset, masks, backgrounds, motion, and section sizes. Quigs, Lucas, Steppa, and Collin are not interchangeable photographs.
- CSS, class names, and the header rule that highlights Team on team pages.
- `noindex, nofollow`.
- Disabled newsletter controls. Editors can change the note. They cannot turn on collection from this form.
- Donate and contact pages do not gain a payment or message form from these fields.
- The responsive sizes passed to the photo macro.
- Video filter labels in `src/videos/index.njk` and `src/assets/js/navigation.js`.

## Local checks

Validation passed. The content tests passed, including the new boundaries for required launch copy, unsafe addresses, missing prepared photographs, and thumbnail alt text.

Labeled fixtures rendered on the pages that consume them. Original content was restored. All nine launch pages matched `/Users/davidwoods/Documents/IMUF-Backups/imuf-launch-html-20261124-215239`.

The restored `src/_data/team.json` is the three-line introduction and has no trailing newline. Pages CMS omitted the empty optional fields `joinText`, `recruitingEmail`, `updatedOn`, `practices`, and `leadership`. Validation accepts that file. The regression tests also pass when those optional strings and arrays are omitted. They still fail when a present field has the wrong type, when a present array contains an invalid record, and when `intro` or a required record field is missing or blank. Optional strings may still be null or empty. Omitted arrays are treated as empty; null is not accepted for an array. `npm run validate` passed. `node --test scripts/validate-content.test.mjs` passed 51 tests. `npm run build` wrote `_site/team/index.html` with the restored introduction and without `IMUF CMS CONNECTION TEST`.

A separate build of `0d4a0d2` was made outside this checkout. These nine pages matched that build byte for byte: `index.html`, `team/index.html`, `about-imuf/index.html`, `imuf-board/index.html`, `contact-us/index.html`, `donate-now/index.html`, `history/index.html`, `videos/index.html`, and `newsletters/index.html`. The Team Hub empty states are unchanged.

Roster `players` and schedule `events` are empty lists in the same CMS shape, so validation accepts them when a save omits them. Their templates already treat a missing list like an empty one. Video groups, board members, history chapters, site navigation, and the page lists contain records. A save keeps those arrays, and validation still requires them. Optional strings on the other forms already accepted a missing value.

## Images

| Question | What is true now |
| --- | --- |
| Existing-image selection | Video thumbnails and history figures use a Pages CMS `image` field. The value stored in JSON is the public path string the template already prints, such as `/assets/images/videos/772531269.jpg`. Choosing a file that is already in the repository is the intended hosted behavior. This pass proved the path and alt text render. It did not open the hosted picker. About, donate, and homepage foundation photographs use a prepared image stem because the page needs the 640, 960, and 1600 files together. |
| New-image uploads | The media folder is `src/assets/images`, published at `/assets/images`. A hosted Pages upload would put a file there. No upload was performed. |
| Image optimization | Not implemented. Eleventy copies the file unchanged. There is no image-processing dependency. Width, height, and the prepared responsive sets are still entered or supplied by hand. |

## Hosted workflow

| Step | Result | Evidence |
| --- | --- | --- |
| GitHub read, save, refresh, and restoration | Passed for Team Information | `fa1dd4f` added `IMUF CMS CONNECTION TEST` to the introduction. `6ff2f56` removed it and restored the previous sentence. Both commits are `Update src/_data/team.json (via Pages CMS)` by d11woods. |
| Empty optional fields | Pages CMS omits them | That save dropped blank `joinText`, `recruitingEmail`, `updatedOn`, `practices`, and `leadership`. Validation treats the omissions as empty. The rendered Team Hub page matches the build from `0d4a0d2`. |
| Netlify deployment and automatic rebuild | Not tested | This check did not deploy the site or confirm that a GitHub push rebuilds on Netlify. |

A second person has not used the editor.
