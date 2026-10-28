import { esc, capitalizar } from './util.js';
import { icon, ICONO_TIPO } from './icons.js';
import { store } from '../state/store.js';

const botonFavorito = (id, activo) => `
  <button class="fav-btn ${activo ? 'activo' : ''}" data-action="fav" data-id="${id}"
    aria-label="${activo ? 'Quitar de favoritos' : 'Marcar como favorito'}" aria-pressed="${activo}">
    ${icon('heart', 20, { fill: activo })}
  </button>`;

// Tarjeta de lista (Catálogo y Favoritos).
export function recursoCardHTML(r) {
  const { favoritos, completados } = store.state;
  const fav = favoritos.has(r.id);
  const hecho = completados.has(r.id);
  return `
    <article class="card recurso" data-action="abrir" data-id="${r.id}" role="button" tabindex="0"
      aria-label="Abrir ${esc(r.titulo)}">
      <div class="portada" style="background:${r.color}">
        ${icon(ICONO_TIPO[r.tipo], 22)}
        ${hecho ? `<span class="badge-ok mini">${icon('check', 12)}</span>` : ''}
      </div>
      <div class="recurso-info">
        <h3 class="recurso-titulo">${esc(r.titulo)}</h3>
        <p class="recurso-meta">${esc(r.categoria)} · ${esc(r.autor)}</p>
        <div class="chips-fila">
          <span class="mini-chip">${icon('clock', 11)} ${r.duracion} min</span>
          <span class="mini-chip">${esc(capitalizar(r.nivel))}</span>
        </div>
      </div>
      ${botonFavorito(r.id, fav)}
    </article>`;
}

// Tarjeta de cuadrícula (Galería).
export function galeriaCardHTML(r) {
  const { favoritos, completados } = store.state;
  const fav = favoritos.has(r.id);
  const hecho = completados.has(r.id);
  return `
    <article class="card galeria-item" data-action="abrir" data-id="${r.id}" role="button" tabindex="0"
      aria-label="Abrir ${esc(r.titulo)}">
      <div class="galeria-portada" style="background:${r.color}">
        ${icon(ICONO_TIPO[r.tipo], 34)}
        ${hecho ? `<span class="badge-ok">${icon('check', 14)}</span>` : ''}
        ${fav ? `<span class="badge-fav">${icon('heart', 14, { fill: true })}</span>` : ''}
      </div>
      <div class="galeria-info">
        <h3 class="recurso-titulo">${esc(r.titulo)}</h3>
        <p class="recurso-meta">${esc(r.categoria)}</p>
      </div>
    </article>`;
}

// Lista con separadores de 1px entre tarjetas.
export function listaConSeparadores(recursos) {
  return recursos
    .map((r, i) => (i ? '<hr class="separador" />' : '') + recursoCardHTML(r))
    .join('');
}

// Manejo común de clicks en tarjetas: favorito o abrir detalle.
export function enlazarTarjetas(contenedor, origen, navegar) {
  const manejar = (e) => {
    const el = e.target.closest('[data-action]');
    if (!el || !contenedor.contains(el)) return;
    const id = Number(el.dataset.id);
    if (el.dataset.action === 'fav') {
      e.stopPropagation();
      store.toggleFavorito(id);
    } else if (el.dataset.action === 'abrir') {
      navegar(`/detalle/${id}?from=${origen}`);
    }
  };
  contenedor.addEventListener('click', manejar);
  contenedor.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset?.action === 'abrir') {
      e.preventDefault();
      manejar(e);
    }
  });
}
