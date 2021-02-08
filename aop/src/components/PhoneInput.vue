<template>
  <div :class="className">
    <label :for="id">{{ label }}:</label><br />
    <masked-input
      :id="id"
      type="text"
      name="phoneNumber"
      class="form-control"
      v-model="localValue"
      :required="required"
      :mask="[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]"
    >
    </masked-input>
  </div>
</template>

<script>
import MaskedInput from "vue-text-mask";

export default {
  name: "PhoneInput",
  components: {
    MaskedInput
  },
  props: {
    id: String,
    value: String,
    label: String,
    className: String,
    required: Boolean
  },
  data() {
    return {
      localValue: null
    };
  },
  created() {
    this.localValue = this.value;
  },
  watch: {
    localValue(newValue) {
      this.$emit("input", newValue);
    }
  }
};
</script>

<style scoped></style>
