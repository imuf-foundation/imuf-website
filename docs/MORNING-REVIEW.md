# Morning review

Local review build after the foundation and support pages. This is not a launch and nothing was published.

Preview: http://localhost:8080/

## Foundation and support pages

About, Board, Contact, Donate, Newsletters, and the Mike Moore Scholarship page now use `support-page` rules. Home, the Team Hub opening, History, and the video thumbnails were not restyled. The shared header is unchanged.

About is headed “About IMUF.” The migrated introduction and six value paragraphs stay, including the IRS-status sentence. The opening is two columns at 1440 with a 48px gap: the copy, then DSC07017 (David, Evan, and Rowland) at its natural 1.500 ratio. At 390 and 320 the copy stacks above the photograph with a 28px gap. The values are two columns on desktop and one column on mobile. Labels are 28px on desktop and 24px at 800px and below. Board, History, and Contact follow the values.

The board page lists the eleven published records in their existing order, two columns at 901px and above and one column below, with a 48px column gap. Names are 32px on desktop and 28px on mobile. Roles and class years are 16px. There are no biographies or headshots. One “Contact IMUF” link follows the list.

Contact is headed “Contact IMUF.” “Contact the foundation” goes to `https://www.hoosiermamas.org/contact-us/`. “Join the team” goes to `/team/#join-the-team`. At 1440 the two blocks sit side by side with a 48px gap. At 390 and 320 they stack with a 32px gap and one rule between them. There is no form.

Donate is headed “Support Indiana ultimate.” The existing support sentence and “This page does not collect payments.” remain. “Donate through IMUF” goes to `https://www.hoosiermamas.org/donate-now`. At 1440 the copy is 45% and DSC03756 is 55%, with a 48px gap. The photograph keeps its natural 1.500 ratio. On mobile the copy and action come before the photograph. The photograph is not described as current players.

Newsletters keeps the existing introduction. “Read past newsletters” goes to `https://maxklaben.activehosted.com/archive/1`. “Signup is not available on this page yet.” A Contact link follows. The footer signup stays disabled.

The scholarship page is headed “Mike Moore Scholarship.” The IMUF logo is 280px wide and keeps its natural 5.882 ratio. One sentence says Mike’s story, eligibility, amounts, dates, and recipients have not been added. “Contact IMUF” follows. No biography or recipient was invented.

At 600px and below, the video filters are a three-column grid with an 8px gap. The buttons are 44px tall, 12px type, and `10px 6px` padding. All three stay on one row at 320 and 390. The bar uses `display: grid` only when it is not `[hidden]`, and a later `[hidden]` rule keeps it hidden before JavaScript runs. Selecting Highlights changed `aria-pressed` and showed the Highlights list. The catalog heading margin is 20px.

At 600px and below, the Team Hub section links are a two-column grid with a 16px column gap and 24px side padding. Each link is at least 44px tall and can wrap. “Join the team” spans both columns. The strip no longer scrolls sideways. At 1440 the same links stay in one non-wrapping row. The Team Hub opening was not changed.

Checked at 1440×900, 390×844, and 320×800. Horizontal overflow was 0 on every measured page. Support content width was 1328px at 1440, 342px at 390, and 284px at 320. Desktop headings were 96px with line-height 0.95. At 390 the heading was 47.97px. At 320 it was 44px. Body type was 18px on desktop and 16px on mobile. `noindex, nofollow` remains. No page form submits. Home at 1440 still measures a 76px header, an 824px hero, the player at `top: 32px`, and the player’s right edge at 0.

Screenshots, `devicePixelRatio` 1, saved at `/Users/davidwoods/Documents/IMUF-Backups/imuf-foundation-review-20261120-000100/`. Desktop images are 1440×900. Mobile images are 390×844. The video-filter image is the 320×800 viewport. The Team image is 320×800 and starts 50px down the page so all five section links are in the frame; at the top of a 320×800 viewport the last link sits just below the fold because the opening photograph is above it.

Enter and Space on a focused filter button remain untested. The automation key does not perform the browser’s normal button activation, and that check was not repeated. JavaScript-off was not retested. No custom key handler was added.

Validator tests: 41 passed, 0 failed. Content validation passed. Eleventy 3.1.7 wrote 20 HTML files and copied 178 assets.

Backup, SHA-256 matched, 9 files: `/Users/davidwoods/Documents/IMUF-Backups/imuf-foundation-pages-20261119-235523`

## Previous interior editorial pass

Team Hub’s desktop opening is unchanged. At 600px and below, the copy uses 28px 24px 32px padding, a two-line headline, and the existing huddle crop. At 390 the headline is 47.97px; at 320 it is 44px. “YOUR PLACE.” stays on one line. The breadcrumb-to-heading gap is 24px, the description is 16px with line-height 1.5, and the button sits 24px below it. The photograph is in view at both 390 and 320.

History uses `history-page`. The opening heading is “Team history.” At 1440 the opening is two equal columns with a 56px gap, 48px header padding, a 96px heading, and vertical chapter links. The Woodlawn photograph and its existing caption appear once. The caption still says “likely Spring of `87, might be Spring `88.” At 390 the copy stacks above the photograph with 28px between them, the heading is 48px, and the header padding is 32px. The displayed photo matches its natural 1.501 aspect ratio. `#chapter-2` lands on Part II.

Videos use `videos-page`. The heading is “Video archive.” The catalog is three columns at 1440, two at 768, and one at 390 and 320. Thumbnails are 16:9 and cropped with `object-fit: cover`. Titles are 22px on desktop and 20px at 700px and below. Highlights was selected by pointer at each measured size. The Callahan column is limited to 760px, and “Watch Kip's Callahan film” remains. No horizontal overflow was measured.

All 30 thumbnails were retrieved from public provider images and saved under `src/assets/images/videos/`. None failed, so no text fallback was needed. Files wider than 960px were reduced to 960px wide. Smaller files were left at their original size. “IU Hoosiermama?s Ultimate Frisbee Nationals Highlights 2007” (`84bKXqzDX-s`) has no `maxresdefault` or `sddefault` image; its largest public thumbnail is 320×180. The Vimeo image came from the public oEmbed response and is 960×639. Thumbnail retrieval does not verify playback.

Validator tests: 41 passed, 0 failed. Content validation passed. Eleventy 3.1.7 wrote 20 HTML files and copied 178 assets.

Enter and Space on a focused filter button did not change `aria-pressed`. The automation key does not perform the browser’s normal button activation, so native keyboard activation is untested. No custom key handler was added. Disabling script execution and reloading `/videos/` still initialized the filters. That JavaScript-off browser check is untested. Scripts were turned back on.

At 1440, Home still measures a 76px header, an 824px hero, and the player’s right edge at 0. Home’s lower sections were not restyled.

Backup, SHA-256 matched, 9 files: `/Users/davidwoods/Documents/IMUF-Backups/imuf-interior-editorial-20261119-232746`

## Previous presentation pass

Shared header rules now live in `src/assets/css/site.css`. Interior pages use the same header as Home at the same viewport, without loading `home-editorial.css`. Category dots are gone. At 390 and 320 the four categories stay on one row under the brand. At 901px and above the header is the existing 76px Home layout. Home’s hero, recruitment, Team Hub feature, foundation, archive, and footer were not restyled.

History chapter titles use line-height 1.05 and a 20px bottom margin. Paragraphs inside `.history-prose` use line-height 1.6, with 20px between paragraphs. The 68ch width, 18px desktop type, 16px type at 520px and below, and 44px chapter links stay. Small photographs keep their natural size.

Video entries use a title, an optional note, 20px vertical padding, and an underlined link at least 44px tall. The Callahan entry includes “Watch Kip's Callahan film” on its existing Vimeo URL. “Visit the existing video archive” is a text link 32px below the catalog. The filter group has `role="group"` and `aria-label="Video categories"`. Controls still appear only after JavaScript initializes. No custom Enter or Space handler was added.

History JSON is now validated: chapter ids and titles, supported block types, text, figures under `src/assets/images/`, and links that parse as https, a local route, or a safe fragment. `javascript:`, `data:`, and protocol-relative links are rejected.

Backup, SHA-256 matched, 9 files: `/Users/davidwoods/Documents/IMUF-Backups/imuf-presentation-20261119-221120`

## 1. What is complete

Desktop Quigs now sits at `right: 0` in the existing `min-width: 901px` rule. Height stays 130%, top stays 32px, and the lower-body crop stays. Title size, grouped subtitle, and actions were left as they were. Mobile hero rules were not changed.

The three history chapters, the published board list, the About IMUF introduction, and the verified Callahan, Highlights, and Lowlights links are on the local site as drafts. See `docs/CONTENT-MIGRATION.md`. Practices, leadership, roster, and schedule are still empty. Newsletter signup does not submit. Donate still goes to the current public page.

All three video categories are in the HTML. The filter bar is hidden until JavaScript finishes starting. After that, Callahan is selected and the other two panels hide. A script error shows the panels again and hides the controls.

## 2. Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/team/` | Team Hub |
| `/team/#join-the-team` | Join the Team |
| `/team/player-resources/` | Player Resources |
| `/team/roster/` | Mama's Roster |
| `/team/schedule/` | Season Schedule |
| `/history/` | Team History |
| `/history/#chapter-1` | History chapter 1 |
| `/history/#chapter-2` | History chapter 2 |
| `/history/#chapter-3` | History chapter 3 |
| `/videos/` | Video Archive |
| `/newsletters/` | Newsletters |
| `/about-imuf/` | About IMUF |
| `/imuf-board/` | IMUF Board |
| `/contact-us/` | Contact |
| `/scholarships/mike-moore/` | Mike Moore Scholarship |
| `/donate-now/` | Donate |

Seven local noindex HTML refresh pages remain: `/home/`, `/about/`, `/orientation/`, `/current-roster-1/`, `/season-schedule/`, `/history-2/`, `/history-3/`. These are fallbacks. Real HTTP redirects still need deployment configuration and a later test. They were not changed in this pass.

## 3. Backup

`/Users/davidwoods/Documents/IMUF-Backups/imuf-content-migration-20261119-214036`

SHA-256 matched before editing. The earlier build backup is still at `imuf-local-build-20261119-211848`.

## 4. Checks that passed

- Content validation passed, including the migrated history file.
- Validator tests: 38 passed, 0 failed. The new history cases use temporary fixtures only: a malformed root, a duplicate chapter id, a missing image, unsafe `javascript:`, `data:`, and protocol-relative links, and one valid migrated-shaped chapter. Production history, roster, and schedule files were not rewritten.
- Eleventy 3.1.7 wrote 20 HTML files and copied 148 assets, including 25 history photographs.
- Generated routes have `noindex`, one `h1`, no duplicate ids, and no missing local assets.
- History keeps `#chapter-1`, `#chapter-2`, and `#chapter-3`. At 1440 the chapter title line-height computes to 1.05, the heading’s bottom margin is 20px, prose line-height is 1.6, paragraph gaps are 20px, type is 18px, and the column is 68ch. At 390 the paragraph size is 16px. The phone list is absent. “Illigitimate” and “(unknown player)” are still in the text. A 526×372 photograph displays at its natural size.
- Home subscribe control is `type="button"` and disabled.
- At 1440×900, all 13 content routes had no horizontal overflow and one `h1`. Quigs’ right edge meets the hero edge. Height is 130% of the hero, top is 32px. The disc, catching hand, outstretched right hand, and face are in the frame. The lower body is cropped.
- At 1280×720, Home, Team Hub, and Player Resources had no horizontal overflow. The desktop hero rule still applied: top 32px, right edge 0, height 130%.
- At 390×844, all 13 content routes had no horizontal overflow. The mobile hero stayed on its previous rule (`right` about −58px, not the desktop `right: 0`).
- At 320×800, Home had no overflow. Team Hub and Player Resources overflowed by 16px because the interior footer wordmark was wider than the viewport. The small-screen wordmark now uses `clamp(68px, 24vw, 88px)`. After reload, both pages measured 0. The homepage footer size is set separately and was not part of that change.
- After the shared header change, Home at 1440 still measured a 76px header, hero height 824, and the player’s right edge at 0. At 390 and 320, Home, Team, History, Player Resources, and Videos put all four category labels on one row, with 44px-tall targets and no horizontal overflow. No category dots were painted.
- The Team menu at 1440 opened inside the viewport. Escape closed it and returned focus to the summary. At 390 the open Team dropdown ran from x 20 to 370 inside the 390-wide viewport, with 44px links. Escape closed it and returned focus to Team.
- History chapter 2’s link lands on `#chapter-2`.
- With JavaScript, videos open on Callahan. A pointer click selected Highlights at 1440 and again at 390, set `aria-pressed="true"`, and showed that list. Desktop titles measure 24px and mobile titles 20px. The archive link sits 32px below the list.
- Enter and Space from the automation tool did not activate a focused category button or a focused menu summary. The page has no custom key handler, and the tool dispatches the key without the browser’s normal button activation. This was not treated as a page defect.

## 5. Checks not performed

- Safari was not tested.
- YouTube and Vimeo playback was not tested. The links are the published destinations, not a claim that each film plays.
- JavaScript-off behavior in a fresh script-disabled browser was not completed. Turning script execution off and reloading `/videos/` still initialized the filters. Scripts were turned back on. That browser check is untested. Source inspection was not used as a substitute.
- Native Enter and Space activation of the video buttons was not demonstrated. The automation key does not perform the browser’s normal button activation, so this is untested rather than a recorded defect.
- Screenshots are the visible viewport. History and the highlight list continue below the frame. A stitched full-page capture was not reliable.

No new layout defect was found in the shared header, history spacing, or video list. Practices, leadership, roster, and schedule are still empty. Historical wording, including “Illigitimate” and “(unknown player)”, was left as migrated.
- Not every interior page was given its own screenshot. About, board, roster, schedule, newsletters, contact, scholarship, and donate were included in the overflow pass and the HTML audit.

## 6. Decisions for David

1. Accept the desktop crop at `right: 0`.
2. Review the three history chapters, including captions that already say a date or player is uncertain.
3. Confirm whether the eleven published board roles are still current.
4. Confirm the About IMUF text, including the IRS-status sentence.
5. Decide what to do with the excluded videos listed in `docs/CONTENT-MIGRATION.md`.
6. Supply roster, schedule, practices, leadership, and recruiting contact when those records are current.
7. Supply the seven Player Resources chapters, or leave the empty states.
8. Supply scholarship facts only when they are confirmed. None were recovered from the public site.
9. Keep Donate on the current public page until a campaign URL exists.
10. Keep newsletter signup disabled until a form exists.
11. Review the seven HTML redirect fallbacks before any launch. Server redirects are still unconfigured.

## 7. Screenshots

`/Users/davidwoods/Documents/IMUF-Backups/imuf-interior-review-20261119-233900/`

Each file is the full viewport. `devicePixelRatio` was 1. Image pixels match the window size. They were not resized.

| File | window | image |
| --- | --- | --- |
| `team-desktop-1440x900.jpg` | 1440×900 | 1440×900 |
| `team-mobile-390x844.jpg` | 390×844 | 390×844 |
| `team-mobile-320x800.jpg` | 320×800 | 320×800 |
| `history-desktop-1440x900.jpg` | 1440×900 | 1440×900 |
| `history-mobile-390x844.jpg` | 390×844 | 390×844 |
| `videos-desktop-1440x900-highlights.jpg` | 1440×900 | 1440×900 |
| `videos-768x1024-highlights.jpg` | 768×1024 | 768×1024 |
| `videos-mobile-390x844-highlights.jpg` | 390×844 | 390×844 |
| `videos-320x800-highlights.jpg` | 320×800 | 320×800 |

The history frames show the Woodlawn opening and caption. The video frames have Highlights selected. The previous presentation set remains at `imuf-presentation-review-20261119-221700`. These are review images, not visual approval.

Earlier presentation captures are in `/Users/davidwoods/Documents/IMUF-Backups/imuf-presentation-review-20261119-221700/`. `devicePixelRatio` was 1, and those image pixels also match their windows.

| File | window | image |
| --- | --- | --- |
| `home-desktop-1440x900.jpg` | 1440×900 | 1440×900 |
| `team-desktop-1440x900.jpg` | 1440×900 | 1440×900 |
| `history-desktop-1440x900.jpg` | 1440×900 | 1440×900 |
| `videos-desktop-1440x900-highlights.jpg` | 1440×900 | 1440×900 |
| `home-mobile-390x844.jpg` | 390×844 | 390×844 |
| `team-mobile-390x844.jpg` | 390×844 | 390×844 |
| `history-mobile-390x844.jpg` | 390×844 | 390×844 |
| `videos-mobile-390x844-highlights.jpg` | 390×844 | 390×844 |

History frames include the opening body copy. Both video frames have Highlights selected. The earlier content-review set remains at `imuf-content-review-20261119-215851`. These are review images, not visual approval.
