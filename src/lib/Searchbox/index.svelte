<script lang="ts">
	import debounce from 'lodash/debounce';
	import type { MovieDetails } from 'src/routes/movies/_api';
	import Result from './result.svelte';

	type OnAddFunction = (d: MovieDetails) => void;

	export let onAdd: OnAddFunction = () => {};

	async function search(query: string) {
		const res = await fetch(`/movies/query?q=${query}`);
		const data = await res.json();
		return data.results;
	}

	const handleInput = debounce(async (e) => {
		const query = e.target.value;
		results = await search(query);
	}, 300);

	let results: MovieDetails[];
</script>

<input type="text" placeholder="Search a movie" on:input={handleInput} />
{#if results && results.length}
	<div class="search-results">
		{#each results as result (result.id)}
			<Result details={result} {onAdd} />
		{/each}
	</div>
{/if}

<style>
	.search-results {
		max-height: 200px;
		overflow-y: auto;
	}
</style>
