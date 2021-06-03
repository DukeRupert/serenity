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

<button on:click={handleClick}>
	<img {src} alt={name}/>
	{#if clicked}
		<div class="checkmark">
			<Checkmark />
		</div>
	{/if}
</button>

<style>
	img {
		width: 120px;
	}

	button {
		position: relative;
		text-transform: capitalize;
		font-size: 3rem;
		margin: 0.5rem;
	}

	.checkmark {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	@media (min-width: 800px) {
		button {
			padding: 2rem;
			margin: 2rem;
		}
	}
</style>
