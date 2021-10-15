<script lang="ts">
	import Header from '$lib/Header/index.svelte';
	import '../app.css';
</script>

<Header />

<main class="flex flex-col p-4 w-full max-w-256 m-auto box-border">
	<slot />
</main>

<footer class="flex flex-col justify-center items-center py-10">
	<p>Designed by Logan Williams</p>
</footer>

<style windi:preflights:global windi:safelist:global></style>
