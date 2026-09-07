# Design QA — DS Dance Research Lab website

## Comparison target

- Source visual: `/home/podi_rasi/Pictures/codex/Codex Image Aug 31, 2026, 09_03_56 PM.png`
- Implementation: browser-rendered local Docker site at `http://localhost:3001/`
- State: desktop homepage, then mobile navigation at 390 × 844.
- Evidence: full-page in-app browser capture during this build session; source and implementation were visually compared at the same desktop composition level.

## Required fidelity surfaces

- Fonts and typography: Instrument Serif is used for display hierarchy and Manrope is loaded for body/interface text. The output preserves the large editorial headline, compact uppercase metadata and restrained utility labels.
- Spacing and layout rhythm: the implementation follows the reference sequence: dark split hero, pearl About section, dark three-card projects, gold founder message, dark Vision/Mission, pearl journal grid and dark Join Us footer.
- Colours and tokens: Obsidian `#101113`, charcoal `#191B1F`, pearl `#F5F4F0`, champagne `#D5BE91` and muted grey `#8A8E95` are applied as shared tokens.
- Image quality and asset fidelity: the implementation uses the original DS Dance Research Lab WordPress media URLs and logo rather than placeholder artwork.
- Copy and content: the client-provided homepage wording is preserved in the local content fallback; migration inventory is available for page-by-page review.

## Findings

- [P3] The legacy logo asset includes a dark square background rather than a transparent lockup. Use the original transparent logo file when it is supplied to improve the header and footer finish.
- [P3] The current fallback dataset is intentionally small until the verified WordPress inventory is manually reviewed and migrated. The JPanel adapter is deliberately disabled pending separate approval.

## Interaction checks

- All planned public route families resolve locally.
- Gallery tiles open a keyboard-dismissable lightbox.
- Mobile navigation opens and exposes all primary links.
- Contact and Join Us native required-field validation works.
- Browser console: no errors detected.

## Implementation checklist

- Replace the legacy square logo with the client’s transparent master asset during migration.
- Review `migration/output/` and import approved records as drafts before publishing.

final result: passed
