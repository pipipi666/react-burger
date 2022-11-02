import { API_URL_ORDERS } from "../../src/utils/constsAPI";
import cypress from "cypress";

const addItem = (index) => {
  cy.get("[class*=list__item]")
    .eq(index)
    .trigger("dragstart")
    .trigger("dragleave");
  cy.get('[data-cy="constructor"]')
    .trigger("dragenter")
    .trigger("dragover")
    .trigger("drop")
    .trigger("dragend");
};

describe("constructor page works correctly", () => {
  before(function () {
    cy.visit("/");
  });
  it("should drag ingredient to constructor", function () {
    addItem(0);
    addItem(5);
    addItem(10);
    cy.get("button").contains("Оформить заказ").click();
    cy.get('input[type="email"]').type("nnm107072@gmail.com");
    cy.get('input[type="password"]').type("111111");
    cy.get("button").contains("Войти").click();
    cy.get("button").should("contain", "Оформить заказ");
    cy.get("button").contains("Оформить заказ").click();
    cy.get('[data-cy="modal"]').as("modal");
    cy.intercept(API_URL_ORDERS).as("orders");
    cy.wait("@orders").then(() => {
      cy.get("@modal").should("contain", "идентификатор заказа");
      cy.get("@modal").should("contain", "Ваш заказ начали готовить");
    });
  });
  it("should close modal after close button click", function () {
    cy.get('[data-cy="close"]').click();
    cy.get('[data-cy="modal"]').should("not.exist");
  });
});
