<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Move information</h1>
        <p><b>If you are moving within Canada,</b> coverage is provided for the remainder of the month in which you leave the province plus the next two months. If required, your coverage may be extended for up to three extra months to cover you while in transit. Upon arrival, you should immediately apply to the health plan of the new province or territory.</p>
        <p><b>If you are moving outside Canada,</b> coverage is provided for the remainder of the month in which you leave the province.</p>
        <hr/>

        <h2 class='mt-4 mb-0'>Move dates</h2>
        <hr/>
        <div class="row">
          <div class="col-md-6">
            <DateInput label="Permanent move from B.C."
                      className='mt-3'
                      cypressId="moveFromBCDate"
                      name="moveFromBCDate"
                      v-model="moveFromBCDate"/>
            <div class="text-danger" v-if="v$.moveFromBCDate.$dirty && v$.moveFromBCDate.required.$invalid" aria-live="assertive">A valid date of departure is required.</div>
            <div class="text-danger" v-if="v$.moveFromBCDate.$dirty && !v$.moveFromBCDate.required.$invalid && v$.moveFromBCDate.distantFutureValidator.$invalid" aria-live="assertive">Date is too far in the future.</div>
            <div class="text-danger" v-if="v$.moveFromBCDate.$dirty && !v$.moveFromBCDate.required.$invalid && v$.moveFromBCDate.distantPastValidator.$invalid" aria-live="assertive">Date is too far in the past.</div>
            <div class="text-danger" v-if="v$.moveFromBCDate.$dirty && !v$.moveFromBCDate.required.$invalid && v$.moveFromBCDate.beforeDateValidator.$invalid" aria-live="assertive">Date of departure must be before the date of arrival.</div>
            <DateInput label="Arrival in new destination"
                      className='mt-3'
                      cypressId="arriveDestinationDate"
                      name="arriveDestinationDate"
                      v-model="arriveDestinationDate"/>
            <div class="text-danger" v-if="v$.arriveDestinationDate.$dirty && v$.arriveDestinationDate.required.$invalid" aria-live="assertive">A valid date of arrival is required.</div>
            <div class="text-danger" v-if="v$.arriveDestinationDate.$dirty && !v$.arriveDestinationDate.required.$invalid && v$.arriveDestinationDate.distantFutureValidator.$invalid" aria-live="assertive">Date is too far in the future.</div>
            <div class="text-danger" v-if="v$.arriveDestinationDate.$dirty && !v$.arriveDestinationDate.required.$invalid && v$.arriveDestinationDate.distantPastValidator.$invalid" aria-live="assertive">Date is too far in the past.</div>
            <div class="text-danger" v-if="v$.arriveDestinationDate.$dirty && !v$.arriveDestinationDate.required.$invalid && v$.arriveDestinationDate.afterDateValidator.$invalid" aria-live="assertive">Date of arrival must be after the date of departure.</div>
          </div>
        </div>
        
        <h2 class='mt-5 mb-3'>New address</h2>
        <p>If you know your new address please enter it below. A confirmation letter will be sent to your new address following cancellation of coverage.</p>
        <hr/>
        <p>Do you know your new address?</p>
        <Radio v-model="isNewAddressKnown"
              :items="isNewAddressKnownRadioItems"
              cypressId="isNewAddressKnown"
              name='isNewAddressKnown' />
        <div class="text-danger"
              v-if="v$.isNewAddressKnown.$dirty && !v$.isNewAddressKnown.required"
              aria-live="assertive">Please select one of the options above.</div>

        <div class="row">
          <div class="col-sm-7">
            <div v-if='isNewAddressKnown === "Y"' class="is-new-address-known-y">
              <CountrySelect label='Jurisdiction'
                            ref="country"
                            className='mt-3'
                            class="country"
                            v-model="country" />
              <div class="text-danger" v-if="v$.country.$dirty && !v$.country.required" aria-live="assertive">Jurisdiction is required.</div>
              <!-- If country is CANADA, display these fields -->
              <div v-if="country === 'Canada'">
                <div class="row col-md-7 mt-3">  
                  <div v-for="(addressLine, index) in addressLines"
                              :key='index'
                              class=''>
                    <AddressDoctorInput v-if="isAddressValidatorEnabled &&
                                            index === 0"
                                      label="Address line 1"
                                      v-model="addressLines[index].value"
                                      id="address-line-1"
                                      class="address-line"
                                      serviceUrl="/oop/api/address"
                                      @addressSelected="addressSelectedHandler($event)" />
                    <AddressInput v-else
                                  :label='"Address line " + (index + 1)'
                                  v-model="addressLines[index].value"
                                  class="address-line"
                                  maxlength='25'/>
                    <div class="text-danger"
                        v-if="index === 0 && v$.addressLines.$dirty && !v$.addressLines.addressLineOneValidator"
                        aria-live="assertive">Address line 1 is required.</div>             
                    <div class="text-danger"
                        v-if="v$.addressLines.$dirty && !v$.addressLines.specialCharacterValidator"
                        aria-live="assertive">Address cannot include special characters except hyphen, period, apostrophe, number sign and blank space.</div>             
                  </div>
                  <div v-if="addressLines.length < getMaxAddressLines()" class="col-md-1 address-row-margin d-flex align-items-end">
                    <Button label='+'
                            @click='addAddressField()'
                            class='add-remove-button mt-2 mt-sm-5 form-control'/>
                  </div>
                  <div v-if="addressLines.length > getMinAddressLines()" class="col-md-1 address-row-margin d-flex align-items-end">
                    <Button label='-'
                            @click='removeAddressField()'
                            class='add-remove-button mt-2 mt-sm-5 form-control'/>
                  </div>
                </div>
                <Input label='City'
                      className='mt-3'
                      class="city"
                      v-model="city"
                      maxlength='22' />
                <div class="text-danger" v-if="v$.city.$dirty && v$.city.required.$invalid" aria-live="assertive">City is required.</div>
                <div class="text-danger"
                      v-if="v$.city.$dirty && !v$.city.required.$invalid && v$.city.specialCharacterValidator.$invalid"
                      aria-live="assertive">City cannot include special characters except hyphen, period, apostrophe, number sign and blank space.</div>             
                <div class="text-danger"
                      v-if="v$.city.$dirty && !v$.city.required.$invalid && v$.city.maxLength.$invalid"
                      aria-live="assertive">City exceeds the maximum number of allowable characters.</div>  
                <RegionSelect label='Province'
                                ref="province"
                                className='mt-3'
                                class="province"
                                v-model="province" />
                <div class="text-danger" v-if="v$.province.$dirty && v$.province.required.$invalid" aria-live="assertive">Province is required.</div>
                <div class="text-danger" v-if="v$.province.$dirty && !v$.province.required.$invalid && v$.province.nonBCValidator.$invalid" aria-live="assertive">Address entered must be outside of BC.</div>      
                <PostalCodeInput id="postalCode"
                      label="Postal code"
                      className='mt-3'
                      class="postal-code"
                      v-model="postalCode"/>
                <div class="text-danger" v-if="v$.postalCode.$dirty && v$.postalCode.required.$invalid" aria-live="assertive">Postal code is required.</div>
                <div class="text-danger" v-if="v$.postalCode.$dirty && !v$.postalCode.required.$invalid && v$.postalCode.canadaPostalCodeLengthValidator.$invalid" aria-live="assertive">The postal code you entered is not valid.</div>
                <div class="text-danger" v-if="v$.postalCode.$dirty && !v$.postalCode.required.$invalid && v$.postalCode.nonBCPostalCodeValidator.$invalid" aria-live="assertive">Postal code entered must be outside of BC.</div>
              </div>
              <!-- If country is UNITED STATES, display these fields -->
              <div v-else-if="country === 'United States'">
                <div class='row col-md-7 mt-3'>  
                      <AddressInput label="Street address" 
                                  v-model="usStreetAddress"
                                  class="address-line"
                                  id="address-line-1"
                                  maxlength='25'/>
                        <div class="text-danger"
                              v-if="v$.usStreetAddress.$dirty && v$.usStreetAddress.required.$invalid"
                              aria-live="assertive">Street address is required.</div>
                        <div class="text-danger"
                            v-if="v$.usStreetAddress.$dirty && v$.usStreetAddress.specialCharacterValidator.$invalid"
                            aria-live="assertive">Street address cannot include special characters except hyphen, period, apostrophe, number sign and blank space.</div>

                      <AddressInput label="City" 
                                  v-model="usCity"
                                  class="address-line"
                                  id="address-line-2"
                                  maxlength='18'/>
                        <div class="text-danger"
                               v-if="v$.usCity.$dirty && v$.usCity.required.$invalid"
                              aria-live="assertive">City is required.</div>           
                        <div class="text-danger"
                            v-if="v$.usCity.$dirty && v$.usCity.specialCharacterValidator.$invalid"
                            aria-live="assertive">City cannot include special characters except hyphen, period, apostrophe, number sign and blank space.</div>
                      
                      <StateInput label='State'
                                ref="province"
                                className='mt-3'
                                class="province"
                                v-model="state" />
                      <div class="text-danger" v-if="v$.state.$dirty && v$.state.required.$invalid" aria-live="assertive">State is required.</div>
                    
                      <AddressInput label="Zip code (optional)" 
                                  v-model="zipCode"
                                  class="address-line"
                                  id="address-line-3"
                                  maxlength='6'/>
                        <div class="text-danger"
                              v-if="v$.zipCode.$dirty && v$.zipCode.required.$invalid"
                              aria-live="assertive">Zip code is required.</div>
                        <div class="text-danger"
                            v-if="v$.zipCode.$dirty && v$.zipCode.specialCharacterValidator.$invalid"
                            aria-live="assertive">Zip code cannot include special characters except hyphen, period, apostrophe, number sign and blank space.</div>
                    
                  
                </div>
              </div>
              <div v-else>
                <!-- If country is other than CANADA or UNITED STATES, display these fields -->
                <div class="row col-md-7 mt-3">  
                    
                      <AddressInput label="Street address" 
                                  v-model="otherStreetAddress"
                                  class="address-line"
                                  id="address-line-1"
                                  maxlength='25'/>
                        <div class="text-danger"
                              v-if="v$.otherStreetAddress.$dirty && v$.otherStreetAddress.required.$invalid"
                              aria-live="assertive">Street address is required.</div>             
                        <div class="text-danger"
                            v-if="v$.otherStreetAddress.$dirty && v$.otherStreetAddress.specialCharacterValidator.$invalid"
                            aria-live="assertive">Street address cannot include special characters except hyphen, period, apostrophe, number sign and blank space.</div>
                    
                    
                      <AddressInput label="City, Province" 
                                  v-model="otherCity"
                                  class="address-line"
                                  id="address-line-2"
                                  maxlength='25'/>
                        <div class="text-danger"
                               v-if="v$.otherCity.$dirty && v$.otherCity.required.$invalid"
                              aria-live="assertive">City and province are required.</div>             
                        <div class="text-danger"
                            v-if="v$.otherCity.$dirty && v$.otherCity.specialCharacterValidator.$invalid"
                            aria-live="assertive">City and province cannot include special characters except comma, hyphen, period, apostrophe, number sign and blank space.</div>
                  
                </div>
                <Input label='Zip/postal code (optional)'
                      className='mt-3'
                      class="city"
                      v-model="otherZipCode"
                      maxlength='22' />
                <div class="text-danger"
                    v-if="v$.otherZipCode.$dirty && v$.otherZipCode.specialCharacterValidator.$invalid"
                    aria-live="assertive">Zip/postal code cannot include special characters except hyphen, period, apostrophe, number sign and blank space.</div>
              </div>
            </div>
            <div v-else-if="isNewAddressKnown === 'N'" class="is-new-address-known-n">
              <br/><p>Please verify which jurisdiction you’re moving to. If you’re moving within Canada, please also verify which province you’re moving to.</p>
              <CountrySelect label='Jurisdiction'
                            ref="country"
                            className='mt-3'
                            class="country"
                            v-model="country" />
              <div class="text-danger" v-if="v$.country.$dirty && !v$.country.required" aria-live="assertive">Jurisdiction is required.</div>
              <div v-if="country === 'Canada'">
                <RegionSelect label='Province'
                                ref="province"
                                className='mt-3'
                                class="province"
                                v-model="otherProvince" />
                <div class="text-danger" v-if="v$.otherProvince.$dirty && !v$.otherProvince.required" aria-live="assertive">Province is required. If you don't know which province you're moving to, please contact HIBC for more information about your MSP cancellation process.</div>
                <div class="text-danger" v-if="v$.otherProvince.$dirty && v$.otherProvince.required && !v$.otherProvince.nonBCValidator" aria-live="assertive">Address entered must be outside of BC.</div>
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
import { replaceSpecialCharacters } from '../helpers/string';
import { truncateAddressLines } from '../helpers/address';
import { nonBCPostalCodeValidator, nonBCValidator, canadaPostalCodeLengthValidator } from '../helpers/validators';
import ContinueBar from '../components/ContinueBar.vue';
import StateInput from '../components/StateInput.vue';
import AddressInput from '../components/AddressInput.vue';
import {
  AddressDoctorInput,
  PostalCodeInput,
  DateInput,
  Button,
  Radio,
  Input,
  distantFutureValidator,
  distantPastValidator,
  beforeDateValidator,
  afterDateValidator,
  CountrySelect,
  RegionSelect,
} from 'common-lib-vue';
import useVuelidate from "@vuelidate/core";
import PageContent from '../components/PageContent.vue';
import TipBox from '../components/TipBox.vue';
import {
  required,
  maxLength,
} from '@vuelidate/validators';
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
import logService from '../services/log-service';
import spaEnvService from '@/services/spa-env-service';

const CAN_MIN_ADDRESS_LINES = 1;
const CAN_MAX_ADDRESS_LINES = 3;
const US_ADDRESS_LINES = 3;
const INTERNATIONAL_ADDRESS_LINES = 2;

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

export const addressLineWithCommaValidator = (addressLines) => {
  return (value, addressLine) => {
    // Add a special case on "City, Province" field (address line 2) for international countries
    const index = addressLines.findIndex(() => addressLine.id === 'address-line-2');
    if (index === 0){
      if (!value) {
        return true;
      }
      const criteria = /^[0-9a-zA-Z,-.'# ]*$/;
      return criteria.test(value);
    }
    else {
      return specialCharacterValidator(value);
    }
  }
};

export const usAddressLineValidator = (addressLines) => {
  for (const line of addressLines) {
    if (!specialCharacterValidator(line.value)) {
      return true;
    }
    // Validates required address line fields
    // return (value !== '' && value !== null);
  }
  return false
}

export default {
  name: 'MoveInfoPage',
  components: {
    AddressDoctorInput,
    ContinueBar,
    DateInput,
    Input,
    PageContent,
    PostalCodeInput,
    CountrySelect,
    RegionSelect,
    StateInput,
    TipBox,
    AddressInput,
    Button,
    Radio,
  },
  setup () { return { v$: useVuelidate() } },
  data: () => {
    return {
      moveFromBCDate: null,
      arriveDestinationDate: null,
      isNewAddressKnown: null,
      addressLines: [],
      usStreetAddress: null,
      otherStreetAddress: null,
      zipCode: null,
      otherZipCode: null,
      vuelidateExternalResults: {},
      country: null,
      province: null,
      state: null,
      otherProvince: null,
      city: null,
      usCity: null,
      otherCity: null,
      postalCode: null,
      showServerValidationError: false,
      isPageLoaded: false,
      isLoading: false,
      currNumOfAddressLines: null,
      isNewAddressKnownRadioItems: [
        {
          id: 'is-new-address-known-y',
          label: 'Yes',
          value: 'Y'
        },
        {
          id: 'is-new-address-known-n',
          label: 'No',
          value: 'N'
        }
      ]
    }
  },
  created() {
    this.moveFromBCDate = this.$store.state.form.moveFromBCDate;
    this.arriveDestinationDate = this.$store.state.form.arriveDestinationDate;
    this.isNewAddressKnown = this.$store.state.form.isNewAddressKnown;
    this.addressLines = this.$store.state.form.addressLines ? [...this.$store.state.form.addressLines] : [];
    this.country = this.$store.state.form.country;
    this.province = this.$store.state.form.province;
    this.city = this.$store.state.form.city;
    this.postalCode = this.$store.state.form.postalCode;

    setTimeout(() => {
      this.isPageLoaded = true;
    }, 0);

    if (this.country === "Canada"){
      this.currNumOfAddressLines = Math.max(CAN_MIN_ADDRESS_LINES, this.addressLines.length);
    }

    else if (this.country === "United States"){
      this.currNumOfAddressLines = US_ADDRESS_LINES;
    }

    else {
      this.currNumOfAddressLines = INTERNATIONAL_ADDRESS_LINES;
    }

    for (let i=0; i<this.currNumOfAddressLines; i++) {
      this.addressLines[i] = {
          id: 'address-line-' + (i + 1),
          value: this.addressLines[i] && this.addressLines[i].value ? this.addressLines[i].value : null,
          isValid: true,
      }
    }
    
    logService.logNavigation(
      this.$store.state.form.applicationUuid,
      routes.MOVE_INFO_PAGE.path,
      routes.MOVE_INFO_PAGE.title
    );
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
      state: {},
      otherProvince: {},
      usCity: {
        required,
        specialCharacterValidator,
      },
      otherCity: {
        required,
        specialCharacterValidator,
      },
      usStreetAddress: { 
        required, 
        specialCharacterValidator,
      },
      otherStreetAddress: {
        required, 
        specialCharacterValidator,
      },
      zipCode: {
        required, 
        specialCharacterValidator,
      },
      otherZipCode: {
        specialCharacterValidator,
      },
    }
    if (this.isNewAddressKnown === 'Y'){
      if (this.country === 'Canada'){
        validations.addressLines = {
          specialCharacterValidator,
          addressLineOneValidator,
        },
        validations.city = {
          required,
          specialCharacterValidator,
          maxLength: maxLength(22),
        };
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
      else if (this.country === 'United States'){
        validations.addressLines = {},
        validations.province = {
          required
        };
      }
      else {
        validations.addressLines = {
          required,
          addressLineWithCommaValidator: addressLineWithCommaValidator(this.addressLines),
        },
        validations.city = {
          specialCharacterValidator,
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
      this.v$.$touch()
      if (this.v$.$invalid) {
        scrollToError();
        return;
      }
      this.isLoading = true;
      
      setTimeout(() => {
        this.isLoading = false;

        // Set address fields to null if the new address is not known
        if (this.isNewAddressKnown === 'N'){
          this.setFieldsToNull();
          if (this.country !== 'Canada'){
            this.province = null;
          }
        }
        
        // Only eliminate empty address lines if country is Canada
        if (this.country === 'Canada'){
          const currNumOfAddressLines = Math.max(CAN_MIN_ADDRESS_LINES, this.addressLines.length);
          for (let i=currNumOfAddressLines-1; i>=0; i--){
            if ((this.addressLines[i].value === null || this.addressLines[i].value === '') && currNumOfAddressLines > 1){
              this.addressLines.splice(i,1);
            }
          }
          
          //If no address lines provided, create an empty address line 1 for Review Page
          if (this.addressLines.length == 0){
            this.addressLines[0] = {
                idVal: 'address-line-1',
                value: null,
                isValid: true,
            }
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
        id: 'address-line-' + (this.addressLines.length + 1),
        value: null,
        isValid: true,
      });
    },
    removeAddressField() {
      this.addressLines.pop();
    },
    getAddressLinesLength() {
      return this.addressLines.length;
    },
    getMaxAddressLines() {
      return CAN_MAX_ADDRESS_LINES;
    },
    getMinAddressLines() {
      return CAN_MIN_ADDRESS_LINES;
    },
    addressSelectedHandler(address) {
      const addressLines = truncateAddressLines(address.addressLines, 25);

      // Remove all but first address line.
      for (let i=this.addressLines.length-1; i>0; i--) {
        this.addressLines.pop();
      }
      // Add address lines and set value to the model.
      for (let i=0; i<addressLines.length; i++) {
        if (i !== 0) {
          this.addAddressField();
        }
        this.addressLines[i].value = replaceSpecialCharacters(addressLines[i]);
      }
      this.city = replaceSpecialCharacters(address.city);
      this.province = replaceSpecialCharacters(address.province);
      this.postalCode = replaceSpecialCharacters(address.postalCode);
    },
    setFieldsToNull() {
      for (let i=0; i<this.addressLines.length; i++) {
        setTimeout(() => {
          this.removeAddressField();
        }, 0);
      }
      // Set first address line to null
      this.addressLines[0] = {
        idVal: 'address-line-1',
        value: null,
        isValid: true,
      }
      // Remove all current address lines if country is Canada
      if (this.country === 'Canada'){
        setTimeout(() => {
          // Add one address field
          this.addAddressField();
          // Set postal code to null
          this.postalCode = null
        }, 0);
      }
      // Otherwise (other countries than Canada is selected), set all the address lines and city to null
      else {
        for (let i=0; i<INTERNATIONAL_ADDRESS_LINES; i++) {
          setTimeout(() => {
            this.addAddressField();
          }, 0);
        }
      }
      // Set city to null
      this.city = null;
    },
  },
  computed: {
    isAddressValidatorEnabled() {
      return spaEnvService.values.SPA_ENV_OOP_ENABLE_ADDRESS_VALIDATOR === 'true';
    }
  },
  watch: {
    country(newValue) {
      if (this.isPageLoaded){
        this.setFieldsToNull();
        this.province = null;
        // Add address line 3 field if the country is United States
        if (newValue === 'United States'){
          this.addAddressField();
        }
      }
    },
    isNewAddressKnown(newValue) {
      if (this.isPageLoaded) {
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
        this.province = null;
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
@media (max-width: 575.98px) {
  .address-line, .city, .province {
    width: 100%;
  }
  .address-row-margin { 
    margin-right: 0;
  }
}
</style>
