# Design QA — DS Dance Research Lab homepage

- Source visual truth: `/home/podi_rasi/Pictures/codex/Codex Image Aug 31, 2026, 09_03_56 PM.png`
- Intended viewport: desktop editorial website (source: 864 × 2048 px preview)
- Implementation: `http://localhost:3001/`
- State: default homepage, desktop

## Comparison history

### Iteration 1

- [P1] The prior implementation retained legacy brown homepage surfaces (`#302721`, `#3B2B24`, and `#B99568`), which materially differed from the selected obsidian, pearl and champagne-gold reference.
- Fix applied: replaced those surfaces with `#101113`, `#191B1F`, `#F5F4F0`, and `#D5BE91`; rebuilt the homepage as a contemporary editorial sequence rather than a reproduction of the older WordPress layout.
- Fix applied: introduced an asymmetric hero, pearl split About panel, portrait-led founder and mentor essays, staggered vision/mission studies, an asymmetric research image grid, and an offset forthcoming editorial pair.
- Fix applied: corrected the production Docker image to copy `public/`; every one of the 12 homepage images now returns HTTP 200 from the running container.

## Fidelity surfaces

- Fonts and typography: Instrument Serif is used for editorial display headings and Manrope for body/interface text, matching the reference direction.
- Spacing and layout rhythm: a high-impact hero, editorial split About panel, portrait essays, staggered research studies, asymmetric image grid, and a dark closing editorial pair follow the reference’s polished gallery-like rhythm without reviving the prior website layout.
- Colors and tokens: approved obsidian, elevated charcoal, pearl and champagne-gold system is now used; legacy brown is removed from homepage styles.
- Image quality and asset fidelity: supplied logo and locally stored visual assets are used. No placeholder artwork or remote WordPress image URL is used on the homepage.
- Copy and content: content is sourced from `lib/home-content.ts` and unchanged by the visual redesign.

## Blocker

The in-app browser was unavailable after the Docker rebuild, so a browser-rendered implementation screenshot could not be captured and placed beside the source image. Production build and Docker startup succeeded, but visual browser QA cannot be marked complete without that capture.

final result: blocked
