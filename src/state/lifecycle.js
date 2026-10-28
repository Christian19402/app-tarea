// Ciclo de vida con @capacitor/app: appStateChange, pause, resume (+ backButton).
import { App } from '@capacitor/app';
import { store } from './store.js';

let handles = [];

export async function iniciarCicloDeVida({ onBackButton } = {}) {
  if (handles.length) return; // ya registrados

  store.registrarEvento('Aplicación iniciada', true);

  try {
    handles = await Promise.all([
      App.addListener('appStateChange', ({ isActive }) =>
        store.registrarEvento(`appStateChange (isActive: ${isActive})`, isActive)
      ),
      App.addListener('pause', () => store.registrarEvento('pause', false)),
      App.addListener('resume', () => store.registrarEvento('resume', true)),
      App.addListener('backButton', () => onBackButton && onBackButton())
    ]);
  } catch (error) {
    console.error('No se pudieron registrar los listeners de @capacitor/app', error);
  }
}

// Retira todos los listeners (se llama cuando la página se descarga).
export async function detenerCicloDeVida() {
  const actuales = handles;
  handles = [];
  await Promise.all(actuales.map((h) => h.remove()));
}

export const salirDeApp = () => App.exitApp();
