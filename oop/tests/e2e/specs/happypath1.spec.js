// https://docs.cypress.io/api/introduction/api.html
Cypress.on("uncaught:exception", (err, runnable) => {
  console.log(err);
  return false;
});

//At last check, there is code in the program that checks for dates in the distant future/past
//To prevent code written in 2021 from failing in 2025 because the date is too far back,
//this code pull the current year and adds one.
//This is to hopefully increase the stability of the test

const testYear = new Date().getFullYear() + 1;

//dev credentials
const credentialName = "POIUYR";
const credentialPHN = "9873 608 392";

//test credentials
// const credentialName = "POIUYR";
// const credentialPHN = "9874 084 281";

describe("Happy path", () => {
  it("completes the app lifecycle without errors", () => {
    //Home page
    cy.visit("http://localhost:8080/oop");
    cy.location().should((loc) => {
      expect(loc.host).to.eq("localhost:8080");
      expect(loc.hostname).to.eq("localhost");
      expect(loc.href).to.eq("http://localhost:8080/oop");
      expect(loc.origin).to.eq("http://localhost:8080");
      expect(loc.pathname).to.eq("/oop");
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

    cy.get("[data-cy=yourInfoLastName]").type(credentialName);
    cy.get("[data-cy=yourInfoPhn]").type(credentialPHN);
    cy.get("[data-cy=continueBar]").click();

    //Account Type
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/oop/account-type");
      expect(loc.pathname).to.eq("/oop/account-type");
    });
    cy.get("[data-cy=whoIsMovingperson-moving-ah]").click({ force: true });
    cy.get("[data-cy=continueBar]").click();

    //Move Info
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/oop/move-info");
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
    //could not assign data-cy values to the next two because they're in a different package
    cy.get("[aria-label=Jurisdiction]").select("Canada");
    cy.get("[aria-label=Region]").select("Alberta");
    cy.get("[data-cy=continueBar]").click();

    //Review page
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/oop/review");
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

    cy.get("[data-cy=continueBar]").click();

    //Submission Page
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/oop/submission");
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
