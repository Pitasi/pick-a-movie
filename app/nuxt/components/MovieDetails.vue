<template>
  <span>{{ movie.title }}</span>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['movie'],
})
</script>