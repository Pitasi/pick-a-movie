<script lang="ts">
	import type { MovieDetails } from 'src/routes/movies/_api';

	export let details: MovieDetails;
	export let onAdd;
	export let canAdd;

	let enabled = canAdd(details);

	function onClick() {
		onAdd(details);
	}
</script>

<div
	class="flex flex-row items-center gap-4"
	style={`opacity:${enabled ? 1 : 0.5}`}
	on:click={enabled && onClick}
>
	<img
		width="32"
		height="48"
		src={`https://image.tmdb.org/t/p/w200/${details.poster_path}`}
		alt={`Poster of ${details.title}`}
	/>
	<h2 font="bold">{details.title}</h2>
	<button disabled={!enabled} on:click={onClick}>+</button>
</div>
