const MAPA_HTML = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const esc = (valor) => String(valor).replace(/[&<>"']/g, (c) => MAPA_HTML[c]);

// Minúsculas y sin acentos, para búsquedas tolerantes.
export const normalizar = (texto) =>
  String(texto).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export const formatearHora = (fecha) =>
  fecha.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

export const capitalizar = (t) => t.charAt(0).toUpperCase() + t.slice(1);
