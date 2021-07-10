<script lang="ts">
	import 'virtual:windi.css';
	import { browser } from '$app/env';
	if (browser) {
		// @ts-ignore
		import('virtual:windi-devtools');
	}
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

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

	const queryClient = new QueryClient();
</script>

<aside class="w-full">
	<Header />
</aside>

<main role="main" class="w-full">
	{#if $navigating && $delayedNavigating}
		<Skeleton page={currentNavigating.to} />
	{:else}
		<QueryClientProvider client={queryClient}>
			<slot />
		</QueryClientProvider>
	{/if}
</main>

<footer text="center" bg="pink-100">
	<a text="pink-600" href="https://anto.pt">anto.pt</a>
</footer>
