<template>
  <Session :session-id="sessionId" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      sessionId: this.$route.params.id,
    }
  },
})
</script>
