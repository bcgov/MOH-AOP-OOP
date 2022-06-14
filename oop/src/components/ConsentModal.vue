<template>
  <div ref="modal">
    <div class="modal fade show"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="exampleModalLabel">Information collection notice</h2>
          </div>
          <div class="modal-body">
            <p><b>Keep your personal information secure - especially when using a shared device like a computer at a library, school or café.</b> To delete any information that was entered, either complete the application and submit it or, if you don't finish, close the web browser.</p>
            <p><b>Need to take a break and come back later?</b> The data you enter on this form is saved locally to the computer or device you are using until you close the web browser or submit your application.</p>
            <p class="mb-4">Personal information is collected under the authority of the <em>Medicare Protection Act</em> and section 26 (a), (c) and (e) of the <em>Freedom of Information and Protection of Privacy Act</em> for the purposes of administration of the Medical Services Plan. If you have any questions about the collection and use of your personal information, please contact <a href="https://www2.gov.bc.ca/gov/content/health/about-bc-s-health-care-system/partners/health-insurance-bc" target="_blank">Health Insurance BC</a>.</p>
            <Captcha v-if="!isCaptchaValid"
                    :apiBasePath="captchaAPIBasePath"
                    :nonce="applicationUuid"
                    @captchaLoaded="handleCaptchaLoaded()"
                    @captchaVerified="handleCaptchaVerified($event)" />
            <div v-if="isCaptchaValid"
                class="text-success">Captcha successfully verified.</div>
            <div class="mt-3">
              <input type="checkbox"
                    data-cy="consentCheckbox"
                    id="is-terms-accepted"
                    class="d-inline"
                    v-model="isTermsAccepted" />
              <label for="is-terms-accepted"
                    class="mt-3 ml-2 d-inline"><b>I have read and understand this information</b></label>
            </div>
            
          </div>
          <div class="modal-footer justify-content-center">
            <Button label="Continue"
                    cypressId="consentContinue"
                    @click="closeModal()"
                    :disabled="!isCaptchaValid || !isTermsAccepted"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "common-lib-vue";
import Captcha from '../components/Captcha';
import {
  MODULE_NAME as formModule,
  SET_CAPTCHA_TOKEN
} from '../store/modules/form';

export default {
  name: "ConsentModal",
  components: {
    Button,
    Captcha,
  },
  data: () => {
    return {
      focusableEls: [],
      focusedEl: null,
      captchaAPIBasePath: '/oop/api/captcha',
      applicationUuid: null,
      isCaptchaValid: false,
      isTermsAccepted: false,
    };
  },
  created() {
    this.applicationUuid = this.$store.state.form.applicationUuid;

    window.addEventListener('keydown', this.handleKeyDown);
    document.body.classList.add('no-scroll');
  },
  onUnmounted() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.classList.remove('no-scroll');
  },
  mounted() {
    this.focusableEls = this.getFocusableEls();
  },
  methods: {
    getFocusableEls() {
      // Create an array of focusable elements from the contents of the modal
      return Array.from(this.$refs.modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button, [tabindex="0"]'));
    },
    handleCaptchaLoaded() {
      this.focusableEls = this.getFocusableEls();
    },
    handleCaptchaVerified(captchaToken) {
      this.$store.dispatch(formModule + '/' + SET_CAPTCHA_TOKEN, captchaToken);
      this.isCaptchaValid = true;
      setTimeout(() => {
        this.focusableEls = this.getFocusableEls();
      }, 0);
    },
    closeModal() {
      this.$emit('close', true);
    },
    handleKeyDown(event) {
      // Handle tabbing
      if (event.key === 'Tab') {
        // Prevent usual tabbing, manually set focus
        event.preventDefault();
        if (event.shiftKey) {
          this.handleTabBackwards();
        } else {
          this.handleTab();
        }
      }
    },
    // Move to next focusable element, if at last element, move to first
    handleTab() {
      if (!this.focusedEl && this.focusableEls.length > 0) {
        this.focusedEl = this.focusableEls[0];
        this.focusedEl.focus();
        return;
      }
      const position = this.focusableEls.indexOf(this.focusedEl);
      if (position === this.focusableEls.length - 1) {
        this.focusedEl = this.focusableEls[0];
      } else {
        this.focusedEl = this.focusableEls[position + 1];
      }
      this.focusedEl.focus();
    },
    // Move to next focusable element, if at last element, move to first
    handleTabBackwards() {
      if (!this.focusedEl && this.focusableEls.length > 0) {
        this.focusedEl = this.focusableEls[this.focusableEls.length - 1];
        this.focusedEl.focus();
        return;
      }
      const position = this.focusableEls.indexOf(this.focusedEl);
      if (position === 0) {
        this.focusedEl = this.focusableEls[this.focusableEls.length - 1];
      } else {
        this.focusedEl = this.focusableEls[position - 1];
      }
      this.focusedEl.focus();
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-y: scroll;
}
.modal-header {
  background: #036;
  color: #FFF;
}
</style>
