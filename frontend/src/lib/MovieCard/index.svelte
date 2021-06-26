<script lang="ts">
	import type { MovieDetails } from 'src/routes/movies/_api';
	import { fade, fly } from 'svelte/transition';

	export let details: MovieDetails;
</script>

<article in:fade out:fly={{ x: 100 }} w="220px" class="flex" flex="col shrink-0" gap="4">
	<picture border="rounded-xl" overflow="hidden">
		<img
			loading="lazy"
			width="220px"
			height="330px"
			src={`https://image.tmdb.org/t/p/w220_and_h330_face/${details.poster_path}`}
			alt={`Poster of ${details.title}`}
		/>
	</picture>

	<div>
		<h2 font="bold">{details.title}</h2>
		<a text="xs" href="https://www.themoviedb.org/movie/{details.id}" target="_blank">
			See this movie on TMDB
		</a>
	</div>
</article>
