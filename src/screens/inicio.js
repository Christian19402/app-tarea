import { store, contadores } from '../state/store.js';
import { icon } from '../components/icons.js';
import { eventosListHTML } from '../components/eventosList.js';

const ACCESOS = [
  { ruta: 'catalogo', etiqueta: 'Catálogo', icono: 'book-open', color: '#0EA5E9' },
  { ruta: 'galeria', etiqueta: 'Galería', icono: 'grid-3x3', color: '#8B5CF6' },
  { ruta: 'favoritos', etiqueta: 'Favoritos', icono: 'heart', color: '#F43F5E' },
  { ruta: 'progreso', etiqueta: 'Progreso', icono: 'trending-up', color: '#16A34A' }
];

const MENSAJES = {
  true: 'La app está activa y en primer plano.',
  false: 'La app está en segundo plano (pausada).'
};

export function montar() {
  const el = document.createElement('section');
  el.className = 'screen';

  function actualizar() {
    const c = contadores();
    const { isActive, ultimoEstado } = store.state.lifecycle;
    el.innerHTML = `
      <header class="hero">
        <p class="eyebrow">BIENVENIDO A</p>
        <h1 class="titulo-grande">ExRE</h1>
        <p class="texto-sec">Explora recursos para aprender desarrollo móvil con Capacitor: guarda tus favoritos y sigue tu progreso.</p>
      </header>

      <section class="card ciclo ${isActive ? 'activa' : 'inactiva'}" aria-label="Ciclo de vida">
        <div class="ciclo-cab">
          <span class="ciclo-icono">${icon('activity', 18)}</span>
          <div>
            <p class="ciclo-estado">${ultimoEstado} · isActive: ${isActive}</p>
            <p class="texto-sec">${MENSAJES[isActive]}</p>
          </div>
        </div>
        <h2 class="subtitulo">HISTORIAL DE EVENTOS</h2>
        ${eventosListHTML(5)}
      </section>

      <section class="stats" aria-label="Contadores">
        <div class="card stat"><span class="stat-num">${c.total}</span><span class="stat-lbl">Disponibles</span></div>
        <div class="card stat"><span class="stat-num">${c.favoritos}</span><span class="stat-lbl">Favoritos</span></div>
        <div class="card stat"><span class="stat-num">${c.completados}</span><span class="stat-lbl">Completados</span></div>
      </section>

      <h2 class="subtitulo">ACCESOS RÁPIDOS</h2>
      <nav class="accesos" aria-label="Accesos rápidos">
        ${ACCESOS.map(
          (a) => `
          <a class="acceso" href="#/${a.ruta}" style="background:${a.color}">
            ${icon(a.icono, 26)}
            <span>${a.etiqueta}</span>
          </a>`
        ).join('')}
      </nav>`;
  }

  return { el, actualizar };
}
