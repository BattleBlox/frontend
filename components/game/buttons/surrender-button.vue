<template>
  <div
    class="c-surrender-button u-pointer"
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
  position: fixed;
  height: 50px;
  width: 50px;
  background: rgba(30, 30, 30, 0.5);
  border-radius: 10px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;
  right: 10px;
  top: 10px;
  z-index: 10;

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    background: rgba(30, 30, 30, 0.8);
  }
}
</style>
