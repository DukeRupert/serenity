<script lang="typescript">
	import { NEW_QUESTION_DELAY } from '$lib/constants';
	import Checkmark from '$lib/Elements/Checkmark.svelte';

	export let handleChoice: Function;
	export let src: string;
	export let name: string;
	let clicked = false;

	function handleClick() {
		clicked = true;
		setTimeout(handleChoice, NEW_QUESTION_DELAY);
	}
</script>

<button
	on:click={handleClick}
	class="relative lg:w-50 lg:h-50 w-35 h-35 flex justify-center items-center capitalize text-5xl m-2 lg:p-8"
>
	<img {src} alt={name} class="w-30" />
	{#if clicked}
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<Checkmark />
		</div>
	{/if}
</button>
