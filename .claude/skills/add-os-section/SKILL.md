---
name: add-os-section
description: Add a new interactive section or tab to a Founder OS guide page. Use when the user wants to add checklist items, cards, tabs, or new content sections to index.html, founder_os_phase2.html, or founder_os_phase2_folders.html.
---

## Existing navigation tabs

!`grep -n 'class="nb"' index.html founder_os_phase2.html founder_os_phase2_folders.html 2>/dev/null`

## Instructions

Add the requested content following these patterns. Never introduce new CSS classes — use the existing design system.

**New tab button** (add inside `.nav` div):
```html
<button class="nb" onclick="show('SECTION_ID',this)">Label</button>
```

**New section** (add after existing `.sec` divs):
```html
<div id="SECTION_ID" class="sec">
  <div class="slabel">Section Title</div>
  <!-- content here -->
</div>
```

**Interactive checkbox card** (progress-tracked):
```html
<div class="card ci" onclick="tick(this)">
  <div class="card-row">
    <div class="card-title">
      <div class="card-icon" style="background:var(--lime-dim)">🔧</div>
      Item Title
    </div>
    <span class="cb"></span>
  </div>
  <div class="card-desc">What to do and why.</div>
</div>
```

**Info card with pills**:
```html
<div class="card">
  <div class="card-row">
    <div class="card-title">
      <div class="card-icon" style="background:var(--teal-dim)">📋</div>
      Title
      <span class="badge b-teal">tag</span>
    </div>
  </div>
  <div class="card-desc">Description text.</div>
  <div class="pills">
    <span class="pill">item 1</span>
    <span class="pill">item 2</span>
  </div>
</div>
```

**Responsive grid of stat cards**:
```html
<div class="sgrid">
  <div class="sc">
    <div class="slabel">Label</div>
    <div style="font-size:22px;font-weight:700;color:var(--lime)">Value</div>
  </div>
</div>
```

Choose `--lime` for primary actions, `--teal` for info/system, `--amber` for caution, `--violet` for AI/automation items.
