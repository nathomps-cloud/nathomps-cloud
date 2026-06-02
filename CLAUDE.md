# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A pair of standalone static HTML files forming a two-phase mobile productivity guide called **Founder OS** — a setup system for solo founders using a Samsung Galaxy S22+. No build tool, no package manager, no server. Both files open directly in a browser.

| File | Purpose |
|---|---|
| `index.html` | Phase 1 — Foundation Reset (home screen, quick panel, installs, settings, Good Lock, focus modes, lock screen, capture system) |
| `founder_os_phase2_folders.html` | Phase 2 — Master Folder Architecture (Google Drive folder structure: /COMMAND, /PROJECTS, /CONTENT, /AI, /INBOX) |

## Running / previewing

```bash
# Any static server works, e.g.:
python3 -m http.server 8080
# then open http://localhost:8080
```

Or just open the files directly in a browser — there are no local imports or module dependencies.

## Shared design system

Both files embed a full CSS custom-property design system in their `<style>` block. There is no shared stylesheet; changes to the palette must be made in each file separately.

**Color tokens** (same in both files):
- Backgrounds: `--bg`, `--bg1`, `--bg2`, `--bg3` (dark, #0c0c0e → #222228)
- Accent colors each come in three forms: solid (`--lime`), dim fill (`--lime-dim`), and border (`--lime-border` or `--lime-bd`)
- Accents: lime (#c8f04a), teal (#4af0c8), amber (#f0b84a), violet (#a07af0), red/coral (#f04a6a / #f07a6a)

**Fonts** (loaded from Google Fonts):
- `--font-head`: Syne — used for titles, card names, and bold UI labels
- `--font-mono`: DM Mono — used for body text, pills, settings rows, and most UI chrome

## Interactive patterns

**Tab/panel navigation** — both files follow the same pattern:
- Sections use a `.sec` / `.panel` class; the active one gets `.vis` which sets `display:block` and plays a fade-up animation
- `show(id)` function toggles `.vis` on the target and `.on` on the corresponding nav button

**Checklists with progress bar**:
- Each checklist item is a `.ci` div with a `.cb` checkbox child
- `tick(el)` toggles `.done` on the `.ci`, sets the checkmark text, and calls `prog()`
- `prog()` counts all `.ci` vs `.ci.done` to update `#pf` (fill bar width) and `#pl` (text label)

## Conventions

- **File naming**: dates in filenames use `YYYY-MM-DD_description` format (documented as the project convention)
- **No external JS libraries** — all interactivity is vanilla JS in a single `<script>` block at the bottom of each file
- **No shared CSS** — each file is fully self-contained; the design tokens are duplicated by design
- **Accent color assignment**: teal = command/finance, lime = build/projects, amber = publish/content, violet = AI/focus, coral = inbox
