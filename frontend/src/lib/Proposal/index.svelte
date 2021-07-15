<script lang="ts">
	import type { Proposal } from '../../connectors';
	import type { MovieDetails } from 'src/routes/movies/_api';

	import MovieCard from '$lib/MovieCard/index.svelte';

	export let proposal: Proposal;
	export let movie: MovieDetails;
</script>

<MovieCard details={movie} favoriteCount={proposal.votes?.length} isFavorite={false} />
