import { startsWith } from 'cypress/types/lodash';

describe('String page', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000/recursion');
  });

  // если в инпуте пусто, то кнопка добавления недоступна.
  it('пустой input — кнопка отключена и наоборот', () => {
    const str = 'проба';

    cy.get('input').should('be.empty');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input').type(str);
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  // строка разворачивается корректно. Важно, чтобы у вас на каждом шаге анимации были проверки на корректность выполненной операции и корректность стилей.

  it('разворачивается корректно', () => {
    const str = 'грот';
    const test = 'торг';
    const { length } = str;

    cy.get('input').type(str);
    cy.get('button[type="submit"]').click();

    //init
    cy.get('[class*=circle_circle]')
      .should('have.length', length)
      .each((el, i) => {
        const classes = el[0].className.split(' ');

        // const st = classes.some((c) => startsWith(c, 'circle_default'));

        expect(el).to.have.text(str[i]);
        console.log(classes);
      });
    //animate

    //final
    cy.wait(length * 1000);
    cy.get('[class*=circle_circle]')
      .should('have.length', length)
      .each((el, i) => {
        expect(el).to.have.text(test[i]);

        console.log(el[0].className.split(' '));
      });
    // cy.waitUntil(
    //   () => {
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
  });
});

// cy.get('p.text_type_circle').each(($p, i) => {
//   const num = Number($p.text());
//   cy.wrap(num).should('eq', test[i]);
// });
// describe('products management works correctly', function () {
//   before(function () {
//     cy.visit('http://localhost:3000');
//   });

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
// });
