// https://docs.cypress.io/api/introduction/api.html
Cypress.on('uncaught:exception', (err, runnable) => {
  console.log(err);
  return false;
})

describe("Happy path", () => {
  it("completes the app lifecycle without errors", () => {
    //Home page
    cy.visit("http://localhost:8080/oop");
    cy.location().should((loc) => {
      expect(loc.host).to.eq('localhost:8080')
      expect(loc.hostname).to.eq('localhost')
      expect(loc.href).to.eq(
        'http://localhost:8080/oop'
      )
      expect(loc.origin).to.eq('http://localhost:8080')
      expect(loc.pathname).to.eq('/oop')
    })

    //Captcha
    cy.get('[data-cy=captchaInput]').type('irobot')
    cy.get('[data-cy=consentCheckbox]').click()
    cy.get('[data-cy=consentContinue]').click()
    cy.get('[data-cy=continueBar]').click()
    
    //Your Info
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        'http://localhost:8080/oop/your-info'
      )
      expect(loc.pathname).to.eq('/oop/your-info')
    })

    cy.get('[data-cy=yourInfoLastName]').type('CROTOPHAGAXA')
    /* ***********************please fix this to be a data-cy link instead ****************** */
    // cy.get('[data-cy=yourInfoPhn]').type('9310134963')
    cy.get('[id=phn]').type('9310134963')
    cy.get('[data-cy=continueBar]').click()

    //Account Type
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        'http://localhost:8080/oop/account-type'
      )
      expect(loc.pathname).to.eq('/oop/account-type')
    })
    /* ***********************please fix this to be a data-cy link instead ****************** */
    // cy.get('[dataCy=accountTypeAH]').eq(0).click()
    cy.get('[id=person-moving-ah]').click({ force: true})
    cy.get('[data-cy=continueBar]').click()

    //Move Info
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        'http://localhost:8080/oop/move-info'
      )
      expect(loc.pathname).to.eq('/oop/move-info')
    })
    /* ***********************please fix this to be a data-cy link instead ****************** */
    // cy.get('[dataCy=accountTypeAH]').eq(0).click()
    cy.get('[id=is-new-address-known-n]').click({ force: true})
  });
});
