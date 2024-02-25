describe('Queue page', () => {
  const strings = ['Ром', 'Дон', 'Шон', 'Кон', 'Бон'];
  const indexes = ['2', '5'];
  const { length } = strings;

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
  it('режимы работы кнопок', () => {
    cy.get('@inputList').should('be.empty');
    cy.get('@addHead').should('be.disabled');
    cy.get('@addTail').should('be.disabled');
    cy.get('@addIndex').should('be.disabled');

    // cy.get('@delHead').should('be.disabled');

    cy.get('@inputList').type(strings[0]);
    cy.get('@addHead').should('not.be.disabled');
    cy.get('@addTail').should('not.be.disabled');
    cy.get('@addIndex').should('be.disabled');

    cy.get('@inputIndex').type(indexes[0]);
    cy.get('@addIndex').should('not.be.disabled');
  });

  // отрисовки дефолтного списка.

  // добавления элемента в head.

  // добавления элемента в tail.

  // добавления элемента по индексу.

  // удаления элемента из head.

  // удаления элемента из tail.

  // удаления элемента по индексу.

  // it('добавление в очередь элемента', () => {
  //   //assert
  //   for (let i = 0; i < length; i++) {
  //     cy.get('input').type(strings[i]);
  //     cy.get('@addButton').click();

  //     cy.get('@queueArr')
  //       .eq(i)
  //       .should('contain', strings[i])
  //       .invoke('attr', 'class')
  //       .should('contain', 'circle_changing');

  //     cy.get('@queueArr', { timeout: 2000 })
  //       .eq(i)
  //       .invoke('attr', 'class')
  //       .should('contain', 'circle_default');

  //     if (i === 0) cy.get('@headArr').eq(i).should('contain', 'head');

  //     cy.get('@tailArr').eq(i).should('contain', 'tail');
  //   }

  //   cy.get('@tailArr').each((el, i) => {
  //     if (el.text().includes('tail')) {
  //       expect(i).to.equal(length - 1);
  //     }
  //   });

  //   cy.get('@headArr').each((el, i) => {
  //     if (el.text().includes('head')) {
  //       expect(i).to.equal(0);
  //     }
  //   });
  // });

  // Проверить правильность удаления элемента из стека.
  // it('удаление элемента из очереди', () => {
  //   for (let i = 0; i < length; i++) {
  //     cy.get('input').type(strings[i]);
  //     cy.get('@addButton').click();
  //   }

  //   //assert
  //   for (let i = 0; i < length - 2; i++) {
  //     cy.get('@delButton').click();

  //     cy.get('@headArr').eq(i).should('contain', 'head');
  //     if (i !== length - 1)
  //       cy.get('@tailArr').eq(i).should('not.contain', 'tail');
  //     else cy.get('@tailArr').eq(i).should('contain', 'tail');
  //   }

  //   cy.get('@tailArr').each((el, i) => {
  //     if (el.text().includes('tail')) {
  //       expect(i).to.equal(length - 1);
  //     }
  //   });

  //   cy.get('@headArr').each((el, i) => {
  //     if (el.text().includes('head')) {
  //       expect(i).to.equal(length - 3);
  //     }
  //   });
  // });
});

// cy.waitUntil(    //   () => {
//     // Проверка состояния компонента после срабатывания useEffect
//     return cy
//       .get('.component')
//       .invoke('attr', 'data-loaded')
//       .then((attrValue) => {
//         return attrValue === 'true';
//       });
//   },
//   { timeout: 10000 }
// );
