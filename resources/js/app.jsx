import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Allied Energies';

createInertiaApp({
    title: (title) => `${title} — ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob([
            './pages/**/*.jsx',
            './pages/**/*.tsx',
        ]);

        const pathJsx = `./pages/${name}.jsx`;
        const pathTsx = `./pages/${name}.tsx`;

        return resolvePageComponent(
            pages[pathJsx] ? pathJsx : pathTsx,
            pages
        );
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#14b8a6',
    },
});
