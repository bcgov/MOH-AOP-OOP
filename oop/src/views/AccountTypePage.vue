<template>
  <div class="account-type">
    <div class="container">
      <h1>Account holder or dependent</h1>
      <p>This form must be submitted by the Account Holder in the event of a family move. If this form is submitted by a dependent on an account, coverage will be cancelled for that dependent only.</p>
      <hr/>
      <h2>Are you the account holder or a dependent?</h2>

      <!-- Account holder option -->
      <input type='radio'
             id='account-type-account-holder'
             value='account-holder'
             v-model='accountType' />
      <label for='account-type-account-holder'
             class='ml-3'><strong>I'm the account holder</strong></label>
      <div class='ml-5'>
        <p><strong>Who is an Account Holder?</strong></p>
        <ul>
          <li>An Account Holder is the primary individual associated with a Medical Services Plan account. An account may also include a spouse and/or one or more children.</li>
          <li>Learn more</li>
        </ul>
      </div>

      <!-- Dependent option -->
      <input type='radio'
             id='account-type-dependent'
             value='dependent'
             v-model='accountType' />
      <label for='account-type-dependent'
             class='ml-3'><strong>I'm a Dependent</strong></label>
      <div class='ml-5'>
        <p><strong>Who is a Dependent?</strong></p>
        <p>A dependent may be a:</p>
        <ul>
          <li>Spouse</li>
          <li>An Account Holder's child</li>
          <li>Post secondary student</li>
          <li>Learn more</li>
        </ul>
      </div>

      <!-- Account holder option chosen -->
      <div v-if='accountType === "account-holder"'>
        <h2 class="mt-4">Who is moving out of B.C.?</h2>
        <p>Please indicate who is moving out of B.C. If the Account Holder is completing the form on behalf of any dependents, PHNs will be required for each dependent.</p>
        <hr />

        <input type='radio'
              id='person-moving-ah'
              value='account-holder'
              v-model='personMoving' />
        <label for='person-moving-ah'
              class='ml-3'>Account Holder only</label>
        <br />
        <input type='radio'
              id='person-moving-ahad'
              value='account-holder-dependent'
              v-model='personMoving' />
        <label for='person-moving-ahad'
              class='ml-3'>Account Holder and Dependent(s)</label>
        <br />
        <input type='radio'
              id='person-moving-d'
              value='dependent'
              v-model='personMoving' />
        <label for='person-moving-d'
              class='ml-3'>Dependent(s) only</label>
        <br/>

        <div v-if='personMoving === "account-holder-dependent" || personMoving === "dependent"'>
          <h2 class="mt-4">Are all of the dependents on your MSP account moving out of B.C.?</h2>

          <input type='radio'
                 id='is-all-dependents-moving-y'
                 value='Y'
                 v-model='isAllDependentsMoving' />
          <label for='is-all-dependents-moving-y'
                 class='ml-3'>Yes</label>
          <br/>
          <input type='radio'
                 id='is-all-dependents-moving-n'
                 value='N'
                 v-model='isAllDependentsMoving' />
          <label for='is-all-dependents-moving-n'
                 class='ml-3'>No</label>
          <br/>

          <div v-if='isAllDependentsMoving === "N"'>
            <h2 class="mt-4">Please enter the PHN below for each dependent on your MSP account who is moving out of B.C.</h2>

            <div>
              <Input label='PHN: Dependent 1' className='mb-3' />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ContinueBar :hasLoader='isLoading' @continue="nextPage()" />
  </div>
</template>

<script>
import pageStateService from '../services/page-state-service';
import routes from '../router/routes';
import { scrollTo } from '../helpers/scroll';
import ContinueBar from '../components/ContinueBar.vue';
import Input from '../components/Input.vue';
import strings from '../locale/strings.en';
import {
  MODULE_NAME as formModule ,
  RESET_FORM
} from '../store/modules/form';

export default {
  name: 'AccountTypePage',
  components: {
    ContinueBar,
    Input,
  },
  data: () => {
    return {
      accountType: null,
      personMoving: null,
      isAllDependentsMoving: null,
      isLoading: false,
    }
  },
  methods: {
    nextPage() {
      pageStateService.setPageIncomplete(routes.ACCOUNT_TYPE_PAGE.path)
      const path = routes.MOVE_INFO_PAGE.path;
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