/// <reference types="cypress" />

describe('example to-do app', () => {
    it("Home page", () => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:4200');
    })
  
    it('Account creation', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      cy.get('.signup').click();
      cy.get('.title-signup').contains('SIGN UP');

      // Info typing
      cy.get('#nameformControl').clear().type("John Doe");
      cy.get('#emailformControl').clear().type('johndoe@gmail.com');
      cy.get('#passwordformControl').clear().type('JohnDoe11');
      cy.get('#cpasswordformControl').clear().type('JohnDoe11');  
      cy.get('#signupButton').click();
      cy.wait(2000)
      cy.get("h2").contains("LOG IN")
    })
  
    it('Login test', () => {
      cy.get('#emailformControl').clear().type('johndoe@gmail.com');
      cy.get('#passwordformControl').clear().type('JohnDoe11');
  
      cy.get('#loginButton').click();
    })
  


  })
  