<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Your information</h1>
        <p>
          If you are the account holder you can submit this form for yourself and some or all of
          your dependents. If you are a dependent you can only complete this form for yourself.
        </p>
        <hr />
        <div class="row">
          <div class="col-sm-7">
            <InputComponent
              v-model="lastName"
              label="Last name"
              maxlength="30"
              class="last-name"
              cypress-id="yourInfoLastName"
              :input-style="lastNameInputStyle"
              @input="handleLastNameInputChange"
            />
            <div
              v-if="v$.lastName.$dirty && v$.lastName.required.$invalid"
              class="text-danger"
              aria-live="assertive"
            >
              Last name is required.
            </div>
            <div
              v-if="
                v$.lastName.$dirty &&
                !v$.lastName.required.$invalid &&
                v$.lastName.nameValidation.$invalid
              "
              class="text-danger"
              aria-live="assertive"
            >
              Last name must begin with a letter and cannot include special characters except
              hyphens, periods, apostrophes and blank characters.
            </div>
            <PhnInput
              id="phn"
              ref="phnInput"
              v-model="phn"
              label="Personal Health Number (PHN)"
              cypress-id="yourInfoPhn"
              class-name="mt-3"
              class="phn-input"
              :input-style="phnInputStyle"
              @input="handlePhnInputChange"
            />
            <div
              v-if="v$.phn.$dirty && v$.phn.required.$invalid"
              class="text-danger"
              aria-live="assertive"
            >
              Personal Health Number is required.
            </div>
            <div
              v-if="
                v$.phn.$dirty &&
                !v$.phn.required.$invalid &&
                (v$.phn.phnValidation.$invalid || v$.phn.phnNineValidation.$invalid)
              "
              class="text-danger"
              aria-live="assertive"
            >
              This is not a valid Personal Health Number.
            </div>
            <div
              v-if="isValidationCode1Shown || isValidationCode2Shown"
              class="text-danger"
              aria-live="assertive"
            >
              The last name and/or PHN you entered does not match our records.<br />Please contact
              <a
                href="https://www2.gov.bc.ca/gov/content/health/about-bc-s-health-care-system/partners/health-insurance-bc"
                target="_blank"
              >
                Health Insurance BC
              </a>
              for more information.
            </div>

            <PhoneNumberInput
              id="phone-input"
              v-model="phone"
              label="Phone number (optional)"
              cypress-id="yourInfoPhone"
              class-name="mt-3"
              class="phone-number"
              :input-style="phoneInputStyle"
            />
            <div
              v-if="v$.phn.$dirty && v$.phone.phoneValidator.$invalid"
              class="text-danger"
              aria-live="assertive"
            >
              The phone number you entered is not valid.
            </div>
            <br />

            <div
              v-if="isSystemUnavailable"
              class="text-danger"
              aria-live="assertive"
            >
              Unable to continue, system unavailable. Please try again later.
            </div>
          </div>
          <div class="col-sm-5">
            <TipBox title="Tip: PHN number">
              <p>
                The 10 digit number that can be found on the back of your
                <a
                  href="https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/personal-health-identification/your-bc-services-card"
                  target="_blank"
                >
                  BC Services Card
                </a>
                (or front of the CareCard if you still have one).
              </p>
              <div class="bcid-container">
                <div class="bcid-image-container">
                  <img
                    src="/oop/images/bcid-sample-front.png"
                    alt="BC Services Card sample front"
                    class="bcid"
                  />
                </div>
                <div class="bcid-image-container">
                  <img
                    src="/oop/images/bcid-sample-back.png"
                    alt="BC Services Card sample back"
                    class="bcid"
                  />
                </div>
              </div>
            </TipBox>
          </div>
        </div>
      </div>
    </PageContent>
    <ContinueBar
      :has-loader="isLoading"
      cypress-id="continueBar"
      @continue="nextPage()"
    />
  </div>
</template>

<script>
import pageStateService from "../services/page-state-service";
import { routes, isPastPath } from "../router/routes";
import { scrollTo, scrollToError, getTopScrollPosition } from "../helpers/scroll";
import { phnNineValidator } from "../helpers/validators";
import PageContent from "../components/PageContent.vue";
import TipBox from "../components/TipBox.vue";
import {
  ContinueBar,
  InputComponent,
  PhnInput,
  PhoneNumberInput,
  phnValidator,
  optionalValidator,
} from "common-lib-vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import {
  MODULE_NAME as formModule,
  RESET_FORM,
  SET_ACCOUNT_TYPE,
  SET_LAST_NAME,
  SET_PHN,
  SET_PHONE,
  SET_PERSON_MOVING,
  SET_IS_ALL_DEPENDENTS_MOVING,
  SET_DEPENDENT_PHNS,
} from "../store/modules/form";
import apiService from "../services/api-service";
import logService from "../services/log-service";

const nameValidator = (value) => {
  const criteria = /^[a-zA-Z][a-zA-Z-.' ]*$/;
  return criteria.test(value);
};

const phoneValidator = (value) => {
  if (!value) {
    return true;
  }
  const stripped = value
    .replace(/_/g, "") // remove underlines
    .replace(/\s/g, "") // spaces
    .replace(/\+|-/g, "") // + or - symbol
    .replace("(", "")
    .replace(")", "");
  return stripped.length === 10;
};

export default {
  name: "YourInfoPage",
  components: {
    ContinueBar,
    InputComponent,
    PageContent,
    PhnInput,
    PhoneNumberInput,
    TipBox,
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    if (to.path === routes.HOME_PAGE.path) {
      this.$store.dispatch(formModule + "/" + RESET_FORM);
      next();
    } else if (pageStateService.isPageComplete(to.path) || isPastPath(to.path, from.path)) {
      next();
    } else {
      // Navigate to self.
      const topScrollPosition = getTopScrollPosition();
      next({
        path: routes.YOUR_INFO_PAGE.path,
        replace: true,
      });
      setTimeout(() => {
        scrollTo(topScrollPosition);
      }, 0);
    }
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => {
    return {
      lastName: null,
      phn: null,
      phone: null,
      isLoading: false,
      isValidationCode1Shown: false,
      isValidationCode2Shown: false,
      isSystemUnavailable: false,
      accountType: null,
      lastNameInputStyle: {
        width: "350px",
        maxWidth: "100%",
      },
      phnInputStyle: {
        width: "160px",
        maxWidth: "100%",
      },
      phoneInputStyle: {
        width: "160px",
        maxWidth: "100%",
      },
    };
  },
  created() {
    this.lastName = this.$store.state.form.lastName;
    this.phn = this.$store.state.form.phn;
    this.phone = this.$store.state.form.phone;

    logService.logNavigation(
      this.$store.state.form.applicationUuid,
      routes.YOUR_INFO_PAGE.path,
      routes.YOUR_INFO_PAGE.title
    );
  },
  validations() {
    return {
      lastName: {
        required,
        nameValidation: nameValidator,
      },
      phn: {
        required,
        phnValidation: phnValidator,
        phnNineValidation: optionalValidator(phnNineValidator),
      },
      phone: {
        phoneValidator,
      },
    };
  },
  methods: {
    nextPage() {
      this.isValidationCode1Shown = false;
      this.isValidationCode2Shown = false;
      this.isSystemUnavailable = false;

      this.v$.$touch();
      if (this.v$.$invalid) {
        scrollToError();
        return;
      }

      this.isLoading = true;

      const token = this.$store.state.form.captchaToken;
      const applicationUuid = this.$store.state.form.applicationUuid;
      const phn = this.phn.replace(/ /g, "");

      apiService
        .validateLastNamePhn(token, applicationUuid, this.lastName, phn)
        .then((response) => {
          // Handle HTTP success.
          const returnCode = response.data.returnCode;

          this.isLoading = false;

          switch (returnCode) {
            case "0": // Validation success.
              this.accountType = response.data.applicantRole;
              logService.logInfo(applicationUuid, {
                event: "validation success (validatePhnName)",
                response: response.data,
              });
              this.handleValidationSuccess();
              break;
            case "1": // PHN does not match with the lastname.
              this.isValidationCode1Shown = true;
              logService.logInfo(applicationUuid, {
                event: "validation failure (validatePhnName)",
                response: response.data,
              });
              scrollToError();
              break;
            case "2": // Validation incorrect.
              this.isValidationCode2Shown = true;
              logService.logInfo(applicationUuid, {
                event: "validation failure (validatePhnName)",
                response: response.data,
              });
              scrollToError();
              break;
            case "3": // System unavailable.
              this.isSystemUnavailable = true;
              logService.logError(applicationUuid, {
                event: "validation failure (validatePhnName endpoint unavailable)",
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
            event: "HTTP error (validatePhnName endpoint unavailable)",
            status: error.response.status,
          });
          scrollToError();
        });

      // Manually set accountType:
      // this.accountType = 'AH';

      // Uncomment when middleware/RAPID is down.
      // this.handleValidationSuccess();
    },
    handleValidationSuccess() {
      this.$store.dispatch(formModule + "/" + SET_LAST_NAME, this.lastName);
      this.$store.dispatch(formModule + "/" + SET_PHN, this.phn);
      this.$store.dispatch(formModule + "/" + SET_PHONE, this.phone);
      this.$store.dispatch(formModule + "/" + SET_ACCOUNT_TYPE, this.accountType);

      if (this.accountType === "DEP") {
        this.$store.dispatch(formModule + "/" + SET_PERSON_MOVING, null);
        this.$store.dispatch(formModule + "/" + SET_IS_ALL_DEPENDENTS_MOVING, null);
        this.$store.dispatch(formModule + "/" + SET_DEPENDENT_PHNS, []);
      }

      const toPath = routes.ACCOUNT_TYPE_PAGE.path;
      pageStateService.setPageComplete(toPath);
      pageStateService.visitPage(toPath);
      this.$router.push(toPath);
      scrollTo(0);
    },
    handleLastNameInputChange() {
      this.isValidationCode1Shown = false;
      this.isValidationCode2Shown = false;
    },
    handlePhnInputChange() {
      this.isValidationCode1Shown = false;
      this.isValidationCode2Shown = false;
      // Refocus on element when backspacing on PHN. A Vue2 bug caused issues with the 'vue-text-mask', where it loses focus when triggering a Vue rerender caused by an 'input' event.
      // Issue seems to be resolved in Vue 3, but I've left the code here in case it ever comes back.
      // setTimeout(() => {
      //   this.$refs.phnInput.focus();
      // }, 0);
    },
  },
};
</script>

<style scoped>
.bcid {
  width: auto;
  max-width: 100%;
  height: auto;
}
.bcid-container {
  display: flex;
  flex-flow: row wrap;
}
.bcid-image-container {
  width: 50%;
  padding: 5px;
}
</style>
