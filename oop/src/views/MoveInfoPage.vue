<template>
  <div class="move-info">
    <div class="container">
      <h1>Move Information</h1>
      <p>If you are moving within Canada, coverage is provided for the balance of the month in which you leave the province plus two consecutive months. If required, coverage may be extended for three extra months to cover you while in transit.
         If you are moving outside Canada - coverage is provided for the balance of the month in which you leave the province.</p>
      <hr/>

      <h2>What is the change of address effective date?</h2>
      <div class="row">
        <div class="col-md-6">
          <DateInput label="Date of permanent move from B.C."
                     className='mt-3'
                     v-model="moveFromBCDate"/>
          <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && !$v.moveFromBCDate.required" aria-live="assertive">Field is required.</div>
          <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && $v.moveFromBCDate.required && !$v.moveFromBCDate.distantFutureValidator" aria-live="assertive">Date is too far in the future.</div>
          <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && $v.moveFromBCDate.required && !$v.moveFromBCDate.distantPastValidator" aria-live="assertive">Date is too far in the past.</div>
          <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && $v.moveFromBCDate.required && !$v.moveFromBCDate.beforeDateValidator" aria-live="assertive">The date of permanent move from B.C. must be before the date of arrival.</div>
          <DateInput label="Date of arrival in new destination"
                     className='mt-3'
                     v-model="arriveDestinationDate"/>
          <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && !$v.arriveDestinationDate.required" aria-live="assertive">Field is required.</div>
          <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && $v.arriveDestinationDate.required && !$v.arriveDestinationDate.distantFutureValidator" aria-live="assertive">Date is too far in the future.</div>
          <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && $v.arriveDestinationDate.required && !$v.arriveDestinationDate.distantPastValidator" aria-live="assertive">Date is too far in the past.</div>
          <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && $v.arriveDestinationDate.required && !$v.arriveDestinationDate.afterDateValidator" aria-live="assertive">The date of arrival must be after the date of permanent move from B.C.</div>
        </div>
      </div>
      
      <h2 class='mt-4'>What is the new address information?</h2>
      <div class="row">
        <div class="col-md-6">
          <CountryInput label='Country'
                 className='mt-3'
                 v-model="country" />
          <div class="text-danger" v-if="$v.country.$dirty && !$v.country.required" aria-live="assertive">Field is required.</div>
          <Input label='Address line 1'
                  className='mt-3'
                  v-model="addressLine1" />
          <div class="text-danger" v-if="$v.addressLine1.$dirty && !$v.addressLine1.required" aria-live="assertive">Field is required.</div>
          <Input label='Address line 2 (optional)'
                  className='mt-3'
                  v-model="addressLine2" />
          <Input label='Province/State/Region'
                 className='mt-3'
                 v-model="province" />
          <div class="text-danger" v-if="$v.province.$dirty && !$v.province.required" aria-live="assertive">Field is required.</div>
          <Input label='City/Town'
                 className='mt-3'
                 v-model="city" />
          <div class="text-danger" v-if="$v.city.$dirty && !$v.city.required" aria-live="assertive">Field is required.</div>
          <PostalCodeInput id="postalCode"
            label="Postal Code"
            className='my-3'
            v-model="postalCode"/>
          <div class="text-danger" v-if="$v.postalCode.$dirty && !$v.postalCode.required" aria-live="assertive">Field is required.</div>
          <div class="text-danger" v-if="$v.postalCode.$dirty && $v.postalCode.required && !$v.postalCode.bcPostalCodeValidator" aria-live="assertive">Must be a valid BC postal code.</div>
        </div>
      </div>

    </div>
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

export default {
  name: 'MoveInfoPage',
  components: {
    ContinueBar,
    DateInput,
    Input,
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
      addressLine1: {
        required,
      },
      province: {
        required,
      },
      city: {
        required,
      },
      postalCode: {
        required,
        bcPostalCodeValidator
      },
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
