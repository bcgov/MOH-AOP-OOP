<template>
  <div :class="className">
    <label :for="id">{{label}}</label><br/>
    <region-select 
      :id="id" 
      aria-label='State'
      name="state"
      class="form-control" 
      :value="value"
      :country="country"
      :region="value"
      :countryName="true"
      placeholder="Select State"
      @input="inputHandler($event)" />
  </div>
</template>

<script>
import Vue from 'vue';
import vueCountryRegionSelect from 'vue-country-region-select';
Vue.use(vueCountryRegionSelect);

export default {
  name: 'ProvinceInput',
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
      country: 'United States',
      region: ''
    }
  },
  methods: {
    inputHandler(value) {
      this.$emit('input', value);
    }
  }
}
</script>
