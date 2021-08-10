<template>
  <Session v-bind:list-id="listId" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      listId: this.$route.params.id,
    }
  },
})
</script>