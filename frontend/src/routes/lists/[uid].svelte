<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Session } from '../../connectors';
	import { Configuration, ProposalApi, SessionApi } from '../../connectors';
	import { browser } from '$app/env';

	type Fetch = (info: RequestInfo, init?: RequestInit) => Promise<Response>;

	async function getSession(id: string): Promise<Session> {
		const api = new SessionApi(
			new Configuration({
				basePath: 'https://pick-a-movie-api.anto.pt/v1'
			})
		);
		const res = await api.sessionsIdGet(id);
		return res.data;
	}

	async function getMovie(fetch: Fetch, id: string): Promise<MovieDetails> {
		const res = await fetch(`/movies/${id}.json`);
		const movie = await res.json();
		return movie;
	}

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch, page }) => {
		const uid = page.params['uid'];
		const session = await getSession(uid);

		const movies = {};
		await Promise.all(
			session.proposals.map(async (p) => {
				const res = await fetch(`/movies/${p.movieId}.json`);
				movies[p.movieId] = await res.json();
			})
		);

		return {
			props: { session, movies }
		};
	};
</script>

<script lang="ts">
	import type { MovieDetails } from '../movies/_api';
	import MovieCard from '$lib/MovieCard/index.svelte';
	import Searchbox from '$lib/Searchbox/index.svelte';
	import { VoteApi } from '../../connectors';

	export let session: Session;
	export let movies: { [id: number]: MovieDetails };

	function canAdd(details: MovieDetails): boolean {
		return !session.proposals.find((p) => p.movieId == details.id);
	}

	async function onAdd(e: CustomEvent<MovieDetails>) {
		movies[e.detail.id] = e.detail;

		try {
			const proposalApi = new ProposalApi(
				new Configuration({
					basePath: 'https://pick-a-movie-api.anto.pt/v1'
				})
			);
			const proposal = await proposalApi.proposalsPost({
				movieId: e.detail.id,
				sessionId: session.id,
				comment: null
			});
			const voteApi = new VoteApi(
				new Configuration({
					basePath: 'https://pick-a-movie-api.anto.pt/v1'
				})
			);
			const voteRes = await voteApi.votesPost({
				id: proposal.data.id
			});
			localStorage.setItem(proposal.data.id.toString(), JSON.stringify(voteRes.data));

			session = {
				...session,
				proposals: [...session.proposals, proposal.data]
			};
		} catch (err) {
			console.error(err);
		}
	}

	const voteApi = new VoteApi(
		new Configuration({
			basePath: 'https://pick-a-movie-api.anto.pt/v1'
		})
	);
</script>

<svelte:head>
	<title>{session.title} - pick a movie</title>
</svelte:head>

{#if session}
	<div class="flex" flex="col" gap="8">
		<div
			class="flex bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
			p="4 y-8"
			flex="col"
			gap="4"
		>
			<h1 font="bold" text="white 4xl">{session.title || 'Untitled awesomeness'}</h1>
			<Searchbox {canAdd} on:selected={onAdd} />
		</div>
		<div class="grid" grid="cols-1 sm:cols-2 md:cols-3 lg:cols-4" justify="items-center" gap="y-12">
			{#each session.proposals as proposal (proposal.id)}
				<MovieCard
					details={movies[proposal.movieId]}
					favoriteCount={proposal.votes?.length || 1}
					isFavorite={browser && !!localStorage.getItem(proposal.id.toString())}
					on:removeFavorite={async () => {
						if (!browser) {
							return;
						}
						const vote = JSON.parse(localStorage.getItem(proposal.id.toString()));
						await voteApi.votesIdDelete(vote.id);
						localStorage.removeItem(proposal.id.toString());
					}}
					on:addFavorite={async () => {
						if (!browser) {
							return;
						}
						const voteRes = await voteApi.votesPost({
							id: proposal.id
						});
						localStorage.setItem(proposal.id.toString(), JSON.stringify(voteRes.data));
					}}
				/>
			{/each}
		</div>
	</div>
{/if}
