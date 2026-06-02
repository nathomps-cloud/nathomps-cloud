---
name: design-tokens
description: CSS design tokens and component class reference for the Founder OS dark theme. Loads automatically when working with HTML files.
user-invocable: false
paths: "*.html"
---

## Color tokens

| Token | Value | Use |
|---|---|---|
| `--lime` | `#c8f04a` | Primary accent, active states, progress |
| `--teal` | `#4af0c8` | Info, system/OS items |
| `--amber` | `#f0b84a` | Caution, time-sensitive items |
| `--violet` | `#a07af0` | AI, automation, advanced features |
| `--red` | `#f04a6a` | Critical, danger |

Each accent has `-dim` (background fill) and `-border` variants, e.g. `--lime-dim`, `--lime-border`.

## Background layers (dark → light)

`--bg` → `--bg1` → `--bg2` → `--bg3`

## Typography

- `--font-head: 'Syne'` — headings, card titles
- `--font-mono: 'DM Mono'` — body, labels, badges

## Component classes

| Class | Purpose |
|---|---|
| `.card` | Base card container |
| `.card.ci` | Interactive checkbox card (add `onclick="tick(this)"`) |
| `.cb` | Checkbox indicator span inside `.ci` |
| `.card-row` | Flex row inside card |
| `.card-title` | Title with icon |
| `.card-icon` | 24×24 icon box (set `background` inline) |
| `.card-desc` | Muted description text |
| `.nb` | Nav tab button |
| `.nb.on` | Active nav tab |
| `.sec` | Content section (hidden by default) |
| `.sec.vis` | Visible section |
| `.slabel` | Section heading label |
| `.badge` | Small tag |
| `.pill` | Inline chip/tag |
| `.pills` | Flex pill container |
| `.sgrid` | Responsive auto-fit grid |
| `.sc` | Stat card inside sgrid |

## Badge variants

`.b-lime`, `.b-teal`, `.b-amber`, `.b-violet`, `.b-gray`

## Border radius

`--r: 10px` (cards), `--r-lg: 14px` (nav, large cards)
