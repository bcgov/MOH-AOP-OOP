// https://docs.cypress.io/api/introduction/api.html

describe("Sign in page", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Ministry of Health - Diagnostic Services secure upload tool");
  });

  it('Has no detectable a11y violations on load', () => {
    // Test the page at initial load
    cy.visit("/");
    cy.checkA11y();
  });
});

