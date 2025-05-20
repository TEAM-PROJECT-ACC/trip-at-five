import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	resolve: {
		alias: {
			// 절대경로 사용
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@scss': fileURLToPath(new URL('./src/assets/styles', import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "@scss/_colors_mixin.style.scss" as *;',
			},
		},
	},
});
