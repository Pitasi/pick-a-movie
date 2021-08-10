<template>
  <p v-if="$fetchState.pending">Fetching session...</p>
  <p v-else-if="$fetchState.error">An error occurred :(</p>
  <div v-else>
    <h1>{{ session.title }} ({{ session.proposals.length }} movies)</h1>
    <Proposal
      v-for="proposal in session.proposals"
      :key="proposal.id"
      v-bind:proposal="proposal"
    />
  </div>
</template>

<script>
export default {
  props: ['listId'],
  data() {
    return {
      session: null,
    }
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch() {
    this.session = await this.$axios.$get(`/api/v1/sessions/${this.listId}`)
  },
}
</script>