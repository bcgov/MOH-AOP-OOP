<template>
  <div :class="className">
    <label :for="id">
      {{ label }}
    </label>
    <br />
    <select
      :id="id"
      v-model="stateInput"
      aria-label="State"
      name="state"
      class="form-control"
      data-cy="state"
      @change="onChange($event.target.value)"
    >
      <option
        label="Select State"
        selected
      ></option>
      <option
        v-for="(state, index) in statesList"
        :key="index"
        :modelValue="state.abbreviation"
      >
        {{ state.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { US_STATES } from "../helpers/us-states";

export default {
  name: "StateInput",
  components: {},
  props: {
    id: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      stateInput: null,
      statesList: US_STATES,
    };
  },
  created() {
    this.stateInput = this.modelValue;
  },
  methods: {
    onChange(modelValue) {
      this.$emit("update:modelValue", modelValue);
    },
  },
};
</script>
