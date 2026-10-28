# ExRE — catálogo de recursos (Capacitor + JavaScript puro)

App web empaquetada con **Capacitor** para **Android**. 6 pantallas (Inicio, Catálogo, Galería, Detalle, Favoritos, Progreso), 24 recursos locales, favoritos, progreso y observación del ciclo de vida con `@capacitor/app`.

## Requisitos

- Node.js 22 o superior
- Android Studio con SDK (Platform, Command-line Tools, Platform-Tools, Build-Tools) y la variable `ANDROID_HOME`
- Un emulador o un teléfono con depuración USB (comprueba con `adb devices`)

## Pasos

```bash
# 1. Dependencias
npm install

# 2. Compilación web (empaqueta src/ en www/assets con esbuild)
npm run build

# 3. Solo la primera vez: crear el proyecto nativo (si no existe la carpeta android/)
npx cap add android

# 4. Copiar el código web al proyecto Android
npx cap sync android

# 5. Ejecutar en el emulador o teléfono
npx cap run android
```

Atajo: `npm run android` hace los pasos 2, 4 y 5. **Cada vez que cambies código en `src/` o `www/`, repite compilación + `npx cap sync`.**

## Capturas

Con el dispositivo conectado:

```bash
adb exec-out screencap -p > capturas/inicio.png
```

(una por pantalla: Inicio, Catálogo, Galería, Detalle, Favoritos, Progreso).

## Estructura

```
www/index.html          Entrada (viewport-fit=cover); assets/ se genera con npm run build
src/main.js             Arranque: fuentes, router y listeners de ciclo de vida
src/router.js           Hash router (#/ruta/id?from=origen) — único mecanismo de rutas
src/data/recursos.js    24 recursos + categorías y colores
src/state/store.js      Estado en memoria (favoritos y completados como Set) + selectores
src/state/lifecycle.js  appStateChange, pause, resume, backButton (con remove())
src/screens/            Una pantalla por archivo
src/components/         Tarjetas, barra inferior, iconos, historial de eventos, toast
src/styles/styles.css   Tokens del diseño como variables CSS
```

## Decisiones

- **Navegación**: solo hash router. Detalle recibe `from` (catalogo, galeria, favoritos o progreso) y el botón volver, y el botón atrás de Android, regresan a esa pantalla.
- **Estado único**: favoritos y completados viven en un solo store; al cambiar, la pantalla visible se vuelve a pintar, así que todo se actualiza a la vez.
- **Ciclo de vida**: los listeners se registran al iniciar y se retiran con `remove()` en `pagehide`. El historial guarda los últimos 8 eventos con hora y se ve en Inicio y Progreso.
- **Sin internet**: fuentes (Poppins, Inter) por npm e iconos Lucide en SVG; no se usa ninguna red.
- Las listas se generan desde el arreglo de datos, con `data-id` único por elemento.

## Problemas frecuentes

- **Pantalla en blanco**: falta `npm run build` antes de `npx cap sync`.
- **Contenido bajo la barra de estado**: ajusta `padding-top` en `#view` (styles.css).
- **`adb devices` vacío**: activa la depuración USB o inicia el emulador desde Android Studio.

## Entrega

Comprime el proyecto **sin `node_modules`** (ni `android/build`, `android/app/build`, `android/.gradle`), y adjunta las capturas tomadas en Android.
