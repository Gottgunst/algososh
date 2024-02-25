describe('Fibonacci page', () => {
  beforeEach(function () {
    cy.visit('/fibonacci');

    cy.get('button[type="submit"]').as('addButton');
  });

  // Если в input пусто, то кнопка добавления недоступна.
  it('пустой input — кнопка отключена и наоборот', () => {
    const str = '19';

    cy.get('input').should('be.empty');
    cy.get('@addButton').should('be.disabled');
    cy.get('input').type(str);
    cy.get('@addButton').should('not.be.disabled');

    cy.get('input').type(str + str);
    cy.get('@addButton').should('be.disabled');
  });

  // Проверьте, что числа генерируются корректно.
  it('Правильная последовательность', () => {
    const str = '19';
    const test = [
      1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584,
      4181, 6765,
    ];

    cy.get('input').type(str);
    cy.get('@addButton').click();

    cy.get('p.text_type_circle').each(($p, i) => {
      const num = Number($p.text());
      cy.wrap(num).should('eq', test[i]);
    });
  });
});
