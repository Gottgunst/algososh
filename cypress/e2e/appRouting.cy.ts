describe('app works correctly with routes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should have all links', () => {
    cy.get('a[href="/recursion"]').should('exist');
    cy.get('a[href="/fibonacci"]').should('exist');
    cy.get('a[href="/sorting"]').should('exist');
    cy.get('a[href="/stack"]').should('exist');
    cy.get('a[href="/queue"]').should('exist');
    cy.get('a[href="/list"]').should('exist');
  });

  it('should open string reverse page', () => {
    cy.get('a[href="/recursion"]').click();
    cy.url().should('include', '/recursion');
    cy.contains('Строка');
  });

  it('should open fibonacci string page', () => {
    cy.get('a[href="/fibonacci"]').click();
    cy.url().should('include', '/fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });

  it('should open sorting page', () => {
    cy.get('a[href="/sorting"]').click();
    cy.url().should('include', '/sorting');
    cy.contains('Сортировка массива');
  });

  it('should open stack page', () => {
    cy.get('a[href="/stack"]').click();
    cy.url().should('include', '/stack');
    cy.contains('Стек');
  });

  it('should open queue page', () => {
    cy.get('a[href="/queue"]').click();
    cy.url().should('include', '/queue');
    cy.contains('Очередь');
  });

  it('should open list page', () => {
    cy.get('a[href="/list"]').click();
    cy.url().should('include', '/list');
    cy.contains('Связный список');
  });
});
