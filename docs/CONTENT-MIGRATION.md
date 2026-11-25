# Content migration

Retrieved November 19, 2026 from the public HoosierMama?s site. This is a local draft. It is not proof that current roles, recruiting information, financial details, or scholarship conditions are still accurate.

Dates, names, quotations, captions, and spelling were copied as published. Uncertain captions were kept. Nothing in this file was invented to fill a gap.

## Sources

| URL | Result | Recovered | Local destination | Review status |
| --- | --- | --- | --- | --- |
| https://www.hoosiermamas.org/history | Page returned | Part 1 origin text, four photographs, captions | `/history/#chapter-1`, `src/_data/history.json` | Migrated draft. Confirm wording before publication. |
| https://www.hoosiermamas.org/history-2 | Page returned | Part II, 1985–1988, five photographs, captions | `/history/#chapter-2` | Migrated draft. Published dates and names were not repaired. |
| https://www.hoosiermamas.org/history-3 | Page returned | Part III, the 1989 season, sixteen photographs, captions. The Part 1 title used on the local page is the title this page publishes for the series. | `/history/#chapter-3` | Migrated draft. |
| https://www.hoosiermamas.org/imuf-board | Page returned | Eleven names, published roles, and class years. Headshots were left on the public page. | `src/_data/board.json`, `/imuf-board/` | Draft listing. Present-day accuracy needs David's review. No biographies or contact details were added. |
| https://www.hoosiermamas.org/about-imuf | Page returned. This address is in the public sitemap. | Foundation introduction and the six published value paragraphs, including the IRS-status sentence as published. | `/about-imuf/` | Draft. The IRS sentence is a status claim and needs confirmation. The page has no scholarship link. |
| https://www.hoosiermamas.org/videos | Page returned | Category index used to find the four category pages below. | `/videos/` | Inventory only. The local page links back to this archive. |
| https://www.hoosiermamas.org/videos/callahan | Page returned | Two titles. Kip Curtis was kept. Missouri Loves Company 2017 also appears here and was kept only under Highlights. | `src/_data/videos.json` `callahan` | One verified entry. Playback was not tested. |
| https://www.hoosiermamas.org/videos/highlights | Page returned | Published highlight titles and YouTube watch URLs, newest first. | `videos.json` `highlights` | 28 entries. Two exclusions are listed below. Playback was not tested. |
| https://www.hoosiermamas.org/videos/lowlights | Page returned | Lowlight Video 2018/2019 | `videos.json` `lowlights` | One verified entry. Playback was not tested. |
| https://www.hoosiermamas.org/videos/full-games | Page returned | Empty category. No titles and no video URLs. | Not migrated | Full games stay excluded even if titles appear later. |
| https://www.hoosiermamas.org/videos/v/everything-to-sell-anything-427ge-88xsk-26br5 | Detail page returned | Vimeo player `https://player.vimeo.com/video/772531269` for Kip Curtis for Callahan 2019 | Callahan entry URL | The Squarespace wrapper was not embedded. Playback was not tested. |
| https://www.hoosiermamas.org/about | Not found. The page says it could not be found. | Nothing | None | Same result as the earlier review. No replacement URL was guessed. |
| https://www.hoosiermamas.org/scholarships | Not found. The page says it could not be found. | Nothing | None | Checked because the review had already recorded the address. No Mike Moore page is in the sitemap, and About IMUF does not link to one. |
| https://www.hoosiermamas.org/donate-now | Page returned | Not copied | `/donate-now/` still links to this public page | Donation destination was left unchanged. |

## What was migrated

History is one page with `#chapter-1`, `#chapter-2`, and `#chapter-3`. Chapter navigation replaces the old “Continue Reading” links. Body copy is 18px on desktop and 16px on mobile, with a maximum reading width of 68ch. Twenty-five photographs are local JPEGs in `src/assets/images/history/`. They keep their published captions. `sectionals-1988.jpg` is 526×372 and is displayed at its own proportions. The phone-list photograph and its roster were not copied.

Board records, in published order: Joseph Dweck, PRESIDENT, 2019; Mark Mastrangelo, VICE PRESIDENT, 2013; Jesse Roehm, BOARD PRESIDENT EMERITUS, 2010; Taylor Kraemer, TREASURER, 2011; John Jones, SECRETARY, 2014; Jimi Cantwell, BOARD MEMBER, 2007; Nathan Igdaloff, BOARD MEMBER, 2009; Ed Wu, BOARD MEMBER, 2011; Conner Henderson, BOARD MEMBER, 2023; Gabe Wray, BOARD MEMBER, 2019; Trevor Cook, BOARD MEMBER, 2019. There was no newer local board file to prefer. The Pages CMS field for role asks the editor to confirm the role is still current. That note is not visitor copy.

Videos: 1 Callahan, 28 Highlights, 1 Lowlight. Each entry uses the published title and a direct YouTube or Vimeo URL. Squarespace detail pages are not embedded.

About IMUF uses the retrieved introduction and the six value paragraphs. The local page links to `/imuf-board/`.

## Held back on purpose

- The archival phone-list image and any personal numbers or similar contact details in it.
- Missouri Loves Company 2017 (`https://www.youtube.com/watch?v=RsX-JLnqrMg`). It is published under both Callahan and Highlights. One Highlights entry was kept.
- A second Squarespace card for YouTube `894i4RPszJ4`. One Highlights entry was kept, titled “Hoosiermama?s 2018 Highlights.” The other published title is “Indiana University Hoosiermama?s 2018 Highlights.”
- HoosierDaddy! SWAG (`https://www.youtube.com/watch?v=Bvov_pY13H4`, detail page `/videos/v/9tsxdxtyp8ne787m55xzp6jhb93h2l`). The title does not identify it as a HoosierMama?s film, so it was left out.
- Full Games. The category page has no entries. The local archive does not include full games or internal film.
- Board headshots, biographies, and contact details.
- Scholarship story, eligibility, amounts, deadlines, recipients, tax claims, and application steps. No source for them was found.
- Player-resource chapters. No approved local text exists, and the private Notion workspace was not opened.

## Still empty by design

Practices, leadership, roster, and schedule have no confirmed current records. Newsletter signup does not submit. Donate still points at the current public page.
