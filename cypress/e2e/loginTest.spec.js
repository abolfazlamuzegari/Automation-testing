/// <reference types="cypress" />
import {
  Email,
  firstName,
  lastName,
  phoneNumber,
  birthdate,
  password,
} from "../../config";
function today() {
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const todayFormat = currentDate.toLocaleString("en-US", options);
  return todayFormat;
}
describe("login", () => {
  beforeEach(() => {
    cy.signUp(Email, firstName, lastName, phoneNumber, birthdate, password);
    cy.visit("/login/login.html");
  });

  it("testing the login pop up alert, redirection link and messages in dashboard", () => {
    cy.get("#login-email").type(Email);
    cy.get("#login-password").type(password);
    cy.get("#login-form").submit();
    cy.on("window:alert", (text) => {
      expect(text).to.be.equal("Login successful!");
    });

    cy.url().should("not.include", "/login.html");
    cy.url().should("include", "/dashboard.html");

    cy.get("p").find("#user-name").should("have.property", firstName);

    cy.get("#current-time").should("have.text", today());
  });

  it("testing mandatory fields for login page", () => {
    cy.get("#login-email").should("have.attr", "required");
    cy.get("#login-password").should("have.attr", "required");
  });
  it("should not submit login if mandatory fields are empty", () => {
    cy.get("button").click();
    cy.get("#login-email:invalid").should("exist");
    cy.get("#login-password:invalid").should("exist");
  });
  it("testing if the link button redirects back to signup page", () => {
    cy.contains("Sign Up").click();
    cy.url().should("not.include", "/login.html");
    cy.url().should("include", "/signup.html");
  });

  it("testing the failed login", () => {
    cy.get("#login-email").type("notTest@test.com");
    cy.get("#login-password").type("not1");
    cy.get("#login-form").submit();
    cy.on("window:alert", (text) => {
      expect(text).to.be.equal(
        "Login failed. Please check your email and password."
      );
    });
  });
  it("signing out from the dashboard page testing", () => {
    cy.get("#login-email").type(Email);
    cy.get("#login-password").type(password);
    cy.get("#login-form").submit();
    cy.get("#sign-out-button").click();

    cy.url().should("not.include", "/dashboard.html");
    cy.url().should("include", "/login.html");
  });
});
