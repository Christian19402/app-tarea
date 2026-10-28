import { store, contadores, progresoPorCategoria, recursosCompletados } from '../state/store.js';
import { NOMBRES_CATEGORIAS, CATEGORIAS } from '../data/recursos.js';
import { icon } from '../components/icons.js';
import { esc, formatearHora } from '../components/util.js';
import { eventosListHTML } from '../components/eventosList.js';

export function montar({ navegar }) {
  const el = document.createElement('section');
  el.className = 'screen';

  el.addEventListener('click', (e) => {
    const fila = e.target.closest('[data-id]');
    if (fila) navegar(`/detalle/${fila.dataset.id}?from=progreso`);
  });

  function actualizar() {
    const c = contadores();
    const ultimo = store.state.eventos[0];
    const completados = recursosCompletados();
    el.innerHTML = `
      <h1 class="titulo">Progreso</h1>

      <section class="card resumen">
        <div class="resumen-fila">
          <span class="porcentaje">${c.porcentaje}%</span>
          <span class="texto-sec">${c.completados} completados · ${c.pendientes} pendientes</span>
        </div>
        <div class="barra" role="progressbar" aria-valuenow="${c.porcentaje}" aria-valuemin="0" aria-valuemax="100">
          <div class="barra-fill" style="width:${c.porcentaje}%"></div>
        </div>
      </section>

      <section class="card ciclo ${store.state.lifecycle.isActive ? 'activa' : 'inactiva'}">
        <h2 class="subtitulo">ÚLTIMO EVENTO DE CICLO DE VIDA</h2>
        <p class="ciclo-estado">${
          ultimo ? `${esc(ultimo.nombre)} · ${formatearHora(ultimo.hora)}` : 'Sin eventos todavía'
        }</p>
        ${eventosListHTML(4)}
      </section>

      <h2 class="subtitulo">POR CATEGORÍA</h2>
      <section class="card categorias">
        ${progresoPorCategoria(NOMBRES_CATEGORIAS)
          .map(
            (p) => `
          <div class="cat-fila">
            <div class="cat-cab"><span>${esc(p.nombre)}</span><span class="texto-sec">${p.hechos}/${p.total}</span></div>
            <div class="barra fina"><div class="barra-fill" style="width:${p.porcentaje}%;background:${CATEGORIAS[p.nombre]}"></div></div>
          </div>`
          )
          .join('')}
      </section>

      <h2 class="subtitulo">COMPLETADOS (${completados.length})</h2>
      ${
        completados.length
          ? `<section class="card lista-completados">${completados
              .map(
                (r, i) => `${i ? '<hr class="separador" />' : ''}
              <div class="completado" data-id="${r.id}" role="button" tabindex="0">
                <span class="check-verde">${icon('check', 14)}</span>
                <span class="completado-titulo">${esc(r.titulo)}</span>
                <span class="texto-sec">${r.duracion} min</span>
              </div>`
              )
              .join('')}</section>`
          : '<p class="vacio">Todavía no completaste ningún recurso.</p>'
      }`;
  }

  return { el, actualizar };
}
