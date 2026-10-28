import { esc, formatearHora } from './util.js';
import { store } from '../state/store.js';

// Historial breve de eventos del ciclo de vida (Inicio y Progreso).
export function eventosListHTML(limite = 5) {
  const eventos = store.state.eventos.slice(0, limite);
  if (!eventos.length) return '<p class="muted">Aún no hay eventos.</p>';
  return `<ul class="eventos">${eventos
    .map(
      (e) => `
      <li class="evento">
        <span class="punto ${e.isActive ? 'on' : 'off'}"></span>
        <span class="evento-nombre">${esc(e.nombre)}</span>
        <time class="evento-hora">${formatearHora(e.hora)}</time>
      </li>`
    )
    .join('')}</ul>`;
}
