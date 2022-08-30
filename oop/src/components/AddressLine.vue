<template>
  <div>
    <Input
      :label="'Address line ' + (childIndex + 1)"
      :id="'addressLine' + childIndex"
      v-model="addressLine"
      class="address-line"
      maxlength="25"
      @input="handleFocus"
      @blur="handleBlur"
      :data-cy="'addressLine' + childIndex"
    />
    <div
      class="text-danger"
      v-if="
      v$.addressLine.$dirty && 
        v$.addressLine.specialCharacterValidator.$invalid
      "
      aria-live="assertive"
    >
      Address cannot include special characters except hyphen, period,
      apostrophe, number sign and blank space.
    </div>
  </div>
</template>

<script>
import { Input } from "common-lib-vue";
import useVuelidate from "@vuelidate/core";
import { specialCharacterValidator } from "../helpers/validators";

export default {
  name: "AddressLine",
  components: {
    Input,
  },
  setup() {
    return { v$: useVuelidate({}) };
  },
  data: () => {
    return {
      addressLine: null,
    };
  },
  props: {
    childIndex: {
      type: Number,
    },
    childAddressLine: {
      type: Object,
    },
  },
  validations() {
    const validations = {
      addressLine: {
        specialCharacterValidator
      },
    };
    return validations;
  },
  methods: {
    getChildVModel() {
      return String("addressLine") + this.childIndex;
    },
    handleFocus() {
      return this.v$.$reset();
    },
    handleBlur() {
      this.$emit("updateAddressLine", this.addressLine, this.childIndex);
      return this.v$.addressLine.$touch();
    },
  },
};
</script>

<style></style>
