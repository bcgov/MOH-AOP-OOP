import { enableIntercepts } from "../fixtures/env-data.js";
const samplePDF = "cypress/fixtures/2999fil.pdf";

// MUST SET BOTH SETTINGS IN settings.js TO TRUE BEFORE RUNNING LOCALLY
// vite will handle this if you run the tests in bypassLogin mode
// eg. host the application using `npm run dev:bypassLogin`

describe("Full AOP application flow (HLTH1926, COAOP)", () => {
  it("Clicks through log in page", () => {
    cy.visit("/");
    cy.navigateLogin();
    cy.get("h1").contains("Select a form");
  });

  it("Clicks HLTH 1926, enters data", () => {
    cy.get("[id='COAOP']").click();
    cy.get("[id='organization']").type("abcde");
  });

  it("Uploads a PDF (AOP form)", () => {
    cy.get("input#files").selectFile(samplePDF, { force: true });
    //after it loads, the page will add a "remove" button to remove the file
    //when this element is added, we know the file has finished uploading
    cy.get('[class*="remove ml-2"]', { timeout: 30000 }).first().should("exist");
  });

  it("Clears/Enters data)", () => {
    cy.get("[id='email']").clear();
    cy.get("[id='email']").type("a@a.com");
    cy.get("[id='phone']").clear();
    cy.get("[id='phone']").type("2505551234");
    cy.get("[id='practitioner-number']").clear();
    cy.get("[id='practitioner-number']").type("A1234");
    cy.get("[id='practitioner-last-name']").clear();
    cy.get("[id='practitioner-last-name']").type("A");
  });

  it("Continues to the review page", () => {
    cy.get(".bcgov-button").contains("Continue").click();
    cy.get("h1").contains("Review your submission");
  });
  it("Successfully submits", () => {
    if (enableIntercepts) {
      console.log("aopIntegration api calls intercepted");
      cy.intercept("POST", "/aop/api/aopIntegration/**", {
        statusCode: 200,
        body: {
          testfield: "This is a stubbed test response from Cypress",
          returnCode: "success",
          uuid: "11111-11111-11111-11111",
          refNumber: "1",
        },
      });
      console.log("submit-attachment api calls intercepted");
      cy.intercept("POST", "/aop/api/submit-attachment/**", {
        statusCode: 200,
        body: {
          testfield: "This is a stubbed test response from Cypress",
          returnCode: "success",
        },
      });
    }
    cy.get(".bcgov-button").contains("Submit").click();
    cy.wait(2000);
    cy.get("h1").contains("Confirmation message");
  });
});
