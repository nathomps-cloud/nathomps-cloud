import { describe, it, expect, beforeEach } from 'vitest';
import { show, PANELS } from '../js/phase2-nav.js';

function setupDOM() {
  document.body.innerHTML = `
    <div id="pf" style="width:0%"></div>
    <div id="pl"></div>
    ${PANELS.map(id => `
      <button id="btn-${id}" class="folder-btn"></button>
      <div id="${id}" class="panel"></div>
    `).join('')}
  `;
  // Start with first panel active (mirrors HTML initial state)
  document.getElementById(PANELS[0]).classList.add('vis');
  document.getElementById('btn-' + PANELS[0]).classList.add('on');
}

// ─── PANELS constant ─────────────────────────────────────────────────────────

describe('PANELS', () => {
  it('contains exactly 5 panels', () => {
    expect(PANELS.length).toBe(5);
  });

  it('contains the expected panel ids in order', () => {
    expect(PANELS).toEqual(['command', 'projects', 'content', 'ai', 'inbox']);
  });
});

// ─── show() ──────────────────────────────────────────────────────────────────

describe('show() — phase 2 folder navigation', () => {
  beforeEach(setupDOM);

  it('makes the target panel visible', () => {
    show('projects');
    expect(document.getElementById('projects').classList.contains('vis')).toBe(true);
  });

  it('hides all other panels when switching', () => {
    show('ai');
    const visible = [...document.querySelectorAll('.panel.vis')];
    expect(visible.length).toBe(1);
    expect(visible[0].id).toBe('ai');
  });

  it('activates the sidebar button for the target panel', () => {
    show('content');
    expect(document.getElementById('btn-content').classList.contains('on')).toBe(true);
  });

  it('deactivates all other sidebar buttons', () => {
    show('inbox');
    const active = [...document.querySelectorAll('.folder-btn.on')];
    expect(active.length).toBe(1);
    expect(active[0].id).toBe('btn-inbox');
  });

  it('works when called on the already-active panel', () => {
    show('command');
    show('command');
    expect(document.getElementById('command').classList.contains('vis')).toBe(true);
    expect(document.querySelectorAll('.panel.vis').length).toBe(1);
  });

  it('correctly switches across multiple consecutive calls', () => {
    show('projects');
    show('ai');
    show('command');
    const visible = [...document.querySelectorAll('.panel.vis')];
    expect(visible.length).toBe(1);
    expect(visible[0].id).toBe('command');
  });

  it('every panel id can be activated without error', () => {
    PANELS.forEach(id => {
      expect(() => show(id)).not.toThrow();
      expect(document.getElementById(id).classList.contains('vis')).toBe(true);
    });
  });

  it('does not throw when called with an unknown panel id', () => {
    expect(() => show('nonexistent')).not.toThrow();
  });

  it('updates the progress bar after navigation', () => {
    document.getElementById('pl').textContent = '';
    show('command');
    expect(document.getElementById('pl').textContent).toBe('0 / 0 done');
  });
});
