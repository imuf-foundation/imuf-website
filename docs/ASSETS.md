# User-selected photography

Names below were supplied by David for internal asset identification, not inferred from faces. These labels are not a current roster. Original files are retained in the supplied archives; the repository contains resized WebP derivatives only.

| Source | David’s label |
|---|---|
| DSC04594.jpg | Lucas |
| DSC06303.jpg | Quigs |
| DSC07017.jpg | David, Evan, Rowland |
| DSC07042.jpg | Pretty |
| DSC07513.jpg | Collin, Adrian, Cam |
| DSC08646.jpg | Teske |
| DSC09873.jpg | Disc |
| DSC06331.jpg | David |
| DSC03756.jpg | Conner |
| DSC03638.jpg | Dan |
| DSC03145.jpg | Steppa |
| DSC02892.jpg | Conner spike |
| DSC02303.jpg | David layout |
| DSC02156.jpg | George kick |
| DSC01779.jpg | Collin layout |
| DSC01772.jpg | Cam sky |
| DSC01648.jpg | Lil country and Quigs |
| DSC01536.jpg | Coaches and David |
| DSC00475.jpg | David sky |
| DSC04969.jpg | Aidan |
| DSC05827.jpg | Jeremy |

## Hero derivative

`src/assets/images/quigs-cutout-v1.webp` is an AI-assisted cutout based on DSC06303.jpg, created with the built-in image tool. It is a first-draft design asset and may contain regenerated photographic details. Review face, jersey mark, hands and disc before using it in a public launch. Do not describe it as a pixel-exact extraction. The original remains unchanged.

Prompt: Isolate only the black-jersey airborne player, including the complete raised disc, hair, hands and shoes. Preserve the original identity, pose, proportions, jersey, lighting and details. Remove the defender and all background; return true alpha transparency. Do not add type, shadows or graphic effects.

## Logos and fonts

Existing supplied Mama's white/red question marks and IMUF black/white banner marks were converted to WebP. No new logo was generated. Barlow and Barlow Condensed are self-hosted in src/assets/fonts; the corresponding SIL Open Font License files are included. No external font request is needed at runtime.

## Sizes

Photographs have 640, 960 and 1600 px derivatives, selected with srcset. The hero cutout is 1024 × 1536 px. Below-fold photographs are lazy-loaded. Image dimensions and alt text are supplied in templates. The 21 selected originals remain the source of truth for future edits.

## Revision 02 derivatives

- `src/assets/images/steppa-cutout-v1.webp` (1024 × 1536): AI-assisted transparent extraction based on DSC03145. Preserve red URIBE / number 2 jersey, cap, complete disc and shoes. Built-in image edit; no CLI/API key used.
- `src/assets/images/collin-cutout-v1.webp` (2007 × 783): AI-assisted transparent extraction based on DSC01779. Preserve the diving player, face, cap, white jersey, full disc and shoes; remove spectators and the field. Built-in image edit.
- `src/assets/images/imuf-mark.webp`: resized copy of the supplied standalone IMUF logo. No logo redesign.
- The monochrome field behind Steppa is a CSS-cropped right-hand portion of the unchanged DSC03145 image. The original subject is outside that crop; the separate color player overlaps the frame.

As with the first hero, generated cutouts may contain reconstructed photographic detail and remain subject to David’s visual review. Source originals are unchanged.

## Revision 04 composition

No new image generation. Existing transparent cutouts and source WebP files are reused. Home uses DSC06303, DSC04594, DSC07017, DSC01772, DSC01779, DSC03145, DSC09873, DSC07513, DSC01536, DSC02303 and DSC08646. Monochrome photo treatments and circular/arched masks are CSS-only; the WebP sources are unchanged. The grayscale field crop described under revision 02 is no longer used. Team Hub additionally uses DSC04969, DSC03756, DSC05827, DSC07042 and DSC03638. Full source identities remain supplied by David rather than inferred.

## Revision 05 layout

Home is curated around DSC06303 (Quigs cutout), DSC04594 (Lucas), DSC05827 (Jeremy), DSC03145 (Steppa cutout), DSC09873 (team disc), DSC07017 (David / Evan / Rowland) and DSC01779 (Collin cutout). Existing asset files are unchanged. Lucas uses a larger responsive source to account for the tall CSS crop. Jeremy and the trio keep native 3:2 framing; Collin is placed within a dedicated Video Archive feature. No new image generation.

## Revision 06 framing

No image files changed or generated. Quigs moves right on desktop. Lucas uses a wider frame with CSS grayscale, contrast(1.25), brightness(.97) and object-position 42% center. Collin floats over the open paper background with a soft shadow; the mobile layout places his complete image above the archive text.

## Revision 07 composition

No image files changed or generated. Lucas uses a closer CSS crop, stronger monochrome contrast and a curved upper-left corner. Mobile uses a separate transform so the raised disc stays visible. Jeremy retains his full landscape composition in an offset photograph. The archive adds the existing DSC07042 coaching/huddle photograph as a decorative monochrome background; the existing color Collin cutout crosses that photographic frame. Other source identities remain unchanged.

## Revision 08 photographic reset

Selected AI-assisted treatments of the supplied photos: `src/assets/images/lucas-editorial-v1-{640,960,1536}.webp` and `src/assets/images/collin-editorial-v1-{640,960,1536}.webp`. Exact source images, edit prompts and generation notes are in PHOTO-TREATMENTS.md. No new athlete or logo was intentionally invented; regenerated photographic details may differ from the originals. Lucas cutout experiments were discarded and are not referenced by this site. The original photos remain unchanged. Existing Quigs, Steppa, Jeremy, disc and trio assets remain in use.

## Revision 09 Home artwork

- Lucas: lucas-editorial-v2 responsive WebP files; missing jersey logo restored using supplied photo and official mark.
- Collin: collin-editorial-v2 responsive WebP files; shirt mark and ULTIMATE disc print corrected using supplied references.
- Steppa: steppa-editorial-v1 responsive WebP files; new red-player / monochrome-field treatment from DSC03145, replacing the disc-circle composition on Home.
- Jeremy removed from Home; photograph remains available and unchanged. Trio photograph remains unchanged.
- Prior artwork remains available. Exact prompts and generation notes: docs/PHOTO-TREATMENTS.md.

## Revision 10 — active Home assets

- Original-photo alpha masters: lucas-original-cutout-v1.webp (DSC04594), collin-original-cutout-v1.webp (DSC01779), steppa-original-cutout-v1.webp (DSC03145). Responsive derivatives retain alpha.
- Independent field layers: collin-original-field-v1.webp and steppa-original-field-v1.webp, derived from real empty field areas.
- Revision 08 / 09 generated treatments are retained as history but no longer referenced on Home.
- Foreground source pixels, shirt / disc orientation and actual poses are preserved. Matte metadata and verification: docs/ORIGINAL-PHOTO-MATTES.json.
- The Home footer is now a separate partial; other pages retain their previous footer.
