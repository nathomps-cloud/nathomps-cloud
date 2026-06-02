import { prog } from './core.js';

export const PANELS = ['command', 'projects', 'content', 'ai', 'inbox'];

export function show(id) {
  PANELS.forEach(p => {
    const panel = document.getElementById(p);
    if (panel) panel.classList.remove('vis');
    const btn = document.getElementById('btn-' + p);
    if (btn) btn.classList.remove('on');
  });
  const panel = document.getElementById(id);
  if (panel) panel.classList.add('vis');
  const btn = document.getElementById('btn-' + id);
  if (btn) btn.classList.add('on');
  prog();
}
