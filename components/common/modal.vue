<template>
  <div class="c-modal a-fadeIn">
    <div class="c-modal-header" @click="$emit('close')">
      <c-icon icon="chevron-circle-left" class="fa-fw" />
      <h2 v-text="heading" />
    </div>
    <div class="c-modal-inner">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.c-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  background-color: black;
  padding: 30px;
  overflow: auto;
}

.c-modal-header {
  display: flex;
  align-items: center;

  svg {
    font-size: 40px;
    margin-right: 10px;
  }

  h2 {
    flex-grow: 1;
  }
}

.c-modal-inner {
  padding: 30px 50px;

  p {
    margin-bottom: 10px;
  }
}
</style>
