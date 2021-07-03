<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { List } from './api/[uid].json';

	type Fetch = (info: RequestInfo, init?: RequestInit) => Promise<Response>;

	async function getList(fetch: Fetch, id: string): Promise<List> {
		const res = await fetch(`/lists/api/${id}.json`);
		const data = await res.json();
		return data;
	}

	async function getMovie(fetch: Fetch, id: string): Promise<MovieDetails> {
		const res = await fetch(`/movies/${id}.json`);
		const movie = await res.json();
		return movie;
	}

	export interface UIList {
		uid: string;
		title: string;
		movies: UIMovie[];
	}

	export interface UIMovie {
		details: MovieDetails;
		votes: number;
	}

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch, page }) => {
		const uid = page.params['uid'];
		const list = await getList(fetch, uid);
		const movies = await Promise.all(
			list.items.map(async (item) => ({
				details: await getMovie(fetch, item.movieId),
				votes: item.votes
			}))
		);
		const uiList: UIList = {
			uid,
			title: list.title,
			movies
		};
		return {
			props: { list: uiList }
		};
	};
</script>

<script lang="ts">
	import type { MovieDetails } from '../movies/_api';
	import MovieCard from '$lib/MovieCard/index.svelte';
	import Searchbox from '$lib/Searchbox/index.svelte';

	export let list: UIList;

	function canAdd(details: MovieDetails): boolean {
		return !list.movies.find((movie) => movie.details.id == details.id);
	}

	async function onAdd(details: MovieDetails) {
		const newList = {
			...list,
			movies: [...list.movies, { details, votes: 1 }]
		};
		const oldList = list;
		list = newList;

		try {
			await fetch(`/lists/api/${list.uid}.json`, {
				method: 'put',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					movieId: details.id
				})
			});
		} catch (err) {
			list = oldList;
		}
	}
</script>

<svelte:head>
	<title>{list.title} - pick a movie</title>
</svelte:head>

{#if list}
	<div class="flex" flex="col" gap="8">
		<div
			class="flex bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
			p="4 y-8"
			flex="col"
			gap="4"
		>
			<h1 font="bold" text="white 4xl">{list.title}</h1>
			<Searchbox {canAdd} {onAdd} />
		</div>
		<div class="grid" grid="cols-1 sm:cols-2 md:cols-3 lg:cols-4" justify="items-center" gap="y-12">
			{#each list.movies as movie (movie.details.id)}
				<MovieCard
					details={movie.details}
					on:addFavorite={() => {
						console.log('added');
					}}
				/>
			{/each}
		</div>
	</div>
{/if}
