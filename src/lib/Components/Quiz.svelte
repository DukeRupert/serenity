<script lang="ts">
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

<div class="flex flex-col justify-center items-center">
	<Question name={pokemonArray[answer].name} />
	<div class="flex flex-col sm:flex-row justify-center items-center">
		{#each pokemonArray as pokemon, index}
			{#if isCorrect(index, answer)}
				<RightChoice src={pokemon.sprites.front_default} {handleChoice} name={pokemon.name} />
			{:else}
				<WrongChoice src={pokemon.sprites.front_default} {handleChoice} name={pokemon.name} />
			{/if}
		{/each}
	</div>
</div>
