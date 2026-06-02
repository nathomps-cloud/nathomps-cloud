import { describe, it, expect, beforeEach } from 'vitest';
import { show, MAP } from '../js/index-nav.js';

const SECTION_IDS = Object.keys(MAP);

function setupDOM() {
  document.body.innerHTML = `
    <div id="pf" style="width:0%"></div>
    <div id="pl"></div>
    <nav>
      ${SECTION_IDS.map(id => `<button class="nb">${id}</button>`).join('')}
    </nav>
    ${SECTION_IDS.map(id => `<div id="${id}" class="sec"></div>`).join('')}
  `;
  // Start with first section active (mirrors HTML initial state)
  document.getElementById(SECTION_IDS[0]).classList.add('vis');
  document.querySelectorAll('.nb')[0].classList.add('on');
}

// ─── MAP constant ────────────────────────────────────────────────────────────

describe('MAP', () => {
  it('contains exactly 8 entries', () => {
    expect(Object.keys(MAP).length).toBe(8);
  });

  it('has contiguous indices from 0 to 7 with no gaps', () => {
    const sorted = Object.values(MAP).sort((a, b) => a - b);
    expect(sorted).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it('contains all expected section IDs', () => {
    const expected = ['folders', 'quickpanel', 'install', 'settings', 'goodlock', 'focus', 'lock', 'capture'];
    expect(Object.keys(MAP)).toEqual(expected);
  });
});

// ─── show() ──────────────────────────────────────────────────────────────────

describe('show() — index page navigation', () => {
  beforeEach(setupDOM);

  it('makes the target section visible', () => {
    show('install');
    expect(document.getElementById('install').classList.contains('vis')).toBe(true);
  });

  it('hides all other sections when switching', () => {
    show('settings');
    const visible = [...document.querySelectorAll('.sec.vis')];
    expect(visible.length).toBe(1);
    expect(visible[0].id).toBe('settings');
  });

  it('activates the nav button that corresponds to the target section', () => {
    show('focus'); // MAP.focus === 5
    const active = [...document.querySelectorAll('.nb.on')];
    expect(active.length).toBe(1);
    expect(document.querySelectorAll('.nb')[MAP.focus].classList.contains('on')).toBe(true);
  });

  it('deactivates all other nav buttons', () => {
    show('lock');
    expect(document.querySelectorAll('.nb.on').length).toBe(1);
  });

  it('works when called on the already-active section', () => {
    show('folders');
    show('folders');
    expect(document.getElementById('folders').classList.contains('vis')).toBe(true);
    expect(document.querySelectorAll('.sec.vis').length).toBe(1);
  });

  it('correctly switches across multiple consecutive calls', () => {
    show('install');
    show('focus');
    show('capture');
    const visible = [...document.querySelectorAll('.sec.vis')];
    expect(visible.length).toBe(1);
    expect(visible[0].id).toBe('capture');
  });

  it('every section id in MAP can be activated without error', () => {
    SECTION_IDS.forEach(id => {
      expect(() => show(id)).not.toThrow();
      expect(document.getElementById(id).classList.contains('vis')).toBe(true);
    });
  });

  it('does not throw when called with an unknown section id', () => {
    expect(() => show('nonexistent')).not.toThrow();
  });

  it('updates the progress bar after navigation', () => {
    document.getElementById('pl').textContent = '';
    show('folders');
    expect(document.getElementById('pl').textContent).toBe('0 / 0 done');
  });
});
