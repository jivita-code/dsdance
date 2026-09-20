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
