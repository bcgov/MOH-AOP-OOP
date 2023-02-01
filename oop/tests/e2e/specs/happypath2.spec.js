// https://docs.cypress.io/api/introduction/api.html
Cypress.on("uncaught:exception", (err, runnable) => {
  console.log(err, runnable);
  return false;
});

//At last check, there is code in the program that checks for dates in the distant future/past
//To prevent code written in 2021 from failing in 2025 because the date is too far back,
//this code pull the current year and adjusts it.
//This is to hopefully increase the stability of the test
const testYear = new Date().getFullYear() + 1;

const testDateMove = new Date();
testDateMove.setHours(5); //to prevent time zone bugs
testDateMove.setDate(1);
testDateMove.setYear(testDateMove.getFullYear() - 1);
testDateMove.setMonth(testDateMove.getMonth() - 1);

const testDateMoveString = `${testDateMove.toLocaleString("default", {
  month: "long",
})} ${testDateMove.getDate()}, ${testDateMove.getFullYear()}`;

const testDateArrive = new Date();
testDateArrive.setHours(5); //to prevent time zone bugs
testDateArrive.setDate(1);
testDateArrive.setYear(testDateArrive.getFullYear() + 1);
testDateArrive.setMonth(testDateArrive.getMonth() + 1);

const testDateArriveString = `${testDateArrive.toLocaleString("default", {
  month: "long",
})} ${testDateArrive.getDate()}, ${testDateArrive.getFullYear()}`;

//dev credentials
// const credentialName = "POIUYR";
// const credentialPHN = "9873 541 262";
// const credentialPhone = "2345678910";

//test credentials
const credentialName = "POIUYR";
const credentialPHN = "9873 541 262";
const credentialPhone = "2345678910";
const credentialDependent = "9873 541 248";

const testUrl = "http://localhost:8080/oop/";

describe("Happy path", () => {
  it("completes the app lifecycle without errors", () => {
    //Home page
    cy.visit(testUrl);
    cy.location().should((loc) => {
      expect(loc.href).to.eq(testUrl);
      expect(loc.pathname).to.eq("/oop/");
    });

    //Captcha
    cy.get("[data-cy=captchaInput]").type("irobot");
    cy.get("[data-cy=consentCheckbox]").click();
    cy.get("[data-cy=consentContinue]").click();
    cy.get("[data-cy=continueBar]").click();

    //Your Info
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/oop/your-info");
      expect(loc.pathname).to.eq("/oop/your-info");
    });
    cy.get("[data-cy=continueBar]").click();
    cy.contains("Last name is required.");
    cy.contains("Personal Health Number is required.");

    cy.get("[data-cy=yourInfoLastName]").type("111");
    cy.get("[data-cy=continueBar]").click();
    cy.contains(
      "Last name must begin with a letter and cannot include special characters except hyphens, periods, apostrophes and blank characters."
    );
    cy.get("[data-cy=yourInfoLastName]").clear();

    cy.get("[data-cy=yourInfoPhn]").type("111");
    cy.get("[data-cy=continueBar]").click();
    cy.contains("This is not a valid Personal Health Number.");
    cy.get("[data-cy=yourInfoPhn]").clear();

    cy.get("[data-cy=yourInfoPhone]").type("111");
    cy.get("[data-cy=continueBar]").click();
    cy.contains("The phone number you entered is not valid.");
    cy.get("[data-cy=yourInfoPhone]").clear();

    cy.get("[data-cy=yourInfoLastName]").type("AAA");
    cy.get("[data-cy=yourInfoPhn]").type("9999 999 998");
    cy.get("[data-cy=continueBar]").click();
    cy.contains(
      "The last name and/or PHN you entered does not match our records."
    );
    cy.get("[data-cy=yourInfoLastName]").clear();
    cy.get("[data-cy=yourInfoPhn]").clear();

    cy.get("[data-cy=yourInfoLastName]").type(credentialName);
    cy.get("[data-cy=yourInfoPhn]").type(credentialPHN);
    cy.get("[data-cy=yourInfoPhone]").type(credentialPhone);
    cy.get("[data-cy=continueBar]").click();

    //Account Type
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/account-type");
    });
    cy.get("[data-cy=continueBar]").click();
    cy.contains("This field is required.");
    cy.get("[data-cy=whoIsMovingperson-moving-ahad]").click({ force: true });
    cy.get("[data-cy=continueBar]").click();
    cy.contains("Please select one of the options above.");
    cy.get("[data-cy=isAllDependentsis-all-dependents-moving-n]").click({
      force: true,
    });
    cy.get("[data-cy=continueBar]").click();
    cy.contains("Dependent Personal Health Number is required.");
    cy.get("[data-cy=phn0]").type("9999 999 998");
    cy.get("[data-cy=phn1]").type("9999 999 998");
    cy.get("[data-cy=continueBar]").click();
    cy.contains("Personal Health Numbers must be unique.");
    cy.get("[data-cy=phn1]").clear();
    cy.get("[data-cy=continueBar]").click();
    cy.contains(
      "At least one of the Personal Health Numbers does not match our records."
    );
    cy.get("[data-cy=phn0]").clear().type(credentialDependent);

    cy.get("[data-cy=continueBar]").click();

    //check that PHN data is stored properly + shows on page when you return

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/move-info");
    });
    cy.get("[data-cy=pageStepper1]").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/account-type");
    });

    cy.get("[data-cy=phn0]")
      .should("have.attr", "data-mask-raw-value")
      .and("match", /9873541248/);

    cy.get("[data-cy=continueBar]").click();

    //Move Info
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/move-info");
    });
    //Move Info-- Required checks
    cy.get("[data-cy=continueBar]").click();
    cy.contains("A valid date of departure is required.");
    cy.contains("A valid date of arrival is required.");
    cy.contains("Please select one of the options above.");

    //Move Info-- Date validation checks
    cy.get("select")
      .find("option[data-cy=moveFromBCDateMonth0]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("select")
      .find("option[data-cy=arriveDestinationDateMonth0]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("[data-cy=moveFromBCDateDay]").type("11");
    cy.get("[data-cy=moveFromBCDateYear]").type("1111");
    cy.get("[data-cy=continueBar]").click();
    cy.contains("Date is too far in the past.");
    cy.get("[data-cy=moveFromBCDateYear]").clear();

    cy.get("[data-cy=arriveDestinationDateDay]").type("12");
    cy.get("[data-cy=arriveDestinationDateYear]").type("1111");
    cy.get("[data-cy=continueBar]").click();
    cy.contains("Date is too far in the past.");
    cy.get("[data-cy=arriveDestinationDateYear]").clear();

    cy.get("[data-cy=moveFromBCDateYear]").clear().type("2222");
    cy.get("[data-cy=continueBar]").click();
    cy.contains("Date is too far in the future.");
    cy.get("[data-cy=moveFromBCDateYear]").clear();

    cy.get("[data-cy=arriveDestinationDateYear]").type("2222");
    cy.get("[data-cy=continueBar]").click();
    cy.contains("Date is too far in the future.");
    cy.get("[data-cy=arriveDestinationDateYear]").clear();

    cy.get("[data-cy=moveFromBCDateYear]").type(testYear);
    cy.get("[data-cy=moveFromBCDateDay]").clear().type("35");
    cy.get("[data-cy=continueBar]").click();
    cy.contains("A valid date of departure is required.");

    cy.get("[data-cy=arriveDestinationDateYear]").type(testYear);
    cy.get("[data-cy=arriveDestinationDateDay]").clear().type("35");
    cy.get("[data-cy=continueBar]").click();
    cy.contains("A valid date of arrival is required.");

    cy.get("[data-cy=moveFromBCDateDay]").clear().type("8");
    cy.get("[data-cy=arriveDestinationDateDay]").clear().type("5");
    cy.get("[data-cy=continueBar]").click();

    cy.contains("Date of departure must be before the date of arrival.");
    cy.contains("Date of arrival must be after the date of departure.");

    cy.get("[data-cy=moveFromBCDateDay]").clear();
    cy.get("[data-cy=arriveDestinationDateDay]").clear();
    cy.get("[data-cy=moveFromBCDateYear]").clear();
    cy.get("[data-cy=arriveDestinationDateYear]").clear();

    cy.get("[data-cy=moveFromBCDateCalendarIcon]").click();
    cy.get("[data-cy=moveFromBCDateChevronDoubleLeft]").click();
    cy.get("[data-cy=moveFromBCDateChevronLeft]").click();
    cy.get("[data-cy=moveFromBCDateDay0]").click();
    cy.get("[data-cy=arriveDestinationDateCalendarIcon]").click();
    cy.get("[data-cy=arriveDestinationDateChevronDoubleRight]").click();
    cy.get("[data-cy=arriveDestinationDateChevronRight]").click();
    cy.get("[data-cy=arriveDestinationDateDay0]").click();

    //Move Info-- Address checks
    cy.get("[data-cy=isNewAddressKnownis-new-address-known-n]").click({
      force: true,
    });
    cy.get("[data-cy=continueBar]").click();
    cy.contains(
      "Province is required. If you don't know which province you're moving to, please contact HIBC for more information about your MSP cancellation process."
    );

    cy.get("[data-cy=regionSelect]").select("British Columbia").type("{enter}");
    cy.get("[data-cy=continueBar]").click();
    cy.contains("Address entered must be outside of BC.");

    cy.get("[aria-label=Jurisdiction]")
      .select("Select a jurisdiction")
      .type("{enter}", { force: true });
    cy.contains("Jurisdiction is required.");

    cy.get("[data-cy=isNewAddressKnownis-new-address-known-y]").click({
      force: true,
    });
    cy.get("[data-cy=continueBar]").click();

    // the following line of code should work but doesn't for some reason (Cypress bug?)
    // I left in a workaround directly below it, but if it ever starts working, data-cy is the preferred approach
    // cy.get("[data-cy='jurisdictionSelect']").select("Canada").type('{enter}', {force: true});
    cy.get("[aria-label=Jurisdiction]")
      .select("Select a jurisdiction")
      .type("{enter}", { force: true });
    cy.contains("Jurisdiction is required.");

    //Move Info-- Address checks (USA)

    cy.get("[aria-label=Jurisdiction]")
      .select("United States")
      .type("{enter}", { force: true });
    cy.get("[data-cy=continueBar]").click();
    cy.contains("Street address is required.");
    cy.contains("City is required.");
    cy.contains("State is required.");

    cy.get("[data-cy=usaOtherStreetAddress]").type("%%%");
    cy.get("[data-cy=continueBar]").click();
    cy.contains(
      "Street address cannot include special characters except hyphen, period, apostrophe, number sign and blank space."
    );

    cy.get("[data-cy=city]").type("%%%");
    cy.get("[data-cy=continueBar]").click();
    cy.contains(
      "City cannot include special characters except hyphen, period, apostrophe, number sign and blank space."
    );

    cy.get("[data-cy=zipCode]").type("%%%");
    cy.get("[data-cy=continueBar]").click();
    cy.contains(
      "Zip/postal code cannot include special characters except hyphen, period, apostrophe, number sign and blank space."
    );

    //USA ready to continue
    cy.get("[data-cy=usaOtherStreetAddress]").clear();
    cy.get("[data-cy=city]").clear();
    cy.get("[data-cy=zipCode]").clear();
    cy.get("[data-cy=usaOtherStreetAddress]").type("111");
    cy.get("[data-cy=city]").type("Fakesville");
    cy.get("[data-cy=state]")
      .select("Alabama")
      .type("{enter}", { force: true });

    cy.get("[data-cy=continueBar]").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/review");
    });
    cy.get("[data-cy=pageStepper2]").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/move-info");
    });

    //Move Info-- Address checks (Other)

    cy.get("[aria-label=Jurisdiction]")
      .select("Afghanistan")
      .type("{enter}", { force: true });
    cy.get("[data-cy=continueBar]").click();
    cy.contains("Street address is required.");
    cy.contains("City and province are required.");

    cy.get("[data-cy=usaOtherStreetAddress]").type("%%%");
    cy.get("[data-cy=continueBar]").click();
    cy.contains(
      "Street address cannot include special characters except hyphen, period, apostrophe, number sign and blank space."
    );

    cy.get("[data-cy=city]").type("%%%");
    cy.get("[data-cy=continueBar]").click();
    cy.contains(
      "City and province cannot include special characters except hyphen, period, apostrophe, number sign and blank space."
    );

    cy.get("[data-cy=zipCode]").type("%%%");
    cy.get("[data-cy=continueBar]").click();
    cy.contains(
      "Zip/postal code cannot include special characters except hyphen, period, apostrophe, number sign and blank space."
    );

    //Other ready to continue
    cy.get("[data-cy=usaOtherStreetAddress]").clear();
    cy.get("[data-cy=city]").clear();
    cy.get("[data-cy=zipCode]").clear();
    cy.get("[data-cy=usaOtherStreetAddress]").type("111");
    cy.get("[data-cy=city]").type("Fakesville");

    cy.get("[data-cy=continueBar]").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/review");
    });
    cy.get("[data-cy=pageStepper2]").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/move-info");
    });

    //Move Info-- Address checks (Canada)

    cy.get("[aria-label=Jurisdiction]")
      .select("Canada")
      .type("{enter}", { force: true });
    cy.get("[data-cy=continueBar]").click();
    cy.contains("Address line 1 is required.");
    cy.contains("City is required.");
    cy.contains("Province is required.");
    cy.contains("Postal code is required.");

    cy.get("[data-cy=addressDoctorInput]").type("%%%");
    cy.get("[data-cy=continueBar]").click();
    cy.contains(
      "Address cannot include special characters except hyphen, period, apostrophe, number sign and blank space."
    );
    cy.get("[data-cy=addressDoctorInput]").clear();

    cy.get("[data-cy=city]").type("%%%");
    cy.get("[data-cy=continueBar]").click();
    cy.contains(
      "City cannot include special characters except hyphen, period, apostrophe, number sign and blank space."
    );
    cy.get("[data-cy=city]").clear();

    cy.get("[data-cy=regionSelect]").select("British Columbia").type("{enter}");
    cy.get("[data-cy=continueBar]").click();
    cy.contains("Address entered must be outside of BC.");

    cy.get("[data-cy=postalCode]").type("A");
    cy.get("[data-cy=continueBar]").click();
    cy.contains("The postal code you entered is not valid.");
    cy.get("[data-cy=postalCode]").clear().type("V1A1A1");
    cy.contains("Postal code entered must be outside of BC.");
    cy.get("[data-cy=postalCode]").clear();

    cy.get("[data-cy=addressDoctorInput]").type("716 Yates Dr Milton");
    cy.get("[data-cy=addressDoctorInput0]").click();

    cy.get("[data-cy=continueBar]").click();

    //Review page
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/review");
    });
    cy.get("[data-cy=ReviewTableElement]").contains(credentialName);
    cy.get("[data-cy=ReviewTableElement]").contains(credentialPHN);
    cy.get("[data-cy=ReviewTableElement]").contains("(234) 567-8910");
    cy.get("[data-cy=ReviewTableElement]").contains(
      "Account holder and dependent(s)"
    );
    cy.get("[data-cy=ReviewTableElement]").contains(testDateMoveString);
    cy.get("[data-cy=ReviewTableElement]").contains(testDateArriveString);
    cy.get("[data-cy=ReviewTableElement]").contains("Yes");
    cy.get("[data-cy=ReviewTableElement]").contains("Canada");
    cy.get("[data-cy=ReviewTableElement]").contains("Ontario");
    cy.get("[data-cy=ReviewTableElement]").contains("716 YATES DR");
    cy.get("[data-cy=ReviewTableElement]").contains("MILTON");
    cy.get("[data-cy=ReviewTableElement]").contains("L9T 7R5");

    cy.get("[data-cy=continueBar]").click();

    //Submission Page
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/submission");
    });
    cy.get("[data-cy=ReviewTableElement]").contains(credentialName);
    cy.get("[data-cy=ReviewTableElement]").contains(credentialPHN);
    cy.get("[data-cy=ReviewTableElement]").contains("(234) 567-8910");
    cy.get("[data-cy=ReviewTableElement]").contains(
      "Account holder and dependent(s)"
    );
    cy.get("[data-cy=ReviewTableElement]").contains(testDateMoveString);
    cy.get("[data-cy=ReviewTableElement]").contains(testDateArriveString);
    cy.get("[data-cy=ReviewTableElement]").contains("Yes");
    cy.get("[data-cy=ReviewTableElement]").contains("Canada");
    cy.get("[data-cy=ReviewTableElement]").contains("Ontario");
    cy.get("[data-cy=ReviewTableElement]").contains("716 YATES DR");
    cy.get("[data-cy=ReviewTableElement]").contains("MILTON");
    cy.get("[data-cy=ReviewTableElement]").contains("L9T 7R5");
  });
});
