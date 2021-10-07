<template>
  <!-- <p v-if="$fetchState.pending">Fetching session...</p>
  <p v-else-if="$fetchState.error">An error occurred :(</p>
  <div v-else>
  </div> -->
  <div v-if="state.kind == 'LoadedSessionState'">
    <h1>{{ state.session.title }} ({{ state.session.movies.length }} movies)</h1>
    <Proposal
      v-for="movie in state.session.movies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { dependenciesLocator, SessionState } from '@pick-a-movie/core';

// the "get state from ploc" logic would be refactored once Composition API are
// available in Nuxt
const sessionPloc = dependenciesLocator.provideSessionPloc();

export default Vue.extend({
  props: {
    sessionId: {
      type: String,
      required: true,
    }
  },
  data(): {
    state: SessionState;
  } {
    return {
      state: sessionPloc.state,
    }
  },
  mounted() {
    sessionPloc.subscribe((state) => {
      this.$data.state = state;
    });
    sessionPloc.load(this.sessionId);
  },
})
</script>
