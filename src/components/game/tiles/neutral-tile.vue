<template>
  <div
    class="c-neutral-tile"
    @click="onClick" />
</template>

<script>
export default {
  props: {
    identifier: {
      type: Number,
      required: true
    }
  },

  methods: {
    onClick () {
      // If a tile is selected
      // Attack tile
      // Control Tile
      // End Turn
    }
  }
}
</script>

<style scoped lang="scss">
.c-neutral-tile {
  width: 60px;
  height: 60px;
  background-color: silver;
  border: 1px solid white;
  transition: all 0.2s ease-in-out;
  text-align: center;
  border-radius: 10px;

  &:hover {
    background-color: gray;
  }

  &.c-tile--selected {
    border: 5px solid gold;
  }
}
</style>
