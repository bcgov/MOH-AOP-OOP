<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Who is moving</h1>
        <p>To report a family move, this form must be submitted by the account holder. If submitted by a dependent, coverage will be cancelled for that dependent only.</p>
        <hr/>

        <!-- Account holder option chosen based from PHN -->
        <div class="row">
          <div v-if='accountType === "AH"'
              class="account-type col-sm-7">
            <h2 class="mt-4">Who is moving out of B.C.?</h2>

            <input type='radio'
                  id='person-moving-ah'
                  value='AH_ONLY'
                  v-model='personMoving' />
            <label for='person-moving-ah'
                  class='ml-3'>Account holder only</label>
            <br />
            <input type='radio'
                  id='person-moving-ahad'
                  value='AH_DEP'
                  v-model='personMoving' />
            <label for='person-moving-ahad'
                  class='ml-3'>Account holder and dependent(s)</label>
            <br />
            <input type='radio'
                  id='person-moving-d'
                  value='DEP_ONLY'
                  v-model='personMoving' />
            <label for='person-moving-d'
                  class='ml-3'>My dependent(s) only</label>
            <div class="text-danger"
                v-if="$v.personMoving.$dirty && !$v.personMoving.required"
                aria-live="assertive">This field is required.</div>
            <br/>

            <div v-if='personMoving === "AH_DEP"'
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
            </div>

            <div v-if='personMoving === "DEP_ONLY" || isAllDependentsMoving === "N"'
                class="is-all-dependents-moving">
                <h2 class="mt-4">Please enter the PHN below for each dependent on your MSP account who is moving out of B.C.</h2>

                <div>
                  <div class='mb-3'>
                    <div v-for="(phn, index) in dependentPhns"
                        :key='index'
                        :set="v = $v.dependentPhns.$each[index]"
                        class='mt-3'>
                      <PhnInput :label='"PHN: Dependent " + (index + 1)'
                                v-model='phn.value'
                                class='phn-input'/>
                      <div class="text-danger"
                          v-if="v.value.$dirty && !v.value.phnValidator"
                          aria-live="assertive">This is not a valid Personal Health Number.</div>
                      <div class="text-danger"
                          v-if="v.value.$dirty && index === 0 && !$v.dependentPhns.atLeastOnePhnValidator"
                          aria-live="assertive">Dependent Personal Health Number is required.</div>
                    </div>
                  </div>
                  <div v-if="dependentPhns.length < getMaxPHNDependentFields()">
                    <Button label='+ Add dependent'
                            @click='addDependentField()'
                            className='mb-3'/>
                  </div>
                  <div class="text-danger"
                      v-if="$v.dependentPhns.$dirty && !$v.dependentPhns.phnIsUniqueValidator"
                      aria-live="assertive">Personal Health Numbers must be unique.
                  </div>
                  <div class="text-danger"
                      v-if="isServerValidationErrorShown"
                      aria-live="assertive">At least one of the Personal Health Numbers does not match our records.
                  </div>
                  <div class="text-danger"
                      v-if="isSystemUnavailable"
                      aria-live="assertive">Unable to continue, system unavailable. Please try again later.
                  </div>
                </div>
            </div>
          </div>
          <div v-if='accountType === "DEP"' class="col-sm-7 mt-3">
            <p>You can only complete this form for yourself. Please press continue to proceed with the Out of Province Move form. </p>
          </div>
          <div class="col-sm-5 mt-3">
              <TipBox title="Tip: Account type">
                <b>Who is an account holder?</b>
                <p>An account holder is the primary individual associated with an MSP account. An account may also include a spouse and/or one or more children.</p>
                <b>Who is a dependent?</b>
                <p>A dependent may be a:
                  <ul>
                    <li>A spouse</li>
                    <li>An account holder’s child</li>
                    <li>A dependent post-secondary student</li>
                  </ul>
                </p>
                <p>Please contact <a href="https://www2.gov.bc.ca/gov/content/health/about-bc-s-health-care-system/partners/health-insurance-bc" target="_blank">Health Insurance BC</a> if you have any questions.</p>
              </TipBox>
          </div>
        </div>
      </div>
    </PageContent>
    <ContinueBar :hasLoader='isLoading' @continue="validateFields()" />
  </div>
</template>

<script>
import pageStateService from '../services/page-state-service';
import {
  routes,
  isPastPath,
} from '../router/routes';
import {
  scrollTo,
  scrollToError,
  scrollToElement,
  getTopScrollPosition
} from '../helpers/scroll';
import ContinueBar from '../components/ContinueBar.vue';
import PageContent from '../components/PageContent.vue';
import {
  Button,
  PhnInput,
  phnValidator
} from 'common-lib-vue';
import {
  MODULE_NAME as formModule,
  RESET_FORM,
  SET_ACCOUNT_TYPE,
  SET_PERSON_MOVING,
  SET_IS_ALL_DEPENDENTS_MOVING,
  SET_DEPENDENT_PHNS,
} from '../store/modules/form';
import { required } from 'vuelidate/lib/validators';
import apiService from '../services/api-service';
import TipBox from '../components/TipBox.vue';

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
const MAX_PHN_DEPENDENT_FIELDS = 9;

export default {
  name: 'AccountTypePage',
  components: {
    Button,
    ContinueBar,
    PageContent,
    PhnInput,
    TipBox
  },
  data: () => {
    return {
      accountType: null,
      personMoving: null,
      isAllDependentsMoving: null,
      dependentPhns: [],
      isPageLoaded: false,
      isLoading: false,
      isServerValidationErrorShown: false,
      isSystemUnavailable: false,
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
      if (this.personMoving === 'AH_DEP') {
        validations.isAllDependentsMoving = {
          required,
        };
      }
      if (this.personMoving === 'DEP_ONLY' || this.isAllDependentsMoving === 'N') {
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
    return validations;
  },
  methods: {
    validateFields() {
      this.isServerValidationErrorShown = false;
      this.isSystemUnavailable = false;

      this.$v.$touch()
      if (this.$v.$invalid) {
        scrollToError();
        return;
      }

      this.isLoading = true;

      const token = this.$store.state.form.captchaToken;
      const applicationUuid = this.$store.state.form.applicationUuid;
      const phn = this.$store.state.form.phn;
      const dependentPhns = this.getDependentPhns();

      if (this.accountType === 'AH') {
        apiService.validateDep(token, applicationUuid, phn, dependentPhns)
          .then((response) => {
            console.log(response);
            // Handle HTTP success.
            const returnCode = response.data.returnCode;
            
            this.isLoading = false;

            switch (returnCode) {
              case '0': // Validation success.
                this.handleValidationSuccess();
                break;
              case '1': // Dependent does not match the reccords
              case '2': // PHN not found
                this.isServerValidationErrorShown = true;
                scrollToError();
                break;
              case '3': // System unavailable.
                this.isSystemUnavailable = true;
                scrollToError();
                break;
            }
          })
          .catch(() => {
            // Handle HTTP error.
            this.isLoading = false;
            this.isSystemUnavailable = true;
            scrollToError();
          });
      } else if (this.accountType === 'DEP') {
        this.isLoading = false;
        this.handleValidationSuccess();
      }
    },
    handleValidationSuccess() {
      this.isLoading = false;
      this.saveValues();
      this.nextPage();
    },
    saveValues() {
      this.$store.dispatch(formModule + '/' + SET_ACCOUNT_TYPE, this.accountType);
      this.$store.dispatch(formModule + '/' + SET_PERSON_MOVING, this.personMoving);
      this.$store.dispatch(formModule + '/' + SET_IS_ALL_DEPENDENTS_MOVING, this.isAllDependentsMoving);
      this.$store.dispatch(formModule + '/' + SET_DEPENDENT_PHNS, this.dependentPhns);
    },
    nextPage() {
      const toPath = routes.MOVE_INFO_PAGE.path;
      pageStateService.setPageComplete(toPath);
      pageStateService.visitPage(toPath);
      this.$router.push(toPath);
      scrollTo(0);
    },
    addDependentField() {
      this.dependentPhns.push({
        value: null,
        isValid: true,
      });
    },
    getDependentPhns() {
      const phns = [];
      for (let i=0; i<this.dependentPhns.length; i++) {
        if (this.dependentPhns[i] && this.dependentPhns[i].value) {
          phns.push(this.dependentPhns[i].value);
        }
      }
      return phns;
    },
    getMaxPHNDependentFields() {
      return MAX_PHN_DEPENDENT_FIELDS;
    }
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
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    if (to.path === routes.HOME_PAGE.path) {
      this.$store.dispatch(formModule + '/' + RESET_FORM);
      next();
    } else if ((pageStateService.isPageComplete(to.path)) || isPastPath(to.path, from.path)) {
      next();
    } else {
      const topScrollPosition = getTopScrollPosition();
      next(false);
      setTimeout(() => {
        scrollTo(topScrollPosition);
      }, 0);
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
}

.phn-input {
  max-width: 100%;
  width: 350px;
}
</style>