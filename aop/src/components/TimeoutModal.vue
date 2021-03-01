<template>
  <div>
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
            <h2 class="modal-title" id="exampleModalLabel">Session timeout warning</h2>
          </div>
          <div class="modal-body">
            <p>Your session will expire automatically in <span class="text-danger">{{timeRemaining}}</span>. Select “Continue" to extend your session</p>
          </div>
          <div class="modal-footer">
            <Button
              label="Continue"
              styling="bcgov-normal-blue btn"
              @button-click="continueSession"
            />
            <Button
              label="End session"
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
import pageStateService from "../services/page-state-service";
import routes from "../router/routes";
import { scrollTo } from "../helpers/scroll";

export default {
  name: "TimeoutModal",
  components: {
    Button
  },
  props: {
    heading: String
  },
  data: () => {
    return {
      secondsRemaining: 120,
      interval: null
    };
  },
  computed: {
    timeRemaining() {
      let seconds = this.secondsRemaining;
      const min = Math.floor(seconds / 60);
      const sec = seconds - min * 60;
      return `${min} min ${sec} sec`;
    }
  },
  created() {
    this.interval = setInterval(() => {
      if (this.secondsRemaining === 0) {
        this.endSession();
        clearInterval(this.interval);
      }
      this.secondsRemaining -= 1;
    }, 1000);
  },
  methods: {
    continueSession() {
      // Close modal
      clearInterval(this.interval);
      this.$emit('close', true);
    },
    endSession() {
      // Delete session cookie
      // Navigate to session end
      clearInterval(this.interval);
      this.$store.dispatch('resetForm');
      pageStateService.setPageIncomplete(this.$router.path);
      const path = routes.SESSION_END.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
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
