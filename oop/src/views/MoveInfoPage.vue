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
          <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && !$v.moveFromBCDate.required" aria-live="assertive">A valid date of permanent move from B.C. is required.</div>
          <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && $v.moveFromBCDate.required && !$v.moveFromBCDate.distantFutureValidator" aria-live="assertive">Date is too far in the future.</div>
          <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && $v.moveFromBCDate.required && !$v.moveFromBCDate.distantPastValidator" aria-live="assertive">Date is too far in the past.</div>
          <div class="text-danger" v-if="$v.moveFromBCDate.$dirty && $v.moveFromBCDate.required && !$v.moveFromBCDate.beforeDateValidator" aria-live="assertive">The date of permanent move from B.C. must be before the date of arrival.</div>
          <DateInput label="Date of arrival in new destination"
                     className='mt-3'
                     v-model="arriveDestinationDate"/>
          <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && !$v.arriveDestinationDate.required" aria-live="assertive">A valid date of arrival is required.</div>
          <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && $v.arriveDestinationDate.required && !$v.arriveDestinationDate.distantFutureValidator" aria-live="assertive">Date is too far in the future.</div>
          <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && $v.arriveDestinationDate.required && !$v.arriveDestinationDate.distantPastValidator" aria-live="assertive">Date is too far in the past.</div>
          <div class="text-danger" v-if="$v.arriveDestinationDate.$dirty && $v.arriveDestinationDate.required && !$v.arriveDestinationDate.afterDateValidator" aria-live="assertive">The date of arrival must be after the date of permanent move from B.C.</div>
        </div>
      </div>
      
      <h2 class='mt-4'>What is the new address information?</h2>
      <div class="row">
        <div class="col-md-6">
          <Input label='Address line 1'
                 className='mt-3'
                 v-model="addressLine1" />
          <Input label='Address line 2'
                 className='mt-3'
                 v-model="addressLine2" />
          <Input label='Country'
                 className='mt-3'
                 v-model="country" />
          <Input label='Province/Region/State'
                 className='mt-3'
                 v-model="province" />
          <Input label='City/Town'
                 className='mt-3'
                 v-model="city" />
          <Input label='Postal Code/Zip'
                 className='my-3'
                 v-model="postalCode" />
        </div>
      </div>

    </div>
    <ContinueBar @continue='nextPage()'/>
  </div>
</template>
<script>
import pageStateService from '../services/page-state-service';
import routes from '../router/routes';
import { scrollTo, scrollToError } from '../helpers/scroll';
import ContinueBar from '../components/ContinueBar.vue';
import DateInput, {
  distantFutureValidator,
  distantPastValidator,
  beforeDateValidator,
  afterDateValidator,
} from '../components/DateInput.vue';
import Input from '../components/Input.vue';
import strings from '../locale/strings.en';
import { required } from 'vuelidate/lib/validators';
import {
  MODULE_NAME as formModule,
  RESET_FORM
} from '../store/modules/form';

export default {
  name: 'MoveInfoPage',
  components: {
    ContinueBar,
    DateInput,
    Input,
  },
  data: () => {
    return {
      moveFromBCDate: null,
      arriveDestinationDate: null,
      showServerValidationError: false,
    }
  },
  created() {
    this.moveFromBCDate = this.$store.state.form.moveFromBCDate;
    this.arriveDestinationDate = this.$store.state.form.arriveDestinationDate;
  },
  validations() {
    return {
      moveFromBCDate: {
        required,
        distantFutureValidator,
        distantPastValidator,
        beforeDateValidator: beforeDateValidator('arriveDestinationDate')
      },
      arriveDestinationDate: {
        required,
        distantFutureValidator,
        distantPastValidator,
        afterDateValidator: afterDateValidator('moveFromBCDate')
      }
    };
  },
  methods: {
    nextPage() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        scrollToError();
        return;
      }
      pageStateService.setPageIncomplete(routes.MOVE_INFO_PAGE.path)
      const path = routes.REVIEW_PAGE.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
    }
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    if (to.path === routes.HOME_PAGE.path) {
      if (window.confirm(strings.NAVIGATION_CONFIRMATION_PROMPT)) {
        this.$store.dispatch(formModule + '/' + RESET_FORM);
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  }
}
</script>
