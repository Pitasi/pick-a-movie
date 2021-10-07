<template>
  <div>
    <span v-if="count == 1">1 vote</span>
    <span v-else>{{ count }} votes</span>

    <button @click="onVote">
      {{ hasUserVoted ? 'remove the vote' : 'vote this movie' }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // props: {
  //   proposal: {
  //     type: Proposal,
  //     required: true,
  //   }
  // },
  // data() {
  //   return {
  //     hasUserVoted: false,
  //   }
  // },
  // async fetch() {
  //   this.hasUserVoted = await hasUserVoted(this.proposal);
  // },
  // computed: {
  //   count(): number {
  //     return this.proposal.votes;
  //   }
  // },
  // methods: {
  //   async onVote() {
  //     if (this.hasUserVoted) {
  //       await unvoteProposal(this.proposal);
  //     } else {
  //       await voteProposal(this.proposal);
  //     }
  //   },
  // },
})
</script>
