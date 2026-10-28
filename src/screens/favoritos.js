import { recursosFavoritos } from '../state/store.js';
import { icon } from '../components/icons.js';
import { listaConSeparadores, enlazarTarjetas } from '../components/recursoCard.js';

export function montar({ navegar }) {
  const el = document.createElement('section');
  el.className = 'screen';
  el.innerHTML = `
    <h1 class="titulo">Favoritos</h1>
    <p class="texto-sec" id="cuenta"></p>
    <div id="lista"></div>`;

  const cuenta = el.querySelector('#cuenta');
  const lista = el.querySelector('#lista');
  enlazarTarjetas(lista, 'favoritos', navegar);

  function actualizar() {
    const favs = recursosFavoritos();
    cuenta.textContent = `${favs.length} recurso(s) guardado(s)`;
    lista.innerHTML = favs.length
      ? listaConSeparadores(favs)
      : `<div class="vacio">
           ${icon('heart', 36)}
           <p>Aún no tienes favoritos.</p>
           <p class="texto-sec">Toca el corazón de un recurso para guardarlo aquí.</p>
         </div>`;
  }

  return { el, actualizar };
}
