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

  describe("Blog app", function () {
    // ...

    describe("When logged in", function () {
      beforeEach(function () {
        cy.request({
          method: "POST",
          url: "http://localhost:3003/api/login",
          body: {
            username: "MrEgger",
            password: "nicolas",
          },
        }).then((response) => {
          localStorage.setItem(
            "loggedBlogappUser",
            JSON.stringify(response.body)
          );
          cy.visit("http://localhost:3000");
        });
      });

      it("A blog exists", function () {
        cy.request({
          url: "http://localhost:3003/api/blogs",
          method: "POST",
          body: {
            title: "Cypress HTTP POST test",
            author: "MrEgger",
            url: "www.egg.com",
            likes: 4,
          },
          headers: {
            Authorization: `bearer ${
              JSON.parse(localStorage.getItem("loggedBlogappUser")).token
            }`,
          },
        });
      });

      it("A blog can be created", function () {
        cy.get("#button-new-blog").click();
        cy.get("#title").type("Cypress test");
        cy.get("#author").type("MrEgger");
        cy.get("#url").type("www.egg.com");
        cy.get("#button-create").click();
        cy.contains("Cypress test - MrEgger");
      });

      it("A blog can be liked", function () {
        cy.get("#button-new-blog").click();
        cy.get("#title").type("Cypress test");
        cy.get("#author").type("MrEgger");
        cy.get("#url").type("www.egg.com");
        cy.get("#button-create").click();
        cy.get("#button-view").click();
        cy.get("#button-like").click();
        cy.contains("likes 1");
      });

      it("A blog can be deleted", function () {
        cy.get("#button-new-blog").click();
        cy.get("#title").type("Cypress test");
        cy.get("#author").type("MrEgger");
        cy.get("#url").type("www.egg.com");
        cy.get("#button-create").click();
        cy.get("#button-view").click();
        cy.get("#button-delete").click();
        cy.contains("Cypress test - MrEgger").should("not.exist");
      });
    });
  });
});
