<template>
  <Session v-bind:list-id="listId" />
</template>

<script lang="ts">
export default {
  data() {
    return {
      listId: this.$route.params.id,
    }
  },
}
</script>