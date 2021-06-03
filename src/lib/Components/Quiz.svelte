<script lang="typescript">
	import Question from './Question.svelte';
	import WrongChoice from '$lib/Components/WrongChoice.svelte';
	import RightChoice from '$lib/Components/RightChoice.svelte';

	export let pokemonArray;
	export let answer;
	export let handleChoice;

	function isCorrect(id: number, answer: number) {
		return id === answer ? true : false;
	}

</script>

<div class="question-container">
	<Question name={pokemonArray[answer].name} />
	<div class="pokemon-container">
		{#each pokemonArray as pokemon, index}
			{#if isCorrect(index, answer)}
				<RightChoice src={pokemon.sprites.front_default} {handleChoice} name={pokemon.name} />
			{:else}
				<WrongChoice src={pokemon.sprites.front_default} {handleChoice} name={pokemon.name} />
			{/if}
		{/each}
	</div>
</div>

<style>
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

	@media (min-width: 800px) {
		.pokemon-container {
			flex-direction: row;
		}
	}
</style>
