import cypress from "cypress";

describe("constructor page works correctly", () => {
  before(function () {
    cy.visit("/");
  });
  it("should open modal after ingredient click", function () {
    cy.get("[class*=list__item]").first().click();
    cy.get('[data-cy="modal"]').as("modal");
    cy.get("[class*=energy__prop]").as("energy");

    cy.get("@modal").get("header").should("contain", "Детали ингредиента");
    cy.get("@modal").should("contain", "Углеводы, г");
    cy.get("@modal").should("contain", "Калории, ккал");
    cy.get("@modal").should("contain", "Белки, г");
    cy.get("@modal").should("contain", "Жиры, г");
    cy.get("@modal").should("contain", "Краторная булка N-200i");
    cy.get("@energy").eq(0).should("contain", "420");
    cy.get("@energy").eq(1).should("contain", "80");
    cy.get("@energy").eq(2).should("contain", "24");
    cy.get("@energy").eq(3).should("contain", "53");
  });
  it("should close modal after close button click", function () {
    cy.get('[data-cy="close"]').click();
    cy.get('[data-cy="modal"]').should("not.exist");
  });
});
