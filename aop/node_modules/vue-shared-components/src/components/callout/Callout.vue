<template>
  <div :class="styling">
    <p>{{ text }}</p>
    <label v-if="checkboxLabel" class="float-right" for="agreeCallout">
      <input id="agreeCallout" type="checkbox" @click="$emit('agree-callout')" />
      &nbsp;
      <b>{{ checkboxLabel }}</b>
      <span id="asterisk" class="bcgov-mandatory">
        *
      </span>
    </label>
  </div>
</template>

<script>
  import "./Callout.css";

  export default {
    name: "Callout",
    props: {
      checkboxLabel: {
        type: String,
        required: false,
      },
      text: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        styling: !this.checkboxLabel ? "bcgov-callout" : "bcgov-callout-checkbox",
      }
    }
  }
</script>
