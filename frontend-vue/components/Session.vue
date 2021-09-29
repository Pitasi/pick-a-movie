<template>
  <p v-if="$fetchState.pending">Fetching session...</p>
  <p v-else-if="$fetchState.error">An error occurred :(</p>
  <div v-else>
    <h1>{{ session.title }} ({{ session.proposals.length }} movies)</h1>
    <Proposal
      v-for="proposal in session.proposals"
      :key="proposal.id"
      :proposal="proposal"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import getSession from '~/application/getSession';
import { Session } from '~/domain/session';

export default Vue.extend({
  props: {
    listId: {
      type: String,
      required: true,
    }
  },
  data(): {
    session?: Session;
  } {
    return {
      session: undefined,
    }
  },
  async fetch() {
    this.session = await getSession(this.listId);
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
})
</script>
