<script lang="typescript">
  

	import { onMount } from 'svelte/internal';
    import Checkmark from '$lib/Elements/Checkmark.svelte';
    import { POKEMON_ID_RANGE, QUIZ_SET_SIZE } from '$lib/constants';

    let idSet: Array<number> = [];
	let answer: number;
	let result: Boolean;

	onMount(() => {
		createNewQuestion();
	});

	function createNewQuestion() {
		idSet = createSet(QUIZ_SET_SIZE);
		answer = pickAnswer(QUIZ_SET_SIZE);
		result = false;
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
			setTimeout(createNewQuestion, 1500);
		}
	}

	function handleNameClick(name: string) {
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

    // Reactive api call when idSet changes
	let promise: Promise<Array<number>>;
	$: promise = apiRequestLoop(idSet);

	let apiRequestLoop = function (idSet: Array<number>) {
		let promiseArray = [];
		idSet.forEach((id) => {
			let promise = fetchPokemon(id);
			promiseArray.push(promise);
		});
		return Promise.all(promiseArray);
	};

	async function fetchPokemon(id: number) {
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

<div class="circle rotate" />

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

	
</style>

