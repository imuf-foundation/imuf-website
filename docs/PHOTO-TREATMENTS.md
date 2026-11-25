# Revision 11 — active Home treatments

Lucas v3, Collin v3 and Steppa v2 restore the generated photographic treatments. Revision 10 source alpha cutouts remain historical assets and are not used on Home.

Lucas: 1536 × 1024 master, responsive 640/960/1536 WebP. Local corrections targeted fingers, natural dark nail polish and disc line art while preserving the monochrome motion treatment and question-mark shirt print.

Collin: 1672 × 941 master, responsive 640/960/1672 WebP. Shirt correction referenced the original diagonal print and folds: HOOS rises from lower left toward upper right, MAMA descends along the right, dot lower right. Disc lettering retains the original upside-down screen orientation. The first horizontal-print retry was rejected.

Steppa: 1122 × 1402 master, responsive 640/960/1122 WebP. Local correction targeted the small ULTIMATE lettering using the original shirt crop; URIBE and number 2 retained.

These are AI-assisted editorial derivatives, not pixel-exact documentary retouches. Original source photographs are unchanged. Small regenerated details can still differ and require David's final visual approval. Final WebP derivatives preserve master aspect ratio; no additional generative sharpening was applied.

---

# Revision 10 — active Home assets

The revision 08 / 09 generated Lucas, Collin and Steppa artwork below is historical and no longer used on Home. David requested the real players as separate foreground layers, with no generative reconstruction.

Current masters: lucas-original-cutout-v1.webp, collin-original-cutout-v1.webp, steppa-original-cutout-v1.webp. All are alpha cutouts from DSC04594.jpg, DSC01779.jpg and DSC03145.jpg respectively. Their RGB pixels are source-photo pixels. The matte uses manually traced outlines, connected exterior grass-color removal, edge contraction and sub-pixel alpha antialiasing. The masters use lossless WebP. Resized 480 / 800px derivatives and a 1280px Collin derivative support responsive delivery. No logo, face, clothing, pose or disc is generated, repainted or mirrored.

Lucas's black-and-white / contrast treatment is CSS on the source cutout. The horizontal motion trail is a separate pseudo-element, using an SVG blur filter. It has its own alpha mask and does not alter the foreground photograph. The foreground itself has no opaque background rectangle.

Collin and Steppa use separate original-field-v1.webp background textures made from unoccupied field areas in the original photos, processed with grayscale, horizontal blur and tonal adjustments. The foreground grass in Collin's background is resized at its original aspect ratio. These background images contain no generated athletes and are separate DOM elements from the player cutouts.

Reproduction: scripts/assets/build-home-cutouts.py takes the original JPG folder as its first argument. It is an optional asset-production script using the already available Pillow / NumPy / SciPy tools, not a site dependency or build step. It asserts RGB equality between each opaque master pixel and its corresponding original JPG pixel. It also asserts transparent corners. Crop coordinates and master sizes are in docs/ORIGINAL-PHOTO-MATTES.json. Original source photos are unchanged.

---

# Homepage photographic treatments — revision 08

Created with the built-in image editing tool. These are AI-assisted editorial derivatives of David's supplied photos, not new documentary photographs or pixel-exact retouches. Regenerated details may differ. Source originals remain unchanged.

## Lucas

Source: `src/assets/images/dsc04594-1600.webp` (DSC04594, identified by David as Lucas).

Selected output: `exec-4109cec0-c828-4bb4-aa24-1c50e0be175e.png`, 1536 × 1024.

Website assets:

- `src/assets/images/lucas-editorial-v1-640.webp`
- `src/assets/images/lucas-editorial-v1-960.webp`
- `src/assets/images/lucas-editorial-v1-1536.webp`

Exact edit prompt:

> Use case: style-transfer / identity-preserve. Create one premium black-and-white editorial sports photographic artwork using the EXACT celebrating player from the supplied photograph. Preserve his recognizable face, cap, mouth-open joy, disc, raised left arm, extended right arm, hands and natural clothes. Do not invent a model or change his pose. Tight heroic crop from upper thighs up, player fills the composition. Landscape 3:2 composition. Keep complete disc and both hands visible. Replace the distracting field and trees with a luminous white photographic backdrop, blending naturally into pure white at all four image edges. Deep rich blacks in clothes, crisp highlights, rich silver-gelatin tonal range and subtle fine analog film grain, no glossy AI skin. Introduce a sophisticated directional shutter-drag trace that dissolves from the far left edge into his left shoulder, while his face, disc and main figure stay sharp. Very restrained photographic motion, not duplicated people or graphic swooshes. This is an art-directed fashion/sports magazine photograph, with real feeling and beautiful natural texture. No lettering, no border, no frame, no geometric shapes, no extra people, no props. The background must be white, not grey or black. This is an image asset, not a website screenshot.

Two earlier transparent-cutout experiments were discarded and are not referenced by the site.

## Collin

Source: `src/assets/images/dsc01779-1600.webp` (DSC01779, identified by David as Collin).

Selected output: `exec-f91268f1-1f53-4717-8ac5-c1888103f355.png`, 1672 × 941.

Website assets:

- `src/assets/images/collin-editorial-v1-640.webp`
- `src/assets/images/collin-editorial-v1-960.webp`
- `src/assets/images/collin-editorial-v1-1536.webp`

Exact edit prompt:

> Use case: style-transfer / identity-preserve. Transform the supplied actual photograph into a premium cinematic editorial sports photograph for a team's public video archive. Keep the exact central diving player, his recognizable face, cap, white Indiana jersey and red lettering, full outstretched disc, pose, legs and complete shoes. Keep him photographic and sharply focused, with restrained natural color. Transform the field, trees and distant spectators into rich monochrome, with deep charcoal shadows and a dark softly receding stadium-like editorial atmosphere, while retaining real grass beneath the catch so he is grounded in the original play. Strong photographic subject separation, beautiful fine analog grain and dramatic but credible tonal contrast. Give background-only horizontal shutter-drag motion, subtle and refined, never blur the main face or disc. Wide 16:9 landscape composition: player spans the middle two thirds with room around full disc and feet. The top 18 percent can be darker to hold live white text later, and bottom 15 percent should fall naturally to near-black. Do not add any lettering, labels, UI, border, circles, geometry or extra people. No black rectangle, no collage with an unrelated photograph, no cutout floating on empty black. Preserve the original people rather than inventing replacement models. The image should feel like a beautiful frame from a sports film.

## Export and implementation

WebP variants were resized from the selected output with aspect ratio preserved, quality 89. No source-photo pixels were overwritten. The largest delivered Lucas and Collin files are approximately 104 KB and 124 KB respectively. Responsive sources, dimensions, descriptive alt text and lazy loading are set in `src/index.njk`. Live text remains HTML; no headings or navigation are baked into the images.
# Revision 09

Lucas and Collin now use sibling v2 artwork. Supplied original photographs and the official team question-mark logo were used as restoration references. Lucas's missing jersey mark was restored in monochrome; Collin's shirt mark and ULTIMATE disc lettering were corrected. Their approved motion and monochrome treatments remain. Source originals are unchanged.

Steppa has a new AI-assisted photographic treatment based on DSC03145. This replaces the circular disc / cutout composition on Home. The red jersey remains against a dark monochrome field. As with the other generated treatments, it reconstructs photographic details, including the appearance of the ground and feet; it is a design asset, not an untouched documentary photograph. David's review is still required before public launch.

All three use built-in image generation, opaque backgrounds, and referenced local images. No deterministic pixel compositing or image-editing scripts were used. Pillow was used only to resize and encode responsive WebP copies. Current Home uses lucas-editorial-v2, collin-editorial-v2 and steppa-editorial-v1 at 640 / 960 / 1536 px.
+
### Lucas logo restoration

Generated master: exec-c80614ec-16a4-46fb-bb0f-7d775e3608b3.png

```text
Use case: precise-object-edit. Image 1 is the EDIT TARGET: the approved monochrome motion portrait of Lucas, arms spread and disc raised, on white. Image 2 is his ORIGINAL PHOTOGRAPH, the source of truth for his actual jersey. Image 3 is the supplied official HoosierMama?s question-mark logo as an exact shape reference. Correct ONLY the missing large question-mark team logo on the front of Lucas's mesh pinnie. Restore the exact logo placement, scale, perspective and fabric distortion seen on his original jersey in image 2, using the precise letter shapes of image 3. It should be dark monochrome print on the mesh, following the folds, not a flat pasted graphic. The whole curved HOOSIERMAMA wordmark and question-mark dot must be recognizable, including the lower portion of the jersey. Keep the approved image 1 face, pose, body, cap, disc, hands, crop, strong monochrome contrast, motion streaks to the left, white background, lighting and all other pixels as unchanged as possible. Do not redesign or simplify the logo. No other text, no added objects, no new effects. Output same landscape 3:2 composition.
```

### Collin print restoration

Generated master: exec-6098f079-7b03-481a-86be-afc7f37fac0b.png

```text
Use case: precise-object-edit. Image 1 is the EDIT TARGET: the approved cinematic photograph of Collin diving for the disc, with real monochrome grass and dark horizontal motion blur behind him, player in natural color. Image 2 is the ORIGINAL PHOTOGRAPH, definitive for his shirt print and frisbee print. Image 3 is the supplied official team question-mark logo shape. Make only two localized print corrections to image 1: (1) restore the exact actual HoosierMama?s question-mark team print on his shirt from original image 2, with the correct supplied logo shapes, draping/perspective/occlusion. (2) restore the frisbee lettering from original image 2, especially the exact clear word 'ULTIMATE' (U L T I M A T E), in the same orientation, position, scale and color printed on the disc. No invented lettering. Retain ALL the approved image 1 composition, identity, face, cap, body, pose, hands, disc outline, clothing, player color, grass, monochrome background, motion blur and lighting. Do not add, remove, reposition or restyle anything else. High fidelity localized correction. Same 16:9 landscape crop.
```

### Steppa photographic treatment

Generated master: exec-e0ba0d02-4e1d-4500-a440-bd27aec192c5.png

```text
Use case: style-transfer, identity-preserve. Create an editorial sports photographic treatment of this exact supplied photo of Steppa catching the disc overhead. Preserve this real person, exact pose, proportions, face profile, cap, limbs, disc and authentic jersey lettering 'URIBE' and number '2' unchanged. Tight portrait 4:5 composition: whole player and disc visible from above the disc to the grass beneath his cleats, player occupies 85 percent of frame height, placed center-right. Retain real grass underneath and sense of actual open tournament field, no extra people. Player remains in natural color, authentic bright red shirt, normal skin tones; background field and sky become deep dramatic monochrome. Horizontal motion blur sweeps in the background only, player stays tack sharp. Darken sky to charcoal rather than light gray, dark image edges gently integrate into an almost-black webpage. Strong rich silver grass texture and restrained film grain, subtle photographic contrast, premium sports editorial. No fake pedestal, no floating on blank backdrop, no circle, no huge disc behind player, no graphic shapes, no new text or logos, no text alterations. Do not make it a painting, do not over-smooth face. The original real scene and image are the basis.
```


