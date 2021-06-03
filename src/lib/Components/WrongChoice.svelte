<script lang="typescript">
	import { NEW_QUESTION_DELAY } from '$lib/constants';

	export let handleChoice: Function;
	export let src: string;
	export let name: string;
	let clicked = false;

	function handleClick() {
		clicked = true;
		setTimeout(handleChoice, NEW_QUESTION_DELAY);
	}
</script>

<button on:click={handleClick} class={clicked ? "shake" : ""}>
	<img {src} alt={name}/>
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
		transform: translate3d(0, 0, 0);
	}

	.shake {
		animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	}

	@media (min-width: 400px) {
		button {
			padding: 2rem;
			margin: 2rem;
		}
	}

	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}

		20%,
		80% {
			transform: translate3d(2px, 0, 0);
		}

		30%,
		50%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}

		40%,
		60% {
			transform: translate3d(4px, 0, 0);
		}
	}
</style>
