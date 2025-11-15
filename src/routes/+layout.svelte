<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<style>
		:root {
			--primary-color: #1173d4;
		}
	</style>
</svelte:head>

<div class="relative flex min-h-screen w-full flex-col">
	<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-4 py-3 sm:px-6 md:px-10">
		<div class="flex items-center gap-4 text-white">
			<a href="/" class="flex items-center gap-4 text-white">
				<div class="h-6 w-6 text-primary">
					<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
						<path
							clip-rule="evenodd"
							d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
							fill="currentColor"
							fill-rule="evenodd"
						></path>
					</svg>
				</div>
				<h2 class="text-lg font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-white">
					RoboAdvisor
				</h2>
			</a>
		</div>
		<nav class="flex items-center gap-6">
			<a href="/portfolio" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Portfolio</a>
			<a href="/assets" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Assets</a>
		</nav>
	</header>
	<main class="flex-1 p-4 sm:p-6 md:p-8">
		{@render children()}
	</main>
</div>
