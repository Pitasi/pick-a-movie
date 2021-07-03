<script lang="ts">
	import type { MovieDetails as APIMovieDetails } from 'src/routes/movies/_api';
	import { fade, fly } from 'svelte/transition';
	import MoviePoster from '$lib/MoviePoster/MoviePoster.svelte';
	import MovieDetails from '$lib/MovieDetails/MovieDetails.svelte';

	export let details: APIMovieDetails;

	const posterPath = `https://image.tmdb.org/t/p/w220_and_h330_face/${details.poster_path}`;
	const tmdbHref = `https://www.themoviedb.org/movie/${details.id}`;
</script>

<article in:fade out:fly={{ x: 100 }} w="220px" class="flex" flex="col shrink-0" gap="4">
	<MoviePoster src={posterPath} alt={details.title} />
	<MovieDetails title={details.title} href={tmdbHref} />
</article>
