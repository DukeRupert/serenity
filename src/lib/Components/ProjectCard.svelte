<script lang="ts">
	export let url: string;
	export let alt: string;
	export let title: string;
	export let tags: string[];
	export let link: string;
</script>

<div class="w-75 m-4 bg-white rounded overflow-hidden shadow-lg">
	<img class="w-full h-75 object-contain p-6" src={url} {alt} />
	<div class="px-6 py-4">
		<div class="font-bold text-xl mb-2"><h2>{title}</h2></div>
		
	</div>
	<div class="px-6">
		{#each tags as tag}
			 <span
			class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
			>{tag}</span
		>
		{/each}
	</div>
	<div class="flex justify-end items-center px-6 pt-4 pb-2">
		<a class="inline-block text-fireflyBlue" href={link}>Visit Site</a>
	</div>
</div>
