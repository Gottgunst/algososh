describe('Queue page', () => {
  const strings = ['Сэм', 'Фиш', 'Дош', 'Шер', 'Шик'];
  const { length } = strings;

  beforeEach(function () {
    cy.visit('/queue');

    cy.get('button[type="submit"]').as('addButton');
    cy.get('button[value="Удалить"]').as('delButton');
    cy.get('button[value="Очистить"]').as('clearButton');
    cy.get('[class*=circle_circle]').as('queueArr');
    cy.get('[class*=circle_head]').as('headArr');
    cy.get('[class*=circle_tail]').as('tailArr');
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

  // Правильность добавления элемента в стек.
  // цвета элементов меняются и каждый шаг анимации отрабатывает корректно.
  // курсоры head и tail отрисовываются корректно.
  it('добавление в очередь элемента', () => {
    //assert
    for (let i = 0; i < length; i++) {
      cy.get('input').type(strings[i]);
      cy.get('@addButton').click();

      cy.get('@queueArr')
        .eq(i)
        .should('contain', strings[i])
        .invoke('attr', 'class')
        .should('contain', 'circle_changing');

      cy.get('@queueArr', { timeout: 2000 })
        .eq(i)
        .invoke('attr', 'class')
        .should('contain', 'circle_default');

      if (i === 0) cy.get('@headArr').eq(i).should('contain', 'head');

      cy.get('@tailArr').eq(i).should('contain', 'tail');
    }

    cy.get('@tailArr').each((el, i) => {
      if (el.text().includes('tail')) {
        expect(i).to.equal(length - 1);
      }
    });

    cy.get('@headArr').each((el, i) => {
      if (el.text().includes('head')) {
        expect(i).to.equal(0);
      }
    });
  });

  // Проверить правильность удаления элемента из стека.
  it('удаление элемента из очереди', () => {
    for (let i = 0; i < length; i++) {
      cy.get('input').type(strings[i]);
      cy.get('@addButton').click();
    }

    //assert
    for (let i = 0; i < length - 2; i++) {
      cy.get('@delButton').click();

      cy.get('@headArr').eq(i).should('contain', 'head');

      if (i !== length - 1)
        cy.get('@tailArr').eq(i).should('not.contain', 'tail');
    }

    cy.get('@tailArr').each((el, i) => {
      if (el.text().includes('tail')) {
        expect(i).to.equal(length - 1);
      }
    });

    cy.get('@headArr').each((el, i) => {
      if (el.text().includes('head')) {
        expect(i).to.equal(length - 3);
      }
    });
  });

  // Проверьте поведение кнопки «Очистить».
  it('очистка стека', () => {
    for (let i = 0; i < length; i++) {
      cy.get('input').type(strings[i]);
      cy.get('@addButton').click();
    }

    cy.get('@clearButton').click();

    cy.get('@queueArr').should('contain', '');
  });
});
