<template>
  <button 
    class="simple-button" 
    :disabled="disabled"
    :class="[`simple-button--${type}`, { 'simple-button--disabled': disabled }]" 
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "SimpleButton",
  props: {
    type: {
      type: String,
      default: "primary",
      validator: (value) => ["info", "warning", "danger", "primary"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="less">
.simple-button {
  padding: 0 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #0c0c0c;
  line-height: 36px;
  font-weight: 700;
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }

  &--info {
    background-color: #d0d0d0;
  }

  &--warning {
    background-color: #fee606;
  }

  &--danger {
    background-color: #ff7575;
  }

  &--primary {
    background-color: #02defd;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: #4d4d4d;

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
