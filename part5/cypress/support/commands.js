Cypress.Commands.add("blogLogin", ({ username, password }) => {
  cy.request("POST", "http://localhost:3000/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogappUser", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});
