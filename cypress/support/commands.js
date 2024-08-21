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
Cypress.Commands.add(
  "signUp",
  (Email, firstName, lastName, phoneNumber, birthdate, password) => {
    cy.session(
      [Email, firstName, lastName, phoneNumber, birthdate, password],
      () => {
        cy.visit("/signUp/signup.html");
        cy.get("#email").type(Email);
        cy.get("#firstname").type(firstName);
        cy.get("#lastname").type(lastName);
        cy.get("#birthdate").type(birthdate);
        cy.get("#phone").type(phoneNumber);
        cy.get("#password").type(password);
        cy.get("#password-confirm").type(password);
        cy.get("button").click();
      }
    );
  }
);
