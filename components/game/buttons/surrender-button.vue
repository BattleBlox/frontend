<template>
  <div
    class="c-surrender-button u-game-button u-pointer"
    title="Surrender Game"
    @click="surrenderGame()">
    <c-icon
      icon="flag"
      class="u-flex-grow" />
  </div>
</template>

<script>
export default {
  methods: {
    surrenderGame () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped lang="scss">
.c-surrender-button {
  right: 10px;
  top: 10px;
}
</style>
