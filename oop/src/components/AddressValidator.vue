<template>
  <div :class="className">
    <label :for="'input' + label">{{label}}</label><br/>
    <p class="subtitle">Note: if you have a unit number, enter it before the street address followed by a dash (-)</p>
    <p class="subtitle">Example: 111-123 Street name</p>
    <input :id="'input' + label"
            name="addressLine"
           class='form-control'
           :maxlength='maxlength'
           :value="value"
           @keydown="inputKeyDownHandler($event)"
           @input="inputHandler($event)" />
    <div class="results-container"
        ref="resultsContainer">
      <div v-if="data && data.length > 0"
          class="result-item-container"
          ref="resultItemContainer">
        <div v-for="(address, index) in data"
            :key="index"
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

const QUERY_REQUEST_DEBOUNCE_TIME = 500;
const MIN_LOOKUP_LENGTH = 3;

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
      isComponentLoaded: false,
      isPerformingLookup: false,
      isPerformingLookupCancelTimeout: null,
    }
  },
  created() {
    this.query = this.value;

    setTimeout(() => {
      this.isComponentLoaded = true;
    }, QUERY_REQUEST_DEBOUNCE_TIME + 50);
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
        this.data = this.processResponse(response.data);
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
          this.scrollDownToSelectedItem();
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
          this.scrollUpToSelectedItem();
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
          this.isPerformingLookup = true;
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
    inputHandler(event) {
      this.$emit('input', event.target.value);

      if (this.isPerformingLookupCancelTimeout) {
        clearTimeout(this.isPerformingLookupCancelTimeout);
      }
      this.isPerformingLookupCancelTimeout = setTimeout(() => {
        this.isPerformingLookup = false;
      }, QUERY_REQUEST_DEBOUNCE_TIME + 50);
    },
    scrollDownToSelectedItem() {
      console.log('Scroll Down.');
      setTimeout(() => {
        const selectedItemEl = this.$refs.resultItemContainer.querySelector('.selected');
        if (!selectedItemEl) {
          return;
        }
        if (this.$refs.resultItemContainer.scrollTop + this.$refs.resultItemContainer.clientHeight < (selectedItemEl.offsetTop + selectedItemEl.clientHeight)) {
          this.$refs.resultItemContainer.scrollTop = selectedItemEl.offsetTop - this.$refs.resultItemContainer.clientHeight + selectedItemEl.clientHeight;
        } else if (this.$refs.resultItemContainer.scrollTop > selectedItemEl.offsetTop) {
          this.$refs.resultItemContainer.scrollTop = 0;
        }
      }, 0);
    },
    scrollUpToSelectedItem() {
      console.log('Scroll Up.');
      setTimeout(() => {
        const selectedItemEl = this.$refs.resultItemContainer.querySelector('.selected');
        if (!selectedItemEl) {
          return;
        }
        if (this.$refs.resultItemContainer.scrollTop > selectedItemEl.offsetTop) {
          this.$refs.resultItemContainer.scrollTop = selectedItemEl.offsetTop;
        } else if ((this.$refs.resultItemContainer.scrollTop + this.$refs.resultItemContainer.clientHeight) < selectedItemEl.offsetTop) {
          this.$refs.resultItemContainer.scrollTop = this.$refs.resultItemContainer.scrollHeight - this.$refs.resultItemContainer.clientHeight;
        }
      }, 0);
    }
  },
  watch: {
    value: _.debounce(function (newValue) {
      if (this.isComponentLoaded &&
        this.isPerformingLookup &&
        newValue &&
        newValue.length >= MIN_LOOKUP_LENGTH) {
        this.lookup(newValue);
      }
    }, QUERY_REQUEST_DEBOUNCE_TIME)
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
  font-size: 14px;
  max-height: 250px;
  overflow-y: scroll;
}
.result-item {
  padding: 0.25rem 1.5rem;
  cursor: pointer;
}
.result-item.selected {
  background: #036;
  color: #FFF;
}
.subtitle {
  font-size: 13.33px;
  margin-bottom: 0.5rem;
}
</style>
