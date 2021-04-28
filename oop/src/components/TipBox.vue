<template>
  <div :class="'tip-container rounded p-3' + className">
    <div>
      <p class="title">{{ title }}</p>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TipBox',
  props: {
    title: {
      type: String,
      default: 'Tip',
    },
    className: {
      type: String,
      default: '',
    }
  }
}
</script>

<style scoped>
.tip-container {
  background: #f2f2f2;
}
.title {
  font-weight: bold;
}
</style>