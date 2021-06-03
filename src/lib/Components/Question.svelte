<script lang="typescript">
	import { onMount } from 'svelte';
	export let name: string;
	let count: number;

	// Reset count on mount
	onMount(() => {
		count = 0;
	});

	function handleClick() {
		if ('speechSynthesis' in window) {
			// Speech Synthesis supported 🎉
			var msg = new SpeechSynthesisUtterance();
			msg.text = name;
			if (isFirstClick()) {
				msg.text = name[0];
				count += 1;
			}
			window.speechSynthesis.speak(msg);
		} else {
			// Speech Synthesis Not Supported 😣
			alert("Sorry, your browser doesn't support text to speech!");
		}

		function isFirstClick() {
			return count === 0 ? true : false;
		}
	}
</script>

<button on:click={handleClick}>{name}</button>

<style>
	button {
		position: relative;
		text-transform: capitalize;
		font-size: 3rem;
		margin: 0.5rem;
		padding: 0.5rem 1rem;
	}

	@media (min-width: 800px) {
		button {
			padding: 1rem 2rem;
			margin: 2rem;
		}
	}
</style>
