import { store } from '../state/store.js';
import { galeriaCardHTML, enlazarTarjetas } from '../components/recursoCard.js';

export function montar({ navegar }) {
  const el = document.createElement('section');
  el.className = 'screen';
  el.innerHTML = `
    <h1 class="titulo">Galería</h1>
    <p class="texto-sec">Toca una portada para ver el detalle.</p>
    <div class="galeria" id="grid"></div>`;

  const grid = el.querySelector('#grid');
  enlazarTarjetas(grid, 'galeria', navegar);

  function actualizar() {
    grid.innerHTML = store.state.recursos.map(galeriaCardHTML).join('');
  }

  return { el, actualizar };
}
