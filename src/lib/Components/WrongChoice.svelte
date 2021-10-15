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

<button
	on:click={handleClick}
	class="relative lg:w-50 lg:h-50 w-35 h-35 flex justify-center items-center capitalize text-5xl m-2 lg:p-8 {clicked
		? 'shake'
		: ''}"
>
	<img {src} alt={name} class="w-30" />
</button>

<style>
	.shake {
		animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
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
