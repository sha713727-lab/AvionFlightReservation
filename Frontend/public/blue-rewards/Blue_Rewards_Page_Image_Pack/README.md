# Blue Rewards Page Image Pack

Six coordinated AI-generated travel photographs for AvioSupportDesk's Blue Rewards page.
All photographs are free of added captions, watermarks and website UI.

## Upload these files

Use `01_UPLOAD_WEBP` for the website. If the uploader requires JPEG, use the matching file in `02_UPLOAD_JPG`.
Both upload folders contain six images, each below 5 MB and with a longest edge no greater than 1600 px.
Use one format per slot; do not upload duplicate formats as separate page images.

| Slot | Subject | Upload size | Requested-size JPG |
|---|---|---|---|
| `lead` | Airport departure | 1600 x 1067 | 1600 x 1067 |
| `pairALeft` | Ocean-view hotel stay | 1066 x 1599 | 1100 x 1650 |
| `pairARight` | Coastal destination | 880 x 1320 | 880 x 1320 |
| `pairBLeft` | Scenic road trip | 1066 x 1599 | 1200 x 1800 |
| `pairBRight` | Cruise deck | 800 x 1200 | 800 x 1200 |
| `railPhoto` | Travel planning | 860 x 1040 | 860 x 1040 |

## Folder guide

- `01_UPLOAD_WEBP`: optimised images for direct use in the CMS.
- `02_UPLOAD_JPG`: high-quality JPEG alternatives at the same upload dimensions.
- `03_REQUESTED_SIZES_JPG`: exports matching all six sizes in the supplied layout table.
- `04_GENERATED_ORIGINALS_PNG`: unchanged native generation outputs for future editing.
- `CONTACT_SHEET.jpg`: labelled visual preview of all six photos.
- `SLOT_MAPPING.csv`: exact slot mapping, filenames, dimensions, crop positions and alt text.
- `ASSET_MANIFEST.json`: file metadata and checksums.
- `GENERATION_PROMPTS.md`: the six prompts used to create the photographs.

## Dimension details

`pairALeft` at 1100 x 1650 and `pairBLeft` at 1200 x 1800 exceed the CMS's longest-edge cap.
Their upload versions are 1066 x 1599, the largest exact 2:3 integer dimensions below 1600 px.
The requested larger sizes are also included in the requested-size folder.
The lead is 1600 x 1067, matching the requested upload; its difference from mathematical 3:2 is normal pixel rounding.
The rail is 860 x 1040, matching the supplied 430 x 520 display at 2x.

The native lead is 1536 x 1024; the four native portraits are 1024 x 1536;
the native rail is 1141 x 1379. Some exact requested exports are modestly resampled from these sources.
Resampling does not add genuine camera detail. The unaltered originals are supplied for transparency and reuse.

## Placement

Keep `object-fit: cover` for all photos. Start with `object-position: 50% 50%`;
for the rail use `50% 42%` if the card becomes shorter on smaller screens.
Maintain the page's intended aspect ratios to avoid unnecessary cropping.
The supplied alt text describes the image; it makes no claim about reward availability or specific bookable properties.
Use the lead as the main page image and lazy-load photos below the first screen.
Property cards remain text only, as specified.

## Client-logo slot

No client names or original client-logo assets were supplied, so no client logos are included.
For that slot, use the actual approved artwork at 320 x 96 with transparency and `object-fit: contain`.

## Image context

These are illustrative AI-generated scenes, not photographs of verified hotels, airports,
cruise operators, employees or customers. Pair them with general travel guidance rather than
specific property listings or customer testimonials. No official Blue Rewards or partner logos
were generated or embedded. This pack does not imply a programme affiliation.
