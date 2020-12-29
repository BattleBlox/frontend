<template>
  <div
    class="u-tile c-blocked-tile"
    title="Blocked Tile" />
</template>

<script>
export default {
  props: {
    identifier: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.c-blocked-tile {
  background-color: black;
  color: white;
  border: 1px solid white;
}
</style>
