<script lang="ts">
	import { writable, derived } from 'svelte/store';
	import type { Readable } from 'svelte/store';

	import type { MovieDetails } from 'src/routes/movies/_api';
	import ResultList from './result-list.svelte';
	import Loading from './loading.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	type CanAddFunction = (d: MovieDetails) => boolean;
	export let canAdd: CanAddFunction = () => true;

	const query = writable<string>(null);

	const debouncedQuery = derived(query, (currentQuery, set) => {
		const timeoutId = setTimeout(() => {
			return set(currentQuery);
		}, 300);

		return () => clearTimeout(timeoutId);
	});

	const resultsPromise: Readable<Promise<MovieDetails[]>> = derived(
		debouncedQuery,
		async (value): Promise<MovieDetails[]> => {
			if (!value) {
				return null;
			}
			const res = await fetch(`/movies/query?q=${value}`);
			const data = await res.json();
			return data.results;
		}
	);

	const onSelected = (e: CustomEvent<MovieDetails>) => {
		$query = null;
		dispatch('selected', e.detail);
	};

	const searchBoxEl = writable(null);
	const resultsTopPos = derived(searchBoxEl, (value) => {
		if (!value) {
			return 0;
		}
		const rect = value.getBoundingClientRect();
		const gap = 20;
		return rect.top + rect.height + gap;
	});
</script>

<div pos="relative">
	<input
		p="4"
		w="full"
		type="text"
		placeholder="Add a movie to this list"
		bind:value={$query}
		bind:this={$searchBoxEl}
	/>

	{#if $debouncedQuery}
		{#await $resultsPromise}
			<div pos="absolute" top="1/2" right="0" class="transform" translate="-y-1/2">
				<Loading size="small" />
			</div>
		{/await}
	{/if}
</div>

{#if $debouncedQuery}
	{#await $resultsPromise then results}
		{#if results?.length}
			<ResultList {results} {canAdd} on:selected={onSelected} topPosition={resultsTopPos} />
		{/if}
	{/await}
{/if}
