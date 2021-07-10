<script lang="ts">
	import type { Proposal } from '../../connectors';
	import { Configuration, ProposalApi } from '../../connectors';

	import MovieCard from '$lib/MovieCard/index.svelte';
	import { useQuery } from '@sveltestack/svelte-query';

	export let proposal: Proposal;
	export let movies;

	const query = useQuery(
		['proposal', proposal.id],
		async () => {
			const proposalApi = new ProposalApi(
				new Configuration({
					basePath: 'https://pick-a-movie-api.anto.pt/v1'
				})
			);
			const res = await proposalApi.proposalsIdGet(proposal.id.toString());
			return res.data;
		},
		{
			initialData: proposal
		}
	);
</script>

{#if $query.isLoading}
	<span>Loading...</span>
{:else if $query.isError}
	<span>Error: {$query.error.message}</span>
{:else}
	<MovieCard
		details={movies[$query.data.movieId]}
		favoriteCount={$query.data.votes?.length}
		isFavorite={false}
	/>
{/if}
