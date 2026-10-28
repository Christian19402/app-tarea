import { store, recursosFiltrados } from '../state/store.js';
import { NOMBRES_CATEGORIAS } from '../data/recursos.js';
import { icon } from '../components/icons.js';
import { esc } from '../components/util.js';
import { listaConSeparadores, enlazarTarjetas } from '../components/recursoCard.js';

export function montar({ navegar }) {
  const el = document.createElement('section');
  el.className = 'screen';
  // El buscador se crea una sola vez para no perder el foco al escribir.
  el.innerHTML = `
    <h1 class="titulo">Catálogo</h1>
    <label class="buscador">
      ${icon('search', 18)}
      <input type="search" id="buscar" placeholder="Buscar por título, categoría o autor"
        autocomplete="off" value="${esc(store.state.busqueda)}" />
    </label>
    <div class="chips" id="chips"></div>
    <h2 class="subtitulo" id="resultados"></h2>
    <div id="lista"></div>`;

  const chips = el.querySelector('#chips');
  const resultados = el.querySelector('#resultados');
  const lista = el.querySelector('#lista');

  el.querySelector('#buscar').addEventListener('input', (e) => store.setBusqueda(e.target.value));

  chips.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-categoria]');
    if (chip) store.setCategoria(chip.dataset.categoria);
  });

  enlazarTarjetas(lista, 'catalogo', navegar);

  function actualizar() {
    const filtrados = recursosFiltrados();
    chips.innerHTML = ['Todas', ...NOMBRES_CATEGORIAS]
      .map(
        (c) =>
          `<button class="chip ${c === store.state.categoria ? 'activo' : ''}" data-categoria="${esc(c)}">${esc(c)}</button>`
      )
      .join('');
    resultados.textContent = `RESULTADOS (${filtrados.length})`;
    lista.innerHTML = filtrados.length
      ? listaConSeparadores(filtrados)
      : '<p class="vacio">No se encontraron recursos con ese filtro.</p>';
  }

  return { el, actualizar };
}
