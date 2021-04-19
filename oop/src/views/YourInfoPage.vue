<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Your Information</h1>
        <hr/>
        <div class="row">
          <div class="col-sm-7">
            <Input label='Last name'
                  v-model='lastName'
                  maxlength='30'/>
            <div class="text-danger"
                v-if="$v.lastName.$dirty && !$v.lastName.required"
                aria-live="assertive">Last name is required.</div>
            <div class="text-danger"
                v-if="$v.lastName.$dirty && $v.lastName.required && !$v.lastName.nameValidation"
                aria-live="assertive">Last name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
            <div class="text-danger"
                v-if="isServerValidationErrorShown"
                aria-live="assertive">This field does not match our records.</div>
            
            <PhnInput label='Personal Health Number (PHN)'
                      v-model='phn'
                      className='mt-3' />
            <div class="text-danger"
                v-if="$v.phn.$dirty && !$v.phn.required"
                aria-live="assertive">Personal Health Number is required.</div>
            <div class="text-danger"
                v-if="$v.phn.$dirty && $v.phn.required && !$v.phn.phnValidation"
                aria-live="assertive">This is not a valid Personal Health Number.</div>
            <div class="text-danger"
                v-if="isServerValidationErrorShown"
                aria-live="assertive">This field does not match our records.</div>

            <PhoneNumberInput id='phone-input'
                              label='Phone number (optional)'
                              v-model='phone'
                              className='mt-3' />
            <div class="text-danger"
                v-if="$v.phn.$dirty && !$v.phone.phoneValidator"
                aria-live="assertive">The phone number you entered is not valid.</div>
            <br/>

            <div class="text-danger"
                v-if="isSystemUnavailable"
                aria-live="assertive">Unable to continue, system unavailable. Please try again later.</div>
          </div>
          <div class="col-sm-5">
            <TipBox title="Tip: PHN number">
              <p>The 10 digit number that can be found on the back of your <a href="https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/personal-health-identification/your-bc-services-card" target="_blank">BC Services Card</a> (or front of the CareCard if you still have one).</p>
              <img src="/images/bcid-sample.jpg"
                   alt="BC Services Card Sample"
                   class="bcid"/>
            </TipBox>
          </div>
        </div>
      </div>
    </PageContent>
    <ContinueBar @continue='nextPage()'
                 :hasLoader='isLoading'/>
  </div>
</template>

<script>
import pageStateService from '../services/page-state-service';
import {
  routes,
  isPastPath,
} from '../router/routes';
import {
  scrollTo,
  scrollToError,
  getTopScrollPosition
} from '../helpers/scroll';
import ContinueBar from '../components/ContinueBar.vue';
import Input from '../components/Input.vue';
import PageContent from '../components/PageContent.vue';
import TipBox from '../components/TipBox.vue';
import {
  PhnInput,
  PhoneNumberInput,
  phnValidator
} from 'common-lib-vue';
import { required } from 'vuelidate/lib/validators';
import {
  MODULE_NAME as formModule,
  RESET_FORM,
  SET_ACCOUNT_TYPE,
  SET_LAST_NAME,
  SET_PHN,
  SET_PHONE,
} from '../store/modules/form';
import apiService from '../services/api-service';

const nameValidator = (value) => {
  const criteria = /^[a-zA-Z][a-zA-Z-.' ]*$/;
  return criteria.test(value);
};

const phoneValidator = (value) => {
  if (!value) {
    return true;
  }
  const stripped = value
        .replace(/_/g, '') // remove underlines
        .replace(/\s/g, '') // spaces
        .replace(/\+|-/g, '') // + or - symbol
        .replace('(', '')
        .replace(')', '');
  return stripped.length === 10;
};

export default {
  name: 'YourInfoPage',
  components: {
    ContinueBar,
    Input,
    PageContent,
    PhnInput,
    PhoneNumberInput,
    TipBox,
  },
  data: () => {
    return {
      lastName: null,
      phn: null,
      phone: null,
      isLoading: false,
      isServerValidationErrorShown: false,
      isSystemUnavailable: false,
      accountType: null
    }
  },
  created() {
    this.lastName = this.$store.state.form.lastName;
    this.phn = this.$store.state.form.phn;
    this.phone = this.$store.state.form.phone;
  },
  validations() {
    return {
      lastName: {
        required,
        nameValidation: nameValidator,
      },
      phn: {
        required,
        phnValidation: phnValidator,
      },
      phone: {
        phoneValidator,
      }
    };
  },
  methods: {
    nextPage() {
      this.isServerValidationErrorShown = false;
      this.isSystemUnavailable = false;

      this.$v.$touch()
      if (this.$v.$invalid) {
        scrollToError();
        return;
      }
      
      this.isLoading = true;

      const token = this.$store.state.form.captchaToken;
      const applicationUuid = this.$store.state.form.applicationUuid;
      const phn = this.phn.replace(/ /g,'');

      apiService.validateLastNamePhn(token, applicationUuid, this.lastName, phn)
        .then((response) => {
          // Handle HTTP success.
          const returnCode = response.data.returnCode;
          console.log(response);

          this.isLoading = false;

          switch (returnCode) {
            case '0': // Validation success.
              this.accountType = response.data.applicantRole;
              this.handleValidationSuccess();
              break;
            case '2': // Validation incorrect.
              this.isServerValidationErrorShown = true;
              scrollToError();
              break;
            case '3': // System unavailable.
              this.isSystemUnavailable = true;
              scrollToError();
              break;
          }
        })
        .catch(() => {
          // Handle HTTP error.
          this.isLoading = false;
          this.isSystemUnavailable = true;
          scrollToError();
        });

      // Manually set accountType:
      // this.accountType = 'AH';

      // Uncomment when middleware/RAPID is down.
      // this.handleValidationSuccess();
    },
    handleValidationSuccess() {
      this.$store.dispatch(formModule + '/' + SET_LAST_NAME, this.lastName);
      this.$store.dispatch(formModule + '/' + SET_PHN, this.phn);
      this.$store.dispatch(formModule + '/' + SET_PHONE, this.phone);
      this.$store.dispatch(formModule + '/' + SET_ACCOUNT_TYPE, this.accountType);

      const toPath = routes.ACCOUNT_TYPE_PAGE.path;
      pageStateService.setPageComplete(toPath);
      pageStateService.visitPage(toPath);
      this.$router.push(toPath);
      scrollTo(0);
    }
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
      const topScrollPosition = getTopScrollPosition();
      next(false);
      setTimeout(() => {
        scrollTo(topScrollPosition);
      }, 0);
    }
  }
}
</script>

<style scoped>
.bcid {
  width: auto;
  max-width: 100%;
  height: auto;
}
</style>
