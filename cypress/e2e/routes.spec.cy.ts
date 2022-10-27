import cypress from "cypress";

describe("app works correctly with routes", () => {
  before(function () {
    cy.visit("http://localhost:3000");
  });
  it("should open constructor page by default", function () {
    cy.contains("Перетащите ингредиенты сюда");
  });
  it("should open orders page after menu link click", function () {
    cy.get("a").contains("Лента заказов").click();
    cy.get("h1").contains("Лента заказов");
  });
  it("should open profile page after menu link click", function () {
    cy.get("a").contains("Личный кабинет").click();
    cy.get("h2").contains("Вход");
  });
});
