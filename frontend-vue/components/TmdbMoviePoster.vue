<template>
  <img v-bind:src="src" v-bind:alt="alt" />
</template>

<script lang="ts">
export default {
  props: ['path', 'alt'],
  data() {
    return {
      src: this.path
        ? `https://image.tmdb.org/t/p/w220_and_h330_face/${this.path}`
        : 'https://via.placeholder.com/220x330.png?text=%20',
    }
  },
}
</script>