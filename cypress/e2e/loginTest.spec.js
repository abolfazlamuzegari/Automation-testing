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
  it("testing login redirection to dashboard page", () => {
    cy.visit("/login/login.html");
    cy.get("#login-email").type(Email);
    cy.get("#login-password").type(password);
    cy.get("button").click();
    cy.url().should("not.include", "/login.html");
    cy.url().should("include", "/dashboard.html");
  });
});
