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
            <p>Personal information is collected under the authority of the <em>Medicare Protection Act</em> and section 26 (a), (c) and (e) of the <em>Freedom of Information and Protection of Privacy Act</em> for the purposes of administration of the Medical Services Plan. If you have any questions about the collection and use of your personal information, please contact <a href="https://www2.gov.bc.ca/gov/content/health/about-bc-s-health-care-system/partners/health-insurance-bc" target="_blank">Health Insurance BC</a>.</p>
          </div>
          <div class="modal-footer justify-content-center">
            <Button label="Continue"
                    @click="closeModal()"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "common-lib-vue";

export default {
  name: "ConsentModal",
  components: {
    Button
  },
  data: () => {
    return {
      focusableEls: [],
      focusedEl: null
    };
  },
  created() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.classList.add('no-scroll');
  },
  destroyed() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.classList.remove('no-scroll');
  },
  mounted() {
    // Create an array of focusable elements from the contents of the modal
    this.focusableEls = Array.from(this.$refs.modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'));
  },
  methods: {
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
