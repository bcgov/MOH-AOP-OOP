<template>
  <div :class="className">
    <label :for="id">{{label}}</label>
    <VueBootstrapTypeahead
      :id="id"
      :data="data"
      v-model="query"
      size="md"
      :serializer="s => s.fullAddress"
      @hit="selectAddress($event)"
      @input="emitInput($event)"
      ref="typeahead"
    />
  </div>
</template>

<script>
import VueBootstrapTypeahead from './vue-bootstrap-typeahead/VueBootstrapTypeahead.vue';
import axios from 'axios';
import _ from 'underscore';

const BASE_URL = 'https://geocoder.api.gov.bc.ca';
const ADDRESS_URL = `${BASE_URL}/addresses.json`;

export default {
  name: 'AddressValidator',
  components: {
    VueBootstrapTypeahead,
  },
  props: {
    id: String,
    value: {
      type: String,
      default: null,
    },
    label: String,
    className: String,
  },
  data() {
    return {
      data: [],
      query: null,
    }
  },
  created() {
    this.query = this.value;
    this.lookup(this.query);
  },
  methods: {
    emitInput(input) {
      this.$emit('input', input);
    },
    selectAddress(address) {
      this.$emit('select', address);
      this.$refs.typeahead.inputValue = address.street;
      this.query = address.street;
      this.$emit('input', this.query);
    },
    lookup(query) {
      if (!query) {
        this.data = [];
        return;
      }
      const url = new URL(ADDRESS_URL);
      url.searchParams.set('minScore', '50');
      url.searchParams.set('maxResults', '10');
      url.searchParams.set('echo', 'true');
      url.searchParams.set('interpolation', 'adaptive');
      url.searchParams.set('addressString', query);

      axios.get(url.href).then((response) => {
        this.data = this.processResponse(response.data);
      }).catch((error) => {
        this.data = [];
        console.log('Error: ', error);
      });
    },
    processResponse(data) {
      return data.features.map(feature => {
        const props = feature.properties;
        const city = props.localityName;
        // We get street just by trimming everything before city, more
        // stable than looking for commas, etc.
        const cityIndex = props.fullAddress.indexOf(`, ${city}`);
        const street = props.fullAddress.slice(0, cityIndex);
        const province = props.provinceCode;
        const country = 'CAN'; // ALWAYS return Canada

        return {
          fullAddress: props.fullAddress.replace('--', '-'),
          city,
          street: street.replace('--', '-'),
          province,
          country
        };
      });
    }
  },
  watch: {
    query: _.debounce(function(query) { this.lookup(query) }, 500)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
