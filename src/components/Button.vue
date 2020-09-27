<template>
  <button
    class="btn"
    :class="[`btn-${type}`, active ? 'active' : '']"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    type: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  }
};
</script>

<style scoped lang="scss">
.btn {
  padding: 0.4rem 1rem;
  border: 0;
  border-radius: 0.2rem;
  transition: all 0.1s ease-out;
  outline-width: 0;

  &:not(:disabled) {
    cursor: pointer;
  }
}

.btn-primary {
  background: $primary-color;
  color: #fff;

  &:hover:not(:disabled),
  &:active,
  &.active {
    background: darken($primary-color, 15%);
  }
}

.btn-accent {
  background: $accent-color;
  color: #fff;

  &:hover:not(:disabled),
  &:active,
  &.active {
    background: darken($accent-color, 15%);
  }
}

.btn-warn {
  background: $warn-color;
  color: #fff;

  &:hover:not(:disabled),
  &:active,
  &.active {
    background: darken($warn-color, 15%);
  }
}

.btn-info {
  background: $info-color;
  color: #000;

  &:hover:not(:disabled),
  &:active,
  &.active {
    background: darken($info-color, 15%);
  }
}
</style>
