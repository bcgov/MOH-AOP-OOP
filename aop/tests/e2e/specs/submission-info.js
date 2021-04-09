// https://docs.cypress.io/api/introduction/api.html

describe("Select a form page", () => {
  it("Visits select a form page", () => {
    cy.visit("/submission-info");
    cy.contains("h1", "Select a form");
  });

  it('Has no detectable a11y violations on load', () => {
    // Test the page at initial load
    cy.visit("/submission-info");
    cy.checkA11y();
  });
});
