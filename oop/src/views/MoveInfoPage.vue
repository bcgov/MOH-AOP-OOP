<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Move Information</h1>
        <p><b>If you are moving within Canada,</b> coverage is provided for the remainder of the month in which you leave the province plus the next two months. If required, your coverage may be extended for up to three extra months to cover you while in transit. Upon arrival, you should immediately apply to the health plan of the new province or territory.
        <p><b>If you are moving outside Canada,</b> coverage is provided for the remainder of the month in which you leave the province.</p>
        <hr/>

        <h2 class='mt-4 mb-0'>Move dates</h2>
        <hr/>
        <div class="row">
          <div class="col-md-6">
            <DateInput label="Permanent move from B.C."
                      className='mt-3'
                      v-model="moveFromBCDate"/>
            <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && !$v.moveFromBCDate.required" aria-live="assertive">A valid date of departure is required.</div>
            <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && $v.moveFromBCDate.required && !$v.moveFromBCDate.distantFutureValidator" aria-live="assertive">Date is too far in the future.</div>
            <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && $v.moveFromBCDate.required && !$v.moveFromBCDate.distantPastValidator" aria-live="assertive">Date is too far in the past.</div>
            <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && $v.moveFromBCDate.required && !$v.moveFromBCDate.beforeDateValidator" aria-live="assertive">Date of departure must be before the date of arrival.</div>
            <DateInput label="Arrival in new destination"
                      className='mt-3'
                      v-model="arriveDestinationDate"/>
            <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && !$v.arriveDestinationDate.required" aria-live="assertive">A valid date of arrival is required.</div>
            <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && $v.arriveDestinationDate.required && !$v.arriveDestinationDate.distantFutureValidator" aria-live="assertive">Date is too far in the future.</div>
            <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && $v.arriveDestinationDate.required && !$v.arriveDestinationDate.distantPastValidator" aria-live="assertive">Date is too far in the past.</div>
            <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && $v.arriveDestinationDate.required && !$v.arriveDestinationDate.afterDateValidator" aria-live="assertive">Date of arrival must be after the date of departure.</div>
          </div>
        </div>
        
        <h2 class='mt-5 mb-0'>New address</h2>
        <hr/>
        <div class="row">
          <div class="col-sm-7">
            <CountryInput label='Country'
                  className='mt-3'
                  class="country"
                  v-model="country" />
            <div class="text-danger" v-if="$v.country.$dirty && !$v.country.required" aria-live="assertive">Country is required.</div>
            <div class="row">
              <div v-for="(addressLine, index) in addressLines"
                        :key='index'
                        :set="v = $v.addressLines.$each[index]"
                        class='col-md-7 mt-3'>
                <AddressInput :label='"Address Line " + (index + 1) + " (optional)"'
                                v-model="addressLine.value" class="address-line" maxlength='25'/>
              </div>
              <div v-if="addressLines.length < getMaxAddressLines()" class="col-md-1 address-row-margin">
                <Button label='+'
                        @click='addAddressField()'
                        class='add-remove-button mt-5 form-control'/>
              </div>
              <div v-if="addressLines.length > getMinAddressLines()" class="col-md-1 address-row-margin">
                <Button label='-'
                        @click='removeAddressField()'
                        class='add-remove-button mt-5 form-control'/>
              </div>
            </div>
            <div v-if="country === 'Canada'">
              <ProvinceInput label='Province'
                    className='mt-3'
                    class="province"
                    v-model="province" />
              <div class="text-danger" v-if="$v.province.$dirty && !$v.province.required" aria-live="assertive">Province is required.</div>
              <div class="text-danger" v-if="$v.province.$dirty && !$v.province.nonBCValidator" aria-live="assertive">Address entered must be outside of BC.</div>
              <Input label='City (optional)'
                    className='mt-3'
                    class="city"
                    v-model="city"
                    maxlength='25' />
              <PostalCodeInput id="postalCode"
                    label="Postal code (optional)"
                    className='mt-3'
                    class="postal-code"
                    v-model="postalCode"/>
              <div class="text-danger" v-if="$v.postalCode.$dirty && !$v.postalCode.postalCodeValidator" aria-live="assertive">Postal code entered must be outside of BC.</div>
            </div>
            <div v-else>
              <Input label='Province/state/region (optional)'
                    className='mt-3'
                    class="province"
                    v-model="province"
                    maxlength='30' />
              <Input label='City/town (optional)'
                    className='mt-3'
                    class="city"
                    v-model="city"
                    maxlength='25' />
              <Input label='Postal code/zip code (optional)'
                    className='mt-3'
                    class="postal-code"
                    v-model="postalCode"
                    maxlength='7' />
            </div>
          </div>
          <div class="col-sm-5">
            <TipBox title="Tip: find your address">
              <p>As you type the street address, this form will suggest valid postal addresses. Click an address to automatically enter it.</p>
              <p>Type apartment number or suite  using digits, no spaces, and a dash (-) before the street address (111-215 Sample Road). If the address does not appear in the list of suggestions, type it manually.</p>
            </TipBox>
          </div>
        </div>
      </div>
    </PageContent>
    <ContinueBar @continue="validateFields()" :hasLoader="isLoading"/>
  </div>
</template>
<script>
import pageStateService from '../services/page-state-service';
import routes from '../router/routes';
import { scrollTo, scrollToError } from '../helpers/scroll';
import { bcPostalCodeValidator, postalCodeValidator, nonBCValidator } from '../helpers/validators';
import ContinueBar from '../components/ContinueBar.vue';
import DateInput, {
  distantFutureValidator,
  distantPastValidator,
  beforeDateValidator,
  afterDateValidator,
} from '../components/DateInput.vue';
import CountryInput from '../components/CountryInput.vue';
import ProvinceInput from '../components/ProvinceInput.vue';
import AddressInput from '../components/AddressInput.vue';
import { PostalCodeInput, Button } from 'common-lib-vue';
import Input from '../components/Input.vue';
import PageContent from '../components/PageContent.vue';
import TipBox from '../components/TipBox.vue';
import { required } from 'vuelidate/lib/validators';
import {
  MODULE_NAME as formModule,
  SET_ADDRESS_LINES,
  SET_ARRIVE_DESTINATION_DATE,
  SET_COUNTRY,
  SET_CITY,
  SET_PROVINCE,
  SET_POSTAL_CODE,
  SET_MOVE_FROM_BC_DATE,
} from '../store/modules/form';

const emptyPostalCodeValidator = (value) => {
  if (value === null || value === '') {
    return true;
  }
  return postalCodeValidator(value) && !bcPostalCodeValidator(value);
};

const MIN_ADDRESS_LINES = 1;
const MAX_ADDRESS_LINES = 3;

export default {
  name: 'MoveInfoPage',
  components: {
    ContinueBar,
    DateInput,
    Input,
    PageContent,
    PostalCodeInput,
    CountryInput,
    ProvinceInput,
    TipBox,
    AddressInput,
    Button,
  },
  data: () => {
    return {
      moveFromBCDate: null,
      arriveDestinationDate: null,
      addressLines: [],
      country: null,
      province: null,
      city: null,
      postalCode: null,
      showServerValidationError: false,
      isPageLoaded: false,
      isLoading: false,
    }
  },
  created() {
    this.moveFromBCDate = this.$store.state.form.moveFromBCDate;
    this.arriveDestinationDate = this.$store.state.form.arriveDestinationDate;
    this.addressLines = this.$store.state.form.addressLines;
    this.country = this.$store.state.form.country;
    this.province = this.$store.state.form.province;
    this.city = this.$store.state.form.city;
    this.postalCode = this.$store.state.form.postalCode;

    setTimeout(() => {
      this.isPageLoaded = true;
    }, 0);

    const currNumOfAddressLines = Math.max(MIN_ADDRESS_LINES, this.addressLines.length);

    for (let i=0; i<currNumOfAddressLines; i++) {
      this.addressLines[i] = {
          value: this.addressLines && this.addressLines[i] ? this.addressLines[i].value : null,
          isValid: true,
      }
    }

    for (let i=currNumOfAddressLines-1; i>=0; i--){
      if ((this.addressLines[i].value == null || this.addressLines[i].value == '') && currNumOfAddressLines > 1){
        this.addressLines.splice(i,1);
      }
    }
  },
  validations() {
    const validations = {
      moveFromBCDate: {
        required,
        distantFutureValidator,
        distantPastValidator,
        beforeDateValidator: beforeDateValidator('arriveDestinationDate'),
      },
      arriveDestinationDate: {
        required,
        distantFutureValidator,
        distantPastValidator,
        afterDateValidator: afterDateValidator('moveFromBCDate'),
      },
      country: {
        required,
      },
      addressLines: {
        $each: {
          value: {},
        },
      },
    }
    if (this.country === 'Canada'){
      validations.province = {
        required,
        nonBCValidator
      },
      validations.postalCode = {
        postalCodeValidator: emptyPostalCodeValidator
      };
    }
    return validations;
  },
  methods: {
    validateFields() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        scrollToError();
        return;
      }
      this.isLoading = true;
      
      setTimeout(() => {
        this.isLoading = false;
        
        this.$store.dispatch(formModule + '/' + SET_MOVE_FROM_BC_DATE, this.moveFromBCDate);
        this.$store.dispatch(formModule + '/' + SET_ARRIVE_DESTINATION_DATE, this.arriveDestinationDate);
        this.$store.dispatch(formModule + '/' + SET_COUNTRY, this.country);
        this.$store.dispatch(formModule + '/' + SET_ADDRESS_LINES, this.addressLines);
        this.$store.dispatch(formModule + '/' + SET_PROVINCE, this.province);
        this.$store.dispatch(formModule + '/' + SET_CITY, this.city);
        this.$store.dispatch(formModule + '/' + SET_POSTAL_CODE, this.postalCode);

        const path = routes.REVIEW_PAGE.path;
        pageStateService.visitPage(path);
        this.$router.push(path);
        scrollTo(0);
      }, 2000);
    },
    addAddressField() {
      this.addressLines.push({
        value: null,
        isValid: true,
      });
    },
    removeAddressField() {
      this.addressLines.pop();
    },
    getMaxAddressLines() {
      return MAX_ADDRESS_LINES;
    },
    getMinAddressLines() {
      return MIN_ADDRESS_LINES;
    }
  },
  watch: {
    country(newValue) {
      if (this.isPageLoaded && newValue){
        this.province = null;
        this.city = null;
        this.postalCode = null;
      }
    },
  }
}
</script>

<style scoped>
.address-row {
  display: flex;
  flex-wrap: nowrap;
}

.country {
  max-width: 100%;
  width: 540px;
}

.address-line, .city, .province {
  max-width: 100%;
  width: 350px;
}

.postal-code {
  max-width: 100%;
  width: 160px;
}

.address-row-margin { 
  margin-right: 1em;
}

.add-remove-button {
  min-width: 50px;
  min-height: 40px;
}
</style>
