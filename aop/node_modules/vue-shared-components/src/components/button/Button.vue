<template>
  <button
    class="bcgov-button" v-bind:class="styling"
    @click="$emit('button-click')"
    type="button"
    v-bind:disabled="disabled"
  >
    {{ label }}
    <div v-if="hasLoader" class="bcgov-loader-show">
      <loader />
    </div>
  </button>
</template>

<script>
  import Loader from "../loader/Loader.vue";
  import "./Button.css";

  export default {
    name: "Button",
    props: {
      label: {
        type: String,
        required: true,
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      hasLoader: {
        type: Boolean,
        required: false,
        default: false,
      },
      styling: {
        type: String,
        required: true,
      }
    },
    components: {
      "loader": Loader,
    }
  }
</script>
