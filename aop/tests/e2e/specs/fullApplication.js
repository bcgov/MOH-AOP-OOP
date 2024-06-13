const samplePDF = 'tests/e2e/fixtures/2999fil.pdf';

// MUST SET BOTH SETTINGS IN settings.js TO TRUE BEFORE RUNNING
describe('Full AOP application flow', () => {
  it('Clicks through log in page', () => {
    cy.visit('/');
    cy.get('.bcgov-button').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/aop/submission-info");
    });
    cy.get('h1').contains('Select a form')
  });

  it('Uploads a PDF', () => {
    cy.get('input#files').selectFile(samplePDF, { force: true })
    cy.wait(2000);
  });

  it('Continues to the review page', () => {
    cy.get('.bcgov-button').contains('Continue').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/aop/review");
    });
    cy.get('h1').contains('Review your submission');
  })

  it('Successfully submits', () => {
    cy.get('.bcgov-button').contains('Submit').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/aop/sending");
    });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/aop/confirmation");
    });
    cy.get('h1').contains('Confirmation message');
  })
});