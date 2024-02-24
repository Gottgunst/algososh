describe('Stack page', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000/stack');
  });

  // Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.
  it('режимы работы кнопок', () => {
    const str = 'Тор';

    cy.get('input').should('be.empty');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('button[type=button]').should('be.disabled');
    // cy.get('button[text="Очистить"]').should('be.disabled');
    cy.get('input').type(str);
    cy.get('button[type="submit"]')
      .should('not.be.disabled')
      .click()
      .should('be.disabled');
    cy.get('button[type=button]').should('not.be.disabled');
  });

  // Проверьте правильность добавления элемента в стек. Важно убедиться, что цвета элементов меняются и каждый шаг анимации отрабатывает корректно.
  it('добавление в стек элемента', () => {
    const str = 'Роб';

    //assert
    cy.get('input').type(str);
    cy.get('button[type="submit"]').click();
    // for (let i = 0; i < length; i++, cy.wait(1000)) {
    //   cy.get('[class*=circle_circle]')
    //     .should('have.length', length)
    //     .each((el, j) => {
    //       const classes = el[0].className;
    //       const classD = classes.match(/circle_default.+/);
    //       const classC = classes.match(/circle_changing.+/);
    //       const classM = classes.match(/circle_modified.+/);
    //       console.log(classD, classC, classM);
    //       if (classD) {
    //         expect(el).to.have.text(str[j]);
    //         expect('d').eql(stateArr[i][j]);
    //       }
    //       if (classC) {
    //         expect(el).to.have.text(str[j]);
    //         expect('c').eql(stateArr[i][j]);
    //       }
    //       if (classM) {
    //         expect(el).to.have.text(reverseStr[j]);
    //         expect('m').eql(stateArr[i][j]);
    //       }
    //     });
    // }
  });

  // Проверить правильность удаления элемента из стека.

  // Проверьте поведение кнопки «Очистить». Добавьте в стек несколько элементов, по нажатию на кнопку «Очистить» длина стека должна быть равна 0.
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

//   it('should add and subtract products count', function () {
//     cy.get('[class^=product_product__]').first().as('product');
//     cy.get('@product')
//       .find('[class^=amount-button_button]')
//       .first()
//       .as('minusButton');
//     cy.get('@product')
//       .find('[class^=amount-button_button]')
//       .last()
//       .as('plusButton');
//     cy.get('@product').find('[class^=product_amount__]').as('productCount');

//     cy.get('@productCount').should('contain', '1');

//     cy.get('@plusButton').click();
//     cy.get('@productCount').should('contain', '2');

//     cy.get('@plusButton').click();
//     cy.get('@productCount').should('contain', '3');

//     cy.get('@minusButton').click();
//     cy.get('@productCount').should('contain', '2');

//     cy.get('@minusButton').click();
//     cy.get('@productCount').should('contain', '1');
//   });
