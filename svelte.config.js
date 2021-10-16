import preprocess from 'svelte-preprocess';
import netlify from '@sveltejs/adapter-netlify';
import { windi } from 'svelte-windicss-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), windi()],

	kit: {
		// Use netlify adapter
		adapter: netlify(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
