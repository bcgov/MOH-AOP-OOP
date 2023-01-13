<template>
  <div :class="className">
    <label :for="id">{{label}}</label><br/>
    <select :id="id"
            aria-label='State'
            name="state"
            class="form-control"
            v-model="stateInput"
            @change="onChange($event.target.value)"
            data-cy="state">
      <option label="Select State" selected></option>
      <option v-for="(state, index) in statesList" :key="index" :modelValue="state.abbreviation">{{state.name}}</option>
    </select>
  </div>
</template>

<script>
import { US_STATES } from '../helpers/us-states';

export default {
  name: 'StateInput',
  components: {},
  props: {
    id: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
    },
    label: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      stateInput: null,
      statesList: US_STATES,
    }
  },
  emits: ['update:modelValue'],
  created() {
    this.stateInput = this.modelValue;
  },
  methods: {
    onChange(modelValue) {
      this.$emit('update:modelValue', modelValue);
    },
  }
}
</script>
