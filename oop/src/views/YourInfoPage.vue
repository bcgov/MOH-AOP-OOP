<template>
  <div class="your-info">
    <div class="container mb-3">
      <h1>Your Information</h1>
      <p>To complete the Out of Province form, you must provide your PHN number that matches your last name.</p>
      <hr/>
      <div class="row">
        <div class="col-sm-7">
          <Input label='Last name'
                 v-model='lastName'/>
          <div class="text-danger"
               v-if="$v.lastName.$dirty && !$v.lastName.required"
               aria-live="assertive">Field is required</div>
          <div class="text-danger"
               v-if="$v.lastName.$dirty && $v.lastName.required && !$v.lastName.nameValidation"
               aria-live="assertive">Last name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters.</div>
          <div class="text-danger"
               v-if="showServerValidationError"
               aria-live="assertive">This field does not match our records.</div>
          
          <PhnInput label='Personal Health Number (PHN)'
                    v-model='phn'
                    className='mt-3' />
          <div class="text-danger"
               v-if="$v.phn.$dirty && !$v.phn.required"
               aria-live="assertive">Field is required</div>
          <div class="text-danger"
               v-if="$v.phn.$dirty && $v.phn.required && !$v.phn.phnValidation"
               aria-live="assertive">This is not a valid Personal Health Number.</div>
          <div class="text-danger"
               v-if="showServerValidationError"
               aria-live="assertive">This field does not match our records.</div>

          <Input label='Email (Optional)'
                 v-model='email'
                 className='mt-3' />
          <div class="text-danger"
               v-if="$v.email.$dirty && !$v.email.required"
               aria-live="assertive">Field is required</div>

          <Input label='Phone number'
                 v-model='phone'
                 className='mt-3' />
          <div class="text-danger"
               v-if="$v.phone.$dirty && !$v.phone.required"
               aria-live="assertive">Field is required</div>
          <br/>
        </div>
        <div class="col-sm-5 mt-3 mt-sm-0">
          <h4>Tip</h4>
          <p>Tip content here</p>
        </div>
      </div>
      
    </div>
    <ContinueBar @continue='nextPage()' />
  </div>
</template>

<script>
import pageStateService from '../services/page-state-service';
import routes from '../router/routes';
import { scrollTo, scrollToError } from '../helpers/scroll';
import ContinueBar from '../components/ContinueBar.vue';
import Input from '../components/Input.vue';
import PhnInput from '../components/PhnInput.vue';
import { required } from 'vuelidate/lib/validators';
import strings from '../locale/strings.en';
import {
  MODULE_NAME as formModule,
  SET_LAST_NAME,
  SET_PHN,
  SET_EMAIL,
  SET_PHONE,
  RESET_FORM,
} from '../store/modules/form';

const nameValidator = (value) => {
  const criteria = /^[a-zA-Z][a-zA-Z-.' ]*$/;
  const result = criteria.test(value);
  return result;
};

const phnValidator = (value) => {
  if (!value) {
    return false;
  }
  // Init weights and other stuff
  const weights = [-1, 2, 4, 8, 5, 10, 9, 7, 3, -1];
  let sumOfRemainders = 0;
  let phn;
  // Clean up string
  value = value.trim();
  phn = value
              .replace( /^0+/, '' ) // remove leading zeros
              .replace(/_/g, '') // remove underlines
              .replace(/\s/g, ''); // spaces

  // Test for length
  if (phn.length !== 10) {
    return false;
  }

  // Walk through each character
  for (let i=0; i<phn.length; i++) {

    // pull out char
    const char = phn.charAt(i);

    // parse the number
    const num = Number(char);

    if (Number.isNaN(num)) {
      return false;
    }

    // Only use the multiplier if weight is greater than zero
    let result = 0;
    if (weights[i] > 0) {
      // multiply the value against the weight
      result = num * weights[i];

      // divide by 11 and save the remainder
      result = result % 11;

      // add it to our sum
      sumOfRemainders += result;
    }
  }

  // mod by 11
  const checkDigit = 11 - (sumOfRemainders % 11);

  // if the result is 10 or 11, it is an invalid PHN
  if (checkDigit === 10 || checkDigit === 11) {
    return false;
  }

  // Compare against 10th digitfinalDigit
  const finalDigit = Number(phn.substring(9, 10));
  if (checkDigit !== finalDigit) {
    return false;
  }
  return true;
};

export default {
  name: 'YourInfoPage',
  components: {
    ContinueBar,
    Input,
    PhnInput,
  },
  data: () => {
    return {
      lastName: null,
      phn: null,
      email: null,
      phone: null,
      showServerValidationError: false,
    }
  },
  created() {
    this.lastName = this.$store.state.form.lastName;
    this.phn = this.$store.state.form.phn;
    this.email = this.$store.state.form.email;
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
      email: {
        required,
      },
      phone: {
        required,
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

      this.$store.dispatch(formModule + '/' + SET_LAST_NAME, this.lastName);
      this.$store.dispatch(formModule + '/' + SET_PHN, this.phn);
      this.$store.dispatch(formModule + '/' + SET_EMAIL, this.email);
      this.$store.dispatch(formModule + '/' + SET_PHONE, this.phone);

      pageStateService.setPageIncomplete(routes.YOUR_INFO_PAGE.path)
      const path = routes.ACCOUNT_TYPE_PAGE.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
    }
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    if (to.path === routes.ACCOUNT_TYPE_PAGE.path) {
      next();
    } else if (to.path === routes.HOME_PAGE.path) {
      if (window.confirm(strings.NAVIGATION_CONFIRMATION_PROMPT)) {
        this.$store.dispatch(formModule + '/' + RESET_FORM);
        next();
      } else {
        next(false);
      }
    }
  }
}
</script>
