<template>
  <div ref="modal">
    <div
      class="modal fade show"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="exampleModalLabel">Are you sure you want to log out?</h2>
          </div>
          <div class="modal-body">
            <p>All progress in this session will be lost.</p>
          </div>
          <div class="modal-footer">
            <Button
              label="Cancel"
              styling="bcgov-normal-blue btn"
              @button-click="continueSession"
            />
            <Button
              label="Log out"
              styling="bcgov-normal-blue btn"
              @button-click="endSession"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button";
import { routes } from "../router/routes";
import { scrollTo } from "../helpers/scroll";
import { HIDE_SIGN_OUT_MODAL, RESET_FORM } from '../store';

export default {
  name: "SignOutModal",
  components: {
    Button
  },
  props: {
    heading: String
  },
  data: () => {
    return {
      secondsRemaining: 120,
      interval: null,
      focusableEls: [],
      focusedEl: null
    };
  },
  created() {
    window.addEventListener('keyup', this.handleKeyDown);
  },
  unmounted() {
    window.removeEventListener('keyup', this.handleKeyDown);
  },
  mounted() {
    // Create an array of focusable elements from the contents of the modal
    this.focusableEls = Array.from(this.$refs.modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'));
    // Initialize to the first focusable element
    this.focusedEl = this.focusableEls[0];
    this.focusedEl.focus();
  },
  methods: {
    continueSession() {
      // Close modal
      this.$store.dispatch(HIDE_SIGN_OUT_MODAL);
      this.$emit('close', true);
    },
    endSession() {
      // Navigate to session end
      this.$store.dispatch(HIDE_SIGN_OUT_MODAL);
      this.$store.dispatch(RESET_FORM);
      const path = routes.SESSION_END.path;
      this.$router.push(path);
      scrollTo(0);
    },
    handleKeyDown(event) {
      // Check that the modal is open
      if (!this.closed) {
        // Handle tabbing
        if (event.key === 'Tab') {
          // Prevent usual tabbing, manually set focus
          event.preventDefault();
          if (event.shiftKey) {
            this.handleTabBackwards();
          } else {
            this.handleTab();
          }
        // Stop users from being able to escape the modal
        } else if (event.key === 'Escape') {
          event.preventDefault();
        }
      }
    },
    // Move to next focusable element, if at last element, move to first
    handleTab() {
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
</style>
