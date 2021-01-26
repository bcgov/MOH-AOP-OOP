<template>
  <div class="bcgov-display-box" v-bind:class="styling">
    <div v-if="this.$slots.icon" class="bcgov-display-icon">
      <slot name="icon"></slot>
    </div>
    <div class="bcgov-display-right-element">
      <slot name="element"></slot>
    </div>
  </div>
</template>

<script>
  import "./DisplayBox.css";

  export default {
    name: "DisplayBox",
    props: {
      styling: {
        type: String,
        required: false,
        default: "",
      },
    }
  }
</script>
