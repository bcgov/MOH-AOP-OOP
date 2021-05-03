<template>
  <div :class="className">
    <label :for="id">{{label}}</label><br/>
    <region-select 
      :id="id" 
      aria-label='Region'
      name="region"
      class="form-control" 
      v-model="region"
      :country="country"
      :region="region"
      :countryName="true"
      placeholder="Select Province" />
  </div>
</template>

<script>
import Vue from 'vue';
import vueCountryRegionSelect from 'vue-country-region-select';
Vue.use(vueCountryRegionSelect);

export const getProvinceNameFromCode = (provinceCode) => {
  const provinceMap = {
    AB: 'Alberta',
    BC: 'British Columbia',
    MB: 'Manitoba',
    NB: 'New Brunswick',
    NL: 'Newfoundland and Labrador',
    NT: 'Northwest Territories',
    NS: 'Nova Scotia',
    NU: 'Nunavut',
    ON: 'Ontario',
    PE: 'Prince Edward Island',
    QC: 'Quebec',
    SK: 'Saskatchewan',
    YT: 'Yukon'
  };
  if (provinceCode && provinceMap[provinceCode]) {
    return provinceMap[provinceCode];
  }
  return provinceCode;
};

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
      country: 'Canada',
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
