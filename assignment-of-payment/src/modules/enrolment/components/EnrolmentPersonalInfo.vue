<template>
  <div>
    <h1>Add personal information and upload documents</h1>
    <h2>Main Applicant</h2>
    <p>After enrolment, the main applicant will be the Medical Services Plan Account Holder, and will be responsible for maintaining the Medical Services Plan account and requesting any changes.</p>
    <hr/>
    <Input
      :label="'First Name'"
      v-model.trim.lazy="$v.firstName.$model"
    />
    <div class="text-danger" v-if="$v.firstName.$dirty && !$v.firstName.required" aria-live="assertive">Field is required</div>
    <div class="text-danger" v-if="$v.firstName.$dirty && !$v.firstName.alpha" aria-live="assertive">Name must not contain numbers or symbols.</div>

    <Input
      :label="'Last Name'"
      :className="'mt-3'"
      v-model="$v.lastName.$model"
    />
    <div class="text-danger" v-if="$v.lastName.$dirty && !$v.lastName.required" aria-live="assertive">Field is required</div>
    <div class="text-danger" v-if="$v.lastName.$dirty && !$v.lastName.alpha" aria-live="assertive">Name must not contain numbers or symbols.</div>

    <AddressValidator
      :id="'address-input'"
      :label="'Address'"
      :className="'mt-3'"
      v-model="addressSearch"
      @select="selectAddress($event)"
    />
    
    <PostalCodeInput id="postalCode"
      label="Postal Code"
      className='mt-3'
      v-model="postalCode"/>
    <div class="text-danger" v-if="$v.postalCode.$dirty && !$v.postalCode.required" aria-live="assertive">Field is required.</div>
    <div class="text-danger" v-if="$v.postalCode.$dirty && $v.postalCode.required && !$v.postalCode.bcPostalCodeValidator" aria-live="assertive">Must be a valid BC postal code.</div>

    <div class="mt-3">
      <DateInput
        :label="'Start Date'"
        v-model="startDate"
      />
      <div class="text-danger" v-if="$v.startDate.$dirty && !$v.startDate.required" aria-live="assertive">A valid date is required.</div>
      <div class="text-danger" v-if="$v.startDate.$dirty && $v.startDate.required && !$v.startDate.distantFutureValidator" aria-live="assertive">Date is too far in the future.</div>
      <div class="text-danger" v-if="$v.startDate.$dirty && $v.startDate.required && !$v.startDate.distantPastValidator" aria-live="assertive">Date is too far in the past.</div>
      <div class="text-danger" v-if="$v.startDate.$dirty && $v.startDate.required && !$v.startDate.beforeDateValidator" aria-live="assertive">Date must be before today.</div>
    </div>

    <div class="mt-3">
      <FileUploader v-model="files" />
      <div class="text-danger" v-if="$v.files.$dirty && !$v.files.required" aria-live="assertive">Upload is required</div>
    </div>

    <Button label="Continue"
            styling="bcgov-normal-blue btn mt-3"
            v-on:button-click='nextPage' />
  </div>
</template>

<script>
import Button from 'vue-shared-components/src/components/button/Button';
import Input from '../../common/components/Input';
import PostalCodeInput from '../../common/components/PostalCodeInput';
import FileUploader from '../../common/components/file-uploader/FileUploader.vue';
import AddressValidator from '../../common/components/AddressValidator.vue';
import DateInput, {
  distantFutureValidator,
  distantPastValidator,
  beforeDateValidator
} from '../../common/components/DateInput.vue';
import { required, minLength, alpha } from 'vuelidate/lib/validators';
import pageStateService from '../../common/services/page-state-service';
import routes from '../../../routes';
import moduleNames from '../../../module-names';
import {
  RESET_FORM,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_ADDRESS,
  SET_POSTAL_CODE,
  SET_START_DATE,
  SET_UPLOADED_IMAGES
} from '../../../store/modules/enrolment';
import strings from '../../../locale/strings.en';
import { bcPostalCodeValidator } from '../../common/helpers/validators';
import { scrollTo, scrollToError } from '../../common/helpers/scroll';

export default {
  name: 'EnrolmentPersonalInfo',
  components: {
    AddressValidator,
    Button,
    DateInput,
    FileUploader,
    Input,
    PostalCodeInput,
  },
  data: () => {
    return {
      firstName: null,
      lastName: null,
      addressSearch: null,
      address: {},
      postalCode: null,
      startDate: null,
      endDate: null,
      files: null,
    };
  },
  validations: {
    firstName: {
      required,
      alpha
    },
    lastName: {
      required,
      alpha
    },
    postalCode: {
      required,
      bcPostalCodeValidator
    },
    files: {
      required
    },
    startDate: {
      required,
      distantFutureValidator,
      distantPastValidator,
      beforeDateValidator: beforeDateValidator('endDate')
    }
  },
  created() {
    this.firstName = this.$store.state.enrolment.firstName;
    this.lastName = this.$store.state.enrolment.lastName;
    this.addressSearch = this.$store.state.enrolment.address;
    this.postalCode = this.$store.state.enrolment.postalCode;
    this.startDate = this.$store.state.enrolment.startDate;
    this.endDate = new Date();
    this.files = this.$store.state.enrolment.uploadedImages;
  },
  methods: {
    selectAddress(address) {
      this.addressSearch = address.street;
      this.address = address;
    },
    nextPage: function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        scrollToError();
        return;
      }
      this.$store.dispatch(moduleNames.ENROLMENT + '/' + SET_FIRST_NAME, this.firstName);
      this.$store.dispatch(moduleNames.ENROLMENT + '/' + SET_LAST_NAME, this.lastName);
      this.$store.dispatch(moduleNames.ENROLMENT + '/' + SET_ADDRESS, this.addressSearch);
      this.$store.dispatch(moduleNames.ENROLMENT + '/' + SET_POSTAL_CODE, this.postalCode);
      this.$store.dispatch(moduleNames.ENROLMENT + '/' + SET_START_DATE, this.startDate);
      this.$store.dispatch(moduleNames.ENROLMENT + '/' + SET_UPLOADED_IMAGES, this.files);

      pageStateService.setPageIncomplete(routes.ENROLMENT_PERSONAL_INFO.path);
      const path = routes.ENROLMENT_REVIEW.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
    },
  },
  // Required in order to block back navigation on second page.
  beforeRouteLeave(to, from, next) {
    if (to.path === routes.ENROLMENT_REVIEW.path) {
      next();
    } else if (to.path === routes.ENROLMENT_HOME.path) {
      if (window.confirm(strings.NAVIGATION_CONFIRMATION_PROMPT)) {
        next();
      } else {
        next(false);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.text-danger {
  color: #b33238 !important;
}
</style>
