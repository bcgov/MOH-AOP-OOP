// https://docs.cypress.io/api/introduction/api.html

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
    
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        'http://localhost:8080/oop/your-info'
      )
      expect(loc.pathname).to.eq('/oop/your-info')
    })

    //Your Info
  });
});
