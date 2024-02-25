describe('Stack page', () => {
  const strings = ['Боб', 'Бор', 'Роб', 'Рой'];
  const { length } = strings;

  beforeEach(function () {
    cy.visit('/stack');

    cy.get('button[type="submit"]').as('addButton');
    cy.get('button[value="Удалить"]').as('delButton');
    cy.get('button[value="Очистить"]').as('clearButton');
  });

  // Если в инпуте пусто, то кнопка добавления недоступна.
  it('режимы работы кнопок', () => {
    cy.get('input').should('be.empty');
    cy.get('@addButton').should('be.disabled');
    cy.get('@delButton').should('be.disabled');
    cy.get('@clearButton').should('be.disabled');

    cy.get('input').type(strings[0]);
    cy.get('@addButton')
      .should('not.be.disabled')
      .click()
      .should('be.disabled');

    cy.get('@delButton').should('not.be.disabled');
    cy.get('@clearButton').should('not.be.disabled');
  });

  // Правильность добавления элемента в стек
  // цвета элементов меняются и каждый шаг анимации отрабатывает корректно.
  it('добавление в стек элемента', () => {
    //assert
    for (let i = 0; i < length; i++) {
      cy.get('input').type(strings[i]);
      cy.get('@addButton').click();
      cy.get('[class*=circle_changing]')
        .should('have.length', 1)
        .should('contain.text', strings[i])
        .wait(1000)
        .invoke('attr', 'class')
        .should('contain', 'circle_default');
    }

    cy.get('[class*=circle_circle]')
      .should('have.length', length)
      .last()
      .then((el) => {
        const lastText = el.text();
        expect(lastText).eql(strings[length - 1]);
      });
  });

  // Проверить правильность удаления элемента из стека.
  it('удаление элемента в стеке', () => {
    for (let i = 0; i < length; i++) {
      cy.get('input').type(strings[i]);
      cy.get('@addButton').click();
    }

    cy.get('@delButton').click();

    cy.get('[class*=circle_circle]')
      .should('have.length', length - 1)
      .last()
      .then((el) => {
        const lastText = el.text();
        expect(lastText).eql(strings[length - 2]);
      });
  });

  // Проверьте поведение кнопки «Очистить».
  // по нажатию на кнопку «Очистить» длина стека должна быть равна 0.
  it('очистка стека', () => {
    for (let i = 0; i < length; i++) {
      cy.get('input').type(strings[i]);
      cy.get('@addButton').click();
    }

    cy.get('@clearButton').click();

    cy.get('[class*=circle_circle]').should('have.length', 0);
  });
});
