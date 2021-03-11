<template>
  <div :class="className">
    <label :for="id">{{label}}</label><br/>
    <region-select 
      :id="id" 
      name="region"
      class="form-control" 
      v-model="region"
      :country="country"
      :region="region"/>
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
    id: String,
    value: String,
    label: String,
    className: String,
  },
  data() {
    return {
      country: 'CA',
      region: ''
    }
  },
  created() {
    this.region = this.value;
  },
  watch: {
    region(newValue) {
      this.$emit('input', newValue);
    }
  }
}
</script>
