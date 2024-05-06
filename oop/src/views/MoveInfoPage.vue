<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Move information</h1>
        <p>
          <b>If you are moving within Canada,</b> coverage is provided for the
          remainder of the month in which you leave the province plus the next
          two months. If required, your coverage may be extended for up to three
          extra months to cover you while in transit. Upon arrival, you should
          immediately apply to the health plan of the new province or territory.
        </p>
        <p>
          <b>If you are moving outside Canada,</b> coverage is provided for the
          remainder of the month in which you leave the province.
        </p>
        <hr />

        <h2 class="mt-4 mb-0">Move dates</h2>
        <hr />
        <div class="row">
          <div class="col-md-6">
            <DateInput
              label="Permanent move from B.C."
              className="mt-3"
              cypressId="moveFromBCDate"
              name="moveFromBCDate"
              v-model="moveFromBCDate"
            />
            <div
              class="text-danger"
              v-if="
                v$.moveFromBCDate.$dirty && v$.moveFromBCDate.required.$invalid
              "
              aria-live="assertive"
            >
              A valid date of departure is required.
            </div>
            <div
              class="text-danger"
              v-if="
                v$.moveFromBCDate.$dirty &&
                !v$.moveFromBCDate.required.$invalid &&
                v$.moveFromBCDate.distantFutureValidator.$invalid
              "
              aria-live="assertive"
            >
              Date is too far in the future.
            </div>
            <div
              class="text-danger"
              v-if="
                v$.moveFromBCDate.$dirty &&
                !v$.moveFromBCDate.required.$invalid &&
                v$.moveFromBCDate.distantPastValidator.$invalid
              "
              aria-live="assertive"
            >
              Date is too far in the past.
            </div>
            <div
              class="text-danger"
              v-if="
                v$.moveFromBCDate.$dirty &&
                !v$.moveFromBCDate.required.$invalid &&
                v$.moveFromBCDate.beforeDateValidator.$invalid
              "
              aria-live="assertive"
            >
              Date of departure must be before the date of arrival.
            </div>
            <DateInput
              label="Arrival in new destination"
              className="mt-3"
              cypressId="arriveDestinationDate"
              name="arriveDestinationDate"
              v-model="arriveDestinationDate"
            />
            <div
              class="text-danger"
              v-if="
                v$.arriveDestinationDate.$dirty &&
                v$.arriveDestinationDate.required.$invalid
              "
              aria-live="assertive"
            >
              A valid date of arrival is required.
            </div>
            <div
              class="text-danger"
              v-if="
                v$.arriveDestinationDate.$dirty &&
                !v$.arriveDestinationDate.required.$invalid &&
                v$.arriveDestinationDate.distantFutureValidator.$invalid
              "
              aria-live="assertive"
            >
              Date is too far in the future.
            </div>
            <div
              class="text-danger"
              v-if="
                v$.arriveDestinationDate.$dirty &&
                !v$.arriveDestinationDate.required.$invalid &&
                v$.arriveDestinationDate.distantPastValidator.$invalid
              "
              aria-live="assertive"
            >
              Date is too far in the past.
            </div>
            <div
              class="text-danger"
              v-if="
                v$.arriveDestinationDate.$dirty &&
                !v$.arriveDestinationDate.required.$invalid &&
                v$.arriveDestinationDate.afterDateValidator.$invalid
              "
              aria-live="assertive"
            >
              Date of arrival must be after the date of departure.
            </div>
          </div>
        </div>

        <h2 class="mt-5 mb-3">New address</h2>
        <p>
          If you know your new address please enter it below. A confirmation
          letter will be sent to your new address following cancellation of
          coverage.
        </p>
        <hr />
        <p>Do you know your new address?</p>
        <Radio
          v-model="isNewAddressKnown"
          :items="isNewAddressKnownRadioItems"
          cypressId="isNewAddressKnown"
          name="isNewAddressKnown"
        />
        <div
          class="text-danger"
          v-if="
            v$.isNewAddressKnown.$dirty &&
            v$.isNewAddressKnown.required.$invalid
          "
          aria-live="assertive"
        >
          Please select one of the options above.
        </div>

        <div class="row">
          <div class="col-sm-7">
            <div
              v-if="isNewAddressKnown === 'Y'"
              class="is-new-address-known-y"
            >
              <CountrySelect
                label="Jurisdiction"
                ref="country"
                className="mt-3"
                class="country"
                cypressId="jurisdictionSelect"
                v-model="country"
              />
              <div
                class="text-danger"
                v-if="v$.country.$dirty && v$.country.required.$invalid"
                aria-live="assertive"
              >
                Jurisdiction is required.
              </div>
              <div v-if="country">
                <!-- Address -->
                <div v-if="country === 'Canada'">
                  <div
                    v-for="(addressLine, index) in addressLines"
                    :key="index"
                    class="address-line-v-for"
                  >
                    <div
                      v-if="isAddressValidatorEnabled && index === 0"
                      class="address-line-width"
                    >
                      <AddressDoctorInput
                        label="Address line 1"
                        v-model="addressLines[index].value"
                        id="address-line-1"
                        className="mt-3"
                        class="address-line"
                        placeholder="Example: 111-215 Sample Road"
                        serviceUrl="/oop/api/address"
                        cypressId="addressDoctorInput"
                        @addressSelected="addressSelectedHandler($event)"
                      />
                      <div
                        class="text-danger"
                        v-if="
                          index === 0 &&
                          v$.addressLines.$dirty &&
                          v$.addressLines.addressLineOneValidator.$invalid
                        "
                        aria-live="assertive"
                      >
                        Address line 1 is required.
                      </div>
                      <div
                        class="text-danger"
                        v-if="
                          index === 0 &&
                          v$.addressLines.$dirty &&
                          !v$.addressLines.addressLineOneValidator.$invalid &&
                          v$.addressLines
                            .addressLineOneSpecialCharacterValidator.$invalid
                        "
                        aria-live="assertive"
                      >
                        Address cannot include special characters except hyphen,
                        period, apostrophe, number sign and blank space.
                      </div>
                    </div>
                    <div v-else class="address-line-width">
                      <AddressLine
                        :childIndex="index"
                        :childAddressLine="addressLine"
                        @updateAddressLine="updateAddressLine"
                        class="mt-3 custom-style address-line address-line-width"
                      />
                    </div>
                    <div
                      v-if="
                        addressLines.length < getMaxAddressLines() &&
                        index === addressLines.length - 1
                      "
                      class="col-md-1 address-row-margin d-flex align-items-end"
                    >
                      <Button
                        label="+"
                        @click="addAddressField()"
                        cypressId="addAddressField"
                        class="add-remove-button mt-2 mt-sm-5 form-control"
                      />
                    </div>
                    <div
                      v-if="
                        addressLines.length > getMinAddressLines() &&
                        index === addressLines.length - 1
                      "
                      class="col-md-1 address-row-margin d-flex align-items-end"
                    >
                      <Button
                        label="-"
                        @click="removeAddressField()"
                        class="add-remove-button mt-2 mt-sm-5 form-control"
                      />
                    </div>
                  </div>
                </div>
                <div v-else class="row">
                  <!-- USA or Other -->
                  <div class="col mt-3">
                    <Input
                      label="Street address"
                      v-model="otherStreetAddress"
                      class="address-line"
                      id="address-line-1"
                      maxlength="25"
                      data-cy="usaOtherStreetAddress"
                    />
                    <div
                      class="text-danger"
                      v-if="
                        v$.otherStreetAddress.$dirty &&
                        v$.otherStreetAddress.required.$invalid
                      "
                      aria-live="assertive"
                    >
                      Street address is required.
                    </div>
                    <div
                      class="text-danger"
                      v-if="
                        v$.otherStreetAddress.$dirty &&
                        v$.otherStreetAddress.specialCharacterValidator.$invalid
                      "
                      aria-live="assertive"
                    >
                      Street address cannot include special characters except
                      hyphen, period, apostrophe, number sign and blank space.
                    </div>
                  </div>
                </div>
                <!-- City -->
                <div class="mt-3">
                  <Input
                    :label="isOtherJurisdiction() ? 'City, Province' : 'City'"
                    className="mt-3"
                    class="city"
                    v-model="city"
                    :maxlength="cityMaxLength(country).toString()"
                    data-cy="city"
                  />
                  <div
                    class="text-danger"
                    v-if="v$.city.$dirty && v$.city.required.$invalid"
                    aria-live="assertive"
                  >
                    {{ cityAndProvincePlural }}
                    {{ cityAndProvinceVerb }} required.
                  </div>
                  <div
                    class="text-danger"
                    v-if="
                      v$.city.$dirty &&
                      !v$.city.required.$invalid &&
                      v$.city.specialCharacterWithCommaValidator.$invalid
                    "
                    aria-live="assertive"
                  >
                    {{ cityAndProvincePlural }} cannot include special
                    characters except {{ isOtherJurisdiction() ? 'comma, ' : '' }} hyphen, period, apostrophe, number sign
                    and blank space.
                  </div>
                  <div
                    class="text-danger"
                    v-if="
                      v$.city.$dirty &&
                      !v$.city.required.$invalid &&
                      v$.city.maxLength.$invalid
                    "
                    aria-live="assertive"
                  >
                    {{ cityAndProvincePlural }} field exceeds the maximum number
                    of allowable characters.
                  </div>
                </div>
                <!-- Province/State -->
                <div v-if="country === 'Canada'">
                  <RegionSelect
                    label="Province"
                    ref="province"
                    className="mt-3"
                    class="province"
                    cypressId="regionSelect"
                    v-model="province"
                    defaultOptionLabel="Select a province"
                  />
                  <div
                    class="text-danger"
                    v-if="v$.province.$dirty && v$.province.required.$invalid"
                    aria-live="assertive"
                  >
                    Province is required.
                  </div>
                  <div
                    class="text-danger"
                    v-if="
                      v$.province.$dirty &&
                      !v$.province.required.$invalid &&
                      v$.province.nonBCValidator.$invalid
                    "
                    aria-live="assertive"
                  >
                    Address entered must be outside of BC.
                  </div>
                </div>
                <div v-else-if="country === 'United States'">
                  <StateInput
                    label="State"
                    ref="province"
                    className="mt-3"
                    class="province"
                    v-model="state"
                  />
                  <div
                    class="text-danger"
                    v-if="v$.state.$dirty && v$.state.required.$invalid"
                    aria-live="assertive"
                  >
                    State is required.
                  </div>
                </div>
                <!-- Postal/Zip code-->
                <div v-if="country === 'Canada'">
                  <PostalCodeInput
                    id="postalCode"
                    label="Postal code"
                    className="mt-3"
                    class="postal-code"
                    v-model="postalCode"
                    cypressId="postalCode"
                  />
                  <div
                    class="text-danger"
                    v-if="
                      v$.postalCode.$dirty && v$.postalCode.required.$invalid
                    "
                    aria-live="assertive"
                  >
                    Postal code is required.
                  </div>
                  <div
                    class="text-danger"
                    v-if="
                      v$.postalCode.$dirty &&
                      !v$.postalCode.required.$invalid &&
                      v$.postalCode.canadaPostalCodeLengthValidator.$invalid
                    "
                    aria-live="assertive"
                  >
                    The postal code you entered is not valid.
                  </div>
                  <div
                    class="text-danger"
                    v-if="
                      v$.postalCode.$dirty &&
                      !v$.postalCode.required.$invalid &&
                      v$.postalCode.nonBCPostalCodeValidator.$invalid
                    "
                    aria-live="assertive"
                  >
                    Postal code entered must be outside of BC.
                  </div>
                </div>
                <div v-else>
                  <!-- Any other jurisdiction-->
                  <Input
                    :label="
                      country === 'United States'
                        ? 'Zip Code (optional)'
                        : 'Zip/Postal Code (optional)'
                    "
                    className="mt-3"
                    class="city"
                    v-model="zipCode"
                    :maxlength="country === 'United States' ? '6' : '22'"
                    cypressId="zipCode"
                  />
                  <div
                    class="text-danger"
                    v-if="
                      v$.zipCode.$dirty &&
                      v$.zipCode.specialCharacterValidator.$invalid
                    "
                    aria-live="assertive"
                  >
                    {{ isOtherJurisdiction() ? 'Zip/Postal' : 'Zip' }}  code cannot include special characters except
                    hyphen, period, apostrophe, number sign and blank space.
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else-if="isNewAddressKnown === 'N'"
              class="is-new-address-known-n"
            >
              <br />
              <p>
                Please verify which jurisdiction you’re moving to. If you’re
                moving within Canada, please also verify which province you’re
                moving to.
              </p>
              <CountrySelect
                label="Jurisdiction"
                ref="country"
                className="mt-3"
                class="country"
                v-model="country"
              />
              <div
                class="text-danger"
                v-if="v$.country.$dirty && v$.country.required.$invalid"
                aria-live="assertive"
              >
                Jurisdiction is required.
              </div>
              <div v-if="country === 'Canada'">
                <RegionSelect
                  label="Province"
                  ref="province"
                  className="mt-3"
                  class="province"
                  cypressId="regionSelect"
                  v-model="province"
                  defaultOptionLabel="Select a province"
                />
                <div
                  class="text-danger"
                  v-if="v$.province.$dirty && v$.province.required.$invalid"
                  aria-live="assertive"
                >
                  Province is required. If you don't know which province you're
                  moving to, please contact HIBC for more information about your
                  MSP cancellation process.
                </div>
                <div
                  class="text-danger"
                  v-if="
                    v$.province.$dirty &&
                    v$.province.required &&
                    v$.province.nonBCValidator.$invalid
                  "
                  aria-live="assertive"
                >
                  Address entered must be outside of BC.
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="isNewAddressKnown === 'Y' && country === 'Canada'"
            class="col-sm-5 mt-3"
          >
            <TipBox title="Tip: find your address">
              <p>
                As you type the street address, this form will suggest valid
                postal addresses. Click an address to automatically enter it.
              </p>
              <p>
                Type apartment number or suite using digits, no spaces, and a
                dash (-) before the street address (111-215 Sample Road). If the
                address does not appear in the list of suggestions, type it
                manually.
              </p>
            </TipBox>
          </div>
        </div>
      </div>
    </PageContent>
    <ContinueBar
      @continue="validateFields()"
      :hasLoader="isLoading"
      buttonLabel="Review"
      cypressId="continueBar"
    />
  </div>
</template>
<script>
import pageStateService from "../services/page-state-service";
import { routes, isPastPath } from "../router/routes";
import {
  getProvinceNameFromCode,
  getProvinceCodeFromName,
} from "../helpers/provinces";
import {
  scrollTo,
  scrollToError,
  getTopScrollPosition,
  scrollToElement,
} from "../helpers/scroll";
import { replaceSpecialCharacters } from "../helpers/string";
import { truncateAddressLines } from "../helpers/address";
import {
  nonBCPostalCodeValidator,
  nonBCValidator,
  canadaPostalCodeLengthValidator,
} from "../helpers/validators";
import StateInput from "../components/StateInput.vue";
import {
  AddressDoctorInput,
  PostalCodeInput,
  ContinueBar,
  DateInput,
  Button,
  Radio,
  Input,
  distantFutureValidator,
  distantPastValidator,
  beforeDateValidator,
  afterDateValidator,
  CountrySelect,
  RegionSelect,
} from "common-lib-vue";
import useVuelidate from "@vuelidate/core";
import PageContent from "../components/PageContent.vue";
import TipBox from "../components/TipBox.vue";
import AddressLine from "../components/AddressLine.vue";
import { required, maxLength } from "@vuelidate/validators";
import {
  MODULE_NAME as formModule,
  RESET_FORM,
  SET_ADDRESS_LINES,
  SET_ARRIVE_DESTINATION_DATE,
  SET_IS_NEW_ADDRESS_KNOWN,
  SET_COUNTRY,
  SET_CITY,
  SET_PROVINCE,
  SET_POSTAL_CODE,
  SET_MOVE_FROM_BC_DATE,
  SET_OTHER_STREET_ADDRESS,
  SET_ZIP_CODE,
  SET_USA_STATE,
} from "../store/modules/form";
import logService from "../services/log-service";
import spaEnvService from "@/services/spa-env-service";
import { specialCharacterValidator } from "../helpers/validators";

const CAN_MIN_ADDRESS_LINES = 1;
const CAN_MAX_ADDRESS_LINES = 3;
const US_ADDRESS_LINES = 3;
const INTERNATIONAL_ADDRESS_LINES = 2;

export const addressLineOneValidator = (addressLines) => {
  if (addressLines && addressLines[0]) {
    if (addressLines[0].value && addressLines[0].value !== "") {
      return true;
    }
  }
  return false;
};

export const addressLineOneSpecialCharacterValidator = (addressLines) => {
  if (
    addressLines &&
    addressLines[0] &&
    addressLines[0].value &&
    addressLines[0].value !== ""
  ) {
    return specialCharacterValidator(addressLines[0].value);
  }
  return false;
};

export const specialCharacterWithCommaValidator = (value) => {
  const criteria = /^[0-9a-zA-Z,-.'# ]*$/;
  return criteria.test(value);
};

export default {
  name: "MoveInfoPage",
  components: {
    AddressDoctorInput,
    AddressLine,
    ContinueBar,
    DateInput,
    Input,
    PageContent,
    PostalCodeInput,
    CountrySelect,
    RegionSelect,
    StateInput,
    TipBox,
    Button,
    Radio,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => {
    return {
      moveFromBCDate: null,
      arriveDestinationDate: null,
      isNewAddressKnown: null,
      addressLines: [],
      otherStreetAddress: null,
      zipCode: null,
      vuelidateExternalResults: {},
      country: null,
      province: null,
      state: null,
      city: null,
      postalCode: null,
      showServerValidationError: false,
      isPageLoaded: false,
      isLoading: false,
      currNumOfAddressLines: null,
      isNewAddressKnownRadioItems: [
        {
          id: "is-new-address-known-y",
          label: "Yes",
          value: "Y",
        },
        {
          id: "is-new-address-known-n",
          label: "No",
          value: "N",
        },
      ],
    };
  },
  created() {
    this.moveFromBCDate = this.$store.state.form.moveFromBCDate;
    this.arriveDestinationDate = this.$store.state.form.arriveDestinationDate;
    this.isNewAddressKnown = this.$store.state.form.isNewAddressKnown;
    this.addressLines = this.$store.state.form.addressLines
      ? [...this.$store.state.form.addressLines]
      : [];
    this.otherStreetAddress = this.$store.state.form.otherStreetAddress;
    this.country = this.$store.state.form.country;
    //The Province gets stored in the Vue Store as an acronym/code, but the RegionSelect component needs a fully spelled out name to display the selected province
    //This code converts it to a code for display, and the validateFields() function handles formatting back before it dispatches back to the store
    this.province = getProvinceNameFromCode(this.$store.state.form.province);
    this.state = this.$store.state.form.state;
    this.city = this.$store.state.form.city;
    this.postalCode = this.$store.state.form.postalCode;
    this.zipCode = this.$store.state.form.zipCode;

    setTimeout(() => {
      this.isPageLoaded = true;
    }, 0);

    if (this.country === "Canada") {
      this.currNumOfAddressLines = Math.max(
        CAN_MIN_ADDRESS_LINES,
        this.addressLines.length
      );
    } else if (this.country === "United States") {
      this.currNumOfAddressLines = US_ADDRESS_LINES;
    } else {
      this.currNumOfAddressLines = INTERNATIONAL_ADDRESS_LINES;
    }

    for (let i = 0; i < this.currNumOfAddressLines; i++) {
      this.addressLines[i] = {
        id: "address-line-" + (i + 1),
        value:
          this.addressLines[i] && this.addressLines[i].value
            ? this.addressLines[i].value
            : null,
        isValid: true,
      };
    }

    logService.logNavigation(
      this.$store.state.form.applicationUuid,
      routes.MOVE_INFO_PAGE.path,
      routes.MOVE_INFO_PAGE.title
    );
  },
  validations() {
    const validations = {
      moveFromBCDate: {
        required,
        distantFutureValidator,
        distantPastValidator,
        beforeDateValidator: beforeDateValidator("arriveDestinationDate"),
      },
      arriveDestinationDate: {
        required,
        distantFutureValidator,
        distantPastValidator,
        afterDateValidator: afterDateValidator("moveFromBCDate"),
      },
      isNewAddressKnown: {
        required,
      },
      country: {
        required,
      },
      addressLines: {},
      city: {},
      province: {},
      postalCode: {},
      otherStreetAddress: {},
      state: {},
      zipCode: {},
    };
    if (this.isNewAddressKnown === "Y") {
      if (this.country === "Canada") {
        (validations.addressLines = {
          addressLineOneValidator,
          addressLineOneSpecialCharacterValidator,
        }),
          (validations.city = {
            specialCharacterWithCommaValidator,
            required,
            maxLength: maxLength(this.cityMaxLength("Canada")),
          }),
          (validations.province = {
            required,
            nonBCValidator,
          }),
          (validations.postalCode = {
            required,
            canadaPostalCodeLengthValidator,
            nonBCPostalCodeValidator,
          });
        (validations.otherStreetAddress = {}),
          (validations.state = {}),
          (validations.zipCode = {});
      } else if (this.country === "United States") {
        (validations.addressLines = {}),
          (validations.city = {
            specialCharacterWithCommaValidator,
            required,
            maxLength: maxLength(this.cityMaxLength("United States")),
          }),
          (validations.province = {}),
          (validations.postalCode = {}),
          (validations.otherStreetAddress = {
            specialCharacterValidator,
            required,
          }),
          (validations.state = {
            required,
          }),
          (validations.zipCode = {
            specialCharacterValidator,
          });
      } else {
        //any other country besides Canada and US
        (validations.addressLines = {}),
          (validations.city = {
            specialCharacterWithCommaValidator,
            required,
            maxLength: maxLength(this.cityMaxLength("Other")),
          }),
          (validations.province = {}),
          (validations.postalCode = {}),
          (validations.otherStreetAddress = {
            specialCharacterValidator,
            required,
          }),
          (validations.state = {}),
          (validations.zipCode = {
            specialCharacterValidator,
          });
      }
    } else if (this.isNewAddressKnown === "N" && this.country === "Canada") {
      validations.province = {
        required,
        nonBCValidator,
      };
    }
    return validations;
  },
  methods: {
    validateFields() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        scrollToError();
        return;
      }
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;

        // Set address fields to null if the new address is not known
        if (this.isNewAddressKnown === "N") {
          this.setFieldsToNull();
          if (this.country !== "Canada") {
            this.province = null;
          }
        }
        if (this.province) {
          this.province = getProvinceCodeFromName(this.province);
        }

        // Only eliminate empty address lines if country is Canada
        if (this.country === "Canada") {
          const currNumOfAddressLines = Math.max(
            CAN_MIN_ADDRESS_LINES,
            this.addressLines.length
          );
          for (let i = currNumOfAddressLines - 1; i >= 0; i--) {
            if (
              (this.addressLines[i].value === null ||
                this.addressLines[i].value === "") &&
              currNumOfAddressLines > 1
            ) {
              this.addressLines.splice(i, 1);
            }
          }

          //If no address lines provided, create an empty address line 1 for Review Page
          if (this.addressLines.length == 0) {
            this.addressLines[0] = {
              idVal: "address-line-1",
              value: null,
              isValid: true,
            };
          }
        }

        this.$store.dispatch(
          formModule + "/" + SET_MOVE_FROM_BC_DATE,
          this.moveFromBCDate
        );
        this.$store.dispatch(
          formModule + "/" + SET_ARRIVE_DESTINATION_DATE,
          this.arriveDestinationDate
        );
        this.$store.dispatch(
          formModule + "/" + SET_IS_NEW_ADDRESS_KNOWN,
          this.isNewAddressKnown
        );
        this.$store.dispatch(formModule + "/" + SET_COUNTRY, this.country);
        this.$store.dispatch(
          formModule + "/" + SET_ADDRESS_LINES,
          this.addressLines
        );
        this.$store.dispatch(formModule + "/" + SET_PROVINCE, this.province);
        this.$store.dispatch(formModule + "/" + SET_CITY, this.city);
        this.$store.dispatch(
          formModule + "/" + SET_POSTAL_CODE,
          this.postalCode
        );

        this.$store.dispatch(
          formModule + "/" + SET_OTHER_STREET_ADDRESS,
          this.otherStreetAddress
        );
        this.$store.dispatch(formModule + "/" + SET_ZIP_CODE, this.zipCode);
        this.$store.dispatch(formModule + "/" + SET_USA_STATE, this.state);

        const toPath = routes.REVIEW_PAGE.path;
        pageStateService.setPageComplete(toPath);
        pageStateService.visitPage(toPath);
        this.$router.push(toPath);
        scrollTo(0);
      }, 2000);
    },
    addAddressField() {
      this.addressLines.push({
        id: "address-line-" + (this.addressLines.length + 1),
        value: null,
        isValid: true,
      });
    },
    removeAddressField() {
      this.addressLines.pop();
    },
    getAddressLinesLength() {
      return this.addressLines.length;
    },
    getMaxAddressLines() {
      return CAN_MAX_ADDRESS_LINES;
    },
    getMinAddressLines() {
      return CAN_MIN_ADDRESS_LINES;
    },
    addressSelectedHandler(address) {
      const addressLines = truncateAddressLines(address.addressLines, 25);

      // Remove all but first address line.
      for (let i = this.addressLines.length - 1; i > 0; i--) {
        this.addressLines.pop();
      }
      // Add address lines and set value to the model.
      for (let i = 0; i < addressLines.length; i++) {
        if (i !== 0) {
          this.addAddressField();
        }
        this.addressLines[i].value = replaceSpecialCharacters(addressLines[i]);
      }
      this.city = replaceSpecialCharacters(address.city);
      this.province = getProvinceNameFromCode(
        replaceSpecialCharacters(address.province)
      );
      this.postalCode = replaceSpecialCharacters(address.postalCode);
    },
    setFieldsToNull() {
      for (let i = 0; i < this.addressLines.length; i++) {
        setTimeout(() => {
          this.removeAddressField();
        }, 0);
      }
      // Set first address line to null
      this.addressLines[0] = {
        idVal: "address-line-1",
        value: null,
        isValid: true,
      };
      // Remove all current address lines if country is Canada
      if (this.country === "Canada") {
        setTimeout(() => {
          // Add one address field
          this.addAddressField();
          // Set postal code to null
          this.postalCode = null;
        }, 0);
      }
      // Otherwise (other countries than Canada is selected), set all the address lines and city to null
      else {
        for (let i = 0; i < INTERNATIONAL_ADDRESS_LINES; i++) {
          setTimeout(() => {
            this.addAddressField();
          }, 0);
        }
      }
      this.otherStreetAddress = null;
      this.city = null;
      this.state = null;
      this.postalCode = null;
      this.zipCode = null;
    },
    updateAddressLine(newLine, newIndex) {
      if (typeof newLine === "string" && Number.isInteger(newIndex)) {
        this.addressLines[newIndex] = {
          id: `address-line-${newIndex}`,
          value: newLine,
          isValid: true,
        };
      }
    },
    isOtherJurisdiction() {
      if (this.country !== "Canada" && this.country !== "United States") {
        return true;
      } else {
        return false;
      }
    },
    cityMaxLength(countryParameter) {
      switch (countryParameter) {
        case "Canada":
          return 22;
        case "United States":
          return 18;
        default:
          return 25;
      }
    },
  },
  computed: {
    isAddressValidatorEnabled() {
      return (
        spaEnvService.values.SPA_ENV_OOP_ENABLE_ADDRESS_VALIDATOR === "true"
      );
    },
    cityAndProvincePlural() {
      return this.isOtherJurisdiction() ? "City and province" : "City";
    },
    cityAndProvinceVerb() {
      return this.isOtherJurisdiction() ? "are" : "is";
    },
  },
  watch: {
    country(newValue) {
      if (this.isPageLoaded) {
        this.setFieldsToNull();
        this.province = null;
        // Add address line 3 field if the country is United States
        if (newValue === "United States") {
          this.addAddressField();
        }
      }
    },
    isNewAddressKnown(newValue) {
      if (this.isPageLoaded) {
        if (newValue === "Y") {
          setTimeout(() => {
            const el = document.querySelector(".is-new-address-known-y");
            scrollToElement(el, true);
          }, 0);
        } else if (newValue === "N") {
          setTimeout(() => {
            const el = document.querySelector(".is-new-address-known-n");
            scrollToElement(el, true);
          }, 0);
        }
        this.setFieldsToNull();
        this.province = null;
        this.country = "Canada";
      }
    },
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    if (to.path === routes.HOME_PAGE.path) {
      this.$store.dispatch(formModule + "/" + RESET_FORM);
      next();
    } else if (
      pageStateService.isPageComplete(to.path) ||
      isPastPath(to.path, from.path)
    ) {
      next();
    } else {
      // Navigate to self.
      const topScrollPosition = getTopScrollPosition();
      next({
        path: routes.MOVE_INFO_PAGE.path,
        replace: true,
      });
      setTimeout(() => {
        scrollTo(topScrollPosition);
      }, 0);
    }
  },
};
</script>

<style scoped>
.address-row {
  display: flex;
  flex-wrap: nowrap;
}

.country {
  max-width: 100%;
  width: 540px;
}

.address-line,
.city,
.province {
  max-width: 100%;
  width: 350px;
}

.postal-code {
  max-width: 100%;
  width: 160px;
}

.address-row-margin {
  margin-right: 1em;
}

.text-danger {
  max-width: 350px
}

/* resize address line to fit + - buttons to the side at medium size*/
@media (min-width: 768px) and (max-width: 991.98px) {
  .address-line-width {
    max-width: 215px;
  }
}

/*display + - buttons in the same row as address line at large sizes*/
@media (min-width: 767.98px) {
  .address-line-v-for {
    display: flex;
  }
}

.add-remove-button {
  min-width: 50px;
  min-height: 40px;
}
@media (max-width: 575.98px) {
  .address-line,
  .city,
  .province {
    width: 100%;
  }
  .address-row-margin {
    margin-right: 0;
  }
}
</style>
