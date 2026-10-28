import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './styles/styles.css';

import { crearTabBar } from './components/tabBar.js';
import { iniciarRouter, atras } from './router.js';
import { iniciarCicloDeVida, detenerCicloDeVida, salirDeApp } from './state/lifecycle.js';

const tabBar = crearTabBar(document.getElementById('tabbar'));
iniciarRouter(document.getElementById('view'), tabBar);

// Listeners de @capacitor/app: se registran al iniciar y se retiran con remove().
iniciarCicloDeVida({ onBackButton: () => atras(salirDeApp) });
window.addEventListener('pagehide', () => detenerCicloDeVida());
