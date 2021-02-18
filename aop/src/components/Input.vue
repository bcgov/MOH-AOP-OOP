<template>
  <div :class="className">
    <label v-bind:for="'input' + label">{{ label }}:</label><br />
    <input
      :id="'input' + label"
      class="form-control"
      :value="value"
      :disabled="disabled"
      :required="required"
      :aria-required="required"
      :maxlength="maxlength"
      :minlength="minlength"
      @input="emitInput($event)"
    />
  </div>
</template>

<script>
export default {
  name: "Input",
  components: {},
  props: {
    value: String,
    label: String,
    className: String,
    disabled: Boolean,
    required: Boolean,
    maxlength: Number,
    minlength: Number
  },
  methods: {
    emitInput(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  margin-bottom: 0;
}
</style>
