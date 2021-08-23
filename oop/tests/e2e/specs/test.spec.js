// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('http://localhost:8080/oop')

    cy.contains('b', 'I have read and understand this information')
    expect(true).to.equal(true)
  })
})