<script lang="ts">
	import 'virtual:windi.css';
	import { browser } from '$app/env';
	if (browser) {
		// @ts-ignore
		import('virtual:windi-devtools');
	}

	import Header from '$lib/Header/index.svelte';
	import Skeleton from '$lib/Skeletons/index.svelte';
	import { navigating } from '$app/stores';
	import type { Navigating } from '$app/stores';
	import '../app.css';

	import { derived } from 'svelte/store';

	const delayedNavigating = derived(navigating, (currentNavigating, set) => {
		setTimeout(() => set(currentNavigating), 150);
	});

	let currentNavigating: Navigating;
	navigating.subscribe((val) => (currentNavigating = val));
</script>

<div class="container mx-auto">
	<div class="flex flex-row flex-wrap">
		<aside class="w-full sm:w-1/3 md:w-1/4">
			<Header />
		</aside>

		<main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
			{#if $navigating && $delayedNavigating}
				<Skeleton page={currentNavigating.to} />
			{:else}
				<slot />
			{/if}
		</main>
	</div>

	<footer text="center" bg="pink-100">
		<a text="pink-600" href="https://anto.pt">anto.pt</a>
	</footer>
</div>
