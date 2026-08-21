// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//if this line causes a webpack compilation error, run `npm i` to generate the secrets file
import { secrets } from "./secrets.js";

Cypress.Commands.add("navigateLogin", () => {
  cy.get(".bcgov-button").click();
  if (Cypress.expose("environment") === "test" || Cypress.expose("environment") === "dev") {
    console.log("dev/test environment, extra login steps required");
    expect(secrets).to.not.be.undefined;

    expect(secrets.username.length).to.be.greaterThan(
      3,
      "BCSC login secrets not found-- add them to cypress/support/secrets.js to proceed"
    );
    expect(secrets.password.length).to.be.greaterThan(3);

    //the rest of this code block is BCSC code, which can change at a moment's notice
    cy.origin("https://idtest.gov.bc.ca", { args: secrets }, (secrets) => {
      cy.get("[id=tile_test_with_username_password_device_div_id]").click();
      cy.get("[id=username]").type(secrets.username);
      cy.get("[id=password]").type(secrets.password);
      cy.get("[id=submit-btn]").click();
    });
  } else {
    console.log("local environment, no extra login steps required");
  }
});
