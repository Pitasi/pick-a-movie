<template>
  <div>
    <MoviePoster :path="movie.posterPath" :alt="movie.title" />
    <MovieDetails :movie="movie" />
    <!-- <MovieVotes :proposal="proposal" /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Movie } from '@pick-a-movie/core';

export default Vue.extend({
  props: {
    movie: {
      type: Object as () => Movie,
      required: true
    },
  },
})
</script>
