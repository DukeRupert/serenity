<script lang="ts">
	import { page } from '$app/stores';
	import 'virtual:windi.css';
	import Particles from '$lib/Particles/index.svelte';
</script>

<nav class="relative py-4 bg-night z-50">
	<ul class="h-10 flex justify-center items-center">
		<a href="/" class="{$page.path === '/' ? 'hidden' : ''}"><li>Home</li></a>
		<a href="/projects" class="{$page.path === '/projects' ? 'hidden' : ''}"><li>Projects</li></a>
	</ul>
</nav>
<main class="h-screen w-full bg-night">
	<div class="absolute top-0 left-0 w-full h-screen z-0">
		<Particles />
	</div>
	<div class="relative w-full lg:h-full p-4 flex items-center justify-center z-10">
		<slot />
	</div>
</main>

<style>
	li {
		@apply mx-2 px-2 text-xl text-yellow-100;
	}
</style>
