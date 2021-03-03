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
             value='AH'
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
             value='DEP' 
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
      <div class="text-danger"
           v-if="$v.accountType.$dirty && !$v.accountType.required"
           aria-live="assertive">Please choose an account type.</div>

      <!-- Account holder option chosen -->
      <div v-if='accountType === "AH"'>
        <h2 class="mt-4">Who is moving out of B.C.?</h2>
        <p>Please indicate who is moving out of B.C. If the Account Holder is completing the form on behalf of any dependents, PHNs will be required for each dependent.</p>
        <hr />

        <input type='radio'
              id='person-moving-ah'
              value='AH_ONLY'
              v-model='personMoving' />
        <label for='person-moving-ah'
              class='ml-3'>Account Holder only</label>
        <br />
        <input type='radio'
              id='person-moving-ahad'
              value='AH_DEP'
              v-model='personMoving' />
        <label for='person-moving-ahad'
              class='ml-3'>Account Holder and Dependent(s)</label>
        <br />
        <input type='radio'
              id='person-moving-d'
              value='DEP_ONLY'
              v-model='personMoving' />
        <label for='person-moving-d'
              class='ml-3'>Dependent(s) only</label>
        <div class="text-danger"
             v-if="$v.personMoving.$dirty && !$v.personMoving.required"
             aria-live="assertive">This field is required.</div>
        <br/>

        <div v-if='personMoving === "AH_DEP" || personMoving === "DEP_ONLY"'>
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
          <div class="text-danger"
               v-if="$v.isAllDependentsMoving.$dirty && !$v.isAllDependentsMoving.required"
               aria-live="assertive">This field is required.</div>
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
    <ContinueBar :hasLoader='isLoading' @continue="validateFields()" />
  </div>
</template>

<script>
import pageStateService from '../services/page-state-service';
import routes from '../router/routes';
import { scrollTo, scrollToError } from '../helpers/scroll';
import ContinueBar from '../components/ContinueBar.vue';
import Input from '../components/Input.vue';
import {
  MODULE_NAME as formModule,
  SET_ACCOUNT_TYPE,
  SET_PERSON_MOVING,
  SET_IS_ALL_DEPENDENTS_MOVING,
} from '../store/modules/form';
import { required } from 'vuelidate/lib/validators';

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
  created() {
    this.accountType = this.$store.state.form.accountType;
    this.personMoving = this.$store.state.form.personMoving;
    this.isAllDependentsMoving = this.$store.state.form.isAllDependentsMoving;
  },
  validations() {
    const validations = {
      accountType: {
        required,
      },
    };
    if (this.accountType === 'AH') {
      validations.personMoving = {
        required,
      };
      if (this.personMoving === 'AH_DEP' || this.personMoving === 'DEP_ONLY') {
        validations.isAllDependentsMoving = {
          required,
        };
      }
    }
    return validations;
  },
  methods: {
    validateFields() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        scrollToError();
        return;
      }

      this.saveValues();
      this.nextPage();
    },
    saveValues() {
      this.$store.dispatch(formModule + '/' + SET_ACCOUNT_TYPE, this.accountType);
      this.$store.dispatch(formModule + '/' + SET_PERSON_MOVING, this.personMoving);
      this.$store.dispatch(formModule + '/' + SET_IS_ALL_DEPENDENTS_MOVING, this.isAllDependentsMoving);
    },
    nextPage() {
      const path = routes.MOVE_INFO_PAGE.path;
      pageStateService.visitPage(path);
      this.$router.push(path);
      scrollTo(0);
    }
  },
  watch: {
    accountType() {
      this.personMoving = null;
      this.isAllDependentsMoving = null;
    },
    personMoving(val) {
      if (val !== 'AH_DEP' && val !== 'DEP_ONLY') {
        this.isAllDependentsMoving = null;
      }
    }
  }
}
</script>