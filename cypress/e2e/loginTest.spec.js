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
    cy.url().should("not.include", "/login.html");
    cy.url().should("include", "/dashboard.html");
  });

  it("testing mandatory fields for login page", () => {
    cy.visit("/login/login.html");
    cy.get("#login-email").should("have.attr", "required");
    cy.get("#login-password").should("have.attr", "required");
  });
  it("should not submit login if mandatory fields are empty", () => {
    cy.visit("/login/login.html");
    cy.get("button").click();
    cy.get("#login-email:invalid").should("exist");
    cy.get("#login-password:invalid").should("exist");
  });
  it("testing if the link button redirects back to signup page", () => {
    cy.visit("/login/login.html");
    cy.contains("Sign Up").click();
    cy.url().should("not.include", "/login.html");
    cy.url().should("include", "/signup.html");
  });

  it("testing the failed login", () => {
    cy.visit("/login/login.html");
    cy.get("#login-email").type("notTest@test.com");
    cy.get("#login-password").type("not1");
    cy.get("#login-form").submit();
    cy.on("window:alert", (text) => {
      expect(text).to.be.equal(
        "Login failed. Please check your email and password."
      );
    });
  });
});
