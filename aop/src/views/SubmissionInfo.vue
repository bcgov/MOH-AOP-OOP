<template>
  <div>
    <h2>Please select the type of upload that you want to submit:</h2>
    <hr />
    <p>You can upload and send ONLY ONE form at a time.</p>
    <p>
      After submitting your first form, you can submit additional forms from the
      "Submission Confirmation" screen. The submitter information will populate
      automatically for the second and subsequent submissions.
    </p>
    <div class="form-group">
      <input
        type="radio"
        id="aop"
        value="aop"
        name="uploadType"
        v-model="uploadType"
        @change="resetCredentialsRequired"
        required
      />&nbsp;
      <label for="aop"
        >Diagnostic Facility Services Assignment of Payment and Medical Director
        Authorization (HLTH 1908)</label
      >
      <br />
      <input
        type="radio"
        id="coaop"
        value="coaop"
        name="uploadType"
        v-model="uploadType"
        @change="resetCredentialsRequired"
      />&nbsp;
      <label for="coaop"
        >Diagnostic Facility Services Cancellation of Assignment of Payment
        (HLTH 1926)</label
      >
      <br />
      <input
        type="radio"
        id="oopa"
        value="oopa"
        name="uploadType"
        v-model="uploadType"
        @change="resetCredentialsRequired"
      />&nbsp;
      <label for="oopa"
        >Laboratory Services Outpatient Operator Payment Administration (HLTH
        2999)</label
      >
      <div
        class="text-danger"
        v-if="$v.uploadType.$dirty && !$v.uploadType.required"
      >
        Field is required
      </div>
    </div>
    <div v-if="uploadType === 'aop'">
      <h3>
        Do you need to submit Confirmation of Credentials for this Assignment of
        Payment?
      </h3>
      <hr />
      <input
        type="radio"
        id="no"
        value="false"
        required
        name="credentialsRequired"
        v-model="credentialsRequired"
      />&nbsp;
      <label for="no">No</label>
      <br />
      <input
        type="radio"
        id="yes"
        value="true"
        name="credentialsRequired"
        v-model="credentialsRequired"
      />&nbsp;
      <label for="yes">Yes</label>
      <div
        class="text-danger"
        v-if="
          $v.credentialsRequired.$dirty &&
            uploadType === 'aop' &&
            !$v.credentialsRequired.required
        "
      >
        Field is required
      </div>
    </div>
    <br />
    <div v-if="uploadType === 'aop' && credentialsRequired !== null">
      <h2 v-if="credentialsRequired === 'true'">
        Submit your Assignment of Payment and Medical Director Authorization
        Form with Confirmation of Practitioner Credentials
      </h2>
      <h2 v-if="credentialsRequired === 'false'">
        Submit your Assignment of Payment and Medical Director Authorization
        Form
      </h2>
      <hr />
      <p>
        When submitting an Assignment of Payment, please ensure the form is
        complete and signed by the practitioner, payee representative and
        departmental or regional Medical Director or their delegate (when
        required). Only fully completed and authorized Assignment of Payment
        forms can be processed.
      </p>
    </div>
    <div v-if="uploadType === 'coaop'">
      <h2>Submit your Cancellation of Assignment of Payment</h2>
      <hr />
      <p>
        When submitting a Cancellation of Assignment of Payment, please ensure
        the form is complete and signed by the practitioner and payee
        representative. Only fully completed and authorized Cancellation of
        Assignment of Payment forms can be processed.
      </p>
    </div>
    <div v-if="uploadType === 'oopa'">
      <h2>
        Laboratory Services: Submit your Outpatient Operator Payment
        Administration form
      </h2>
      <hr />
      <p>
        Please use the below fields to submit your completed Operator Payment
        Administration form.
      </p>
      <p>
        Ensure your form is complete and appropriately authorized prior to
        submitting. Only complete and authorized forms can be processed.
      </p>
      <p>
        For questions regarding the submission of a form, please contact
        Laboratory Services at
        <a href="mailto:labfacilities@phsa.ca">labfacilities@phsa.ca</a>
      </p>
    </div>
    <div
      v-if="
        (uploadType === 'aop' && credentialsRequired !== null) ||
          uploadType === 'coaop' ||
          uploadType === 'oopa'
      "
    >
      <p>To submit a completed form:</p>
      <ol>
        <li>
          Scan the form and save a digital copy to your computer in PDF file
          format only, using the required naming convention (see note below)
        </li>
        <li>Complete all contact information fields below</li>
        <li>
          Click "Select a file" or "Add" and locate the scanned PDF form on your
          computer
        </li>
        <li>Once the file has been uploaded, click the "Submit" button</li>
        <li>
          A "Confirmation" window will display on your computer with the result
          of the transaction
        </li>
      </ol>
    </div>
    <p v-if="uploadType === 'oopa'">
      To report any issues with the secure upload tool, please send an email to
      <a href="mailto:labfacilities@phsa.ca">labfacilities@phsa.ca</a>
    </p>
    <div
      v-if="
        (uploadType === 'aop' && credentialsRequired !== null) ||
          uploadType === 'coaop' ||
          uploadType === 'oopa'
      "
    >
      <h3><em>Submitter Information</em></h3>
      <hr />
      <p>
        Provide details below about the person submitting the form (clerk,
        administrator, etc.)
      </p>
      <Input :label="'First Name'" v-model="firstName" :disabled="true"/>
      <Input
        :label="'Last Name'"
        :className="'mt-3'"
        v-model="lastName"
        :disabled="true"
      />

      <Input
        :label="'Email Address'"
        :className="'mt-3'"
        v-model="$v.emailAddress.$model"
        :maxlength="100"
        :required="true"
      />
      <div
        class="text-danger"
        v-if="$v.emailAddress.$dirty && !$v.emailAddress.required"
        aria-live="assertive"
      >
        Email address is required
      </div>
      <div
        class="text-danger"
        v-if="$v.emailAddress.$dirty && !$v.emailAddress.email"
        aria-live="assertive"
      >
        Must be a valid email address
      </div>

      <PhoneInput
        :label="'Phone Number'"
        :id="'phone'"
        :className="'mt-3'"
        v-model="$v.phoneNumber.$model"
        :required="true"
      />
      <div
        class="text-danger"
        v-if="phoneNumber !== null && !$v.phoneNumber.isValidPhone"
        aria-live="assertive"
      >
        Valid phone number required
      </div>

      <div class="mb-3" v-if="uploadType === 'aop' || uploadType === 'coaop'">
        <Input
          :label="'Organization'"
          :className="'mt-3'"
          v-model="$v.organization.$model"
          :maxlength="70"
          :required="true"
        />
        <div
          class="text-danger"
          v-if="$v.organization.$dirty && !$v.organization.required"
          aria-live="assertive"
        >
          Organization is required
        </div>
      </div>

      <div class="mb-3" v-if="uploadType === 'oopa'">
        <Input
          :label="'Facility Name'"
          :className="'mt-3'"
          v-model="$v.facility.$model"
          :maxlength="70"
          :required="true"
        />
        <div
          class="text-danger"
          v-if="$v.facility.$dirty && !$v.facility.required"
          aria-live="assertive"
        >
          Facility name is required
        </div>
      </div>

      <h3><em>Information About This Submission</em></h3>
      <hr />

      <div
        class="form-group"
        v-if="uploadType === 'aop' || uploadType === 'oopa'"
      >
        <p>Submission Type</p>
        <input
          type="radio"
          id="new"
          value="New Submission"
          name="submissionType"
          v-model="$v.submissionType.$model"
          required
        />&nbsp;
        <label for="new">New Submission</label>
        <br />
        <input
          type="radio"
          id="revised"
          value="Revised Submission"
          name="submissionType"
          v-model="$v.submissionType.$model"
        />&nbsp;
        <label for="revised">Revised Submission</label>
        <div
          class="text-danger"
          v-if="$v.submissionType.$dirty && !$v.submissionType.required"
          aria-live="assertive"
        >
          Please indicate if this is a new or revised submission
        </div>
      </div>

      <div v-if="uploadType === 'aop' || uploadType === 'coaop'">
        <Input
          :label="'Practitioner Number'"
          :className="'mt-3'"
          v-model="$v.primaryNumber.$model"
          :maxlength="5"
          :required="true"
        />
        <div
          class="text-danger"
          v-if="$v.primaryNumber.$dirty && !$v.primaryNumber.required"
          aria-live="assertive"
        >
          Practitioner number is required
        </div>
        <div
          class="text-danger"
          v-if="$v.primaryNumber.$dirty && !$v.primaryNumber.alphaNum"
          aria-live="assertive"
        >
          Invalid practitioner number
        </div>
        <div
          class="text-danger"
          v-if="$v.primaryNumber.$dirty && !$v.primaryNumber.minLength"
          aria-live="assertive"
        >
          Invalid practitioner number
        </div>

        <Input
          :label="'Practitioner Last Name'"
          :className="'mt-3'"
          v-model="$v.primaryLastName.$model"
          :maxlength="35"
          :required="true"
        />
        <div
          class="text-danger"
          v-if="$v.primaryLastName.$dirty && !$v.primaryLastName.required"
          aria-live="assertive"
        >
          Practitioner last name is required
        </div>
        <div
          class="text-danger"
          v-if="$v.primaryLastName.$dirty && $v.primaryLastName.required && !$v.primaryLastName.isValidLastName"
          aria-live="assertive"
        >
          Invalid practitioner last name
        </div>
      </div>

      <div v-if="uploadType === 'oopa'">
        <Input
          :label="'Primary Practitioner Number'"
          :className="'mt-3'"
          v-model="$v.primaryNumber.$model"
          :maxlength="5"
          :required="true"
        />
        <div
          class="text-danger"
          v-if="$v.primaryNumber.$dirty && !$v.primaryNumber.required"
          aria-live="assertive"
        >
          Primary practitioner number is required
        </div>
        <div
          class="text-danger"
          v-if="$v.primaryNumber.$dirty && !$v.primaryNumber.alphaNum"
          aria-live="assertive"
        >
          Invalid practitioner number
        </div>
        <div
          class="text-danger"
          v-if="$v.primaryNumber.$dirty && !$v.primaryNumber.minLength"
          aria-live="assertive"
        >
          Invalid practitioner number
        </div>

        <Input
          :label="'Primary Practitioner Last Name'"
          :className="'mt-3'"
          v-model="$v.primaryLastName.$model"
          :maxlength="35"
          :required="true"
        />
        <div
          class="text-danger"
          v-if="$v.primaryLastName.$dirty && !$v.primaryLastName.required"
          aria-live="assertive"
        >
          Primary practitioner last name is required
        </div>
        <div
          class="text-danger"
          v-if="$v.primaryLastName.$dirty && $v.primaryLastName.required && !$v.primaryLastName.isValidLastName"
          aria-live="assertive"
        >
          Invalid practitioner last name
        </div>

        <Input
          :label="'Secondary Practitioner Number (optional)'"
          :className="'mt-3'"
          v-model="$v.secondaryNumber.$model"
        />
        <div
          class="text-danger"
          v-if="$v.secondaryNumber.$dirty && !$v.secondaryNumber.alphaNum"
          aria-live="assertive"
        >
          Invalid practitioner number
        </div>
        <div
          class="text-danger"
          v-if="$v.secondaryNumber.$dirty && !$v.secondaryNumber.minLength"
          aria-live="assertive"
        >
          Invalid practitioner number
        </div>

        <Input
          :label="'Secondary Practitioner Last Name (optional)'"
          :className="'mt-3'"
          v-model="$v.secondaryLastName.$model"
          :maxlength="35"
        />
        <div
          class="text-danger"
          v-if="$v.secondaryLastName.$dirty && !$v.secondaryLastName.isValidLastName"
          aria-live="assertive"
        >
          Invalid practitioner last name
        </div>
      </div>

      <TextArea
        :label="'Comments (optional)'"
        :className="'mt-3'"
        v-model="comments"
        :maxlength="210"
      />

      <div class="mt-3 mb">
        <h3>
          <em>Attach Completed {{ uploadTitle }} Form</em>
        </h3>
        <hr />
        <div class="container">
          <div class="row">
            <div class="col-md upload-container">
              <FileUploader v-model="files" />
              <div
                class="text-danger"
                v-if="$v.files.$dirty && !$v.files.required"
                aria-live="assertive"
              >
                Upload is required
              </div>
            </div>
            <div class="col-md notice">
              <strong>Note:</strong>
              <ul>
                <li>
                  For system security purposes, form must be saved in PDF file
                  format only
                </li>
                <li>
                  File must be named for the practitioner who is named on the
                  Assignment of Payment form
                </li>
                <li>In naming files, please:</li>
                <ul>
                  <li>Use the practitioner's last name then first name</li>
                  <li>Use lower case letters only</li>
                  <li>
                    Use dashes "-" to separate names (do not use spaces or
                    underscores)
                  </li>
                  <li>
                    Do not use special characters including spaces, commas,
                    underscores or periods
                  </li>
                  <li>
                    Example of proper naming convention: smith-john;
                    brown-susan; white-bob
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-if="credentialsRequired === 'true'" class="mb">
        <h3>
          <em>Attach Confirmation of Practitioner Credentials Documents</em>
        </h3>
        <hr />
        <div class="container">
          <div class="row">
            <div class="col-md upload-container">
              <FileUploader v-model="credentials" />
              <div
                class="text-danger"
                v-if="
                  $v.credentials.$dirty &&
                    credentialsRequired &&
                    !$v.credentials.required
                "
                aria-live="assertive"
              >
                Upload is required
              </div>
            </div>
            <div class="col-md notice">
              <strong>Note:</strong>
              <p>
                You can add as many documents as needed. Scan the document, or
                take a photo of it. Make sure that it's:
              </p>
              <ul>
                <li>The entire document, from corner to corner</li>
                <li>Rotated correctly (not upside down or sideways)</li>
                <li>In focus and easy to read</li>
                <li>Documents must be uploaded in PDF file format only</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Button
        label="Continue"
        :styling="!$v.$invalid ? 'bcgov-normal-blue btn mb' : 'disabled btn mb'"
        v-on:button-click="nextPage"
      />
  </div>
</template>

<script>
import Button from "../components/Button";
import Input from "../components/Input";
import PhoneInput from "../components/PhoneInput";
import FileUploader from "../components/file-uploader/FileUploader.vue";
import TextArea from "../components/TextArea.vue";
import {
  required,
  minLength,
  alpha,
  alphaNum,
  email
} from "vuelidate/lib/validators";
import pageStateService from "../services/page-state-service";
import routes from "../router/routes";
import {
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_EMAIL_ADDRESS,
  SET_PHONE_NUMBER,
  SET_UPLOADED_FORMS,
  SET_UPLOAD_TYPE,
  SET_CREDENTIALS_REQUIRED,
  SET_FACILITY_NAME,
  SET_SUBMISSION_TYPE,
  SET_PRIMARY_NUMBER,
  SET_PRIMARY_LAST_NAME,
  SET_SECONDARY_NUMBER,
  SET_SECONDARY_LAST_NAME,
  SET_COMMENTS,
  SET_UPLOADED_CREDENTIALS,
  SET_ORGANIZATION
} from "../store/index";
import strings from "../locale/strings.en";
import { scrollTo, scrollToError } from "../helpers/scroll";

const isValidPhone = ph => {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(ph);
}

const isValidLastName = name => {
  return /([a-z][a-z,', ,\-,.]{1,})/gi.test(name);
}

export default {
  name: "SubmissionInfo",
  components: {
    Button,
    FileUploader,
    Input,
    PhoneInput,
    TextArea
  },
  data: () => {
    return {
      uploadType: null,
      credentialsRequired: null,
      firstName: null,
      lastName: null,
      emailAddress: null,
      phoneNumber: null,
      organization: null,
      facility: null,
      files: null,
      credentials: null,
      submissionType: null,
      primaryNumber: null,
      primaryLastName: null,
      secondaryNumber: null,
      secondaryLastName: null,
      comments: null
    };
  },
  validations() {
    if (this.uploadType === 'aop' && this.credentialsRequired === 'true') {
      return {
        uploadType: {
          required
        },
        credentialsRequired: {
          required
        },
        firstName: {
          required,
          alpha
        },
        lastName: {
          required,
          alpha
        },
        phoneNumber: {
          isValidPhone
        },
        emailAddress: {
          required,
          email
        },
        organization: {
          required
        },
        files: {
          required
        },
        credentials: {
          required
        },
        submissionType: {
          required
        },
        primaryNumber: {
          required,
          alphaNum,
          minLength: minLength(5)
        },
        primaryLastName: {
          required,
          isValidLastName
        },
        secondaryNumber: {
          alphaNum,
          minLength: minLength(5)
        },
        secondaryLastName: {
          isValidLastName
        }
      };
    } else if (this.uploadType === 'aop') {
      return {
        uploadType: {
          required
        },
        credentialsRequired: {
          required
        },
        firstName: {
          required,
          alpha
        },
        lastName: {
          required,
          alpha
        },
        phoneNumber: {
          isValidPhone
        },
        emailAddress: {
          required,
          email
        },
        organization: {
          required
        },
        files: {
          required
        },
        submissionType: {
          required
        },
        primaryNumber: {
          required,
          alphaNum,
          minLength: minLength(5)
        },
        primaryLastName: {
          required,
          isValidLastName
        },
        secondaryNumber: {
          alphaNum,
          minLength: minLength(5)
        },
        secondaryLastName: {
          isValidLastName
        }
      };
    } else if (this.uploadType === 'coaop') {
      return {
        uploadType: {
          required
        },
        firstName: {
          required,
          alpha
        },
        lastName: {
          required,
          alpha
        },
        phoneNumber: {
          isValidPhone
        },
        emailAddress: {
          required,
          email
        },
        organization: {
          required
        },
        files: {
          required
        },
        primaryNumber: {
          required,
          alphaNum,
          minLength: minLength(5)
        },
        primaryLastName: {
          required,
          isValidLastName
        },
        secondaryNumber: {
          alphaNum,
          minLength: minLength(5)
        },
        secondaryLastName: {
          isValidLastName
        }
      };
    } else if (this.uploadType === 'oopa') {
      return {
        uploadType: {
          required
        },
        firstName: {
          required,
          alpha
        },
        lastName: {
          required,
          alpha
        },
        phoneNumber: {
          isValidPhone
        },
        emailAddress: {
          required,
          email
        },
        facility: {
          required
        },
        files: {
          required
        },
        submissionType: {
          required
        },
        primaryNumber: {
          required,
          alphaNum,
          minLength: minLength(5)
        },
        primaryLastName: {
          required,
          isValidLastName
        },
        secondaryNumber: {
          alphaNum,
          minLength: minLength(5)
        },
        secondaryLastName: {
          isValidLastName
        }
      };
    } else {
      return {
        uploadType: {
          required
        }
      }
    }
  },
  created() {
    this.firstName = "John";
    this.lastName = "Smith";
    this.uploadType = this.$store.state.uploadType;
    this.credentialsRequired = this.$store.state.credentialsRequired;
    this.emailAddress = this.$store.state.emailAddress;
    this.phoneNumber = this.$store.state.phoneNumber;
    this.organization = this.$store.state.organization;
    this.facility = this.$store.state.facilityName;
    this.submissionType = this.$store.state.submissionType;
    this.primaryNumber = this.$store.state.primaryNumber;
    this.primaryLastName = this.$store.state.primaryLastName;
    this.secondaryNumber = this.$store.state.secondaryNumber;
    this.secondaryLastName = this.$store.state.secondaryLastName;
    this.comments = this.$store.state.comments;
    this.files = this.$store.state.uploadedForms;
    this.credentials = this.$store.state.uploadedCredentials;
  },
  methods: {
    nextPage: function() {
      this.$v.$touch();

      // Workaround for masked input 
      if (this.phoneNumber === null) this.phoneNumber = undefined;

      if (this.$v.$invalid) {
        console.log('this.$v:', this.$v);
        scrollToError();
        return;
      }
      this.$store.dispatch(SET_UPLOAD_TYPE, this.uploadType);
      this.$store.dispatch(SET_CREDENTIALS_REQUIRED, this.credentialsRequired);
      this.$store.dispatch(SET_FIRST_NAME, this.firstName);
      this.$store.dispatch(SET_LAST_NAME, this.lastName);
      this.$store.dispatch(SET_EMAIL_ADDRESS, this.emailAddress);
      this.$store.dispatch(SET_PHONE_NUMBER, this.phoneNumber);
      this.$store.dispatch(SET_ORGANIZATION, this.organization);
      this.$store.dispatch(SET_FACILITY_NAME, this.facility);
      this.$store.dispatch(SET_SUBMISSION_TYPE, this.submissionType);
      this.$store.dispatch(SET_PRIMARY_NUMBER, this.primaryNumber);
      this.$store.dispatch(SET_PRIMARY_LAST_NAME, this.primaryLastName);
      this.$store.dispatch(SET_SECONDARY_NUMBER, this.secondaryNumber);
      this.$store.dispatch(SET_SECONDARY_LAST_NAME, this.secondaryLastName);
      this.$store.dispatch(SET_COMMENTS, this.comments);
      this.$store.dispatch(SET_UPLOADED_FORMS, this.files);
      this.$store.dispatch(SET_UPLOADED_CREDENTIALS, this.credentials);

      pageStateService.setPageIncomplete(routes.SUBMISSION_INFO.path);
      const path = routes.REVIEW.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
    },
    resetCredentialsRequired: function() {
      this.credentialsRequired = null;
    }
  },
  // Required in order to block back navigation on second page.
  beforeRouteLeave(to, from, next) {
    if (to.path === routes.REVIEW.path) {
      next();
    } else if (to.path === routes.HOME.path) {
      if (window.confirm(strings.NAVIGATION_CONFIRMATION_PROMPT)) {
        next();
      } else {
        next(false);
      }
    }
  },
  computed: {
    uploadTitle() {
      switch (this.uploadType) {
        case "aop":
          return "Assignment of Payment";
        case "coaop":
          return "Cancellation of Assignment of Payment";
        case "oopa":
          return "Operator Payment Administration";
        default:
          return "";
      }
    },
    validPhone: function() {
      return isValidPhone(this.phoneNumber);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.text-danger {
  color: #b33238 !important;
}

hr {
  margin-top: 0.5rem;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 0;
}

.notice {
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 8px 15px;
}

.upload-container {
  @media (max-width: 767.98px) {
    padding-left: 0;
    padding-right: 0;
  }

  > * {
    height: 100%;
  }
}

.mb {
  margin-bottom: 80px;
}

.btn {
  position: fixed;
  bottom: 0px;
  right: 40px;
}

.disabled {
  background: #f3f3f3;
}

</style>
