<template>
  <div class="label-container">
    <slot />
    <span 
      v-if="value" 
      class="label"
      :class="{'label--with-text': !!value }"
    >
      {{ value }}
    </span>
    <span 
      v-else 
      class="label label--without-text"
    />
  </div>
</template>

<script>
export default {
  name: 'LabelComponent',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="less">
.label {
  background-color: #ff7575;
  width: auto;
  height: auto;
  border-radius: 30%;
  position: absolute;

  &--with-text{
    right: -10px;
    top: -10px;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
  }

  &--without-text{
    right: -5px;
    top: -5px;
    width: 12px;
    height: 12px;
    border-radius: 6px;
  }
}

.label-container {
  position: relative;
  width: fit-content;
}
</style>
