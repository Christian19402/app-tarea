// Estado en memoria + suscripciones. Una sola fuente de verdad para todas las pantallas.
import { RECURSOS } from '../data/recursos.js';
import { normalizar } from '../components/util.js';

const MAX_EVENTOS = 8;

const state = {
  recursos: RECURSOS,
  favoritos: new Set(),
  completados: new Set(),
  categoria: 'Todas',
  busqueda: '',
  recursoAbiertoId: null,
  lifecycle: { isActive: true, ultimoEstado: 'resumed' },
  eventos: [] // más reciente primero
};

const listeners = new Set();
const emit = () => listeners.forEach((fn) => fn());

function alternar(set, id) {
  if (set.has(id)) set.delete(id);
  else set.add(id);
  emit();
}

export const store = {
  state,

  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  toggleFavorito: (id) => alternar(state.favoritos, id),
  toggleCompletado: (id) => alternar(state.completados, id),

  setCategoria(categoria) {
    state.categoria = categoria;
    emit();
  },

  setBusqueda(texto) {
    state.busqueda = texto;
    emit();
  },

  abrirRecurso(id) {
    state.recursoAbiertoId = id;
  },

  // Registra un evento del ciclo de vida con su hora.
  registrarEvento(nombre, isActive) {
    state.lifecycle.isActive = isActive;
    state.lifecycle.ultimoEstado = isActive ? 'resumed' : 'paused';
    state.eventos.unshift({ nombre, isActive, hora: new Date() });
    if (state.eventos.length > MAX_EVENTOS) state.eventos.length = MAX_EVENTOS;
    emit();
  }
};

// ---- Selectores (todo se deriva del arreglo de datos) ----

export const getRecurso = (id) => state.recursos.find((r) => r.id === Number(id));

export function recursosFiltrados() {
  const q = normalizar(state.busqueda.trim());
  return state.recursos.filter((r) => {
    const okCategoria = state.categoria === 'Todas' || r.categoria === state.categoria;
    const okTexto =
      !q || [r.titulo, r.categoria, r.autor].some((campo) => normalizar(campo).includes(q));
    return okCategoria && okTexto;
  });
}

export const recursosFavoritos = () => state.recursos.filter((r) => state.favoritos.has(r.id));
export const recursosCompletados = () => state.recursos.filter((r) => state.completados.has(r.id));

export function contadores() {
  const total = state.recursos.length;
  const completados = state.completados.size;
  return {
    total,
    favoritos: state.favoritos.size,
    completados,
    pendientes: total - completados,
    porcentaje: total ? Math.round((completados / total) * 100) : 0
  };
}

export function progresoPorCategoria(nombres) {
  return nombres.map((nombre) => {
    const delaCategoria = state.recursos.filter((r) => r.categoria === nombre);
    const hechos = delaCategoria.filter((r) => state.completados.has(r.id)).length;
    return {
      nombre,
      total: delaCategoria.length,
      hechos,
      porcentaje: delaCategoria.length ? Math.round((hechos / delaCategoria.length) * 100) : 0
    };
  });
}
