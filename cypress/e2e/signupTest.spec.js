/// <reference types="cypress" />
import { fillingTheSignupForm, password } from "../../config";

describe("signup page test suite", () => {
  beforeEach(() => {
    cy.visit("/signUp/signup.html");
  });
  it("checking for the popUp in the signup page", () => {
    //visiting the signup page

    fillingTheSignupForm();
    cy.on("window:alert", (text) => {
      expect(text).to.equal("Sign up successful!");
    });
  });

  it("sign up to login redirection test", () => {
    // testing certain elements of signup page
    cy.get("h1").should("contain", "Sign Up");
    cy.get("button").should("contain", "Sign Up");

    //fill the form
    fillingTheSignupForm();
    // testing the elements of signup page
    cy.get("h1").should("not.contain", "Sign Up");
    cy.get("button").should("not.contain", "Sign Up");
    //testing if the url has changed
    cy.url().should("not.include", "/signup.html");
    cy.url().should("include", "/login.html");
  });

  it("testing mandatory fields", () => {
    cy.get("#email").should("have.attr", "required");
    cy.get("#firstname").should("have.attr", "required");
    cy.get("#lastname").should("have.attr", "required");
    cy.get("#birthdate").should("have.attr", "required");
    cy.get("#phone").should("have.attr", "required");
    cy.get("#password").should("have.attr", "required");
    cy.get("#password-confirm").should("have.attr", "required");
  });

  it("should not submit form if mandatory fields are empty", () => {
    cy.get('button[type="submit"]').click();
    cy.get("#email:invalid").should("exist");
    cy.get("#firstname:invalid").should("exist");
    cy.get("#lastname:invalid").should("exist");
    cy.get("#birthdate:invalid").should("exist");
    cy.get("#phone:invalid").should("exist");
    cy.get("#password:invalid").should("exist");
    cy.get("#password-confirm:invalid").should("exist");
  });

  it("testing if the password and password-confirm are equal", () => {
    cy.get("#password").type(password);

    cy.get("#password-confirm").type(password);
    cy.get("#password")
      .invoke("val")
      .then((password) => {
        cy.get("#password-confirm").invoke("val").should("equal", password);
      });
  });
});
