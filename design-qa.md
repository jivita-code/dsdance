# Research Projects card redesign — Design QA

## Comparison target

- Source visual truth: user-provided reference screenshot in this conversation, showing an image-first three-column editorial card grid with a visible filter row (The Imagination Museum “Latest news” reference).
- Intended implementation route: `/research-projects`.
- Intended viewport: desktop, matching the supplied reference’s wide landscape composition.
- Intended state: all projects selected; status filters visible above the card grid.

## Implementation evidence

- Build evidence: `npm run typecheck` and `npm run build` completed successfully after the compact-card correction.
- Cover-image transport: the live JPanel media endpoint and the local Next.js image optimizer both returned `200 image/jpeg` for a project cover.
- Browser-rendered screenshot: unavailable. Both enabled browser surfaces (`iab` and `chrome`) reported that no browser was available in this session, so no implementation capture or console inspection could be performed.

## Required fidelity surfaces

- Fonts and typography: implemented using the existing Cormorant Garamond display and Manrope interface system; browser rendering not captured.
- Spacing and layout rhythm: implemented as a three-column desktop card grid, two-column tablet grid, and one-column mobile grid; browser rendering not captured.
- Colors and visual tokens: implemented with the existing obsidian archive surface, soft-pearl cards, and champagne-gold status emphasis; browser rendering not captured.
- Image quality and asset fidelity: the image transport is confirmed working; a fixed responsive cover frame now reserves `200–270px` before the card copy, so covers cannot be hidden by equal-height card stretching. Browser rendering not captured.
- Copy and content: project title, status, summary, and existing destination route are preserved; browser rendering not captured.

## Findings

- [P1] Browser visual verification unavailable.
  Location: `/research-projects` desktop and responsive views.
  Evidence: both the in-app browser and Chrome browser control reported no available browser surface.
  Impact: the new grid, filter controls, image crop, and responsive layout cannot be compared against the supplied reference visually in this session.
  Fix: reopen this task with an enabled browser surface, capture the reference and local route at a matching desktop viewport, then complete the visual comparison and interaction checks.

## Primary interactions pending browser verification

- All projects, Ongoing, Past, and Upcoming filter links.
- Project-card destination links.
- Keyboard focus styling for filters and cards.
- Desktop, tablet, and mobile layout behavior.

## Comparison history

1. Initial implementation completed from the supplied visual reference. Build and type checks passed. Browser capture was blocked by unavailable browser surfaces.
2. Compact-card correction: removed inherited full-height rules from the card and copy, made the grid align cards to their own content, and assigned an explicit responsive cover-image height. Type checks and production build passed; browser capture remains blocked.

## Final result

final result: blocked

# Homepage hero redesign — Design QA

## Comparison target

- Source visual truth: image 2 in the user's latest message (1672 × 941 px), the DSDRL design reference.
- Previous implementation evidence: image 1 in the user's latest message (1908 × 931 px), before this revision.
- Latest implementation route: `/`; intended states: desktop, tablet, mobile, reduced motion.
- Latest implementation screenshot path: unavailable because the in-app browser cannot open. Pixel dimensions, CSS viewport, and density normalization cannot be recorded for the latest build.

## Full-view and focused comparison evidence

- The provided desktop screenshots show the previous copy starting at roughly 23% of the frame width versus roughly 16% in the reference. The new CSS positions the copy at 15.8vw, but its rendered result is not captured.
- The previous research labels were horizontal and low; the reference stacks them near the upper-left. They are now positioned against the hero frame.
- The previous dancer pose and scale visibly differed. A new transparent dancer was generated from the reference pose, but exact person/pose fidelity requires a rendered side-by-side review.
- The previous backdrop was sharp and flat. A newly generated plate places softly defocused archive frames behind a top-right warm light source.
- Focused text/model regions were assessed from the two user-provided images; no post-fix focused implementation capture is available.

## Required fidelity surfaces

- Fonts and typography: existing Cormorant Garamond/Manrope remain; the display title now uses a warm gold text gradient and larger reference-scale type. Browser rendering unverified.
- Spacing and layout rhythm: rail, labels, copy, CTA, and side note are anchored to viewport proportions measured from the source. Browser rendering and responsive wrapping unverified.
- Colors and tokens: dark charcoal, champagne gold, restrained bronze light, and a separate background veil are implemented. Contrast under the final browser rasterization is unverified.
- Image quality and asset fidelity: versioned WebP backdrop and transparent dancer are present; the optimized dancer response preserves alpha. Exact model identity cannot be guaranteed by image generation.
- Copy and content: the reference subtitle and Explore DSDRL CTA are implemented; the site header's Join Us link remains.

## Findings

- [P1] Visual QA blocked: no browser is available through computer use; opening `iab` returns “Browser is not available.” No latest desktop/mobile screenshot, console check, or interaction capture can be compared with the reference.
- [P2] Exact dancer likeness is unconfirmed: the generated cutout follows the reference silhouette and lighting but is not a literal extraction of the model.

## Comparison history

1. Initial hero implementation: user-provided implementation screenshot exposed copy misalignment, horizontal labels, insufficient depth, and a different dancer.
2. This revision: regenerated both image layers; moved labels to the hero frame; aligned copy/rail/CTA to the reference; added warm gold text treatment and background depth. TypeScript, build, route, and media checks pass. Post-fix visual comparison remains blocked.

## Follow-up verification

- Capture the latest `/` at the reference aspect ratio and a mobile width, then compare title alignment, dancer edge/crop, background depth, CTA, and reduced-motion state.
- Test the Explore DSDRL link and keyboard focus, and inspect the browser console.

## Final result

final result: blocked
