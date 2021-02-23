<template>
  <div class="your-info">
    <div class="container mb-3">
      <h1>Your Information</h1>
      <p>To complete the Out of Province form, you must provide your PHN number that matches your last name.</p>
      <hr/>
      <div class="row">
        <div class="col-sm-7">
          <Input label='Last name'
                 v-model='lastName' />
          <div class="text-danger"
               v-if="$v.lastName.$dirty && !$v.lastName.required"
               aria-live="assertive">Field is required</div>
          
          <Input label='Personal Health Number (PHN)'
                 v-model='phn'
                 className='mt-3' />
          <div class="text-danger"
               v-if="$v.phn.$dirty && !$v.phn.required"
               aria-live="assertive">Field is required</div>

          <Input label='Email (Optional)'
                 v-model='email'
                 className='mt-3' />
          <div class="text-danger"
               v-if="$v.email.$dirty && !$v.email.required"
               aria-live="assertive">Field is required</div>

          <Input label='Phone number'
                 v-model='phone'
                 className='mt-3 mb-3' />
          <div class="text-danger"
               v-if="$v.phone.$dirty && !$v.phone.required"
               aria-live="assertive">Field is required</div>
        </div>
        <div class="col-sm-5">
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

export default {
  name: 'YourInfoPage',
  components: {
    ContinueBar,
    Input
  },
  data: () => {
    return {
      lastName: null,
      phn: null,
      email: null,
      phone: null,
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
      },
      phn: {
        required,
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