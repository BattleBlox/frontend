<template>
  <div
    class="c-blocked-tile"
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
  width: 60px;
  height: 60px;
  background-color: black;
  color: white;
  border: 1px solid white;
  text-align: center;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
}
</style>
