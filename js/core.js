/**
 * Shared logic used by both index.html and founder_os_phase2_folders.html.
 * Extracted here so it can be unit-tested independently of the HTML pages.
 */

export function prog() {
  const all = document.querySelectorAll('.ci');
  const done = document.querySelectorAll('.ci.done');
  const pct = all.length ? Math.round(done.length / all.length * 100) : 0;
  const fill = document.getElementById('pf');
  const label = document.getElementById('pl');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = done.length + ' / ' + all.length + ' done';
}

export function tick(el) {
  el.classList.toggle('done');
  el.querySelector('.cb').textContent = el.classList.contains('done') ? '✓' : '';
  prog();
}

export function formatTime(date) {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return h + ':' + m;
}

export function formatDate(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate();
}

export function updateClock(date = new Date()) {
  const t = document.getElementById('ltime');
  const d = document.getElementById('ldate');
  if (t) t.textContent = formatTime(date);
  if (d) d.textContent = formatDate(date);
}
