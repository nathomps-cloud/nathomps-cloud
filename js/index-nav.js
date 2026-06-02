import { prog } from './core.js';

export const MAP = {
  folders: 0,
  quickpanel: 1,
  install: 2,
  settings: 3,
  goodlock: 4,
  focus: 5,
  lock: 6,
  capture: 7,
};

export function show(id) {
  document.querySelectorAll('.sec').forEach(s => s.classList.remove('vis'));
  document.querySelectorAll('.nb').forEach(b => b.classList.remove('on'));
  const sec = document.getElementById(id);
  if (sec) sec.classList.add('vis');
  const idx = MAP[id];
  const buttons = document.querySelectorAll('.nb');
  if (idx !== undefined && buttons[idx]) buttons[idx].classList.add('on');
  prog();
}
