<script lang="typescript">
	import { each, onMount } from 'svelte/internal';

	let idSet: Array<number> = [];

	// Defines set of pokemon based on id from 1 to MAX
	const MAX = 450;
	const SET = 3;
	let answer: number = getRandomId(SET);
	let result = false;
	let correctCount = 0;

	function getRandomId(max) {
		return Math.floor(Math.random() * max);
	}

	function createSet(size: Number) {
		let set: Array<number>;
		set = [getRandomId(MAX)];
		while (set.length < 3) {
			let i = getRandomId(MAX);
			// Ensures 3 unique pokemon
			if (set.includes(i)) {
				continue;
			}
			set.push(i);
		}
		return set;
		56;
	}

	function handleClick() {
		idSet = createSet(SET);
		answer = getRandomId(SET);
		result = false;
	}

	function isCorrect(id: number, answer: number) {
		return id === answer ? true : false;
	}

	function handlePokemonClick(id: number) {
		result = isCorrect(id, answer);
		if (result) {
			correctCount += 1;
			setTimeout(handleClick, 1500);
		}
	}

	function handleNameClick(name : string) {
		if ('speechSynthesis' in window) {
			// Speech Synthesis supported 🎉
			var msg = new SpeechSynthesisUtterance();
			msg.text = name;
			window.speechSynthesis.speak(msg);
		} else {
			// Speech Synthesis Not Supported 😣
			alert("Sorry, your browser doesn't support text to speech!");
		}
	}

	let apiRequestLoop = function (array: Array<number>) {
		let promiseArray = [];
		array.forEach((element) => {
			let promise = fetchPokemon(element);
			promiseArray.push(promise);
		});
		return Promise.all(promiseArray);
	};

	async function fetchPokemon(id: number) {
		let api = 'https://pokeapi.co/api/v2/pokemon/';
		// pokemon 0 doesn't exist
		if (id === 0) {
			id += 1;
		}
		const res = await self.fetch(api + id);
		const pokemon = await res.json();

		if (res.ok) {
			return pokemon;
		} else {
			throw new Error(pokemon);
		}
	}

	let promise: Promise<Array<number>>;
	// Reactive api call when idSet changes
	$: promise = apiRequestLoop(idSet);

	onMount(() => {
		handleClick();
	});
</script>

<section class="quiz-container">
	<h1>Test your knowledge, Pokemon Trainer!</h1>
	<h1>Which pokemon is named :</h1>
	{#await promise}
		<div class="circle rotate" />
	{:then pokemonArray}
		<div class="question-container">
			<button on:click={() => handleNameClick(pokemonArray[answer].name)}>{pokemonArray[answer].name}</button>
			<div class="pokemon-container">
				{#each pokemonArray as pokemon, index}
					<button id={index} on:click={() => handlePokemonClick(index)}>
						<img src={pokemon.sprites.front_default} />
					</button>
				{/each}
			</div>
			{#if result}
				<div class="checkmark-container">
					<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"
						><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path
							class="checkmark__check"
							fill="none"
							d="M14.1 27.2l7.1 7.2 16.7-16.8"
						/></svg
					>
				</div>
			{/if}
		</div>
	{:catch error}
		<p>Uh oh, something went wrong</p>
	{/await}
</section>

<style>
	img {
		width: 200px;
	}

	button {
		text-transform: capitalize;
		font-size: 3rem;
		padding: 1rem;
		margin: 1rem;
	}

	.quiz-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.question-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.question-container > h1 {
		text-transform: capitalize;
		font-size: 3rem;
	}

	.pokemon-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.circle {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background: red;
		position: relative;
		overflow: hidden;
	}
	.circle:after {
		content: '';
		background: white;
		height: 50px;
		display: block;
		bottom: 0px;
		position: absolute;

		width: 100%;
	}

	.rotate {
		animation: rotation 2s infinite linear;
	}

	@keyframes rotation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}

	/* Checkmark  */

	.checkmark-container {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.checkmark {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		display: block;
		stroke-width: 2;
		stroke: white;
		stroke-miterlimit: 10;
		box-shadow: inset 0px 0px 0px green;
		animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
	}

	.checkmark__circle {
		stroke-dasharray: 166;
		stroke-dashoffset: 166;
		stroke-width: 2;
		stroke-miterlimit: 10;
		stroke: green;
		fill: none;
		animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
	}

	.checkmark__check {
		transform-origin: 50% 50%;
		stroke-dasharray: 48;
		stroke-dashoffset: 48;
		animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
	}

	@keyframes stroke {
		100% {
			stroke-dashoffset: 0;
		}
	}

	@keyframes scale {
		0%,
		100% {
			transform: none;
		}
		50% {
			transform: scale3d(1.5, 1.5, 1);
		}
	}

	@keyframes fill {
		100% {
			box-shadow: inset 0px 0px 0px 30px green;
		}
	}
</style>
