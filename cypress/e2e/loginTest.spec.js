/// <reference types="cypress" />
import {
  Email,
  firstName,
  lastName,
  phoneNumber,
  birthdate,
  password,
} from "../../config";

describe("login", () => {
  beforeEach(() => {
    cy.signUp(Email, firstName, lastName, phoneNumber, birthdate, password);
  });

  it("testing the login pop up alert", () => {
    cy.visit("/login/login.html");

    cy.get("#login-email").type(Email);
    cy.get("#login-password").type(password);
    cy.get("#login-form").submit();
    cy.on("window:alert", (text) => {
      expect(text).to.be.equal("Login successful!");
    });
  });
});
