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
	cursor="pointer"
	style={`opacity:${enabled ? 1 : 0.5}`}
	on:click={enabled && onClick}
>
	<img
		width="32"
		height="48"
		src={details.poster_path
			? `https://image.tmdb.org/t/p/w220_and_h330_face/${details.poster_path}`
			: 'https://via.placeholder.com/32x48.png?text=%20'}
		alt={`Poster of ${details.title}`}
	/>
	<div>
		<h2 font="bold">{details.title}</h2>
		<p text="sm">Click to add to the list</p>
	</div>
</div>
