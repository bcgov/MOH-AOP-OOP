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
            <Radio v-model="personMoving"
                  :items="personMovingRadioItems"
                  name='personMoving' />
            <div class="text-danger"
                v-if="$v.personMoving.$dirty && !$v.personMoving.required"
                aria-live="assertive">This field is required.</div>

            <div v-if='personMoving === "AH_DEP"'
                class="person-moving">
              <h2 class="mt-4">Are all of the dependents on your MSP account moving out of B.C.?</h2>
              <Radio v-model="isAllDependentsMoving"
                    :items="isAllDependentsMovingRadioItems"
                    name='isAllDependentsMoving' />
              <div class="text-danger"
                  v-if="$v.isAllDependentsMoving.$dirty && !$v.isAllDependentsMoving.required"
                  aria-live="assertive">Please select one of the options above.</div>
            </div>

            <div v-if='personMoving === "DEP_ONLY" || isAllDependentsMoving === "N"'
                class="is-all-dependents-moving">
                <h2 class="mt-4">Please enter the PHN below for each dependent on your MSP account who is moving out of B.C.</h2>
                <p> You can submit up to nine (9) Dependents to move as well as the Account Holder. If there are more Dependents, please submit them individually on separate Out of Province Move forms. </p>
                <div>
                  <div class='mb-3'>
                    <div v-for="(phn, index) in dependentPhns"
                        :key='index'
                        :set="v = $v.dependentPhns.$each[index]"
                        class='mt-3'>
                      <PhnInput :label='"PHN: Dependent " + (index + 1)'
                                :id='"phn" + index'
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
  Radio,
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
import logService from '../services/log-service';
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
    Radio,
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
      personMovingRadioItems: [
        {
          id: 'person-moving-ah',
          label: 'Account holder only',
          value: 'AH_ONLY'
        },
        {
          id: 'person-moving-ahad',
          label: 'Account holder and dependent(s)',
          value: 'AH_DEP'
        },
        {
          id: 'person-moving-d',
          label: 'My dependent(s) only',
          value: 'DEP_ONLY'
        }
      ],
      isAllDependentsMovingRadioItems: [
        {
          id: 'is-all-dependents-moving-y',
          label: 'Yes',
          value: 'Y'
        },
        {
          id: 'is-all-dependents-moving-n',
          label: 'No',
          value: 'N'
        }
      ]
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

    logService.logNavigation(
      this.$store.state.form.applicationUuid,
      routes.ACCOUNT_TYPE_PAGE.path,
      routes.ACCOUNT_TYPE_PAGE.title
    );
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
      const phn = this.$store.state.form.phn.replace(/ /g,'');
      const dependentPhns = this.getDependentPhns();
      
      if (this.accountType === 'AH' && (this.personMoving === 'DEP_ONLY' || this.isAllDependentsMoving === 'N')) {
        apiService.validateDep(token, applicationUuid, phn, dependentPhns)
          .then((response) => {
            // Handle HTTP success.
            const returnCode = response.data.returnCode;

            this.isLoading = false;

            switch (returnCode) {
              case '0': // Validation success.
                logService.logInfo(applicationUuid, {
                  event: 'validation success (validateDep)',
                  response: response.data,
                });
                this.handleValidationSuccess();
                break;
              case '1': // Dependent does not match the reccords
              case '2': // PHN not found
                this.isServerValidationErrorShown = true;
                logService.logInfo(applicationUuid, {
                  event: 'validation failure (validateDep)',
                  response: response.data,
                });
                scrollToError();
                break;
              case '3': // System unavailable.
                this.isSystemUnavailable = true;
                logService.logError(applicationUuid, {
                  event: 'validation failure (validateDep endpoint unavailable)',
                  response: response.data,
                });
                scrollToError();
                break;
            }
          })
          .catch((error) => {
            // Handle HTTP error.
            this.isLoading = false;
            this.isSystemUnavailable = true;
            logService.logError(applicationUuid, {
              event: 'HTTP error (validateDep endpoint unavailable)',
              status: error.response.status,
            });
            scrollToError();
          });
      } else {
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
          phns.push(this.dependentPhns[i].value.replace(/ /g,''));
        }
      }
      return phns;
    },
    getMaxPHNDependentFields() {
      return MAX_PHN_DEPENDENT_FIELDS;
    },
    resetDependentFields(){
      const numberOfPhns = Math.max(MIN_PHN_DEPENDENT_FIELDS, this.dependentPhns.length);
      for (let i=0; i<numberOfPhns; i++) {
        this.dependentPhns[i] = {
          value: null,
          isValid: true,
        }
      }
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
      if (this.isPageLoaded && newValue) {
        this.isAllDependentsMoving = null;
        this.resetDependentFields();
      }
    },
    isAllDependentsMoving(newValue) {
      if (this.isPageLoaded) {
        this.resetDependentFields();
        if (newValue === 'N') {
          setTimeout(() => {
            const el = document.querySelector('.is-all-dependents-moving');
            scrollToElement(el, true);
          }, 0);
        }
      }
    },
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
      // Navigate to self.
      const topScrollPosition = getTopScrollPosition();
      next({
        path: routes.ACCOUNT_TYPE_PAGE.path,
        replace: true
      });
      setTimeout(() => {
        scrollTo(topScrollPosition);
      }, 0);
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 1rem;
  line-height: 1.5em;
}

.phn-input {
  max-width: 100%;
  width: 350px;
}
</style>