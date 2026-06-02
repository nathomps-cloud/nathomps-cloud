import { describe, it, expect, beforeEach } from 'vitest';
import { prog, tick, formatTime, formatDate, updateClock } from '../js/core.js';

// ─── helpers ────────────────────────────────────────────────────────────────

function setupProgDOM(total, doneCount) {
  document.body.innerHTML = `
    <div id="pf" style="width:0%"></div>
    <div id="pl"></div>
    ${Array.from({ length: total }, (_, i) => `
      <div class="ci${i < doneCount ? ' done' : ''}">
        <div class="cb">${i < doneCount ? '✓' : ''}</div>Item ${i + 1}
      </div>
    `).join('')}
  `;
}

// ─── prog() ─────────────────────────────────────────────────────────────────

describe('prog()', () => {
  it('shows 0 / 0 done and 0% width when there are no checklist items', () => {
    setupProgDOM(0, 0);
    prog();
    expect(document.getElementById('pf').style.width).toBe('0%');
    expect(document.getElementById('pl').textContent).toBe('0 / 0 done');
  });

  it('shows 0% when no items are checked', () => {
    setupProgDOM(5, 0);
    prog();
    expect(document.getElementById('pf').style.width).toBe('0%');
    expect(document.getElementById('pl').textContent).toBe('0 / 5 done');
  });

  it('shows 100% when all items are checked', () => {
    setupProgDOM(4, 4);
    prog();
    expect(document.getElementById('pf').style.width).toBe('100%');
    expect(document.getElementById('pl').textContent).toBe('4 / 4 done');
  });

  it('rounds 1 of 3 to 33%', () => {
    setupProgDOM(3, 1);
    prog();
    expect(document.getElementById('pf').style.width).toBe('33%');
    expect(document.getElementById('pl').textContent).toBe('1 / 3 done');
  });

  it('rounds 2 of 3 to 67%', () => {
    setupProgDOM(3, 2);
    prog();
    expect(document.getElementById('pf').style.width).toBe('67%');
    expect(document.getElementById('pl').textContent).toBe('2 / 3 done');
  });

  it('handles a single checked item', () => {
    setupProgDOM(1, 1);
    prog();
    expect(document.getElementById('pf').style.width).toBe('100%');
    expect(document.getElementById('pl').textContent).toBe('1 / 1 done');
  });

  it('does not throw when #pf or #pl are absent', () => {
    document.body.innerHTML = '<div class="ci done"><div class="cb"></div></div>';
    expect(() => prog()).not.toThrow();
  });
});

// ─── tick() ──────────────────────────────────────────────────────────────────

describe('tick()', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="pf" style="width:0%"></div>
      <div id="pl">0 / 0 done</div>
    `;
  });

  function makeItem(done = false) {
    const el = document.createElement('div');
    el.className = 'ci' + (done ? ' done' : '');
    const cb = document.createElement('div');
    cb.className = 'cb';
    cb.textContent = done ? '✓' : '';
    el.appendChild(cb);
    document.body.appendChild(el);
    return el;
  }

  it('marks an unchecked item as done', () => {
    const el = makeItem(false);
    tick(el);
    expect(el.classList.contains('done')).toBe(true);
    expect(el.querySelector('.cb').textContent).toBe('✓');
  });

  it('unmarks a done item', () => {
    const el = makeItem(true);
    tick(el);
    expect(el.classList.contains('done')).toBe(false);
    expect(el.querySelector('.cb').textContent).toBe('');
  });

  it('toggling twice returns item to its original state', () => {
    const el = makeItem(false);
    tick(el);
    tick(el);
    expect(el.classList.contains('done')).toBe(false);
    expect(el.querySelector('.cb').textContent).toBe('');
  });

  it('triggers a progress bar update after checking', () => {
    const el = makeItem(false);
    tick(el);
    expect(document.getElementById('pl').textContent).toBe('1 / 1 done');
    expect(document.getElementById('pf').style.width).toBe('100%');
  });

  it('triggers a progress bar update after unchecking', () => {
    const el = makeItem(true);
    tick(el);
    expect(document.getElementById('pl').textContent).toBe('0 / 1 done');
    expect(document.getElementById('pf').style.width).toBe('0%');
  });
});

// ─── formatTime() ────────────────────────────────────────────────────────────

describe('formatTime()', () => {
  it('formats midnight as 00:00', () => {
    expect(formatTime(new Date(2026, 0, 1, 0, 0))).toBe('00:00');
  });

  it('pads single-digit hours with a leading zero', () => {
    expect(formatTime(new Date(2026, 0, 1, 9, 0))).toBe('09:00');
  });

  it('pads single-digit minutes with a leading zero', () => {
    expect(formatTime(new Date(2026, 0, 1, 10, 3))).toBe('10:03');
  });

  it('pads both hour and minute when both are single-digit', () => {
    expect(formatTime(new Date(2026, 0, 1, 9, 5))).toBe('09:05');
  });

  it('formats noon as 12:00', () => {
    expect(formatTime(new Date(2026, 0, 1, 12, 0))).toBe('12:00');
  });

  it('formats 23:59 correctly', () => {
    expect(formatTime(new Date(2026, 0, 1, 23, 59))).toBe('23:59');
  });
});

// ─── formatDate() ────────────────────────────────────────────────────────────

describe('formatDate()', () => {
  it('returns the correct day name, month name, and date number', () => {
    // June 2, 2026 is a Tuesday
    expect(formatDate(new Date(2026, 5, 2))).toBe('Tuesday, June 2');
  });

  it('includes the numeric day-of-month', () => {
    expect(formatDate(new Date(2026, 5, 15))).toContain('15');
  });

  it('covers all 7 day names', () => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Test 7 consecutive dates — whichever day they fall on, the name must match
    for (let i = 0; i < 7; i++) {
      const d = new Date(2026, 0, 4 + i); // Jan 4–10, 2026
      expect(formatDate(d)).toMatch(new RegExp(`^${dayNames[d.getDay()]}`));
    }
  });

  it('covers all 12 month names', () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    monthNames.forEach((month, i) => {
      expect(formatDate(new Date(2026, i, 15))).toContain(month);
    });
  });
});

// ─── updateClock() ────────────────────────────────────────────────────────────

describe('updateClock()', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="ltime"></div>
      <div id="ldate"></div>
    `;
  });

  it('updates #ltime with the formatted time', () => {
    updateClock(new Date(2026, 5, 2, 14, 30));
    expect(document.getElementById('ltime').textContent).toBe('14:30');
  });

  it('updates #ldate with the formatted date', () => {
    updateClock(new Date(2026, 5, 2)); // Tuesday, June 2
    expect(document.getElementById('ldate').textContent).toBe('Tuesday, June 2');
  });

  it('does not throw when #ltime is absent', () => {
    document.body.innerHTML = '<div id="ldate"></div>';
    expect(() => updateClock(new Date())).not.toThrow();
  });

  it('does not throw when #ldate is absent', () => {
    document.body.innerHTML = '<div id="ltime"></div>';
    expect(() => updateClock(new Date())).not.toThrow();
  });

  it('does not throw when both clock elements are absent', () => {
    document.body.innerHTML = '';
    expect(() => updateClock(new Date())).not.toThrow();
  });
});
