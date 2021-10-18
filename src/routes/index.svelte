<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { MailIcon, GithubIcon, GlobeIcon } from 'svelte-feather-icons';
</script>

<div class="w-full max-w-240 px-4 m-auto box-border">
	<div class="flex flex-row flex-wrap -mx-4">
		<div class="relative flex-1 min-w-75 px-4 text-yellow-100">
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
		<div class="relative w-full max-w-120 m-auto flex justify-center items-center px-4 text-fireflyBlue">
			<div class="max-w-full pt-1/7">
				<div id="laptop" class="absolute w-2/3 left-1/5 box-border animated animate-slide-in-right">
					<img src="laptop-blue.png" alt="blue laptop" class="w-full max-w-100" />
				</div>
				<div id="decor" class="pt-1/3 box-border">
					<img src="decoration.svg" alt="decoration lines" />
				</div>
			</div>
		</div>
	</div>
</div>

<style>

	#laptop {
		animation-name: slidein;
		animation-delay: 1s;
		animation-timing-function: ease-in-out;
		animation-duration: 2s;
		animation-iteration-count: infinite;
	}

	@keyframes slidein {
		from {
			transform: translateY(0);
		}

		50% {
			transform: translateY(15px);
		}

		to {
			transform: translateY(0)
		}
	}
	li {
		@apply mb-2;
	}
</style>
