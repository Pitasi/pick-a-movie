import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: vercel(),

		vite: () => ({
			optimizeDeps: {
				include: ['broadcast-channel']
			},
			plugins: [
				WindiCSS.default(),
			]
		}),
	},
};

export default config;
