<template>
  <div>
    <div class="modal fade show" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="exampleModalLabel">{{heading}}</h2>
          </div>
          <div class="modal-body">
            <p><strong>Keep your personal information secure – especially when using a shared device like a computer at a library, school or café.</strong> To delete any information that was entered, either complete the request and submit it or, if you don't finish, close the web browser.</p>
            <p>Personal information is collected under the authority of the Medicare Protection Act and section 26 (a), (c) and (e) of the Freedom of Information and Protection of Privacy Act for the purposes of administration of the Medical Services Plan. If you have any questions about the collection and use of your personal information, please contact <a href="">Health Insurance BC<i aria-hidden="true" class="fa fa-external-link"></i></a>.</p>
            <label>
              <input type="checkbox" v-model="acceptConditions" /> &nbsp;
              <strong>I have read and understand this information</strong>
            </label>
            <Captcha @confirm="confirmCaptcha" />
          </div>
          <div class="modal-footer">
            <Button label="Continue"
                    styling="bcgov-normal-blue btn"
                    :disabled="!canContinue"
                    v-on:button-click='accept' />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button';
import Captcha from './Captcha';

export default {
  name: 'ConsentModal',
  components: {
    Button,
    Captcha,
  },
  props: {
    heading: String,
  },
  data: () => {
    return {
      acceptConditions: false,
      confirmedCaptcha: false,
    }
  },
  computed: {
    canContinue() {
      return this.acceptConditions && this.confirmedCaptcha;
    }
  },
  methods: {
    accept: function() {
      this.$emit('accept', true);
    },
    confirmCaptcha() {
      this.confirmedCaptcha = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal.show {
  display: block;
  background-color: rgba(0,0,0,0.4);
  overflow-y: scroll;
}
</style>
