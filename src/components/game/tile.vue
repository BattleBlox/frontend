<template>
  <div class="c-tile">
    {{ identifier }}
  </div>
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

<style scoped lang="scss">
.c-tile {
  width: 60px;
  height: 60px;
  background-color: silver;
  border: 1px solid white;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: gray;
  }
}
</style>
