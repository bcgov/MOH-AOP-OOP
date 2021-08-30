// https://docs.cypress.io/api/introduction/api.html
Cypress.on("uncaught:exception", (err, runnable) => {
  console.log(err);
  return false;
});

//At last check, there is code in the program that checks for dates in the distant future/past
//To prevent code written in 2021 from failing in 2025 because the date is too far back,
//this code pull the current year and adds one.
//This is to hopefully increase the stability of the test

const testYear = new Date().getFullYear() + 1
// const testYear = thisYear + 1;

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

    // cy.get("[data-cy=yourInfoLastName]").type("CROTOPHAGAXA");
    // cy.get('[data-cy=yourInfoPhn]').type('9310134963')
    // credentials for test environment
    cy.get("[data-cy=yourInfoLastName]").type("POIUYR");
    cy.get('[data-cy=yourInfoPhn]').type('9874084281')
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
    cy.get("[data-cy=moveFromBCDateMonth]").select("January");
    cy.get("[data-cy=moveFromBCDateDay]").type("11");
    cy.get("[data-cy=moveFromBCDateYear]").type(testYear);
    cy.get("[data-cy=arriveDestinationDateMonth]").select("January");
    cy.get("[data-cy=arriveDestinationDateDay]").type("12");
    cy.get("[data-cy=arriveDestinationDateYear]").type(testYear);
    //Address
    /* ***********************please fix this to be a data-cy link instead ****************** */
    // cy.get('[dataCy=accountTypeAH]').eq(0).click()
    cy.get("[id=is-new-address-known-n]").click({ force: true });
  });
});
