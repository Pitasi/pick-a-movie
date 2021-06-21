<script lang="ts">
	import { writable, derived } from 'svelte/store';
	import type { Readable } from 'svelte/store';

	import type { MovieDetails } from 'src/routes/movies/_api';
	import Result from './result.svelte';

	type OnAddFunction = (d: MovieDetails) => void;

	export let onAdd: OnAddFunction = () => {};

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
</script>

<input type="text" placeholder="Search a movie" bind:value={$query} />

{#await $resultsPromise}
	<div class="search-results">searching...</div>
{:then results}
	{#if results?.length}
		<div class="search-results">
			{#each results as result (result.id)}
				<Result details={result} {onAdd} />
			{/each}
		</div>
	{/if}
{/await}
