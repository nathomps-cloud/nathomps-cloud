# Founder OS

Interactive setup guides for a Galaxy S22+ founder workflow, built as self-contained HTML pages with a dark design system.

## Files

- `index.html` — Phase 1 interactive checklist (apps, settings, productivity setup)
- `founder_os_phase2.html` — Phase 2 (AI, Automation & Output)
- `founder_os_phase2_folders.html` — Phase 2 Folders tab (separate page loaded in iframe)
- `js/core.js` — Shared ESM module: progress bar, checkbox tick, clock
- `js/index-nav.js`, `js/phase2-nav.js` — Tab navigation logic
- `tests/` — Vitest unit tests for `js/core.js`

## Running tests

```bash
npm test            # run once
npm run test:watch  # watch mode
```

## Architecture

- No build step — HTML files are opened directly in the browser
- All CSS is inline in each HTML file; shared logic lives in `js/core.js`
- Navigation uses `show(id, btn)` to toggle `.vis` class on `.sec` elements
- Progress tracking counts `.ci.done` vs total `.ci` elements

## Design system

Dark theme with CSS custom properties. Key color accents: `--lime` (primary/active), `--teal` (info), `--amber` (caution), `--violet` (AI). Full token reference: invoke `/design-tokens` or ask Claude when editing HTML.
