<script lang="typescript">
	import { onMount } from 'svelte/internal';
	import { NEW_QUESTION_DELAY, POKEMON_ID_RANGE, QUIZ_SET_SIZE } from '$lib/constants';
	import WrongChoice from '$lib/Components/WrongChoice.svelte';
	import RightChoice from '$lib/Components/RightChoice.svelte';
	import Spinner from '$lib/Elements/Spinner.svelte';

	let idSet: Array<number> = [];
	let answer: number;
	let result: Boolean;
	let nameClickCount: number;

	onMount(() => {
		createNewQuestion();
	});

	function createNewQuestion() {
		idSet = createSet(QUIZ_SET_SIZE);
		answer = pickAnswer(QUIZ_SET_SIZE);
		result = false;
		nameClickCount = 0;
	}

	function createSet(size: Number) {
		let set: Array<number> = [];
		while (set.length < 3) {
			let id = getRandomId(POKEMON_ID_RANGE);
			// Ensures 3 unique pokemon
			if (set.includes(id)) {
				continue;
			}
			set.push(id);
		}
		return set;
	}

	function getRandomId([min, max]: number[]) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	function pickAnswer(size: number) {
		return Math.floor(Math.random() * size);
	}

	function isCorrect(id: number, answer: number) {
		return id === answer ? true : false;
	}

	function handleNameClick(name: string) {
		if ('speechSynthesis' in window) {
			// Speech Synthesis supported 🎉
			var msg = new SpeechSynthesisUtterance();
			msg.text = name;
			if (isFirstClick()) {
				msg.text = name[0];
				nameClickCount += 1;
			}
			window.speechSynthesis.speak(msg);
		} else {
			// Speech Synthesis Not Supported 😣
			alert("Sorry, your browser doesn't support text to speech!");
		}

		function isFirstClick() {
			return nameClickCount === 0 ? true : false;
		}
	}

	// Make a new set of api calls when idSet changes
	let promise: Promise<Array<number>>;
	$: promise = fetchPokemonSet(idSet);

	let fetchPokemonSet = function (idSet: Array<number>) {
		let promiseArray = [];
		idSet.forEach((id) => {
			let promise = fetchPokemonById(id);
			promiseArray.push(promise);
		});
		return Promise.all(promiseArray);
	};

	async function fetchPokemonById(id: number) {
		let api = 'https://pokeapi.co/api/v2/pokemon/';
		const res = await self.fetch(api + id);
		const pokemon = await res.json();

		if (res.ok) {
			return pokemon;
		} else {
			throw new Error(pokemon);
		}
	}
</script>

<section class="quiz-container">
	<h1>Test your knowledge, Pokemon Trainer!</h1>
	<h3>Which pokemon is named :</h3>
	{#await promise}
		<Spinner />
	{:then pokemonArray}
		<div class="question-container">
			<button on:click={() => handleNameClick(pokemonArray[answer].name)}
				>{pokemonArray[answer].name}</button
			>
			<div class="pokemon-container">
				{#each pokemonArray as pokemon, index}
					{#if isCorrect(index, answer)}
						<RightChoice
							src={pokemon.sprites.front_default}
							handleChoice={createNewQuestion}
							name={pokemon.name}
						/>
					{:else}
						<WrongChoice src={pokemon.sprites.front_default} handleChoice={createNewQuestion} />
					{/if}
				{/each}
			</div>
		</div>
	{:catch error}
		<p>Uh oh, something went wrong</p>
	{/await}
</section>

<style>
	button {
		position: relative;
		text-transform: capitalize;
		font-size: 3rem;
		margin: 0.5rem;
		padding: 0.5rem 1rem;
	}
	.quiz-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.quiz-container > h3 {
		margin-top: 0;
	}

	.question-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.pokemon-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	@media (min-width: 400px) {
		.pokemon-container {
			flex-direction: row;
		}

		button {
			padding: 1rem 2rem;
			margin: 2rem;
		}
	}
</style>
