// https://docs.cypress.io/api/introduction/api.html
Cypress.on("uncaught:exception", (err, runnable) => {
  console.log(err, runnable);
  return false;
});

import * as fixtureDataTest from "../fixtures/test-data.json";
import * as fixtureDataDev from "../fixtures/dev-data.json";
import * as fixtureDataLocal from "../fixtures/local-data.json";

let enableIntercepts = false;
let credentialName;
let credentialPHN; 

if (Cypress.env("environment") === "test") {
  ({credentialName, credentialPHN } = fixtureDataTest);
} else if (Cypress.env("environment") === "dev") {
  ({credentialName, credentialPHN } = fixtureDataDev);
} else { //local environment
  ({credentialName, credentialPHN } = fixtureDataLocal);
  enableIntercepts = true;
}

//At last check, there is code in the program that checks for dates in the distant future/past
//To prevent code written in 2021 from failing in 2025 because the date is too far back,
//this code pull the current year and adds one.
//This is to hopefully increase the stability of the test

const testYear = new Date().getFullYear() + 1;

describe("Happy path", () => {
  it("completes the app lifecycle without errors", () => {
    //Home page
    cy.visit('/');
    cy.location().should((loc) => {
      expect(loc.href).to.eq(Cypress.config('baseUrl'));
      expect(loc.pathname).to.eq("/oop/");
    });

    //Captcha
    cy.get("[data-cy=captchaInput]").type("irobot");
    cy.get("[data-cy=consentCheckbox]").click();
    cy.get("[data-cy=consentContinue]").click();
    cy.get("[data-cy=continueBar]").click();

    //Your Info
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/your-info");
    });

    cy.get("[data-cy=yourInfoLastName]").type(credentialName);
    cy.get("[data-cy=yourInfoPhn]").type(credentialPHN);
    if (enableIntercepts) {
      cy.intercept("POST", "/oop/api/oopIntegration/validatePhnName", {
        statusCode: 200,
        body: {
          returnCode: "0",
          applicantRole: "AH",
          testfield: "This is a stubbed test response from Cypress"
        },
      });
    }
    cy.get("[data-cy=continueBar]").click();

    //Account Type
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/account-type");
    });
    cy.get("[data-cy=whoIsMovingperson-moving-ah]").click({ force: true });
    cy.get("[data-cy=continueBar]").click();

    //Move Info
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/move-info");
    });
    //Dates
    cy.get("select")
      .find("option[data-cy=moveFromBCDateMonth0]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("[data-cy=moveFromBCDateDay]").type("11");
    cy.get("[data-cy=moveFromBCDateYear]").type(testYear);
    cy.get("select")
      .find("option[data-cy=arriveDestinationDateMonth0]")
      .then(($el) => $el.get(0).setAttribute("selected", "selected"))
      .parent()
      .trigger("change");
    cy.get("[data-cy=arriveDestinationDateDay]").type("12");
    cy.get("[data-cy=arriveDestinationDateYear]").type(testYear);
    //Address
    cy.get("[data-cy=isNewAddressKnownis-new-address-known-n]").click({
      force: true,
    });
    // the following line of code should work but doesn't for some reason (Cypress bug?)
    // I left in a workaround directly below it, but if it ever starts working, data-cy is the preferred approach
    // cy.get("[data-cy='jurisdictionSelect']").select("Canada").type('{enter}', {force: true});
    cy.get("[aria-label=Jurisdiction]")
      .select("Canada")
      .type("{enter}", { force: true });
    cy.get("[data-cy=regionSelect]").select("Alberta").type("{enter}");
    cy.get("[data-cy=continueBar]").click();

    //Review page
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/review");
    });
    cy.get("[data-cy=ReviewTableElement]").contains(credentialName);
    cy.get("[data-cy=ReviewTableElement]").contains(credentialPHN);
    cy.get("[data-cy=ReviewTableElement]").contains("Account holder only");
    cy.get("[data-cy=ReviewTableElement]").contains(`January 11, ${testYear}`);
    cy.get("[data-cy=ReviewTableElement]").contains(`January 12, ${testYear}`);
    cy.get("[data-cy=ReviewTableElement]").contains("No");
    cy.get("[data-cy=ReviewTableElement]").contains("Canada");
    cy.get("[data-cy=ReviewTableElement]").contains("Alberta");
    if (enableIntercepts) {
      cy.intercept("POST", "/oop/api/oopIntegration/submission", {
        statusCode: 200,
        body: {
          returnCode: "0",
          testfield: "This is a stubbed test response from Cypress"
        },
      });
    }
    cy.get("[data-cy=continueBar]").click();

    //Submission Page
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/oop/submission");
    });
    cy.get("[data-cy=ReviewTableElement]").contains(credentialName);
    cy.get("[data-cy=ReviewTableElement]").contains(credentialPHN);
    cy.get("[data-cy=ReviewTableElement]").contains("Account holder only");
    cy.get("[data-cy=ReviewTableElement]").contains(`January 11, ${testYear}`);
    cy.get("[data-cy=ReviewTableElement]").contains(`January 12, ${testYear}`);
    cy.get("[data-cy=ReviewTableElement]").contains("No");
    cy.get("[data-cy=ReviewTableElement]").contains("Canada");
    cy.get("[data-cy=ReviewTableElement]").contains("Alberta");
  });
});
