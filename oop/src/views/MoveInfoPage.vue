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
            <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && !$v.moveFromBCDate.required" aria-live="assertive">Permanent move from B.C. is required.</div>
            <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && $v.moveFromBCDate.required && !$v.moveFromBCDate.distantFutureValidator" aria-live="assertive">Date is too far in the future.</div>
            <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && $v.moveFromBCDate.required && !$v.moveFromBCDate.distantPastValidator" aria-live="assertive">Date is too far in the past.</div>
            <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && $v.moveFromBCDate.required && !$v.moveFromBCDate.beforeDateValidator" aria-live="assertive">Permanent move from B.C. must be before the arrival in new destination.</div>
            <DateInput label="Arrival in new destination"
                      className='mt-3'
                      v-model="arriveDestinationDate"/>
            <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && !$v.arriveDestinationDate.required" aria-live="assertive">Arrival in new destination is required.</div>
            <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && $v.arriveDestinationDate.required && !$v.arriveDestinationDate.distantFutureValidator" aria-live="assertive">Date is too far in the future.</div>
            <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && $v.arriveDestinationDate.required && !$v.arriveDestinationDate.distantPastValidator" aria-live="assertive">Date is too far in the past.</div>
            <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && $v.arriveDestinationDate.required && !$v.arriveDestinationDate.afterDateValidator" aria-live="assertive">Arrival in new destination must be after the permanent move from B.C.</div>
          </div>
        </div>
        
        <h2 class='mt-5 mb-0'>New address</h2>
        <hr/>
        <div class="row">
          <div class="col-md-6">
            <CountryInput label='Country'
                  className='mt-3'
                  v-model="country" />
            <div class="text-danger" v-if="$v.country.$dirty && !$v.country.required" aria-live="assertive">Country is required.</div>
            <Input label='Address line 1 (optional)'
                    className='mt-3'
                    v-model="addressLine1"
                    maxlength='25' />
            <Input label='Address line 2 (optional)'
                    className='mt-3'
                    v-model="addressLine2"
                    maxlength='25' />
            <div v-if="country === 'CA'">
              <Input label='Province'
                    className='mt-3'
                    v-model="province" />
              <div class="text-danger" v-if="$v.province.$dirty && !$v.province.required" aria-live="assertive">Province is required.</div>
              <Input label='City (optional)'
                    className='mt-3'
                    v-model="city"
                    maxlength='35' />
              <PostalCodeInput id="postalCode"
                    label="Postal code (optional)"
                    className='mt-3'
                    v-model="postalCode"/>
              <div class="text-danger" v-if="$v.postalCode.$dirty && !$v.postalCode.bcPostalCodeValidator" aria-live="assertive">Must be a valid BC postal code.</div>
            </div>
            <div v-else>
              <Input label='Province/state/region (optional)'
                    className='mt-3'
                    v-model="province"
                    maxlength='35' />
              <Input label='City/town (optional)'
                    className='mt-3'
                    v-model="city"
                    maxlength='35' />
              <Input label='Postal code/zip code (optional)'
                    className='mt-3'
                    v-model="postalCode"
                    maxlength='35' />
            </div>
          </div>
        </div>
      </div>
    </PageContent>
    <ContinueBar @continue="validateFields()"/>
  </div>
</template>
<script>
import pageStateService from '../services/page-state-service';
import routes from '../router/routes';
import { scrollTo, scrollToError } from '../helpers/scroll';
import { bcPostalCodeValidator } from '../helpers/validators';
import ContinueBar from '../components/ContinueBar.vue';
import DateInput, {
  distantFutureValidator,
  distantPastValidator,
  beforeDateValidator,
  afterDateValidator,
} from '../components/DateInput.vue';
import CountryInput from '../components/CountryInput.vue';
import { PostalCodeInput } from 'common-lib-vue';
import Input from '../components/Input.vue';
import PageContent from '../components/PageContent.vue';
import { required } from 'vuelidate/lib/validators';
import {
  MODULE_NAME as formModule,
  SET_ADDRESS_LINE1,
  SET_ADDRESS_LINE2,
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
  return bcPostalCodeValidator(value);
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
  },
  data: () => {
    return {
      moveFromBCDate: null,
      arriveDestinationDate: null,
      addressLine1: null,
      addressLine2: null,
      country: null,
      province: null,
      city: null,
      postalCode: null,
      showServerValidationError: false,
    }
  },
  created() {
    this.moveFromBCDate = this.$store.state.form.moveFromBCDate;
    this.arriveDestinationDate = this.$store.state.form.arriveDestinationDate;
    this.addressLine1 = this.$store.state.form.addressLine1;
    this.addressLine2 = this.$store.state.form.addressLine2;
    this.country = this.$store.state.form.country;
    this.province = this.$store.state.form.province;
    this.city = this.$store.state.form.city;
    this.postalCode = this.$store.state.form.postalCode;
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
    }
    if (this.country === 'CA'){
      validations.province = {
        required,
      },
      validations.postalCode = {
        bcPostalCodeValidator: emptyPostalCodeValidator
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
        this.$store.dispatch(formModule + '/' + SET_ADDRESS_LINE1, this.addressLine1);
        this.$store.dispatch(formModule + '/' + SET_ADDRESS_LINE2, this.addressLine2);
        this.$store.dispatch(formModule + '/' + SET_PROVINCE, this.province);
        this.$store.dispatch(formModule + '/' + SET_CITY, this.city);
        this.$store.dispatch(formModule + '/' + SET_POSTAL_CODE, this.postalCode);

        const path = routes.REVIEW_PAGE.path;
        pageStateService.visitPage(path);
        this.$router.push(path);
        scrollTo(0);
      }, 2000);
    }
  },
  // Required in order to block back navigation.
  // beforeRouteLeave(to, from, next) {
  //   if (to.path === routes.HOME_PAGE.path) {
  //     if (window.confirm(strings.NAVIGATION_CONFIRMATION_PROMPT)) {
  //       this.$store.dispatch(formModule + '/' + RESET_FORM);
  //       next();
  //     } else {
  //       next(false);
  //     }
  //   } else {
  //     next();
  //   }
  // }
}
</script>
