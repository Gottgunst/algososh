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
    const str = 'гр.от';
    const reverseStr = 'то.рг';
    const stateArr = [
      ['d', 'd', 'd', 'd', 'd'],
      ['c', 'd', 'd', 'd', 'c'],
      ['m', 'c', 'd', 'c', 'm'],
      ['m', 'm', 'c', 'm', 'm'],
      ['m', 'm', 'm', 'm', 'm'],
    ];
    const { length } = str;

    //assert
    cy.get('input').type(str);
    cy.get('button[type="submit"]').click();

    for (let i = 0; i < length; i++, cy.wait(1000)) {
      cy.get('[class*=circle_circle]')
        .should('have.length', length)
        .each((el, j) => {
          const classes = el[0].className;
          const classD = classes.match(/circle_default.+/);
          const classC = classes.match(/circle_changing.+/);
          const classM = classes.match(/circle_modified.+/);

          if (classD) {
            expect(el).to.have.text(str[j]);
            expect('d').eql(stateArr[i][j]);
          }

          if (classC) {
            expect(el).to.have.text(str[j]);
            expect('c').eql(stateArr[i][j]);
          }

          if (classM) {
            expect(el).to.have.text(reverseStr[j]);
            expect('m').eql(stateArr[i][j]);
          }
        });
    }
  });
});
