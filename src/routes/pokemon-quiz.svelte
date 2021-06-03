<script lang="typescript">

	import { onMount } from 'svelte/internal';
    import { NEW_QUESTION_DELAY, POKEMON_ID_RANGE, QUIZ_SET_SIZE } from '$lib/constants';
    import Checkmark from '$lib/Elements/Checkmark.svelte';
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

	function getRandomId([min, max] : number[]) {
        return Math.floor(Math.random() * (max - min) + min);
	}

    function pickAnswer(size : number) {
        return Math.floor(Math.random() * size)
    }

	function isCorrect(id: number, answer: number) {
		return id === answer ? true : false;
	}

	function handleChoice(id: number) {
		result = isCorrect(id, answer);
		if (result) {
			setTimeout(createNewQuestion, NEW_QUESTION_DELAY);
		}
	}

	function handleNameClick(name: string) {
		if ('speechSynthesis' in window) {
			// Speech Synthesis supported 🎉
			var msg = new SpeechSynthesisUtterance();
            msg.text = name;
            if (isFirstClick()) {
                msg.text = name[0]
                nameClickCount +=1
            }
			window.speechSynthesis.speak(msg);
		} else {
			// Speech Synthesis Not Supported 😣
			alert("Sorry, your browser doesn't support text to speech!");
		}

        function isFirstClick() {
            return nameClickCount === 0 ? true : false
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
	<h1>Which pokemon is named :</h1>
	{#await promise}
		<Spinner />
	{:then pokemonArray}
		<div class="question-container">
			<button on:click={() => handleNameClick(pokemonArray[answer].name)}
				>{pokemonArray[answer].name}</button
			>
			<div class="pokemon-container">
				{#each pokemonArray as pokemon, index}
					<button id={index} on:click={() => handleChoice(index)}>
						<img src={pokemon.sprites.front_default} />
					</button>
				{/each}
			</div>
			{#if result}
				<Checkmark />
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

	.pokemon-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>
