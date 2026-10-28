// Datos locales: 24 recursos. La UI se genera siempre a partir de este arreglo.

export const CATEGORIAS = {
  'Capacitor': '#0EA5E9',
  'Android': '#16A34A',
  'HTML y CSS': '#F97316',
  'JavaScript': '#CA8A04',
  'Diseño móvil': '#DB2777',
  'Navegación': '#8B5CF6'
};

export const NOMBRES_CATEGORIAS = Object.keys(CATEGORIAS);

const r = (id, titulo, categoria, autor, duracion, nivel, tipo, descripcion) => ({
  id,
  titulo,
  categoria,
  autor,
  duracion,
  nivel,
  tipo,
  descripcion,
  color: CATEGORIAS[categoria],
  estado: 'pendiente'
});

export const RECURSOS = [
  r(1, 'Introducción a Capacitor', 'Capacitor', 'Ana Torres', 12, 'básico', 'video',
    'Qué es Capacitor, cómo se relaciona con la web y cómo empaqueta tu aplicación para Android.'),
  r(2, 'Configurar capacitor.config', 'Capacitor', 'Luis Prado', 8, 'básico', 'lectura',
    'Repaso de appId, appName y webDir, y cómo afectan a la compilación del proyecto.'),
  r(3, 'Plugins oficiales: App y Device', 'Capacitor', 'Ana Torres', 18, 'intermedio', 'video',
    'Cómo instalar plugins, registrar listeners y consultar información del dispositivo.'),
  r(4, 'Sincronizar cambios con cap sync', 'Capacitor', 'Marta Ríos', 10, 'básico', 'práctica',
    'Ejercicio guiado para copiar el código web al proyecto nativo después de cada cambio.'),

  r(5, 'Instalar Android Studio y el SDK', 'Android', 'Carlos Mena', 20, 'básico', 'documento',
    'Guía de instalación de Android Studio, SDK Platform, Platform-Tools y variables de entorno.'),
  r(6, 'Emuladores y depuración USB', 'Android', 'Carlos Mena', 15, 'básico', 'práctica',
    'Crea un emulador, activa la depuración USB en tu teléfono y comprueba la conexión con adb.'),
  r(7, 'Estructura de un proyecto Android', 'Android', 'Sofía Vega', 25, 'intermedio', 'lectura',
    'Recorrido por las carpetas app, gradle y res del proyecto generado por Capacitor.'),
  r(8, 'Firmar y generar un APK', 'Android', 'Sofía Vega', 30, 'avanzado', 'video',
    'Crea un keystore, configura la firma y genera un APK listo para instalar.'),

  r(9, 'Flexbox desde cero', 'HTML y CSS', 'Diego Salas', 22, 'básico', 'video',
    'Ejes, alineación y distribución del espacio con display: flex.'),
  r(10, 'CSS Grid para galerías', 'HTML y CSS', 'Diego Salas', 18, 'intermedio', 'práctica',
    'Construye una cuadrícula de dos columnas con gap y aspect-ratio.'),
  r(11, 'Variables CSS y temas', 'HTML y CSS', 'Laura Quispe', 14, 'intermedio', 'lectura',
    'Define tokens de color y espaciado en :root y reutilízalos en toda la app.'),
  r(12, 'Unidades relativas y viewport', 'HTML y CSS', 'Laura Quispe', 9, 'básico', 'documento',
    'Uso de rem, %, vw y la meta viewport para evitar scroll horizontal y contenido cortado.'),

  r(13, 'Módulos ES en el navegador', 'JavaScript', 'Pablo Núñez', 16, 'intermedio', 'video',
    'Importa y exporta funciones para separar datos, estado, pantallas y componentes.'),
  r(14, 'Estado con Set y Map', 'JavaScript', 'Pablo Núñez', 20, 'intermedio', 'lectura',
    'Por qué un Set es ideal para favoritos y completados, y cómo notificar cambios.'),
  r(15, 'Eventos y delegación', 'JavaScript', 'Elena Cruz', 17, 'básico', 'práctica',
    'Un solo listener por pantalla usando data-attributes para listas dinámicas.'),
  r(16, 'Asincronía: promesas y async/await', 'JavaScript', 'Elena Cruz', 28, 'avanzado', 'video',
    'Cómo esperar a que los plugins nativos respondan sin bloquear la interfaz.'),

  r(17, 'Principios de diseño móvil', 'Diseño móvil', 'Valeria Gómez', 15, 'básico', 'lectura',
    'Jerarquía, espaciado y consistencia en pantallas pequeñas.'),
  r(18, 'Áreas táctiles y accesibilidad', 'Diseño móvil', 'Valeria Gómez', 12, 'intermedio', 'documento',
    'Tamaños mínimos de toque, contraste y etiquetas accesibles.'),
  r(19, 'Tipografía y jerarquía visual', 'Diseño móvil', 'Andrés Lara', 19, 'básico', 'video',
    'Combina tipografías de título y texto para guiar la lectura.'),
  r(20, 'Prototipar pantallas con Pencil', 'Diseño móvil', 'Andrés Lara', 35, 'intermedio', 'práctica',
    'Crea componentes reutilizables y exporta las medidas para implementarlas.'),

  r(21, 'Hash router paso a paso', 'Navegación', 'Rosa Paredes', 24, 'intermedio', 'práctica',
    'Implementa rutas con location.hash y el evento hashchange.'),
  r(22, 'Barra inferior de pestañas', 'Navegación', 'Rosa Paredes', 11, 'básico', 'lectura',
    'Patrón de navegación principal con pestaña activa y accesibilidad.'),
  r(23, 'Pasar parámetros entre pantallas', 'Navegación', 'Jorge Ibáñez', 14, 'intermedio', 'documento',
    'Cómo enviar el id de un recurso y la pantalla de origen en la ruta.'),
  r(24, 'El botón atrás en Android', 'Navegación', 'Jorge Ibáñez', 13, 'avanzado', 'video',
    'Escucha backButton con @capacitor/app y decide si volver o salir.')
];
