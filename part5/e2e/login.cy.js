describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "MrEgger",
      name: "Eggy Egg",
      password: "nicolas",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");

    //  make new user here with post request
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.get("#login-button");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("MrEgger");
      cy.get("#password").type("nicolas");
      cy.get("#login-button").click();
      cy.contains("Eggy Egg logged in");
      cy.get("#logout-button");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("MrEgger");
      cy.get("#password").type("katyushka");
      cy.get("#login-button").click();

      cy.get(".error").should("contain", "wrong username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get(".error").should("have.css", "border-style", "solid");
      cy.contains("wrong username or password");

      cy.get("html").should("not.contain", "Eggy Egg logged in");
    });
  });
});
