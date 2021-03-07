<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Your Information</h1>
        <p>To complete the Out of Province form, you must provide your PHN number that matches your last name.</p>
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
                v-if="showServerValidationError"
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
                v-if="showServerValidationError"
                aria-live="assertive">This field does not match our records.</div>

            <Input label='Email (Optional)'
                  v-model='email'
                  className='mt-3' />

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
    </PageContent>
    <ContinueBar @continue='nextPage()'
                 :hasLoader='isLoading'/>
  </div>
</template>

<script>
import pageStateService from '../services/page-state-service';
import routes from '../router/routes';
import { scrollTo, scrollToError } from '../helpers/scroll';
import ContinueBar from '../components/ContinueBar.vue';
import Input from '../components/Input.vue';
import PageContent from '../components/PageContent.vue';
import {
  PhnInput,
  phnValidator
} from 'common-lib-vue';
import { required } from 'vuelidate/lib/validators';
import {
  MODULE_NAME as formModule,
  SET_LAST_NAME,
  SET_PHN,
  SET_EMAIL,
  SET_PHONE,
} from '../store/modules/form';

const nameValidator = (value) => {
  const criteria = /^[a-zA-Z][a-zA-Z-.' ]*$/;
  const result = criteria.test(value);
  return result;
};

export default {
  name: 'YourInfoPage',
  components: {
    ContinueBar,
    Input,
    PageContent,
    PhnInput,
  },
  data: () => {
    return {
      lastName: null,
      phn: null,
      email: null,
      phone: null,
      isLoading: false,
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
      
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
    
        this.$store.dispatch(formModule + '/' + SET_LAST_NAME, this.lastName);
        this.$store.dispatch(formModule + '/' + SET_PHN, this.phn);
        this.$store.dispatch(formModule + '/' + SET_EMAIL, this.email);
        this.$store.dispatch(formModule + '/' + SET_PHONE, this.phone);

        const path = routes.ACCOUNT_TYPE_PAGE.path;
        pageStateService.visitPage(path);
        this.$router.push(path);
        scrollTo(0);
      }, 2000);
    }
  },
  // Required in order to block back navigation.
  // beforeRouteLeave(to, from, next) {
  //   if (to.path === routes.ACCOUNT_TYPE_PAGE.path) {
  //     next();
  //   } else if (to.path === routes.HOME_PAGE.path) {
  //     if (window.confirm(strings.NAVIGATION_CONFIRMATION_PROMPT)) {
  //       this.$store.dispatch(formModule + '/' + RESET_FORM);
  //       next();
  //     } else {
  //       next(false);
  //     }
  //   }
  // }
}
</script>
