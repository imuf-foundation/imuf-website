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

## Proposed launch navigation

Not implemented in this milestone. The current header still includes roster, schedule, player resources, and the scholarship.

| Group | Launch links |
| --- | --- |
| Team | Team Hub; Join the Team |
| Alumni & History | Team History; Video Archive; Newsletters |
| About IMUF | About IMUF; IMUF Board; Contact |
| Donate | Donate |

## Pending before production, not part of this CMS milestone

- Remove homepage links that point at deferred pages, including roster, schedule, the full player-resources set, practices that have no records, and the scholarship.
- Exclude the deferred routes from the production build.
- Keep `noindex` until the launch review explicitly allows indexing.
- Keep newsletter signup inactive until an approved form exists. The public archive link may remain.
- Keep the donation page pointed at the current public destination until a new destination is approved. This site does not collect payment.

## Launch inputs still outstanding

| Input | Current state |
| --- | --- |
| Board roles | Eleven published names, roles, and class years are in `src/_data/board.json`. Whether each role is still current is unconfirmed. |
| Recruiting instructions and contact | `joinText` and `recruitingEmail` in `src/_data/team.json` are blank. |
| Foundation contact | `/contact-us/` links to `https://www.hoosiermamas.org/contact-us/`. No replacement address is approved. |
| Donation destination and copy | `/donate-now/` links to `https://www.hoosiermamas.org/donate-now`. The Venmo account in the build brief is not confirmed for this release. |
| Newsletter integration | Signup does not submit. Past issues link to `https://maxklaben.activehosted.com/archive/1`. Account, list, and form are not supplied. |
| Account ownership | No IMUF-owned GitHub organization or Netlify site is recorded. Do not use a personal account as the default owner. |
| Ongoing editor | The person who will make routine Pages CMS edits has not been named. |

## Publishing rules that stay in force

- Eleventy 3.1.7, the existing lockfile, and Node.js 24.
- `noindex, nofollow` remains in the shared layout.
- Empty roster, schedule, practice, and leadership records stay empty.
- Development and review builds are not the production domain.
- A local JSON edit proves only the template connection. Hosted Pages CMS, GitHub permissions, and Netlify publishing are tracked in `docs/CMS-ACCEPTANCE.md`.
