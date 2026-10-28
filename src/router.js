// Único mecanismo de rutas: hash router (#/ruta/param?from=origen).
import { store } from './state/store.js';
import * as inicio from './screens/inicio.js';
import * as catalogo from './screens/catalogo.js';
import * as galeria from './screens/galeria.js';
import * as detalle from './screens/detalle.js';
import * as favoritos from './screens/favoritos.js';
import * as progreso from './screens/progreso.js';

const PANTALLAS = { inicio, catalogo, galeria, detalle, favoritos, progreso };
const ORIGENES_VALIDOS = ['catalogo', 'galeria', 'favoritos', 'progreso'];

export function parseHash() {
  const [ruta, consulta = ''] = (location.hash.slice(1) || '/inicio').split('?');
  const [, nombre, param] = ruta.split('/');
  const from = new URLSearchParams(consulta).get('from');
  return {
    nombre: PANTALLAS[nombre] ? nombre : 'inicio',
    param,
    from: ORIGENES_VALIDOS.includes(from) ? from : 'catalogo'
  };
}

export const navegar = (ruta) => {
  location.hash = `#${ruta}`;
};

// Botón atrás de Android: Detalle vuelve a su origen; otras pantallas van a Inicio.
export function atras(salir) {
  const { nombre, from } = parseHash();
  if (nombre === 'detalle') navegar(`/${from}`);
  else if (nombre !== 'inicio') navegar('/inicio');
  else salir();
}

export function iniciarRouter(view, tabBar) {
  let pantalla = null;
  let desuscribir = null;

  const renderizar = () => {
    desuscribir?.();
    pantalla?.destruir?.();

    const { nombre, param, from } = parseHash();
    pantalla = PANTALLAS[nombre].montar({ id: param, from, navegar });
    view.replaceChildren(pantalla.el);
    view.scrollTop = 0;
    tabBar.actualizar(nombre, nombre !== 'detalle');

    pantalla.actualizar();
    // Cualquier cambio de estado (favoritos, progreso, ciclo de vida) refresca la pantalla visible.
    desuscribir = store.subscribe(() => pantalla.actualizar());
  };

  window.addEventListener('hashchange', renderizar);
  if (location.hash.startsWith('#/')) renderizar();
  else location.hash = '#/inicio'; // dispara hashchange y renderiza
}
