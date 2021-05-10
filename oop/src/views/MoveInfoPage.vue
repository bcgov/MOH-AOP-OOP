<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Move information</h1>
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
        
        <h2 class='mt-5 mb-3'>New address</h2>
        <p>A confirmation letter will be sent to your new address following cancellation of coverage.</p>
        <hr/>
        <p>Do you know your new address?</p>
        <input type='radio'
                id='is-new-address-known-y'
                value='Y'
                v-model='isNewAddressKnown' />
        <label for='is-new-address-known-y'
                class='ml-3'>Yes</label>
        <br/>
        <input type='radio'
                id='is-new-address-known-n'
                value='N'
                v-model='isNewAddressKnown' />
        <label for='is-new-address-known-n'
                class='ml-3'>No</label>
        <div class="text-danger"
              v-if="$v.isNewAddressKnown.$dirty && !$v.isNewAddressKnown.required"
              aria-live="assertive">Please select one of the options above.</div>
        <br/>
        <div class="row">
          <div class="col-sm-7">
            <div v-if='isNewAddressKnown === "Y"' class="is-new-address-known-y">
              <CountryInput label='Country'
                            ref="country"
                            className='mt-3'
                            class="country"
                            v-model="country" />
              <div class="text-danger" v-if="$v.country.$dirty && !$v.country.required" aria-live="assertive">Country is required.</div>
              <div class="row">  
                <div v-for="(addressLine, index) in addressLines"
                            :key='index'
                            :set="v = $v.addressLines.$each[index]"
                            class='col-md-7 mt-3'>
                  <AddressInput :label='"Address line " + (index + 1)'
                                v-model="addressLine.value"
                                class="address-line"
                                maxlength='25'/>
                  <div class="text-danger"
                      v-if="index === 0 && v.value.$dirty && !$v.addressLines.addressLineOneValidator"
                      aria-live="assertive">Address line 1 is required.</div>             
                  <div class="text-danger"
                      v-if="v.value.$dirty && !v.value.specialCharacterValidator"
                      aria-live="assertive">Address cannot include special characters except hyphen, period, apostrophe, number sign and blank space.</div>             
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
                                ref="province"
                                className='mt-3'
                                class="province"
                                v-model="province" />
                <div class="text-danger" v-if="$v.province.$dirty && !$v.province.required" aria-live="assertive">Province is required.</div>
                <div class="text-danger" v-if="$v.province.$dirty && $v.province.required && !$v.province.nonBCValidator" aria-live="assertive">Address entered must be outside of BC.</div>
                <Input label='City'
                      className='mt-3'
                      class="city"
                      v-model="city"
                      maxlength='25' />
                <div class="text-danger" v-if="$v.city.$dirty && !$v.city.required" aria-live="assertive">City is required.</div>
                <div class="text-danger"
                      v-if="$v.city.$dirty && $v.city.required && !$v.city.specialCharacterValidator"
                      aria-live="assertive">City cannot include special characters except hyphen, period, apostrophe, number sign and blank space.</div>             
                <PostalCodeInput id="postalCode"
                      label="Postal code"
                      className='mt-3'
                      class="postal-code"
                      v-model="postalCode"/>
                <div class="text-danger" v-if="$v.postalCode.$dirty && !$v.postalCode.required" aria-live="assertive">Postal code is required.</div>
                <div class="text-danger" v-if="$v.postalCode.$dirty && $v.postalCode.required && !$v.postalCode.canadaPostalCodeLengthValidator" aria-live="assertive">The postal code you entered is not valid.</div>
                <div class="text-danger" v-if="$v.postalCode.$dirty && $v.postalCode.required && !$v.postalCode.nonBCPostalCodeValidator" aria-live="assertive">Postal code entered must be outside of BC.</div>
              </div>
              <div v-else>
                <Input label='Province/state/region'
                      className='mt-3'
                      class="province"
                      v-model="province"
                      maxlength='30' />
                <div class="text-danger"
                      v-if="$v.province.$dirty && !$v.province.specialCharacterValidator"
                      aria-live="assertive">Province/state/region cannot include special characters except hyphen, period, apostrophe, number sign and blank space.</div>             
                <Input label='City/town'
                      className='mt-3'
                      class="city"
                      v-model="city"
                      maxlength='25' />
                <div class="text-danger" v-if="$v.city.$dirty && !$v.city.required" aria-live="assertive">City is required.</div>
                <div class="text-danger"
                      v-if="$v.city.$dirty && $v.city.required && !$v.city.specialCharacterValidator"
                      aria-live="assertive">City/town cannot include special characters except hyphen, period, apostrophe, number sign and blank space.</div>             
                <Input label='Postal code/zip code'
                      className='mt-3'
                      class="postal-code"
                      v-model="postalCode"
                      maxlength='7' />
                <div class="text-danger" v-if="$v.postalCode.$dirty && !$v.postalCode.required" aria-live="assertive">Postal code is required.</div>
                <div class="text-danger" v-if="$v.postalCode.$dirty && $v.postalCode.required && !$v.postalCode.invalidCharValidator" aria-live="assertive">Postal code/zip code must contain letters and/or numbers and may include blank characters.</div>
              </div>
            </div>
            <div v-else-if="isNewAddressKnown === 'N'" class="is-new-address-known-n">
              <br/><p>Please verify which country you’re moving to. If you’re moving within Canada, please also verify which province you’re moving to.</p>
              <CountryInput label='Country'
                            ref="country"
                            className='mt-3'
                            class="country"
                            v-model="country" />
              <div class="text-danger" v-if="$v.country.$dirty && !$v.country.required" aria-live="assertive">Country is required.</div>
              <div v-if="country === 'Canada'">
                <ProvinceInput label='Province'
                                ref="province"
                                className='mt-3'
                                class="province"
                                v-model="province" />
                <div class="text-danger" v-if="$v.province.$dirty && !$v.province.required" aria-live="assertive">Province is required. If you don't know which province you're moving to, please contact HIBC for more information about your MSP cancellation process.</div>
                <div class="text-danger" v-if="$v.province.$dirty && $v.province.required && !$v.province.nonBCValidator" aria-live="assertive">Address entered must be outside of BC.</div>
              </div>
            </div>
          </div>
          <div v-if="isNewAddressKnown === 'Y' && country === 'Canada'" class="col-sm-5 mt-3">
            <TipBox title="Tip: find your address">
              <p>As you type the street address, this form will suggest valid postal addresses. Click an address to automatically enter it.</p>
              <p>Type apartment number or suite  using digits, no spaces, and a dash (-) before the street address (111-215 Sample Road). If the address does not appear in the list of suggestions, type it manually.</p>
            </TipBox>
          </div>
        </div>
      </div>
    </PageContent>
    <ContinueBar @continue="validateFields()" :hasLoader="isLoading" buttonLabel='Review'/>
  </div>
</template>
<script>
import pageStateService from '../services/page-state-service';
import {
  routes,
  isPastPath
} from '../router/routes';
import {
  scrollTo,
  scrollToError,
  getTopScrollPosition,
  scrollToElement
} from '../helpers/scroll';
import { nonBCPostalCodeValidator, nonBCValidator, invalidCharValidator, canadaPostalCodeLengthValidator } from '../helpers/validators';
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
  RESET_FORM,
  SET_ADDRESS_LINES,
  SET_ARRIVE_DESTINATION_DATE,
  SET_IS_NEW_ADDRESS_KNOWN,
  SET_COUNTRY,
  SET_CITY,
  SET_PROVINCE,
  SET_POSTAL_CODE,
  SET_MOVE_FROM_BC_DATE,
} from '../store/modules/form';

const MIN_ADDRESS_LINES = 1;
const MAX_ADDRESS_LINES = 3;

const addressLineOneValidator = (addressLines) => {
  if (addressLines && addressLines[0]) {
    if (addressLines[0].value && addressLines[0].value !== '') {
      return true;
    }
  }
  return false;
};

const specialCharacterValidator = (value) => {
  if (!value) {
    return true;
  }
  const criteria = /^[0-9a-zA-Z-.'# ]*$/;
  return criteria.test(value);
};

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
      isNewAddressKnown: null,
      addressLines: [],
      country: null,
      province: null,
      city: null,
      postalCode: null,
      showServerValidationError: false,
      isPageLoaded: false,
      isLoading: false,
      currNumOfAddressLines: null
    }
  },
  created() {
    this.moveFromBCDate = this.$store.state.form.moveFromBCDate;
    this.arriveDestinationDate = this.$store.state.form.arriveDestinationDate;
    this.isNewAddressKnown = this.$store.state.form.isNewAddressKnown;
    this.addressLines = this.$store.state.form.addressLines || [];
    this.country = this.$store.state.form.country;
    this.province = this.$store.state.form.province;
    this.city = this.$store.state.form.city;
    this.postalCode = this.$store.state.form.postalCode;

    setTimeout(() => {
      this.isPageLoaded = true;
    }, 0);

    this.currNumOfAddressLines = Math.max(MIN_ADDRESS_LINES, this.addressLines.length);

    for (let i=0; i<this.currNumOfAddressLines; i++) {
      this.addressLines[i] = {
          value: this.addressLines && this.addressLines[i] ? this.addressLines[i].value : null,
          isValid: true,
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
      isNewAddressKnown: {
        required,
      },
      country: {
        required,
      },
      province: {},
    }
    if (this.isNewAddressKnown === 'Y'){
      validations.addressLines = {
        $each: {
          value: {
            specialCharacterValidator
          },
        },
        addressLineOneValidator,
      },
      validations.city = {
        required,
        specialCharacterValidator,
      };
      if (this.country === 'Canada'){
        validations.province = {
          required,
          nonBCValidator,
        },
        validations.postalCode = {
          required,
          canadaPostalCodeLengthValidator,
          nonBCPostalCodeValidator
        };
      }
      else {
        validations.province = {
          specialCharacterValidator,
        },
        validations.postalCode = {
          required,
          invalidCharValidator
        };
      }
    }
    else if (this.isNewAddressKnown === 'N' && this.country === 'Canada'){
      validations.province = {
        required,
        nonBCValidator,
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

        // Eliminate empty address lines.
        const currNumOfAddressLines = Math.max(MIN_ADDRESS_LINES, this.addressLines.length);
        for (let i=currNumOfAddressLines-1; i>=0; i--){
          if ((this.addressLines[i].value == null || this.addressLines[i].value == '') && currNumOfAddressLines > 1){
            this.addressLines.splice(i,1);
          }
        }
        
        //If no address lines provided, create an empty address line 1 for Review Page
        if(this.addressLines.length == 0){
          this.addressLines[0] = {
              value: null,
              isValid: true,
          }
        }
        
        this.$store.dispatch(formModule + '/' + SET_MOVE_FROM_BC_DATE, this.moveFromBCDate);
        this.$store.dispatch(formModule + '/' + SET_ARRIVE_DESTINATION_DATE, this.arriveDestinationDate);
        this.$store.dispatch(formModule + '/' + SET_IS_NEW_ADDRESS_KNOWN, this.isNewAddressKnown);
        this.$store.dispatch(formModule + '/' + SET_COUNTRY, this.country);
        this.$store.dispatch(formModule + '/' + SET_ADDRESS_LINES, this.addressLines);
        this.$store.dispatch(formModule + '/' + SET_PROVINCE, this.province);
        this.$store.dispatch(formModule + '/' + SET_CITY, this.city);
        this.$store.dispatch(formModule + '/' + SET_POSTAL_CODE, this.postalCode);

        const toPath = routes.REVIEW_PAGE.path;
        pageStateService.setPageComplete(toPath);
        pageStateService.visitPage(toPath);
        this.$router.push(toPath);
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
    },
    setFieldsToNull() {
      // Remove all current address lines
      for (let i=0; i<this.addressLines.length; i++) {
        setTimeout(() => {
          this.removeAddressField();
        }, 0);
      }
      setTimeout(() => {
        // Set first address line to null
        this.addAddressField();
        // If country is Canada, set province dropdown list to null
        if (this.country === 'Canada' && this.$refs.province){
          this.$refs.province.region = null;
        }
        else {
          this.province = null;
        }
        // Set city to null
        this.city = null;
        // Set postal code to null
        this.postalCode = null;
      }, 0);
    },
  },
  watch: {
    country(newValue) {
      if (this.isPageLoaded && newValue){
        this.setFieldsToNull();
      }
    },
    isNewAddressKnown(newValue) {
      if (this.isPageLoaded && newValue) {
        if (newValue === 'Y') {
          setTimeout(() => {
            const el = document.querySelector('.is-new-address-known-y');
            scrollToElement(el, true);
          }, 0);
        }
        else if (newValue === 'N') {
          setTimeout(() => {
            const el = document.querySelector('.is-new-address-known-n');
            scrollToElement(el, true);
          }, 0);
        }
        this.setFieldsToNull();
        if (this.$refs.country){
          this.$refs.country.country = 'Canada';
        }
      }
    },
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    if (to.path === routes.HOME_PAGE.path) {
      this.$store.dispatch(formModule + '/' + RESET_FORM);
      next();
    } else if ((pageStateService.isPageComplete(to.path)) || isPastPath(to.path, from.path)) {
      next();
    } else {
      // Navigate to self.
      const topScrollPosition = getTopScrollPosition();
      next({
        path: routes.MOVE_INFO_PAGE.path,
        replace: true
      });
      setTimeout(() => {
        scrollTo(topScrollPosition);
      }, 0);
    }
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
