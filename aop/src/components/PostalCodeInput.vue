<template>
  <div :class="className">
    <label :for="id">{{ label }}:</label><br />
    <masked-input
      :id="id"
      type="text"
      name="postalCode"
      class="form-control"
      v-model="localValue"
      :mask="[/[A-Za-z]/, /\d/, /[A-Za-z]/, ' ', /\d/, /[A-Za-z]/, /\d/]"
      :guide="false"
      placeholderChar="#"
    >
    </masked-input>
  </div>
</template>

<script>
import MaskedInput from "vue-text-mask";

export default {
  name: "PostalCodeInput",
  components: {
    MaskedInput
  },
  props: {
    id: String,
    value: String,
    label: String,
    className: String
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
