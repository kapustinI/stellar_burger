import { setCookie, deleteCookie } from '../../src/utils/cookie';

const mockBun = '[data-cy="643d69a5c3f7b9001cfa093c"]';
const mockIngredient = '[data-cy="643d69a5c3f7b9001cfa0941"]';

describe('Tests for burger constructor', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('postOrder');

    localStorage.setItem('refreshToken', 'testRefreshToken123');
    setCookie('accessToken', 'testAccessToken123');
  });

  afterEach(() => {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  });

  it('add ingredient to constructor', () => {
    cy.wait('@getIngredients');

    const bun = cy.get(mockBun);
    bun.contains('Добавить').click();

    const ingredient = cy.get(mockIngredient);
    ingredient.contains('Добавить').click();
  });

  it('open ingredients modal', () => {
    cy.wait('@getIngredients');

    const ingredientModal = cy.get(mockIngredient).click();

    ingredientModal.get('h3').contains('Детали ингредиента');
  });

  it('close modal by chrest click', () => {
    cy.wait('@getIngredients');

    const ingredientModal = cy.get(mockIngredient).click();

    ingredientModal.should('exist');

    ingredientModal.get('[data-cy="closeButton"]').click();

    ingredientModal.should('not.exist');
  });

  it('close modal by overlay click', () => {
    cy.wait('@getIngredients');

    const ingredientModal = cy.get(mockIngredient).click();

    ingredientModal.should('exist');

    cy.get('[data-cy="modalOverlay"]').click({ force: true });

    ingredientModal.should('not.exist');
  });

  // Создание заказа

  it('create and post order', () => {
    cy.wait('@getIngredients');

    cy.get(mockBun).contains('Добавить').click();
    cy.get(mockIngredient).contains('Добавить').click();

    cy.get('button').contains('Оформить заказ').click();
    cy.wait('@postOrder');

    const orderModal = cy.get('[data-cy="modal"]');
    orderModal.contains('45817');

    orderModal.get('[data-cy="closeButton"]').click();
    orderModal.should('not.exist');

    cy.contains('Выберите булки');
    cy.contains('Выберите начинку');
  });
});
