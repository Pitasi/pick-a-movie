<template>
  <p v-if="$fetchState.pending">Fetching movie...</p>
  <p v-else-if="$fetchState.error">An error occurred :(</p>
  <div v-else>
    <TmdbMoviePoster v-bind:path="movie.poster_path" v-bind:alt="movie.title" />
    <MovieDetails v-bind:movie="movie" />
    <MovieVotes v-bind:proposal="proposal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['proposal'],
  data() {
    return {
      movie: null,
    }
  },
  async fetch() {
    this.movie = await this.$axios.$get(
      `/tmdb/3/movie/${this.proposal.movieId}`
    )
  },
})
</script>