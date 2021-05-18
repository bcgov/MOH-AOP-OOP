<template>
  <div :class="className">
    <label :for="'input' + label">{{label}}</label><br/>
    <input :id="'input' + label"
            name="addressLine"
           class='form-control'
           :maxlength='maxlength'
           v-model="query" />
    <div class="results-container">
      <div class="result-item-container">
        <div v-for="address in data"
            :key="address.postalCode"
            class="result-item">{{address.fullAddress}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'underscore';

export default {
  name: 'AddressValidator',
  props: {
    value: {
      type: String,
    },
    id: {
      type: String,
      default: null,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    maxlength: {
      type: String,
      default: '25',
    },
    serviceUrl: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      query: null,
      data: [],
    }
  },
  created() {
    this.query = this.value;
  },
  methods: {
    lookup(query) {
      if (!query) {
        this.data = [];
        return;
      }
      const url = new URL(window.location.origin + this.serviceUrl);
      url.searchParams.set('address', query);

      axios.get(url.href).then((response) => {
        this.data = this.processResponse(response.data);
      }).catch((error) => {
        this.data = [];
        console.log('Error: ', error);
      });
    },
    processResponse(data) {
      return data.Address.map(address => {
        const city = address.Locality;
        const addressLines = address.AddressLines;
        const province = address.Province;
        const country = 'Canada'; // ALWAYS return Canada
        const postalCode = address.PostalCode;
        const fullAddress = 'FULL ADDRESS HERE';

        return {
          fullAddress,
          city,
          addressLines,
          province,
          postalCode,
          country
        };
      });
    }
  },
  watch: {
    query: _.debounce(function(newValue) {
      this.$emit('input', newValue);
      this.lookup(newValue);
    }, 500)
  }
}
</script>

<style scoped>
.results-container {
  position: relative;
}

.result-item-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #FFF;
  border: #CCC;
}
</style>
