import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// GitHub Pages sirve el proyecto bajo /TinyRTS-showcase/; en dev se mantiene la raíz.
export default defineConfig(({ command }) => ({ plugins: [react()], base: command === 'build' ? '/TinyRTS-showcase/' : '/' }));
