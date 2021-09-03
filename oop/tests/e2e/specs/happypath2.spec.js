// https://docs.cypress.io/api/introduction/api.html
Cypress.on("uncaught:exception", (err, runnable) => {
  console.log(err);
  return false;
});

//At last check, there is code in the program that checks for dates in the distant future/past
//To prevent code written in 2021 from failing in 2025 because the date is too far back,
//this code pull the current year and adjusts it.
//This is to hopefully increase the stability of the test

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const testDateMove = new Date();
testDateMove.setHours(5); //to prevent time zone bugs
testDateMove.setDate(1);
testDateMove.setYear(testDateMove.getFullYear() - 1);
testDateMove.setMonth(testDateMove.getMonth() - 1);

const testDateMoveString = `${
  monthNames[testDateMove.getMonth()]
} ${testDateMove.getDate()}, ${testDateMove.getFullYear()}`;

const testDateArrive = new Date();
testDateArrive.setHours(5); //to prevent time zone bugs
testDateArrive.setDate(1);
testDateArrive.setYear(testDateArrive.getFullYear() + 1);
testDateArrive.setMonth(testDateArrive.getMonth() + 1);

// const testDateArriveString = `${testDateArrive.toLocaleString('default', { month: 'long' })} ${testDateArrive.getDate()}, ${testDateArrive.getFullYear()}`
const testDateArriveString = `${
  monthNames[testDateArrive.getMonth()]
} ${testDateArrive.getDate()}, ${testDateArrive.getFullYear()}`;

//dev credentials
const credentialName = "CROTOPHAGAXA";
const credentialPHN = "9310 134 963";

//test credentials
// const credentialName = "POIUYR";
// const credentialPHN = "9874 084 281";

const credentialPhone = "2345678910";

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
    cy.get("[data-cy=yourInfoPhone]").type(credentialPhone);
    cy.get("[data-cy=continueBar]").click();

    //Account Type
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/oop/account-type");
      expect(loc.pathname).to.eq("/oop/account-type");
    });
    cy.get("[data-cy=whoIsMovingperson-moving-ahad]").click({ force: true });
    cy.get("[data-cy=isAllDependentsis-all-dependents-moving-y]").click({
      force: true,
    });

    cy.get("[data-cy=continueBar]").click();

    //Move Info
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/oop/move-info");
      expect(loc.pathname).to.eq("/oop/move-info");
    });
    //Dates
    //************************this needs to be data-cy*********************************** */
    cy.get(".date-picker-icon")
      .eq(0)
      .click();
    cy.get("[data-cy=moveFromBCDateChevronDoubleLeft]").click();
    cy.get("[data-cy=moveFromBCDateChevronLeft]").click();
    cy.get("[data-cy=moveFromBCDateDay0]").click();
    //************************this needs to be data-cy*********************************** */
    cy.get(".date-picker-icon")
      .eq(1)
      .click();
    cy.get("[data-cy=arriveDestinationDateChevronDoubleRight]").click();
    cy.get("[data-cy=arriveDestinationDateChevronRight]").click();
    cy.get("[data-cy=arriveDestinationDateDay0]").click();
    //Address
    cy.get("[data-cy=isNewAddressKnownis-new-address-known-y]").click({
      force: true,
    });
    cy.get("[data-cy=addressValidator]").type("716 Yates Dr Milton");
    //************************this needs to be data-cy*********************************** */
    cy.get(".result-item")
      .eq(0)
      .click();

    cy.get("[data-cy=continueBar]").click();

    //Review page
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/oop/review");
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
      expect(loc.href).to.eq("http://localhost:8080/oop/submission");
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
