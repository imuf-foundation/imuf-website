# Editor guide

Ordinary updates should eventually happen in hosted Pages CMS. That login is not connected. Do not tell an editor they can already publish from a browser.

## What is editable

`.pages.yml` points at these files:

- `src/_data/team.json` — introduction, recruiting text, practices, leadership
- `src/_data/roster.json` and `src/_data/schedule.json` — still empty
- `src/_data/board.json` — board names, roles, and class years
- `src/_data/videos.json` — titles, https links, notes, thumbnail image, alt text, width, and height
- `src/_data/history.json` — chapters, paragraphs, headings, quotes, figures, and captions
- `src/_data/site.json` — site name and the shared home, team, donate, contact, store, and social addresses
- `src/_data/pages.json` — homepage copy, navigation, footer, About, Contact, Donate, Newsletters, and the history and video page headings

Each address lives once. A button uses either a site address such as `donate` or a page route such as `foundationDonate`. Do not paste the same URL into both places.

Leave recruiting instructions, practices, roster players, and schedule events blank until the team supplies them.

## What stays with a developer

- Homepage athlete artwork, masks, backgrounds, motion, and section sizes
- CSS and page structure
- The `noindex` tag
- The disabled newsletter buttons. The note can change. The button cannot start collecting addresses.
- Video category buttons, which the page script matches exactly
- Prepared 640, 960, and 1600 photograph sets. About and Donate store the image stem and alt text, not a single uploaded file.

## Images

A thumbnail or history figure can point at an image already in the repository. The saved value is its public path. Width and height still have to be entered. A new file placed in `src/assets/images` is copied as it is. This project does not resize or compress it.

## Checked locally

On November 24, 2026, temporary text marked `IMUF CMS LOCAL TEST` was written into the homepage, navigation, footer, About, Contact, Donate, Newsletters, history, and one video. The build showed each value, including one changed donation address and one thumbnail alt text. The original files were put back. The nine launch pages matched the saved HTML exactly. The newsletter buttons stayed disabled and the pages stayed `noindex`.

That was a local file test. It does not prove Pages CMS, GitHub, or Netlify.

## Until hosting is connected

Edit the JSON files, then run:

```bash
npm run build
```

Validation runs before every build. A failed check leaves the previous successful pages in place. Do not invent players, practices, board roles, or donation claims.
