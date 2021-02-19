<template>
  <div class="move-info">
    <div class="container">
      <h1>Move Information</h1>
      <p>If you are moving within Canada, coverage is provided for the balance of the month in which you leave the province plus two consecutive months. If required, coverage may be extended for three extra months to cover you while in transit.
         If you are moving outside Canada - coverage is provided for the balance of the month in which you leave the province.</p>
      <hr/>

      <h2>What is the change of address effective date?</h2>
      <div class="row">
        <div class="col-md-6">
          <DateInput label="Date of permanent move from B.C."/>
          <DateInput label="Date of arrival in new destination"/>
        </div>
      </div>
      
      <h2 class='mt-4'>What is the new address information?</h2>
      <div class="row">
        <div class="col-md-6">
          <Input label='Address line 1' />
          <Input label='Address line 2' />
          <Input label='Country' />
          <Input label='Province/Region/State' />
          <Input label='City/Town' />
          <Input label='Postal Code/Zip' className='mb-3' />
        </div>
      </div>

    </div>
    <ContinueBar @continue='nextPage()'/>
  </div>
</template>
<script>
import pageStateService from '../services/page-state-service';
import routes from '../router/routes';
import { scrollTo } from '../helpers/scroll';
import ContinueBar from '../components/ContinueBar.vue';
import DateInput from '../components/DateInput.vue';
import Input from '../components/Input.vue';
import strings from '../locale/strings.en';
import {
  MODULE_NAME as formModule,
  RESET_FORM
} from '../store/modules/form';

export default {
  name: 'MoveInfoPage',
  components: {
    ContinueBar,
    DateInput,
    Input,
  },
  methods: {
    nextPage() {
      pageStateService.setPageIncomplete(routes.MOVE_INFO_PAGE.path)
      const path = routes.REVIEW_PAGE.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
    }
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    if (to.path === routes.HOME_PAGE.path) {
      if (window.confirm(strings.NAVIGATION_CONFIRMATION_PROMPT)) {
        this.$store.dispatch(formModule + '/' + RESET_FORM);
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  }
}
</script>
