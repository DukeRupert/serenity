<script lang="ts">
	import 'virtual:windi.css';
	import Particles from '$lib/Particles/index.svelte';
</script>

<main class="h-screen w-full bg-night">
	<div class="absolute top-0 left-0 w-full h-screen z-0">
		<Particles />
	</div>
	<div class="relative w-full h-full flex items-center justify-center z-10">
		<slot />
	</div>
</main>
