import { icon } from './icons.js';

const PESTANAS = [
  { ruta: 'inicio', etiqueta: 'Inicio', icono: 'house' },
  { ruta: 'catalogo', etiqueta: 'Catálogo', icono: 'book-open' },
  { ruta: 'galeria', etiqueta: 'Galería', icono: 'grid-3x3' },
  { ruta: 'favoritos', etiqueta: 'Favoritos', icono: 'heart' },
  { ruta: 'progreso', etiqueta: 'Progreso', icono: 'trending-up' }
];

export function crearTabBar(nav) {
  nav.innerHTML = PESTANAS.map(
    (p) => `
      <a class="tab" href="#/${p.ruta}" data-tab="${p.ruta}">
        <span class="tab-icon">${icon(p.icono, 20)}</span>
        <span class="tab-label">${p.etiqueta}</span>
      </a>`
  ).join('');

  return {
    // Marca la pestaña activa; en Detalle la barra se oculta.
    actualizar(rutaActiva, visible) {
      nav.hidden = !visible;
      nav.querySelectorAll('.tab').forEach((tab) => {
        const activa = tab.dataset.tab === rutaActiva;
        tab.classList.toggle('active', activa);
        if (activa) tab.setAttribute('aria-current', 'page');
        else tab.removeAttribute('aria-current');
      });
    }
  };
}
