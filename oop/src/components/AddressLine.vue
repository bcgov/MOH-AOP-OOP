<template>
  <div>
    <InputComponent
      :id="'addressLine' + childIndex"
      v-model="addressLine"
      :label="'Address line ' + (childIndex + 1)"
      class="address-line"
      maxlength="25"
      :data-cy="'addressLine' + childIndex"
      @input="handleFocus"
      @blur="handleBlur"
    />
    <div
      v-if="v$.addressLine.$dirty && v$.addressLine.specialCharacterValidator.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Address cannot include special characters except hyphen, period, apostrophe, number sign and
      blank space.
    </div>
  </div>
</template>

<script>
import { InputComponent } from "common-lib-vue";
import useVuelidate from "@vuelidate/core";
import { specialCharacterValidator } from "../helpers/validators";

export default {
  name: "AddressLine",
  components: {
    InputComponent,
  },
  props: {
    childIndex: {
      type: Number,
    },
    childAddressLine: {
      type: Object,
    },
  },
  setup() {
    return { v$: useVuelidate({}) };
  },
  data: () => {
    return {
      addressLine: null,
    };
  },
  watch: {
    //the valueOld argument isn't used, but it's still here in the codebase for future debugging purposes
    //eslint-disable-next-line
    childAddressLine: function (valueNew, valueOld) {
      //updates Vue data when the prop changes
      this.addressLine = valueNew.value;
    },
  },
  mounted() {
    if (this.childAddressLine && this.childAddressLine.value) {
      this.addressLine = this.childAddressLine.value;
    }
  },
  validations() {
    const validations = {
      addressLine: {
        specialCharacterValidator,
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
