import { store, getRecurso } from '../state/store.js';
import { icon, ICONO_TIPO } from '../components/icons.js';
import { esc, capitalizar } from '../components/util.js';
import { mostrarToast } from '../components/toast.js';

export function montar({ id, from, navegar }) {
  const el = document.createElement('section');
  el.className = 'screen detalle';
  const recurso = getRecurso(id);
  const volver = () => navegar(`/${from}`); // vuelve a la pantalla de origen

  if (recurso) store.abrirRecurso(recurso.id);

  el.addEventListener('click', (e) => {
    const accion = e.target.closest('[data-action]')?.dataset.action;
    if (!accion) return;
    if (accion === 'volver') volver();
    else if (accion === 'fav') store.toggleFavorito(recurso.id);
    else if (accion === 'hecho') store.toggleCompletado(recurso.id);
    else if (accion === 'enlace') {
      e.preventDefault();
      mostrarToast('Enlace simulado: no abre ninguna página');
    }
  });

  function actualizar() {
    if (!recurso) {
      el.innerHTML = `
        <div class="detalle-cab" style="background:var(--surface)">
          <button class="icon-btn" data-action="volver" aria-label="Volver">${icon('arrow-left', 20)}</button>
        </div>
        <p class="vacio">No se encontró el recurso.</p>`;
      return;
    }
    const fav = store.state.favoritos.has(recurso.id);
    const hecho = store.state.completados.has(recurso.id);
    el.innerHTML = `
      <div class="detalle-cab" style="background:${recurso.color}">
        <button class="icon-btn" data-action="volver" aria-label="Volver">${icon('arrow-left', 20)}</button>
        <button class="icon-btn ${fav ? 'fav-activo' : ''}" data-action="fav"
          aria-label="${fav ? 'Quitar de favoritos' : 'Marcar como favorito'}" aria-pressed="${fav}">
          ${icon('heart', 20, { fill: fav })}
        </button>
        <span class="detalle-tipo">${icon(ICONO_TIPO[recurso.tipo], 56)}</span>
      </div>

      <div class="detalle-cuerpo">
        <p class="eyebrow" style="color:${recurso.color === '#CA8A04' ? '#FACC15' : 'var(--primary-light)'}">${esc(recurso.categoria.toUpperCase())}</p>
        <h1 class="titulo">${esc(recurso.titulo)}</h1>
        <p class="texto-sec">Por ${esc(recurso.autor)}</p>

        <div class="chips-fila grande">
          <span class="mini-chip">${icon('clock', 13)} ${recurso.duracion} min</span>
          <span class="mini-chip">${esc(capitalizar(recurso.nivel))}</span>
          <span class="mini-chip">${esc(capitalizar(recurso.tipo))}</span>
          ${hecho ? `<span class="mini-chip ok">${icon('check', 13)} Completado</span>` : '<span class="mini-chip">Pendiente</span>'}
        </div>

        <h2 class="subtitulo">DESCRIPCIÓN</h2>
        <p class="descripcion">${esc(recurso.descripcion)}</p>

        <a class="enlace" href="#" data-action="enlace">
          ${icon('link', 18)} <span>https://exre.app/recursos/${recurso.id}</span>
        </a>

        <div class="acciones">
          <button class="btn ${fav ? 'btn-sec' : 'btn-fav'}" data-action="fav">
            ${icon('heart', 18, { fill: fav })} ${fav ? 'Quitar favorito' : 'Marcar favorito'}
          </button>
          <button class="btn ${hecho ? 'btn-sec' : 'btn-ok'}" data-action="hecho">
            ${icon('check', 18)} ${hecho ? 'Marcar como pendiente' : 'Marcar como completado'}
          </button>
        </div>
      </div>`;
  }

  return { el, actualizar };
}
