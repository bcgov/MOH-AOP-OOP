<template>
  <div :class="className">
    <label :for="'input' + label">{{label}}</label><br/>
    <input :id="'input' + label"
            name="addressLine"
           class='form-control'
           :maxlength='maxlength'
           v-model="query"
           @keydown="inputKeyDownHandler($event)" />
    <div class="results-container"
        ref="resultsContainer">
      <div v-if="data && data.length > 0"
          class="result-item-container">
        <div v-for="(address, index) in data"
            :key="address.postalCode"
            :class="'result-item ' + (selectedItemIndex === index ? 'selected' : '')"
            @mouseenter="itemMouseEnterHandler($event, index)"
            @mouseleave="itemMouseLeaveHandler($event, index)"
            @click="selectItemIndex(index)">{{address.fullAddress}}</div>
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
      selectedItemIndex: null,
    }
  },
  created() {
    this.query = this.value;
  },
  mounted() {
    window.addEventListener('click', this.blurResultsContainer);
    this.$refs.resultsContainer.addEventListener('click', this.stopPropagation);
  },
  beforeUnmount() {
    window.removeEventListener('click', this.blurResultsContainer);
    this.$refs.resultsContainer.removeEventListener('click', this.stopPropagation);
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
        this.data = this.processResponse(response.data).slice(0, 5);
      }).catch(() => {
        this.data = [];
      });
    },
    processResponse(data) {
      return data.Address.map(address => {
        const city = address.Locality;
        const addressLines = address.AddressLines;
        const province = address.Province;
        const country = 'Canada'; // ALWAYS return Canada
        const postalCode = address.PostalCode;
        const fullAddress = address.AddressComplete;

        return {
          fullAddress,
          city,
          addressLines,
          province,
          postalCode,
          country
        };
      });
    },
    inputKeyDownHandler(event) {
      const keyCode = event.keyCode;

      switch (keyCode) {
        case 40: // Down arrow.
          if (this.selectedItemIndex !== null) {
            if (this.selectedItemIndex < this.data.length - 1) {
              this.selectedItemIndex++;
            } else {
              this.selectedItemIndex = 0;
            }
          } else {
            this.selectedItemIndex = 0;
          }
          break;
        case 38: // Up arrow.
          if (this.selectedItemIndex !== null) {
            if (this.selectedItemIndex > 0) {
              this.selectedItemIndex--;
            } else {
              this.selectedItemIndex = this.data.length - 1;
            }
          } else {
            this.selectedItemIndex = this.data.length - 1;
          }
          break;
        case 13: // Enter.
          if (this.selectedItemIndex !== null) {
            this.selectItemIndex(this.selectedItemIndex);
          }
          break;
        case 27: // Escape.
          this.data = [];
          this.selectedItemIndex = null;
          break;
        default:
          this.data = [];
          this.selectedItemIndex = null;
          break;
      }
    },
    itemMouseEnterHandler(event, index) {
      this.selectedItemIndex = index;
    },
    itemMouseLeaveHandler() {
      this.selectedItemIndex = null;
    },
    selectItemIndex(index) {
      this.$emit('address-selected', this.data[index]);
      this.data = [];
      this.selectedItemIndex = null;
    },
    blurResultsContainer() {
      this.data = [];
      this.selectedItemIndex = null;
    },
    stopPropagation(event) {
      event.stopPropagation();
    },
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
  z-index: 1;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 0.25rem;
}
.result-item {
  padding: 0.25rem 1.5rem;
  cursor: pointer;
}
.result-item.selected {
  background: #036;
  color: #FFF;
}
</style>
