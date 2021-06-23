<script lang="ts">
	import type { MovieDetails } from 'src/routes/movies/_api';

	export let details: MovieDetails;
</script>

<article position="relative" overflow="hidden" class="transition-all">
	<img
		display="block"
		class="transform top-1/2 -translate-y-1/2"
		left="0"
		w="full"
		style="z-index: -1"
		position="absolute"
		src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${details.backdrop_path}`}
		alt="Backdrop"
	/>
	<div
		class="flex flex-row gap-4 backdrop-filter backdrop-blur"
		p="4"
		bg="white opacity-50"
		rounded="md"
	>
		<img
			style="width:32px;"
			src={`https://image.tmdb.org/t/p/w200/${details.poster_path}`}
			alt={`Poster of ${details.title}`}
		/>
		<div>
			<h2 text="lg">{details.title}</h2>
			<a text="xs" href="https://www.themoviedb.org/movie/{details.id}" target="_blank">
				See this movie on TMDB
			</a>
		</div>
	</div>
</article>

<style>
	article {
		background: rgba(0, 0, 0, 0.03);
		border-radius: 8px;
		padding: 1em;
		margin-bottom: 1em;
	}
</style>
