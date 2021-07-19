<script lang="ts">
	import type { MovieDetails as APIMovieDetails } from 'src/routes/movies/_api';
	import { fade } from 'svelte/transition';
	import MoviePoster from '$lib/MoviePoster/MoviePoster.svelte';
	import MovieDetails from '$lib/MovieDetails/MovieDetails.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let details: APIMovieDetails;
	export let favoriteCount: number = 0;
	export let isFavorite: boolean;

	const posterPath = `https://image.tmdb.org/t/p/w220_and_h330_face/${details.poster_path}`;
	const tmdbHref = `https://www.themoviedb.org/movie/${details.id}`;

	const onAddFavorite = async () => {
		favoriteCount++;
		dispatch('addFavorite');
	};

	const onRemoveFavorite = async () => {
		favoriteCount--;
		dispatch('removeFavorite');
	};
</script>

<article in:fade w="220px" class="flex" flex="col shrink-0" gap="4">
	<MoviePoster src={posterPath} alt={details.title} />
	<MovieDetails
		title={details.title}
		href={tmdbHref}
		{favoriteCount}
		{isFavorite}
		on:addFavorite={onAddFavorite}
		on:removeFavorite={onRemoveFavorite}
	/>
</article>
