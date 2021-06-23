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

<h1 class="text-pink-200">bo</h1>
<button class="bg-pink-400"> Button </button>

<Header />

<main>
	{#if $navigating && $delayedNavigating}
		<Skeleton page={currentNavigating.to} />
	{:else}
		<slot />
	{/if}
</main>

<footer>
	<a href="https://anto.pt">anto.pt</a>
</footer>
