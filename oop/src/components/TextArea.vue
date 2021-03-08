<template>
  <div :class="className">
    <label v-bind:for="'textarea' + label">{{ label }}:</label><br />
    <textarea
      :id="'textarea' + label"
      class="form-control"
      :value="value"
      :rows=5
      :maxlength="maxlength"
      @input="emitInput($event)"
    />
  </div>
</template>

<script>
export default {
  name: "TextArea",
  components: {},
  props: {
    value: String,
    rows: Number,
    label: String,
    className: String,
    maxlength: Number
  },
  methods: {
    emitInput(event) {
      this.$emit('input', event.target.value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
