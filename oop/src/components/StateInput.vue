<template>
  <div :class="className">
    <label :for="id">{{label}}</label><br/>
    <select :id="id"
            aria-label='State'
            name="state"
            class="form-control"
            v-model="state"
            @input="inputHandler($event.target.value)">
      <option :value="null" label="Select State" selected></option>
      <option v-for="(state, index) in statesList" :key="index" :value="state.abbreviation">{{state.name}}</option>
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
    value: {
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
      state: null,
      statesList: US_STATES,
    }
  },
  created() {
    this.state = this.value;
  },
  methods: {
    inputHandler(value) {
      this.$emit('input', value);
    }
  }
}
</script>
