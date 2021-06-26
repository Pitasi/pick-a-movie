<script lang="ts">
	import type { MovieDetails } from 'src/routes/movies/_api';
	import Result from './result.svelte';

	export let results: MovieDetails[];
	export let canAdd;
	export let onAdd;
	export let topPosition;
</script>

<div
	class="flex backdrop-filter backdrop-blur-md"
	flex="col"
	gap="12"
	pos="absolute left-0"
	w="full"
	bg="white opacity-70"
	style={`top: ${$topPosition}px`}
	p="4"
>
	{#each results as result (result.id)}
		<Result details={result} {canAdd} {onAdd} />
	{/each}
</div>
