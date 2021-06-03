<script lang="typescript">
	import { onMount } from 'svelte/internal';
	import { POKEMON_ID_RANGE, QUIZ_SET_SIZE } from '$lib/constants';
	import Quiz from '../lib/Components/Quiz.svelte';
	import Spinner from '$lib/Elements/Spinner.svelte';

	let idSet: Array<number> = [];
	let answer: number;

	onMount(() => {
		createNewQuestion();
	});

	function createNewQuestion() {
		idSet = createSet(QUIZ_SET_SIZE);
		answer = pickAnswer(QUIZ_SET_SIZE);
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
		<Quiz {pokemonArray} {answer} handleChoice={createNewQuestion} />
	{:catch error}
		<p>Uh oh, something went wrong</p>
	{/await}
</section>

<style>
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
</style>
