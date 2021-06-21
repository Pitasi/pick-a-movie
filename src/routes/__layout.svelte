<script lang="ts">
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
