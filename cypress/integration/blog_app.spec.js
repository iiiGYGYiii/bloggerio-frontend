// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Blog app", function () {
  const admin = {
    name: "Omar Gygy",
    username: "iiiGYGYiii",
    password: "admin1234"
  };
  beforeEach(function(){
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users/", admin);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Please Log In");
    cy.contains("username");
  });

  it("user can log in", function(){
    cy.loginFront({ username: admin.username, password: admin.password });
    cy.contains(admin.username);
  });

  it("wrong credentials", function(){
    cy.loginFront({ username: admin.username, password: "wrong"});
    cy.get(".bad-msg").contains("Username or Password incorrect.");
    cy.get(".bad-msg").should("have.css","backgroundColor", "rgba(255, 0, 0, 0.4)")
  });

  describe("When logged in...", function(){
    beforeEach(function(){
      cy.loginBack({ username: admin.username, password:admin.password});
    });    

    it("user can create a blog", function(){
      cy.get("button.btn").click();
      cy.get("#title").type("Blog Tester");
      cy.get("#author").type("Tester User");
      cy.get("#url").type("this.url");
      cy.get("#submit-blog").click();
      cy.contains("Blog Tester");
      cy.contains("Tester User");
    });

    describe("Existence of blogs. ", function(){
      describe("Only one blog", function(){
        beforeEach( function(){
          cy.addNewBlog({author: "Tester", title:"Only this blog", url:"lonelyBlog.com"});
        });

        it("Blog is displayed", function(){
          cy.get(".blog-card")
            .should("contain", "Tester")
            .and("contain", "Only this blog");
        });

        it("User can like blog", function(){
          cy.get(".blog-card").find(".show-info-btn").click();
          cy.get(".blog-card").find("span.like-btn").click();
          cy.get(".like-par").contains("Likes: 1");
        });

        it("User can delete blog", function(){
          cy.get(".blog-card").find(".show-info-btn").click();
          cy.get(".blog-card").find("#delete").click();
          cy.get("body").should("not.contain", "Tester");
        });

      });

      describe("Multiple blogs", function(){
        beforeEach(function(){
          const blogs = [
            {author: "Tester1", title: "About testing", url: "notmyurl.co", likes:1},
            {author: "Tester2", title: "Some testing", url: "notmyurl.co", likes:3},
            {author: "Tester3", title: "Out of creativity", url: "notmyurl.co", likes:6}
          ];
          for (let blog of blogs){
            cy.addNewBlog(blog);
          }
        });
        it("Blogs are ordered by likes", function(){
          cy.get(".blog-card:first").contains("Tester3");
          cy.get(".blog-card:last").contains("Tester1");
        });
      })
    });
  });
});
