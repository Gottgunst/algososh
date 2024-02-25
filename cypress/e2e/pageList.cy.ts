describe('Queue page', () => {
  const strings = ['Шон', 'Кон', 'Бон'];
  const itemIndex = '1';

  const isLoader = (button) =>
    cy
      .get(button)
      .invoke('attr', 'class')
      .should('not.contain', 'button_loader');

  beforeEach(function () {
    cy.visit('/list');

    cy.get('input[name="list"]').as('inputList');
    cy.get('input[name="index"]').as('inputIndex');

    cy.get('button[value="add-head"]').as('addHead');
    cy.get('button[value="add-tail"]').as('addTail');
    cy.get('button[value="add-index"]').as('addIndex');

    cy.get('button[value="del-head"]').as('delHead');
    cy.get('button[value="del-tail"]').as('delTail');
    cy.get('button[value="del-index"]').as('delIndex');
  });

  // Если в инпуте пусто, то кнопка добавления недоступна.
  it('в input пусто, то кнопка добавления недоступна.', () => {
    cy.get('@inputList').should('be.empty');
    cy.get('@addHead').should('be.disabled');
    cy.get('@addTail').should('be.disabled');
    cy.get('@addIndex').should('be.disabled');

    cy.get('@inputList').type(strings[0]);
    cy.get('@addHead').should('not.be.disabled');
    cy.get('@addTail').should('not.be.disabled');
    cy.get('@addIndex').should('be.disabled');

    cy.get('@inputIndex').type(itemIndex);
    cy.get('@addIndex').should('not.be.disabled');
  });

  // отрисовки дефолтного списка.
  it('отрисовки дефолтного списка', () => {
    //assert
    cy.get('[class*=circle_circle]').should('exist');
  });

  // добавления элемента в head.
  it('добавления элемента в head', () => {
    cy.get('@inputList').type(strings[0]);
    cy.get('@addHead').click();
    //assert
    cy.get('[class*=circle_circle]').first().should('contain', strings[0]);
  });
  // добавления элемента в tail.
  it('добавления элемента в tail', () => {
    cy.get('@inputList').type(strings[1]);
    cy.get('@addTail').click();
    //assert
    cy.get('[class*=circle_circle]').last().should('contain', strings[1]);
  });
  // добавления элемента по индексу.
  it('добавления элемента по индексу', () => {
    cy.get('@inputList').type(strings[2]);
    cy.get('@inputIndex').type(itemIndex);
    cy.get('@addIndex').click();
    //assert
    cy.get('[class*=circle_circle]', { timeout: 10000 })
      .eq(Number(itemIndex))
      .should('contain', strings[2]);
  });
  // удаления элемента из head.
  it('удаления элемента в head', () => {
    cy.get('@inputList').type(strings[0]);
    cy.get('@addHead').click();

    cy.waitUntil(() => isLoader('@addHead'), { timeout: 8000 });

    cy.get('@inputList').clear().type(strings[1]);
    cy.get('@addHead').click();

    cy.waitUntil(() => isLoader('@addHead'), { timeout: 8000 });
    //assert
    cy.get('@delHead').click();
    cy.get('[class*=circle_circle]').first().should('contain', strings[0]);
  });
  // удаления элемента из tail.
  it('удаления элемента в tail', () => {
    cy.get('@inputList').type(strings[1]);
    cy.get('@addTail').click();

    cy.waitUntil(() => isLoader('@addTail'), { timeout: 8000 });

    cy.get('@inputList').clear().type(strings[2]);
    cy.get('@addTail').click();

    cy.waitUntil(() => isLoader('@addTail'), { timeout: 8000 });
    cy.wait(500);

    //assert
    cy.get('@delTail').click();
    cy.get('[class*=circle_circle]').last().should('contain', strings[1]);
  });
  // удаления элемента по индексу.
  it('удаления элемента по индексу', () => {
    //prepare
    cy.get('@inputList').type(strings[0]);
    cy.get('@inputIndex').type(itemIndex);
    cy.get('@addIndex').click();

    cy.waitUntil(() => isLoader('@addIndex'), { timeout: 8000 });

    cy.get('@inputList').clear().type(strings[1]);
    cy.get('@inputIndex').clear().type(itemIndex);
    cy.get('@addIndex').click();

    cy.waitUntil(() => isLoader('@addIndex'), { timeout: 8000 });

    //assert
    cy.get('@inputIndex').clear().type(itemIndex);
    cy.get('@delIndex').click();

    cy.get('[class*=circle_circle]')
      .eq(Number(itemIndex))
      .should('contain', strings[0]);
  });
});
