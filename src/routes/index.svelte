<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { MailIcon, GithubIcon, GlobeIcon } from 'svelte-feather-icons';
	import { slide } from 'svelte/transition';
</script>

<div class="w-full max-w-350 px-4 m-auto box-border">
	<div class="flex flex-row flex-wrap -mx-4">
		<div class="relative w-full max-w-full lg:max-w-1/2 flex-shrink-0 flex-grow-0 px-4 text-yellow-100">
			<h1 class="text-2xl leading-relaxed mb-6">Hey There!</h1>
			<p class="text-xl leading-relaxed mb-6">
				My name is <span class="font-bold text-fireflyBlue">Logan Williams</span>. I’m a freelance
				Full-Stack Web Developer. Check out some of my past work here. Feel free to check out my
				blog or the stack page to see what tech I'm currently using. Most of my code can be found on
				GitHub, including the code for this website.
			</p>
			<ul>
				<li class="animated animate-slide-in-left animate-delay-75">
					<a href="mailto:logan@firefly.llc"
						><MailIcon size="1.25x" class="inline-block mr-2" /> logan@firefly.llc</a
					>
				</li>
				<li class="animated animate-slide-in-left animate-delay-150">
					<a href="https://github.com/logan-firefly"
						><GithubIcon size="1.25x" class="inline-block mr-2" /> Github
					</a>
				</li>
				<li class="animated animate-slide-in-left animate-delay-225">
					<a href="https://www.firefly.llc/"
						><GlobeIcon size="1.25x" class="inline-block mr-2" /> Firefly Software Engineering
					</a>
				</li>
			</ul>
		</div>
		<div class=" <md:hidden relative w-full max-w-1/2 flex-shrink-0 flex-grow-0 px-4 text-fireflyBlue">
			<div class="w-full h-full flex items-center justify-center">
				<img src="logo-blue.svg" alt="firefly logo" class="w-full max-w-100" />
			</div>
		</div>
	</div>
</div>

<style>
	li {
		@apply mb-2;
	}
</style>
