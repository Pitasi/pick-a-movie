<template>
  <div>
    <TmdbMoviePoster :path="movie.poster_path" :alt="movie.title" />
    <MovieDetails :movie="movie" />
    <MovieVotes :proposal="proposal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Movie } from '~/domain/movie';
import { Proposal } from '~/domain/proposal'

export default Vue.extend({
  props: {
    proposal: {
      type: Proposal,
      required: true
    },
  },
  computed: {
    movie(): Movie {
      return this.proposal.movie;
    }
  }
})
</script>
