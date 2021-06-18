<script lang="ts">
	import type { MovieDetails } from 'src/routes/movies/_api';

	export let details: MovieDetails;
</script>

<article>
	<!-- <img src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${details.backdrop_path}`} /> -->
	<img
		style="width:32px;"
		src={`https://image.tmdb.org/t/p/w200/${details.poster_path}`}
		alt={`Poster of ${details.title}`}
	/>
	<h2>{details.title}</h2>
	<a href="https://www.themoviedb.org/movie/{details.id}" target="_blank">
		See this movie on TMDB
	</a>
</article>

<style>
	article {
		background: rgba(0, 0, 0, 0.03);
		border-radius: 8px;
		padding: 1em;
		margin-bottom: 1em;
	}
</style>
