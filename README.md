# Cypress E2E Testing Project

## Overview

This project uses Cypress for end-to-end testing of a web application. Cypress is a powerful and user-friendly tool that enables developers to write and execute tests simulating user interactions with the application, ensuring that all parts of the system work as expected.

## Prerequisites

Before setting up the project, make sure you have the following installed:

- **Node.js** (version 12 or higher)
- **npm** (Node Package Manager, comes with Node.js)
- **Cypress** (this will be installed as part of the project setup)

## Project Setup

1. **Clone the repository:**

   ```
   git clone https://github.com/abolfazlamuzegari/Automation-testing.git
   cd Automation-testing
   ```

2. **install dependencies**

   ```
   npm install
   ```

3. **setting up an http server**
   ```
    python -m http.server 8000
   ```
   You can check that the server is running if you open a web browser and navigate to `http://localhost:8080`.
4. **Open Cypress**
   ```
    npx cypress open
   ```
5. **Run tests in the command line**
   ```
    npx cypress run
   ```

## Documentation

- Use the [Cypress Documentation](https://on.cypress.io) for instructions on how to use Cypress
- Read the [Command Line Guide](https://on.cypress.io/guides/guides/command-line) for run options
- Read [Installing Cypress](https://on.cypress.io/installing-cypress) for step-by-step information on installing Cypress in your own project
