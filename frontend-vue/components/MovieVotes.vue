<template>
  <div>
    <span v-if="count == 1">1 vote</span>
    <span v-else>{{ count }} votes</span>

    <button @click="onVote">
      {{ localVote ? 'remove the vote' : 'vote this movie' }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['proposal'],
  data() {
    return {
      count: this.proposal.votes.length,
      localVote:
        process.browser &&
        JSON.parse(localStorage.getItem(this.proposal.id) || 'null'),
    }
  },
  methods: {
    onVote() {
      if (this.localVote) {
        const voteId = this.localVote.id
        this.count--
        localStorage.removeItem(this.proposal.id)
        this.localVote = null
        // do DELETE voteId
      } else {
        this.count++

        this.localVote = { id: '-1' }
        localStorage.setItem(this.proposal.id, JSON.stringify(this.localVote))
        // this.localVote = await (do POST)
        localStorage.setItem(this.proposal.id, JSON.stringify(this.localVote))
      }
    },
  },
})
</script>