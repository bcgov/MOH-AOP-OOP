<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Account holder or dependent</h1>
        <p>This form must be submitted by the Account Holder for a family move. If submitted by a dependent, coverage will be cancelled for that dependent only.</p>
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
        <div v-if='accountType === "AH"'
            class="account-type">
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

          <div v-if='personMoving === "AH_DEP" || personMoving === "DEP_ONLY"'
              class="person-moving">
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
                aria-live="assertive">Please select one of the options above.</div>
            <br/>

            <div v-if='isAllDependentsMoving === "N"'
                class="is-all-dependents-moving">
              <h2 class="mt-4">Please enter the PHN below for each dependent on your MSP account who is moving out of B.C.</h2>

              <div>
                <div class='mb-3'>
                  <div v-for="(phn, index) in dependentPhns"
                      :key='index'
                      :set="v = $v.dependentPhns.$each[index]"
                      class='mt-3'>
                    <PhnInput :label='"PHN Dependent " + (index + 1)'
                              v-model='phn.value'/>
                    <div class="text-danger"
                        v-if="v.value.$dirty && !v.value.phnValidator"
                        aria-live="assertive">This is not a valid Personal Health Number.</div>
                    <div class="text-danger"
                        v-if="v.value.$dirty && index === 0 && !$v.dependentPhns.atLeastOnePhnValidator"
                        aria-live="assertive">Dependent Personal Health Number is required.</div>
                  </div>
                </div>

                <Button label='+ Add dependent'
                        @click='addDependentField()'
                        className='mb-3'/>

                <div class="text-danger"
                    v-if="$v.dependentPhns.$dirty && !$v.dependentPhns.phnIsUniqueValidator"
                    aria-live="assertive">Personal Health Numbers must be unique.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
    <ContinueBar :hasLoader='isLoading' @continue="validateFields()" />
  </div>
</template>

<script>
import pageStateService from '../services/page-state-service';
import routes from '../router/routes';
import { scrollTo, scrollToError, scrollToElement } from '../helpers/scroll';
import ContinueBar from '../components/ContinueBar.vue';
import PageContent from '../components/PageContent.vue';
import {
  Button,
  PhnInput,
  phnValidator
} from 'common-lib-vue';
import {
  MODULE_NAME as formModule,
  SET_ACCOUNT_TYPE,
  SET_PERSON_MOVING,
  SET_IS_ALL_DEPENDENTS_MOVING,
  SET_DEPENDENT_PHNS,
} from '../store/modules/form';
import { required } from 'vuelidate/lib/validators';

const localPhnValidator = (value) => {
  if (!value) {
    return true;
  }
  return phnValidator(value);
};

const atLeastOnePhnValidator = (phns) => {
  if (phns) {
    for (let i=0; i<phns.length; i++) {
      if (phns[i].value && phns[i].value !== '') {
        return true;
      }
    }
  }
  return false; 
};

const phnIsUniqueValidator = (phns) => {
  if (!phns) {
    return true;
  }
  let phnMap = {};

  for (let i=0; i<phns.length; i++) {
    const phn = phns[i].value;

    if (!phn || phn === '') {
      continue;
    } else if (phnMap[phn] === phn) {
      return false;
    } else {
      phnMap[phn] = phn;
    }
  }
  return true;
};

const MIN_PHN_DEPENDENT_FIELDS = 5;

export default {
  name: 'AccountTypePage',
  components: {
    Button,
    ContinueBar,
    PageContent,
    PhnInput,
  },
  data: () => {
    return {
      accountType: null,
      personMoving: null,
      isAllDependentsMoving: null,
      dependentPhns: [],
      isPageLoaded: false,
      isLoading: false,
    }
  },
  created() {
    this.accountType = this.$store.state.form.accountType;
    this.personMoving = this.$store.state.form.personMoving;
    this.isAllDependentsMoving = this.$store.state.form.isAllDependentsMoving;
    this.dependentPhns = this.$store.state.form.dependentPhns;

    setTimeout(() => {
      this.isPageLoaded = true;
    }, 0);

    const numberOfPhns = Math.max(MIN_PHN_DEPENDENT_FIELDS, this.dependentPhns.length);

    for (let i=0; i<numberOfPhns; i++) {
      this.dependentPhns[i] = {
        value: this.dependentPhns && this.dependentPhns[i] ? this.dependentPhns[i].value : null,
        isValid: true,
      }
    }
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
        if (this.isAllDependentsMoving === 'N') {
          validations.dependentPhns = {
            $each: {
              value: {
                phnValidator: localPhnValidator,
              },
            },
            atLeastOnePhnValidator,
            phnIsUniqueValidator,
          };
        }
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

      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
        this.saveValues();
        this.nextPage();
      }, 1000);
    },
    saveValues() {
      this.$store.dispatch(formModule + '/' + SET_ACCOUNT_TYPE, this.accountType);
      this.$store.dispatch(formModule + '/' + SET_PERSON_MOVING, this.personMoving);
      this.$store.dispatch(formModule + '/' + SET_IS_ALL_DEPENDENTS_MOVING, this.isAllDependentsMoving);
      this.$store.dispatch(formModule + '/' + SET_DEPENDENT_PHNS, this.dependentPhns);
    },
    nextPage() {
      const path = routes.MOVE_INFO_PAGE.path;
      pageStateService.visitPage(path);
      this.$router.push(path);
      scrollTo(0);
    },
    addDependentField() {
      this.dependentPhns.push({
        value: null,
        isValid: true,
      });
    },
  },
  watch: {
    accountType(newValue) {
      if (this.isPageLoaded) {
        this.personMoving = null;
        this.isAllDependentsMoving = null;

        if (newValue === 'AH') {
          setTimeout(() => {
            const el = document.querySelector('.account-type');
            scrollToElement(el, true);
          }, 0);
        }
      }
    },
    personMoving(newValue) {
      if (this.isPageLoaded) {
        if (newValue === 'AH_ONLY') {
          this.isAllDependentsMoving = null;
        }
        if (newValue === 'AH_DEP' || newValue === 'DEP_ONLY') {
          setTimeout(() => {
            const el = document.querySelector('.person-moving');
            scrollToElement(el, true);
          }, 0);
        }
      }
    },
    isAllDependentsMoving(newValue) {
      if (this.isPageLoaded) {
        if (newValue === 'N') {
          setTimeout(() => {
            const el = document.querySelector('.is-all-dependents-moving');
            scrollToElement(el, true);
          }, 0);
        }
      }
    }
  }
}
</script>