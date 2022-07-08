// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

beforeEach(() => {
  cy.intercept('POST', '/aop/api/aopIntegration/**', { 
    statusCode: 200,
    body: {
      returnCode: 'success',
      uuid: '11111-11111-11111-11111',
      refNumber: '1'
    } 
  });
  
  cy.intercept('POST', '/aop/api/submit-attachment/**', {
    statusCode: 200,
    body: {
      returnCode: 'success'
    }
  })
})