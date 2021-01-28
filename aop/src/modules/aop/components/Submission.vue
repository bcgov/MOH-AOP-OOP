<template>
  <div>
    <h1>Confirmation Message</h1>
    <hr>
    <div class="success-box container">
      <div class="row">
        <div class="col-2 icon-container">
          <i class="fas fa-5x fa-check-circle"></i>
        </div>

        <div class="col-10">
          <p>Your {{ selectedForm }} form has been successfully submitted</p>
          <p>{{ date }} - Reference Number: <strong>{{ referenceNumber }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import strings from '../../../locale/strings.en';

export default {
  name: 'Submission',
  data: () => {
    return {
      selectedForm: '',
      date: Date.now().toString(),
      referenceNumber: 'A123456789'
    };
  },
  created() {
    switch (this.$store.state.uploadType) {
      case 'aop': 
        this.selectedForm = 'Diagnostic Facility Services Assignment of Payment and Medical Director Authorization';
        break;
      case 'coaop':
        this.selectedForm = 'Diagnostic Facility Services Cancellation of Assignment of Payment';
        break;
      case 'oopa':
        this.selectedForm = 'Laboratory Services Outpatient Operator Payment Administration';
        break;
    }
  },
  beforeRouteLeave(to, from, next) {
    // Check for `hasConfirmedPageLeave` because of double navigation to home page.
    if (this.hasConfirmedPageLeave || window.confirm(strings.NAVIGATION_CONFIRMATION_PROMPT)) {
      this.hasConfirmedPageLeave = true;
      next();
    } else {
      next(false);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.fa-check-circle {
  color: rgba(112, 182, 3, 1);
}

.success-box {
  border-radius: 10px;
  border: 5px solid rgba(112, 182, 3, 1);
  padding: 10px;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
} 
</style>
