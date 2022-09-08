<template>
  <div :class="className">
    <label :for="id">{{label}}</label><br/>
    <select 
      :id="id" 
      aria-label='Region'
      name="region"
      class="form-control" 
      :value="value"
      :country="country"
      :region="value"
      :countryName="true"
      placeholder="Select Province"
      @input="inputHandler($event)" />
  </div>
</template>

<script>

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
      country: 'Canada',
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
