<template>
  <div class="c-board">
    <tile v-for="tile in tiles" :key="tile.identifier" :tile="tile" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('tiles', ['tiles'])
  }
}
</script>

<style scoped>
.c-board {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid red;
  width: 602px;
  margin: 20px auto;
}
</style>
