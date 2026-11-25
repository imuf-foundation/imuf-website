# Initial release plan

Approved source of truth for the first public release. This does not replace `IMUF-Build-Brief.md`. Homepage design, interior design, and image treatments stay frozen for this CMS milestone.

The live Squarespace site stays in place. This plan does not authorize a domain change, a production deploy, or cancellation of Squarespace.

## Launch pages

These nine pages are the initial public set:

| Path | Page |
| --- | --- |
| `/` | Home |
| `/team/` | Team Hub |
| `/about-imuf/` | About IMUF |
| `/imuf-board/` | IMUF Board |
| `/contact-us/` | Contact |
| `/donate-now/` | Donate |
| `/history/` | Team History |
| `/videos/` | Video Archive |
| `/newsletters/` | Newsletters |

## Deferred from the first release

These routes still exist in the local build. They are not part of the nine-page launch set, and this milestone does not remove them:

- `/team/roster/`
- `/team/schedule/`
- Full `/team/player-resources/`
- `/scholarships/mike-moore/`

Roster, schedule, and practice records stay empty until the team supplies them. Player Resources chapters stay empty. The scholarship page does not gain invented rules or recipients.

## Dates

| Date | Milestone |
| --- | --- |
| December 6 | Board-ready release and a demonstrated hosted CMS edit |
| December 8–9 | Target domain transition |
| December 10–11 | Live verification and approved Squarespace cancellation |
| December 12 | Billing deadline buffer |

December 8–12 work is not authorized until David directs the domain change and Squarespace cancellation separately.

## Launch navigation

Applied. Labels, destinations, and order stay in `pages.navigation` so Pages CMS can edit them. A group with one link renders as a direct header link. Team is that case. Donate stays the header action to `/donate-now/`.

| Group | Launch links |
| --- | --- |
| Team | Team Hub → `/team/` |
| Alumni & History | Team History → `/history/`; Video Archive → `/videos/`; Newsletters → `/newsletters/` |
| About IMUF | About IMUF → `/about-imuf/`; IMUF Board → `/imuf-board/`; Contact → `/contact-us/` |
| Donate | Donate → `/donate-now/` |

The homepage, shared header, both footers, and Team Hub no longer link to `/team/roster/`, `/team/schedule/`, `/team/player-resources/`, or `/scholarships/mike-moore/`. The homepage no longer links to the empty practices section. Team Hub still shows its practices, leadership, and recruiting notices. Deferred source pages, their CMS forms, and the route keys they use remain in the build. This pass does not add redirects.

## Pending before production, not part of this CMS milestone

- Exclude the deferred routes from the production build.
- Keep `noindex` until the launch review explicitly allows indexing.
- Keep newsletter signup inactive until an approved form exists. The public archive link may remain.
- Keep the donation page pointed at the current public destination until a new destination is approved. This site does not collect payment.

## Launch inputs still outstanding

| Input | Current state |
| --- | --- |
| Board roles | Eleven published names, roles, and class years are in `src/_data/board.json`. Whether each role is still current is unconfirmed. |
| Recruiting instructions and contact | `joinText` and `recruitingEmail` in `src/_data/team.json` are blank. |
| Foundation contact | Unresolved cutover blocker. The Contact button still goes to `https://www.hoosiermamas.org/contact-us/`. After `hoosiermamas.org` points at this site, that address is this site’s own `/contact-us/` page, so the button would link to the page it is already on. No replacement address is approved. This pass did not change the URL. |
| Donation destination and copy | Unresolved cutover blocker. The Donate button still goes to `https://www.hoosiermamas.org/donate-now`. After `hoosiermamas.org` points at this site, that address is this site’s own `/donate-now/` page, so the button would link to the page it is already on. The Venmo account in the build brief is not confirmed for this release. This pass did not change the URL. |
| Newsletter integration | Signup does not submit. Past issues link to `https://maxklaben.activehosted.com/archive/1`. Account, list, and form are not supplied. |
| Account ownership | No IMUF-owned GitHub organization or Netlify site is recorded. Do not use a personal account as the default owner. |
| Ongoing editor | The person who will make routine Pages CMS edits has not been named. |

## Publishing rules that stay in force

- Eleventy 3.1.7, the existing lockfile, and Node.js 24.
- `noindex, nofollow` remains in the shared layout.
- Empty roster, schedule, practice, and leadership records stay empty.
- Development and review builds are not the production domain.
- A local JSON edit proves only the template connection. Hosted Pages CMS, GitHub permissions, and Netlify publishing are tracked in `docs/CMS-ACCEPTANCE.md`.
