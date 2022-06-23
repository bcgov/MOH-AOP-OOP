<template>
  <div>
    <SignOutHeader :heading="'Diagnostic Services - Secure Upload Tool'" />
    <ProgressBar :routes="stepRoutes" :currentPath="$route.path" />
    <Loader v-if="$store.state.loading" />
    <main v-else>
      <form class="container py-5 px-2">
        <h1>Select a form</h1>
        <br />
        <h2>Please select the form that you want to submit:</h2>
        <hr />
        <p>You can upload and send ONLY ONE form at a time.</p>
        <p>
          After submitting your first form, you can submit additional forms from
          the "Confirmation" screen. The submitter information will populate
          automatically for the second and subsequent submissions.
        </p>
        <div class="form-group">
          <div class="radio-group">
            <input
              type="radio"
              id="AOP"
              value="AOP"
              name="uploadType"
              v-model="uploadType"
              @change="resetFiles"
              @blur="handleBlurField(v$.uploadType)"
              required
              aria-required="true"
            />&nbsp;
            <label for="AOP"
              >Diagnostic Facility Services Assignment of Payment and Medical
              Director Authorization (HLTH 1908)</label
            >
          </div>
          <br />
          <div class="radio-group">
            <input
              type="radio"
              id="COAOP"
              value="COAOP"
              name="uploadType"
              v-model="uploadType"
              @change="resetFiles"
              @blur="handleBlurField(v$.uploadType)"
            />&nbsp;
            <label for="COAOP"
              >Diagnostic Facility Services Cancellation of Assignment of
              Payment (HLTH 1926)</label
            >
          </div>
          <br />
          <div class="radio-group">
            <input
              type="radio"
              id="OOPA"
              value="OOPA"
              name="uploadType"
              v-model="uploadType"
              @change="resetFiles"
              @blur="handleBlurField(v$.uploadType)"
            />&nbsp;
            <label for="OOPA"
              >Laboratory Services Outpatient Operator Payment Administration
              (HLTH 2999)</label
            >
          </div>
          <div
            class="text-danger"
            v-if="v$.uploadType.$dirty && v$.uploadType.required.$invalid"
          >
            Field is required
          </div>
        </div>
        <div class="mt-5" v-if="uploadType === 'AOP'">
          <h3>
            Do you need to submit confirmation of credentials for this
            Assignment of Payment?
          </h3>
          <hr />
          <div class="radio-group">
            <input
              type="radio"
              id="no"
              value="false"
              required
              aria-required="true"
              name="credentialsRequired"
              v-model="credentialsRequired"
              @change="resetCredentials"
              @blur="handleBlurField(v$.credentialsRequired)"
            />&nbsp;
            <label for="no">No</label>
          </div>
          <br />
          <div class="radio-group">
            <input
              type="radio"
              id="yes"
              value="true"
              name="credentialsRequired"
              v-model="credentialsRequired"
              @change="resetCredentials"
              @blur="handleBlurField(v$.credentialsRequired)"
            />&nbsp;
            <label for="yes">Yes</label>
          </div>
          <div
            class="text-danger"
            v-if="
              v$.credentialsRequired.$dirty &&
              uploadType === 'AOP' &&
              v$.credentialsRequired.required.$invalid
            "
          >
            Field is required
          </div>
        </div>
        <div
          class="mt-5"
          v-if="uploadType === 'AOP' && credentialsRequired !== ''"
        >
          <h2 v-if="credentialsRequired === 'true'">
            Submit your Assignment of Payment and Medical Director Authorization
            form with Confirmation of Practitioner Credentials
          </h2>
          <h2 v-if="credentialsRequired === 'false'">
            Submit your Assignment of Payment and Medical Director Authorization
            form
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
        <div class="mt-5" v-if="uploadType === 'COAOP'">
          <h2>Submit your Cancellation of Assignment of Payment</h2>
          <hr />
          <p>
            When submitting a Cancellation of Assignment of Payment, please
            ensure the form is complete and signed by the practitioner and payee
            representative. Only fully completed and authorized Cancellation of
            Assignment of Payment forms can be processed.
          </p>
        </div>
        <div class="mt-5" v-if="uploadType === 'OOPA'">
          <h2>
            Laboratory Services: Submit your Outpatient Operator Payment
            Administration form
          </h2>
          <hr />
          <p>
            Please use the below fields to submit your completed Operator
            Payment Administration form.
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
            (uploadType === 'AOP' && credentialsRequired !== '') ||
            uploadType === 'COAOP' ||
            uploadType === 'OOPA'
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
              Click "Select a file" or "Add" and locate the scanned PDF form on
              your computer
            </li>
            <li>Once the file has been uploaded, click the "Submit" button</li>
            <li>
              A "Confirmation" window will display on your computer with the
              result of the transaction
            </li>
          </ol>
        </div>
        <p v-if="uploadType === 'OOPA'">
          To report any issues with the secure upload tool, please send an email
          to
          <a href="mailto:labfacilities@phsa.ca">labfacilities@phsa.ca</a>
        </p>
        <div
          v-if="
            (uploadType === 'AOP' && credentialsRequired !== '') ||
            uploadType === 'COAOP' ||
            uploadType === 'OOPA'
          "
        >
          <h3 class="mt-5"><em>Submitter information</em></h3>
          <hr />
          <p>
            Provide details below about the person submitting the form (clerk,
            administrator, etc.)
          </p>
          <Input :label="'First name'" v-model="firstName" :disabled="true" :inputStyle="mediumStyles"/>
          <Input
            :label="'Last name'"
            :className="'mt-3'"
            v-model="lastName"
            :disabled="true"
            :inputStyle="mediumStyles"
          />
          <Input
            :label="'Email address'"
            :className="'mt-3'"
            v-model="emailAddress"
            @blur="handleBlurField(v$.emailAddress)"
            maxlength="100"
            :required="true"
            :inputStyle="mediumStyles"
          />
          <div
            class="text-danger"
            v-if="v$.emailAddress.$dirty && v$.emailAddress.required.$invalid"
            aria-live="assertive"
          >
            Email address is required
          </div>
          <div
            class="text-danger"
            v-if="
              v$.emailAddress.$dirty &&
              !v$.emailAddress.required.$invalid &&
              v$.emailAddress.isValidEmail.$invalid
            "
            aria-live="assertive"
          >
            Invalid email address
          </div>

          <div class="mt-3">
            <label for="phone">Phone number:</label><br />
            <input
              id="phone"
              type="text"
              name="phoneNumber"
              class="form-control"
              v-maska="{ mask: '(Z##) ###-####', tokens: { 'Z': { pattern: /[1-9]/ }}}" 
              v-model="phoneNumber"
              :required="true"
              :aria-required="true"
              :style="mediumStyles"
              @blur="handleBlurField(v$.phoneNumber)"
            />
          </div>
          <div
            class="text-danger"
            v-if="v$.phoneNumber.$dirty && v$.phoneNumber.isValidPhone.$invalid"
            aria-live="assertive"
          >
            Valid phone number is required
          </div>

          <div class="mt-3">
            <label for="extension">Phone extension (optional):</label><br />
            <input
              id="extension"
              type="text"
              name="phoneExtension"
              class="form-control"
              v-model="phoneExtension"
              :style="mediumStyles"
              @blur="handleBlurField(v$.phoneExtension)"
              v-maska="{ mask: '##########'}"
            />
          </div>

          <div
            class="mb-3"
            v-if="uploadType === 'AOP' || uploadType === 'COAOP'"
          >
            <Input
              :label="'Organization'"
              :className="'mt-3'"
              v-model="organization"
              @blur="handleBlurField(v$.organization)"
              maxlength="70"
              :required="true"
              :inputStyle="mediumStyles"
            />
            <div
              class="text-danger"
              v-if="v$.organization.$dirty && v$.organization.required.$invalid"
              aria-live="assertive"
            >
              Organization is required
            </div>
            <div
              class="text-danger"
              v-if="
                v$.organization.$dirty &&
                !v$.organization.required.$invalid &&
                v$.organization.hasNoInvalidJSON.$invalid
              "
              aria-live="assertive"
            >
              Invalid organization
            </div>
          </div>

          <div class="mb-3" v-if="uploadType === 'OOPA'">
            <Input
              :label="'Facility name'"
              :className="'mt-3'"
              v-model="facility"
              @blur="handleBlurField(v$.facility)"
              maxlength="70"
              :required="true"
              :inputStyle="mediumStyles"
            />
            <div
              class="text-danger"
              v-if="v$.facility.$dirty && v$.facility.required.$invalid"
              aria-live="assertive"
            >
              Facility name is required
            </div>
            <div
              class="text-danger"
              v-if="
                v$.facility.$dirty &&
                !v$.facility.required.$invalid &&
                v$.facility.hasNoInvalidJSON.$invalid
              "
              aria-live="assertive"
            >
              Invalid facility name
            </div>
          </div>

          <h3 class="mt-5"><em>Information about this submission</em></h3>
          <hr />

          <div
            class="form-group"
            v-if="uploadType === 'AOP' || uploadType === 'OOPA'"
          >
            <p>Submission Type:</p>
            <div class="radio-group">
              <input
                type="radio"
                id="new"
                value="New Submission"
                name="submissionType"
                v-model="submissionType"
                @blur="handleBlurField(v$.submissionType)"
                required
                aria-required="true"
              />&nbsp;
              <label for="new">New submission</label>
            </div>
            <br />
            <div class="radio-group">
              <input
                type="radio"
                id="revised"
                value="Revised Submission"
                name="submissionType"
                v-model="submissionType"
                @blur="handleBlurField(v$.submissionType)"
              />&nbsp;
              <label for="revised">Revised submission</label>
            </div>
            <div
              class="text-danger"
              v-if="v$.submissionType.$dirty && v$.submissionType.required.$invalid"
              aria-live="assertive"
            >
              Please indicate if this is a new or revised submission
            </div>
          </div>

          <div v-if="uploadType === 'AOP' || uploadType === 'COAOP'">
            <Input
              :label="'Practitioner number'"
              :className="'mt-3'"
              v-model="primaryNumber"
              @blur="handleBlurField(v$.primaryNumber)"
              maxlength="5"
              :required="true"
              :inputStyle="mediumStyles"
            />
            <div
              class="text-danger"
              v-if="v$.primaryNumber.$dirty && v$.primaryNumber.required.$invalid"
              aria-live="assertive"
            >
              Practitioner number is required
            </div>
            <div
              class="text-danger"
              v-if="v$.primaryNumber.$dirty && v$.primaryNumber.alphaNum.$invalid"
              aria-live="assertive"
            >
              Invalid practitioner number
            </div>
            <div
              class="text-danger"
              v-if="
                v$.primaryNumber.$dirty &&
                !v$.primaryNumber.alphaNum.$invalid &&
                v$.primaryNumber.minLength.$invalid
              "
              aria-live="assertive"
            >
              Invalid practitioner number
            </div>

            <Input
              :label="'Practitioner last name'"
              :className="'mt-3'"
              v-model="primaryLastName"
              @blur="handleBlurField(v$.primaryLastName)"
              maxlength="29"
              :required="true"
              :inputStyle="mediumStyles"
            />
            <div
              class="text-danger"
              v-if="v$.primaryLastName.$dirty && v$.primaryLastName.required.$invalid"
              aria-live="assertive"
            >
              Practitioner last name is required
            </div>
            <div
              class="text-danger"
              v-if="
                v$.primaryLastName.$dirty &&
                !v$.primaryLastName.required.$invalid &&
                v$.primaryLastName.isValidLastName.$invalid
              "
              aria-live="assertive"
            >
              Invalid practitioner last name
            </div>
          </div>

          <div v-if="uploadType === 'OOPA'">
            <Input
              :label="'Primary practitioner number'"
              :className="'mt-3'"
              v-model="primaryNumber"
              @blur="handleBlurField(v$.primaryNumber)"
              maxlength="5"
              :required="true"
              :inputStyle="mediumStyles"
            />
            <div
              class="text-danger"
              v-if="v$.primaryNumber.$dirty && v$.primaryNumber.required.$invalid"
              aria-live="assertive"
            >
              Primary practitioner number is required
            </div>
            <div
              class="text-danger"
              v-if="v$.primaryNumber.$dirty && v$.primaryNumber.alphaNum.$invalid"
              aria-live="assertive"
            >
              Invalid primary practitioner number
            </div>
            <div
              class="text-danger"
              v-if="
                v$.primaryNumber.$dirty &&
                !v$.primaryNumber.alphaNum.$invalid &&
                v$.primaryNumber.minLength.$invalid
              "
              aria-live="assertive"
            >
              Invalid primary practitioner number
            </div>

            <Input
              :label="'Primary practitioner last name'"
              :className="'mt-3'"
              v-model="primaryLastName"
              @blur="handleBlurField(v$.primaryLastName)"
              maxlength="29"
              :required="true"
              :inputStyle="mediumStyles"
            />
            <div
              class="text-danger"
              v-if="v$.primaryLastName.$dirty && v$.primaryLastName.required.$invalid"
              aria-live="assertive"
            >
              Primary practitioner last name is required
            </div>
            <div
              class="text-danger"
              v-if="
                v$.primaryLastName.$dirty &&
                !v$.primaryLastName.required.$invalid &&
                v$.primaryLastName.isValidLastName.$invalid
              "
              aria-live="assertive"
            >
              Invalid primary practitioner last name
            </div>

            <Input
              :label="'Secondary practitioner number (optional)'"
              :className="'mt-3'"
              maxlength="5"
              v-model="secondaryNumber"
              @blur="handleBlurField(v$.secondaryNumber)"
              :inputStyle="mediumStyles"
            />
            <div
              class="text-danger"
              v-if="v$.secondaryNumber.$dirty && v$.secondaryNumber.alphaNum.$invalid"
              aria-live="assertive"
            >
              Invalid secondary practitioner number
            </div>
            <div
              class="text-danger"
              v-if="
                v$.secondaryNumber.$dirty &&
                !v$.secondaryNumber.alphaNum.$invalid &&
                v$.secondaryNumber.minLength.$invalid
              "
              aria-live="assertive"
            >
              Invalid secondary practitioner number
            </div>
            <div
              class="text-danger"
              v-if="
                v$.secondaryLastName.$dirty &&
                !v$.secondaryLastName.isValidSecondaryLastName.$invalid &&
                v$.secondaryLastName.hasSecondaryNumber.$invalid
              "
              aria-live="assertive"
            >
              Secondary practitioner number is required if supplying a secondary
              practitioner last name
            </div>

            <Input
              :label="'Secondary practitioner last name (optional)'"
              :className="'mt-3'"
              v-model="secondaryLastName"
              @blur="handleBlurField(v$.secondaryLastName)"
              maxlength="29"
              :inputStyle="mediumStyles"
            />
            <div
              class="text-danger"
              v-if="
                v$.secondaryLastName.$dirty &&
                v$.secondaryLastName.isValidSecondaryLastName.$invalid
              "
              aria-live="assertive"
            >
              Invalid secondary practitioner last name
            </div>
            <div
              class="text-danger"
              v-if="
                v$.secondaryNumber.$dirty &&
                !v$.secondaryNumber.alphaNum.$invalid &&
                !v$.secondaryNumber.minLength.$invalid &&
                v$.secondaryNumber.hasSecondaryLastName.$invalid
              "
              aria-live="assertive"
            >
              Secondary practitioner last name is required if supplying a
              secondary practitioner number
            </div>
          </div>

          <div class="mt-3">
            <label for="comments">Comments (optional):</label><br />
            <textarea
              id="comments"
              class="form-control"
              maxlength="210"
              alt="comments"
              name="comments"
              v-model="comments"
              @blur="handleBlurField(v$.comments)"
            />
            <div
              class="text-danger"
              v-if="v$.comments.$dirty && v$.comments.hasNoInvalidJSON.$invalid"
              aria-live="assertive"
            >
              Invalid comment
            </div>
          </div>

          <div class="mt-5">
            <h3>
              <em>Attach completed {{ uploadTitle }} form</em>
            </h3>
            <hr />
            <div class="container">
              <div class="row">
                <div class="upload-container">
                  <FileUploader v-model="files" />
                  <div
                    class="text-danger"
                    v-if="v$.files.$dirty && v$.files.required.$invalid"
                    aria-live="assertive"
                  >
                    Please upload required document
                  </div>
                  <div
                    class="text-danger"
                    v-if="
                      v$.files.$dirty &&
                      credentialsRequired &&
                      !v$.files.required.$invalid &&
                      v$.credentials &&
                      v$.credentials.hasDistinctFiles.$invalid
                    "
                    aria-live="assertive"
                  >
                    Please upload distinct documents for Assignment of Payment
                    form and for credentials
                  </div>
                  <div class="notice">
                    <strong>Note:</strong>
                    <ul>
                      <li>
                        For system security purposes, form must be saved in
                        <strong>PDF file format only</strong>
                      </li>
                      <li>
                        File must be named for the practitioner who is named on
                        the Assignment of Payment form
                      </li>
                      <li>In naming files, please:</li>
                      <ul>
                        <li>
                          Use the practitioner's last name then first name
                        </li>
                        <li>Use lower case letters only</li>
                        <li>
                          Use dashes "-" to separate names (do not use spaces or
                          underscores)
                        </li>
                        <li>
                          Do not use special characters including spaces,
                          commas, underscores or periods
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
          </div>
          <div v-if="credentialsRequired === 'true'" class="mt-5">
            <h3>
              <em>Attach confirmation of practitioner credentials documents</em>
            </h3>
            <hr />
            <div class="container">
              <div class="row">
                <div class="upload-container">
                  <FileUploader v-model="credentials" />
                  <div
                    class="text-danger"
                    v-if="
                      v$.credentials.$dirty &&
                      credentialsRequired &&
                      v$.credentials.required.$invalid
                    "
                    aria-live="assertive"
                  >
                    Please upload required document
                  </div>
                  <div
                    class="text-danger"
                    v-if="
                      v$.credentials.$dirty &&
                      credentialsRequired &&
                      !v$.credentials.required.$invalid &&
                      v$.credentials.hasDistinctFiles.$invalid
                    "
                    aria-live="assertive"
                  >
                    Please upload distinct documents for Assignment of Payment
                    form and for credentials
                  </div>
                  <div class="notice">
                    <strong>Note:</strong>
                    <p>
                      Scan the document, or take a photo of it. Make sure that
                      it's:
                    </p>
                    <ul>
                      <li>The entire document, from corner to corner</li>
                      <li>Rotated correctly (not upside down or sideways)</li>
                      <li>In focus and easy to read</li>
                      <li>
                        Documents must be uploaded in
                        <strong>PDF file format only</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
    <ContinueBar @continue="nextPage()" />
    <Footer />
  </div>
</template>

<script>
import SignOutHeader from "../components/SignOutHeader";
import ProgressBar from "../components/ProgressBar";
import Loader from "../components/Loader";
import ContinueBar from "../components/ContinueBar";
import { Input } from "common-lib-vue";
import { maska }from "maska";
import FileUploader from "../components/file-uploader/FileUploader.vue";
import Footer from "../components/Footer";
import { required, minLength, alphaNum } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { routes, stepRoutes } from "../router/routes";
import {
  SET_EMAIL_ADDRESS,
  SET_PHONE_NUMBER,
  SET_PHONE_EXTENSION,
  SET_UPLOADED_FORMS,
  SET_UPLOAD_TYPE,
  SET_CREDENTIALS_REQUIRED,
  SET_FACILITY,
  SET_SUBMISSION_TYPE,
  SET_PRIMARY_NUMBER,
  SET_PRIMARY_LAST_NAME,
  SET_SECONDARY_NUMBER,
  SET_SECONDARY_LAST_NAME,
  SET_COMMENTS,
  SET_UPLOADED_CREDENTIALS,
  SET_ORGANIZATION,
} from "../store/index";
import { scrollTo, scrollToError } from "../helpers/scroll";
import {
  isValidEmail,
  isValidPhone,
  isValidLastName,
  isValidSecondaryLastName,
  hasSecondaryNumber,
  hasSecondaryLastName,
  hasDistinctFiles,
  hasNoInvalidJSON,
} from "../helpers/validators";
import FocusHeaderMixin from "../mixins/FocusHeaderMixin";
import NoNameLogoutMixin from "../mixins/NoNameLogoutMixin";
import { mediumStyles } from "../constants/input-styles";

export default {
  name: "SubmissionInfo",
  components: {
    SignOutHeader,
    ProgressBar,
    ContinueBar,
    FileUploader,
    Input,
    Loader,
    Footer,
  },
  mixins: [FocusHeaderMixin, NoNameLogoutMixin],
  directives: { maska },
  data: () => {
    return {
      stepRoutes: stepRoutes,
      uploadType: "",
      credentialsRequired: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      phoneExtension: "",
      organization: "",
      facility: "",
      files: [],
      credentials: [],
      submissionType: "",
      primaryNumber: "",
      primaryLastName: "",
      secondaryNumber: "",
      secondaryLastName: "",
      comments: "",
      mediumStyles: mediumStyles
    };
  },
  setup () {
    return { v$: useVuelidate() }
  },
  validations() {
    if (this.uploadType === "AOP" && this.credentialsRequired === "true") {
      return {
        uploadType: {
          required,
        },
        credentialsRequired: {
          required,
        },
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        phoneNumber: {
          isValidPhone,
        },
        emailAddress: {
          required,
          isValidEmail,
        },
        organization: {
          required,
          hasNoInvalidJSON,
        },
        files: {
          required,
        },
        credentials: {
          required,
          hasDistinctFiles,
        },
        submissionType: {
          required,
        },
        primaryNumber: {
          required,
          alphaNum,
          minLength: minLength(5),
        },
        primaryLastName: {
          required,
          isValidLastName,
        },
        comments: {
          hasNoInvalidJSON,
        },
      };
    } else if (this.uploadType === "AOP") {
      return {
        uploadType: {
          required,
        },
        credentialsRequired: {
          required,
        },
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        phoneNumber: {
          isValidPhone,
        },
        emailAddress: {
          required,
          isValidEmail,
        },
        organization: {
          required,
          hasNoInvalidJSON,
        },
        files: {
          required,
        },
        submissionType: {
          required,
        },
        primaryNumber: {
          required,
          alphaNum,
          minLength: minLength(5),
        },
        primaryLastName: {
          required,
          isValidLastName,
        },
        comments: {
          hasNoInvalidJSON,
        },
      };
    } else if (this.uploadType === "COAOP") {
      return {
        uploadType: {
          required,
        },
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        phoneNumber: {
          isValidPhone,
        },
        emailAddress: {
          required,
          isValidEmail,
        },
        organization: {
          required,
          hasNoInvalidJSON,
        },
        files: {
          required,
        },
        primaryNumber: {
          required,
          alphaNum,
          minLength: minLength(5),
        },
        primaryLastName: {
          required,
          isValidLastName,
        },
        comments: {
          hasNoInvalidJSON,
        },
      };
    } else if (this.uploadType === "OOPA") {
      return {
        uploadType: {
          required,
        },
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        phoneNumber: {
          isValidPhone,
        },
        emailAddress: {
          required,
          isValidEmail,
        },
        facility: {
          required,
          hasNoInvalidJSON,
        },
        files: {
          required,
        },
        submissionType: {
          required,
        },
        primaryNumber: {
          required,
          alphaNum,
          minLength: minLength(5),
        },
        primaryLastName: {
          required,
          isValidLastName,
        },
        secondaryNumber: {
          alphaNum,
          minLength: minLength(5),
          hasSecondaryLastName,
        },
        secondaryLastName: {
          isValidSecondaryLastName,
          hasSecondaryNumber,
        },
        comments: {
          hasNoInvalidJSON,
        },
      };
    } else {
      return {
        uploadType: {
          required,
        },
      };
    }
  },
  created() {
    this.firstName = this.$store.state.firstName;
    this.lastName = this.$store.state.lastName;
    this.uploadType = this.$store.state.uploadType;
    this.credentialsRequired = this.$store.state.credentialsRequired;
    this.emailAddress = this.$store.state.emailAddress;
    this.phoneNumber = this.$store.state.phoneNumber;
    this.phoneExtension = this.$store.state.phoneExtension;
    this.organization = this.$store.state.organization;
    this.facility = this.$store.state.facility;
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
    handleBlurField(validationObject) {
      if (validationObject) {
        validationObject.$touch();
      }
    },
    nextPage() {
      this.v$.$touch();

      if (this.v$.$invalid) {
        scrollToError();
        return;
      }

      this.$store.commit(SET_UPLOAD_TYPE, this.uploadType);
      this.$store.commit(SET_CREDENTIALS_REQUIRED, this.credentialsRequired);
      this.$store.commit(SET_EMAIL_ADDRESS, this.emailAddress);
      this.$store.commit(SET_PHONE_NUMBER, this.phoneNumber);
      this.$store.commit(SET_PHONE_EXTENSION, this.phoneExtension);
      this.$store.commit(SET_ORGANIZATION, this.organization);
      this.$store.commit(SET_FACILITY, this.facility);
      this.$store.commit(SET_SUBMISSION_TYPE, this.submissionType);
      this.$store.commit(SET_PRIMARY_NUMBER, this.primaryNumber);
      this.$store.commit(SET_PRIMARY_LAST_NAME, this.primaryLastName);
      this.$store.commit(SET_SECONDARY_NUMBER, this.secondaryNumber);
      this.$store.commit(SET_SECONDARY_LAST_NAME, this.secondaryLastName);
      this.$store.commit(SET_COMMENTS, this.comments);
      this.files.forEach(x => (x.documentType = "AOPFORM"));
      this.$store.commit(SET_UPLOADED_FORMS, this.files);
      this.credentials.forEach(x => (x.documentType = "AOPCREDENTIAL"));
      this.$store.commit(SET_UPLOADED_CREDENTIALS, this.credentials);

      const path = routes.REVIEW.path;
      this.$router.push(path);
      scrollTo(0);
    },
    resetFiles() {
      this.files = [];
      this.credentials = [];
      this.credentialsRequired = "";
      if (this.uploadType === "AOP" || this.uploadType === "COAOP") {
        this.facility = "";
      } else {
        this.organization = "";
      }
    },
    resetCredentials() {
      this.credentials = [];
    },
  },
  computed: {
    uploadTitle() {
      switch (this.uploadType) {
        case "AOP":
          return "Assignment of Payment";
        case "COAOP":
          return "Cancellation of Assignment of Payment";
        case "OOPA":
          return "Operator Payment Administration";
        default:
          return "";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
hr {
  margin-top: 0.5rem;
}

main {
  min-height: calc(100vh - 203px);
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
  display: flex;
  flex-direction: column;
  width: 100%;
}

.btn {
  position: fixed;
  bottom: 0px;
  right: 40px;
}

.disabled {
  background: #bbbbbb;
}

.radio-group {
  display: flex;
  align-items: center;
  * {
    margin-right: 12px;
  }
}

</style>
