# IMUF website build brief

Working baseline: November 1, 2026 (Los Angeles)

## Project authority and status

David Woods has authorized the build to begin. He is the project head and final decision-maker. ChatGPT leads strategy, scope, architecture, review and testing in partnership with Cursor. David runs the Cursor workspace and supplies project files, access and decisions. Cursor is the implementation partner; it should follow the current brief and report its actual changes and verification results.

The starting scope is the final one-page sitemap, version 7, and the one-page ownership/maintenance/costs document, version 6, both reviewed on November 1. New decisions in this brief are implementation recommendations, not evidence that the board approved additional features. Board comments, if any, still need to be supplied.

No replacement website, repository, hosting project or CMS connection has been created or tested in this kickoff. The current public site is reachable. Account access and domain renewal status have not been confirmed; a working public URL does not establish either.

## The outcome

Build a beautiful, fast, accessible website for current players, prospective players, alumni and supporters. The current team and recruiting are the primary design focus. The Team Hub should be the strongest part of the site, with clear identity, a reason to join and direct access to useful team information.

Routine maintenance should be manageable by one trained person in a browser. That person must not need Cursor, a paid AI subscription or coding knowledge for ordinary updates. Design changes and unusual failures may still need occasional technical help, which does not have to be David.

## Scope to preserve

| Navigation | Pages and sections |
| --- | --- |
| Home | Team introduction, alumni/support access, prominent Team Hub, Join the Team and Donate actions. |
| About dropdown | About IMUF; IMUF Board; Contact. |
| Team dropdown | Team Hub; Player Resources; Mama?s Roster; Season Schedule. Mama?s only initially. |
| Team Hub page | Meet the Team; Join the Team; Practices & Leadership. Captains, officers and coaches belong here. Join the Team is a section, not a separate page. |
| Player Resources page | Sections for ultimate basics, glossary, tournaments, college series, nutrition, gear and tournament packing lists. Keep exercise programming internal. |
| Alumni & History dropdown | Team History; Video Archive; Newsletters. The three existing history chapters become sections within one history page. |
| Video Archive | Callahan first, then Highlights and Lowlights. No All filter and no Full Games filter. Do not automatically migrate full-game footage or expose internal film. |
| Scholarships dropdown | Mike Moore Scholarship page: Mike's story, scholarship information and past recipients. There are no recipients yet. Do not invent eligibility rules, amounts, deadlines, application processes or winners. |
| Donate page | Preserve essential existing donation methods and FAQ, after confirming current details and campaign destination. |
| Footer | Donate, Contact, external Store; external Instagram, Facebook and X. Keep it compact. |

Player headshots are deferred. There is no paid social-feed subscription and no social-feed embed in launch scope. Newsletters must not become a manually maintained list of issues.

## Proposed URL map

These are chosen new routes for implementation, not claims about files already on David's computer. Preserve existing useful routes wherever practical. Verify every redirect before launch.

| Page | Proposed canonical route | Legacy handling |
| --- | --- | --- |
| Home | `/` | `/home` redirects here. |
| About IMUF | `/about-imuf/` | Review the existing `/about` link and point it here. |
| IMUF Board | `/imuf-board/` | Preserve. |
| Contact | `/contact-us/` | Preserve. |
| Team Hub | `/team/` | New page; recruiting section is `/team/#join-the-team`. |
| Player Resources | `/team/player-resources/` | `/orientation` redirects here. |
| Mama?s Roster | `/team/roster/` | `/current-roster-1` redirects here. |
| Season Schedule | `/team/schedule/` | `/season-schedule` redirects here. |
| Team History | `/history/` | `/history-2` and `/history-3` redirect to the corresponding chapter anchors. |
| Video Archive | `/videos/` | Preserve useful existing video links where possible. Inventory detail pages before selecting redirects; do not redirect all detail pages blindly. |
| Newsletters | `/newsletters/` | New page. |
| Mike Moore Scholarship | `/scholarships/mike-moore/` | New page; Scholarships is a navigation group. |
| Donate | `/donate-now/` | Preserve. |

About, Team, Alumni & History, and Scholarships are navigation groups. Team also links to its Team Hub landing page. Desktop dropdowns need keyboard access; touch navigation needs distinct, usable disclosure controls. No hover-only access.

## Recommended foundation

Use hand-written HTML templates, CSS and minimal browser JavaScript. Use Eleventy as a small build step to combine shared layouts and editable content into static HTML. This avoids duplicating navigation across every page and connects Pages CMS cleanly to the website without adding a client-side application framework.

Recommended initial development choices:

- Node.js 24 LTS, consistently selected locally and on Netlify.
- Eleventy 3.1.7, the stable release verified at kickoff; exact dependency version plus a committed package lock. Do not select a prerelease.
- Nunjucks HTML layouts and JSON content files; escape ordinary content by default.
- Plain CSS and progressive enhancement. Avoid a component framework, CSS framework, animation package, database or serverless functions unless a concrete requirement justifies one later.
- Hosted Pages CMS with structured forms and email-invited content collaborators. Use the hosted service, not a self-hosted CMS installation.
- GitHub organization owned by IMUF, with a public website repository compatible with the proposed Netlify Personal plan. Keep credentials, internal team documents and donor data out of the repository.
- Git-connected Netlify publishing. Manual drag-and-drop deployment will not provide the automatic CMS update workflow being promised.

This is a build recommendation, not an implemented integration. After the Cursor audit confirms the actual workspace, use project-root-relative paths such as the following:

```text
.nvmrc
.gitignore
.pages.yml
package.json
package-lock.json
eleventy.config.js
netlify.toml
README.md
docs/BUILD-BRIEF.md
docs/STATUS.md
docs/CONTENT-REGISTER.md
docs/EDITOR-GUIDE.md
src/_data/site.json
src/_data/team.json
src/_data/roster.json
src/_data/schedule.json
src/_includes/layouts/base.njk
src/_includes/partials/header.njk
src/_includes/partials/footer.njk
src/assets/css/site.css
src/assets/js/navigation.js
src/assets/images/
src/index.njk
src/team/index.njk
src/team/roster.njk
scripts/validate-content.mjs
```

Do not create or overwrite these files until the existing workspace and required input/access status are understood. Never assume this tree already exists. Generated output goes to `_site/`; edit source files, not generated HTML. Commit source and the lockfile; exclude generated output and dependencies.

## First milestone: prove the editing workflow

The first implementation assignment should be limited to the shared foundation and an early Home/Team Hub/roster prototype. Do not generate the whole website before proving the core workflow.

1. Establish reusable layout, navigation and visual tokens.
2. Make practice details on Team Hub and player entries on the roster come from separate JSON content files.
3. Define Pages CMS forms for those exact files. Give ordinary editors content fields, not layout code. Configure repeated player entries and ordinary form labels.
4. Build locally and verify that changing content updates the corresponding page. Check empty content and missing optional photos gracefully.
5. Once authorized accounts are connected, invite the intended content editor, save a practice-time change and a roster change in hosted Pages CMS, and verify GitHub records the change and Netlify publishes it.
6. Check the published result on desktop and mobile. Revert the test content through the normal workflow.

An edited JSON file followed by a local build proves the content/template connection only. It does not prove hosted Pages CMS login, GitHub permissions, automatic Netlify publication or the trainee's editing experience. Report these checks separately and never mark an unperformed check as passed.

Before that end-to-end test, no CMS integration should be described as fully tested. Use explicitly labelled development fixtures for demonstrations. Never publish invented players, schedules, practice locations, staff, credentials, scholarship facts or testimonials.

## Content, design and maintainability rules

- Build around real team photography and the existing brand. The precise visual design is still to be reviewed with David; the sitemap is not visual-design approval.
- Recommend a restrained crimson, warm-white and dark-ink palette, strong readable typography, generous spacing and useful information hierarchy. Keep the Team Hub energetic and direct. Avoid generic marketing claims and dashboard clutter.
- Make the team introduction answer who the team is, why someone might join and how to get involved. Team-supplied facts determine the specific recruiting instructions.
- Present practical information early: practice time/place, recruiting contact, roster, schedule and player resources.
- Store a fact once. Practice details and leadership should not be maintained independently on several pages. Reuse their source data for homepage highlights if needed.
- Optimize uploaded photos into appropriate sizes during the build. Set dimensions, provide useful alternative text, lazy-load below-the-fold images and avoid making visitors download originals. Select the image-processing tool during the implementation pass; Pages CMS uploading alone does not guarantee optimization.
- Keep videos hosted on their existing approved video services. Use lightweight previews and load embeds when useful. No autoplay background video is required.
- Support keyboard navigation, visible focus, reduced motion, sensible heading structure and reliable small-screen layouts.
- Add sensible required fields and validation to prevent malformed roster/schedule entries, unsafe URLs and accidental HTML injection. Validate before publishing so a failed change leaves the previous successful site available.
- Keep development and staging pages out of search engines until the content and launch are approved. Confirm staging visibility with David before hosting any internal material.
- Document editing, publishing, account succession, rollback and the location of original assets. Train one person for routine upkeep; do not turn this into a multi-role staffing plan.

## Confirmed public source observations

The following were observed in actual public HTML at kickoff. They are migration leads, not approval that every detail is current.

| Item | Observed source | Action |
| --- | --- | --- |
| Existing website | `https://www.hoosiermamas.org/`, reachable; Squarespace markup present. | Preserve the live site during development. |
| Live source inventory | `https://www.hoosiermamas.org/sitemap.xml`, retrieved successfully. | Use as the migration/redirect inventory, including existing video-detail URLs. |
| Player Orientation | `/orientation` contains a third-party Notion embed. | Obtain the Notion content/export; rebuild public resources as native website content. |
| Supplied Notion workspace page | `https://app.notion.com/p/imuf/IMUF-Home-fd9c96e3652a454cb0792ea6d9986175` previously required sign-in. | Access/export is pending; do not claim its contents were reviewed. |
| ActiveCampaign archive | `https://maxklaben.activehosted.com/archive/1` | Confirm the intended list, archive access and iframe behavior. Signup form details still needed. |
| Store | `https://imufmensultimate2022.itemorder.com/shop/home/` | David confirmed it is active; verify destination again before launch. |
| Instagram | `https://www.instagram.com/hoosiermamasultimate/` | External footer link. |
| Facebook | `https://www.facebook.com/HoosierMamas` | External footer link. |
| X | `https://twitter.com/Hoosier_Mamas` | External footer link. |
| Venmo | `https://account.venmo.com/u/imuf_mamas24` | Confirm this is still the intended donation account. |
| Donation campaign | The live donation page references `2026-27-imuf-donation-campaign` on Donorbox. | Obtain the approved campaign checkout URL and test it. The observed iframe is configured as a donation meter with preview parameters; it is not proof of a working donation form. |

Do not reproduce public donation claims, mailing details, fees, board rosters or current team facts without checking that they are still appropriate. Existing website copy is a source to preserve and review, not an automatic approval of outdated information.

## Access and inputs needed from David

Record each item as confirmed, available to David but not connected here, or still to obtain. Do not ask David to share passwords or recovery codes in chat.

| Input | Current status |
| --- | --- |
| Cursor project folder or repository, including any AGENTS.md or existing code | Not supplied. First Cursor prompt below obtains a read-only audit. |
| Board review outcome and any requested scope changes | Build authorized by David; board comments not supplied. |
| Google Drive asset folder, logos, photography and permissions to reuse | Not supplied. |
| Squarespace website editor access | Last reported password-reset difficulty; current status unknown. |
| Domain registrar/DNS access and renewal status | Renewal was recommended in October; successful renewal has not been reported. Keep domain registration at Squarespace and connect to Netlify at launch. |
| Approved current donation destination and donation-system owner/access | Not confirmed. The current public campaign reference is only a lead. |
| IMUF GitHub organization/repository and intended hosting owner | Not supplied. |
| Netlify account/site and billing owner | Not supplied. |
| ActiveCampaign access, intended list, signup form and archive | Public archive observed; account/form details not supplied. |
| Notion export or accessible read-only resources | Not supplied. |
| Current roster, season, schedule, practices, recruiting contact and leadership | Team will supply; current source not supplied. |
| Mike Moore story and approved scholarship information | Not supplied. |

Public reachability does not prove registration renewal or account ownership. Confirm these before implementing external connections or beginning migration. Do not change production DNS, cancel subscriptions, submit donations, publish sensitive content or purchase subscriptions as part of the first Cursor task.

## Newsletter and cost boundaries

ActiveCampaign officially supports embedded signup forms and a public archive of sent one-time campaigns. Automated campaigns are excluded from that archive. Its documentation describes linking to the archive; an embedded archive still needs a real browser check. If embedding is unsuitable, link to the automatically updated archive rather than adding manual issue maintenance. Do not promise an attractive automatically refreshed custom newsletter feed without proving a supported data source.

Netlify Personal remains the proposed $9/month hosting plan at the latest check, with usage limits. GitHub Free and hosted Pages CMS have no subscription cost at current pricing. Domain renewal, email, ActiveCampaign, existing storage and donation-processing charges are separate. David previously saw $12.47/year for the domain; that amount remains user-reported, not a verified renewal receipt. Account setup and any paid outside help must not be represented as automatically free or already arranged.

## Execution sequence and review gates

1. Obtain the Cursor audit and confirm required input/access status. Consolidate assets and the current content inventory.
2. Implement and verify the first milestone above, then review the visual direction with David.
3. Build the rest of the sitemap using shared components and the same content model. Migrate and review real content; test newsletters, donation destinations and external links.
4. Complete desktop/mobile/accessibility/performance checks, a trainee editing session and a migration/rollback plan.
5. David makes the launch decision. At launch, change only the necessary website DNS records while preserving email and other services. Verify HTTPS, redirects, donations and signup before retiring old website hosting. Domain registration continues independently.

Report each milestone with what changed, what was actually tested, what is blocked and the next concrete action. Provide a short paste-ready update for the Knowledge Base Summary Chat at major milestones.

## Cursor assignment 01: workspace audit

David: open an existing IMUF project folder in Cursor if one exists. Otherwise create a new empty folder named `imuf-website` in a location you choose and open it. There is no assumed absolute path. Paste the following prompt into Cursor and return its report to this chat. This first assignment is intentionally read-only so subsequent implementation instructions can name the real project paths and respect any existing work.

```text
You are the implementation partner for the Indiana Men's Ultimate Foundation (IMUF) website rebuild. David Woods is the project head and final decision-maker; ChatGPT supplies the build direction and will review your work. We are beginning the build from the agreed sitemap.

Perform a read-only workspace audit first. Do not create, modify or delete files, install dependencies, initialize Git, deploy, sign into accounts, change DNS or modify the existing Squarespace website in this task.

1. Report the absolute workspace root. Read applicable AGENTS.md instructions in the workspace and its relevant parents. If this is not an IMUF folder, or contains another project's unrelated work, stop without changing it and explain what you found.
2. Report whether this is an empty folder, an existing website or a Git checkout. If Git exists, report the branch and a concise working-tree summary; do not overwrite or reset changes. Report a remote only if it has no embedded credentials. Redact credentials if present.
3. Report Node.js, npm and Git versions, or state that a command is unavailable. Inspect any package.json and lockfile, existing build scripts, deployment configuration, CMS configuration, .cursor rules and existing README. Do not run package installation or project scripts during this audit.
4. List the relevant project structure (maximum two levels, excluding node_modules, .git and generated output). Identify any logos, photos, video assets or supplied content. Do not print .env values, tokens, credentials or private team/donor records. File presence alone is sufficient for potentially sensitive files.
5. Evaluate whether the current workspace can support this recommended foundation: hand-written HTML/Nunjucks, CSS and minimal browser JavaScript; Eleventy 3.1.7; Node.js 24 LTS; structured JSON content edited through hosted Pages CMS; GitHub connected to Netlify for automatic publishing. This is a recommendation to assess, not permission to replace an existing stack or implement it now.

The first implementation milestone will be a shared layout plus a Home/Team Hub/roster prototype. Practice details and roster entries must be editable through structured forms; saving through hosted Pages CMS must eventually record the change in GitHub and trigger Netlify. An email-invited maintainer must not need Cursor, coding or a paid AI subscription. Do not claim this workflow has been tested yet.

Scope to preserve: Team Hub and Join the Team are prominent homepage actions alongside Donate. Team Hub contains Meet the Team, Join the Team, and Practices & Leadership. Player Resources covers basics, glossary, tournaments, college series, nutrition, gear and packing lists. Workout programming stays internal. Retain the About/Board/Contact pages, history, videos, newsletters, Mike Moore Scholarship, donation methods and external store/social links. Mama?s only initially; no launch headshots, paid social feed or Full Games/All video filters. Video filter order is Callahan, Highlights, Lowlights. Do not invent team or scholarship facts.

Return a compact report with: absolute project root; applicable instructions; project/Git state; tool versions; relevant files/assets; existing stack; any conflict with the proposed foundation; and missing inputs. Give evidence for findings and label unknowns clearly. Do not implement or change files yet. End with exactly: Ready for implementation instructions, or Blocked: [specific reason].
```

## Verification references

- Final sitemap: IMUF-Board-Review-Sitemap.pdf, version 7.
- Final board maintenance document: IMUF-Ownership-Maintenance-Costs.pdf, version 6.
- Existing site: https://www.hoosiermamas.org/
- Existing sitemap: https://www.hoosiermamas.org/sitemap.xml
- Pages CMS quick start: https://pagescms.org/docs/quick-start/
- Pages CMS editable content: https://pagescms.org/docs/configuration/content/
- Pages CMS collaborators: https://pagescms.org/docs/configuration/collaborators/
- Eleventy stable documentation: https://www.11ty.dev/docs/
- Node.js support status: https://nodejs.org/en/about/previous-releases
- Netlify configuration: https://docs.netlify.com/build/configure-builds/file-based-configuration/
- Netlify pricing: https://www.netlify.com/pricing/
- ActiveCampaign archive: https://help.activecampaign.com/hc/en-us/articles/115001166984-Campaign-archives
- ActiveCampaign signup forms: https://help.activecampaign.com/hc/en-us/articles/115001257184-How-to-publish-a-form-to-your-website
