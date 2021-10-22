<script lang="ts">
	import ProjectCard from '$lib/Components/ProjectCard.svelte';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	interface Project {
		url: string;
		alt: string;
		title: string;
		tags: string[];
		link: string;
	}

	let projects: Project[] = [
		{
			url: '/logo-kcc.svg',
			alt: 'Kagen Coffee & Crepes rooster logo',
			title: 'Kagen Coffee & Crepes',
			tags: ['Crepes', 'Restaurant', 'SvelteKit'],
			link: 'https://kagenandco.com'
		},
		{
			url: '/logo-osc.png',
			alt: 'One Sleep Company logo',
			title: 'One Sleep Company',
			tags: ['Mattresses', 'Retail', 'WordPress'],
			link: 'https://onesleepcompany.com/'
		},
		{
			url: '/logo-trbc.jpg',
			alt: 'The Ridge Bible Church mountain logo',
			title: 'The Ridge Bible Church',
			tags: ['Church', 'Religious', 'SvelteKit'],
			link: 'https://theridgebiblechurch.com/'
		}
	];

	let focus = 0;

	const nextFocus = () => {
		focus = (focus + 1) % 3;
	};
</script>

<svelte:head>
	<title>Logan Williams - Projects</title>
	<meta name="description" content="Check out some of my past work." />
</svelte:head>

<!-- <div class="w-full max-w-240 lg:max-w-360 px-4 lg:m-auto box-border"> -->
<div class="flex justify-center">
	<div class="flex flex-row flex-wrap -md:flex-col -mx-4 perspect-1000">
		{#each projects as project}
			<div transition:fade={{ duration: 300, easing: quintOut }}>
				<ProjectCard {...project} />
			</div>
		{/each}
	</div>
</div>
