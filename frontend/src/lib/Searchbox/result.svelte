<script lang="ts">
	import type { MovieDetails } from 'src/routes/movies/_api';

	export let details: MovieDetails;
	export let onAdd;
	export let canAdd;

	function onClick() {
		onAdd(details);
	}
</script>

<div>
	<img
		style="width:32px;"
		src={`https://image.tmdb.org/t/p/w200/${details.poster_path}`}
		alt={`Poster of ${details.title}`}
	/>
	<h2>{details.title}</h2>
	<button disabled={!canAdd(details)} on:click={onClick}>+</button>
</div>
