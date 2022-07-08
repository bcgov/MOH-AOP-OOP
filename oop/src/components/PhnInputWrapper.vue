<template>
  <div>
    <PhnInput
      :label="'PHN: Dependent ' + (childIndex + 1)"
      :id="'phn' + childIndex"
      class="phn-input"
      v-model="phnData"
      @input="handleFocus"
      @blur="handleBlur"
      :data-cy="'phn' + childIndex"
    />
    <div
      class="text-danger"
      v-if="
        v$.phnData.phnValidator.$invalid && v$.phnData.$dirty
      "
      aria-live="assertive"
    >
      This is not a valid Personal Health Number.
    </div>
  </div>
</template>

<script>
import { PhnInput } from "common-lib-vue";
import useVuelidate from "@vuelidate/core";
import { optionalValidator, phnValidator } from "common-lib-vue";

export default {
  name: "PhnInputWrapper",
  components: {
    PhnInput,
  },
  setup() {
    return { v$: useVuelidate({}) };
  },
  data: () => {
    return {
      phnData: null,
    };
  },
  props: {
    childIndex: {
      type: Number,
    },
    childPhn: {
      type: Object,
    },
  },
  validations() {
    const validations = {
      phnData: {
        phnValidator: optionalValidator(phnValidator),
      },
    };
    return validations;
  },
  methods: {
    getChildVModel() {
      return String("phn1") + this.childIndex;
    },
    handleFocus() {
      return this.v$.$reset();
    },
    handleBlur() {
      this.$emit("updatePhn", this.phnData, this.childIndex);
      return this.v$.phnData.$touch();
    },
  },
};
</script>

<style></style>
