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

export const getStateNameFromCode = (stateCode) => {
  const stateMap = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "AA": "Armed Forces Americas",
    "AE": "Armed Forces Europe, Canada, Africa and Middle East",
    "AP": "Armed Forces Pacific",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming",
    };
  if (stateCode && stateMap[stateCode]) {
    return stateMap[stateCode];
  }
  return stateCode;
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
