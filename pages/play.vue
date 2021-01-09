<template>
  <div class="c-play">
    <compact-logo />
    <board />

    <turn-menu />
    <surrender-button />
  </div>
</template>

<script>
export default {
  middleware: 'game-detector'
}
</script>

<style scoped lang="scss">
.c-play {
  margin: 20px auto;
  user-select: none;
}
</style>
