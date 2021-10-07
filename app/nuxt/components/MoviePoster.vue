<template>
  <img :src="src" :alt="alt" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    path: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      src: this.path ?? 'https://via.placeholder.com/220x330.png?text=%20',
    }
  },
})
</script>
