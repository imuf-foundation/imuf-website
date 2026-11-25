# Editor guide (prototype)

Ordinary updates should eventually be done in a browser, without Cursor, coding, or a paid AI subscription.

## Intended workflow (not yet connected)

1. An invited editor opens hosted Pages CMS for the IMUF-owned repository.
2. They edit the forms already described in `.pages.yml`: Team Information, Roster, Season Schedule, Video Archive, and IMUF Board.
3. Saving records the change in the GitHub repository.
4. Netlify builds the site and publishes the update to the review address.

That hosted path is **not connected and has not been verified**. There is no GitHub remote, no Netlify site, and no Pages CMS login. Do not tell editors that they can already publish from a browser. The evidence is in `docs/CMS-ACCEPTANCE.md`.

## What a local build already connects

On November 24, 2026, temporary labeled fixtures were written, built, and then restored from the original file bytes:

- Team introduction and one practice rendered on `/team/`.
- One board member rendered on `/imuf-board/`.
- The existing Callahan thumbnail path, width, and height rendered on `/videos/`.

Those checks used local files. They do not prove Pages CMS, GitHub, or Netlify.

## What an editor will be able to change

- Team introduction
- Join the Team text and recruiting email
- Practice times, places, and optional notes
- Leadership names, roles (Captain, Officer, or Coach), and optional titles
- Season label and roster players
- Schedule events: name, date, location, and optional note
- Video title, https URL, optional note, thumbnail path, and thumbnail width and height
- Board name, role, and class year

An editor cannot yet change history, the About page, contact and donate copy, newsletter copy, the homepage, or the header. Those are written in the templates or in JSON that has no CMS form.

Thumbnail fields are text paths, not an image picker. Width and height must be entered by hand. This project does not optimize an uploaded image. Prepare the file before adding it under `src/assets/images`.

Editors should not need to edit layouts, CSS, JavaScript, or deployment files. Those are excluded from `.pages.yml`.

## Until hosting is connected

David or a developer can edit the JSON files locally, then run:

```bash
npm run build
```

or

```bash
npm run dev
```

Leave fields blank rather than guessing. Empty pages show an honest notice until real information is supplied. Do not invent players, practice locations, or recruiting instructions.

Eleventy validates `src/_data/team.json` and `src/_data/roster.json` before every build, including each watched rebuild during `npm run dev`. A failed save leaves the previous successful generated site in place.

Optional fields (join text, recruiting email, last-updated dates, season, practice notes, leadership titles, player year and jersey number) may be omitted, left blank, or set to null. If a value is supplied, it must be text. Do not enter numbers, true/false values, lists or objects in those fields. Required fields such as the team introduction and player names must be nonblank text.

Headshots are not part of this milestone. Do not upload player photos for the roster yet.
