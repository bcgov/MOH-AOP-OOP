<template>
  <div :class="className">
    <label :for="id">{{label}}</label><br/>
    <country-select 
      :id="id" 
      aria-label='Jurisdiction'
      name="country"
      class="form-control" 
      v-model="country"
      :country="country"
      placeholder="Select Jurisdiction"
      :countryName="true"/>
  </div>
</template>

<script>
import Vue from 'vue';
import vueCountryRegionSelect from 'vue-country-region-select';
Vue.use(vueCountryRegionSelect);

export default {
  name: 'CountryInput',
  components: {},
  props: {
    id: String,
    value: String,
    label: String,
    className: String,
  },
  data() {
    return {
      country: '',
      region: ''
    }
  },
  created() {
    this.country = this.value == null ? 'Canada' : this.value;
  },
  watch: {
    country(newValue) {
      this.$emit('input', newValue);
    }
  }
}
</script>
