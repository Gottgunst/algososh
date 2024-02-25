import { reverseString } from '../reverseString';

// Тестирование алгоритма разворота строки
describe('String Reverse', () => {
  // Корректно разворачивает строку:
  it('Common string reverse', () => {
    //############################## arrange
    const inputString = 'мирудобен';
    const testString = 'небодурим';

    //############################## act
    const arrayOfSteps = reverseString(inputString);
    const { length } = arrayOfSteps;
    const lastStep = arrayOfSteps[length - 1];
    const resultString = lastStep.map((el) => el.data).join('');

    //############################## assert
    expect(resultString).toEqual(testString);
  });

  // с чётным количеством символов.
  it('Have even number of character', () => {
    //############################## arrange
    const inputString = 'рома';
    const testString = 'амор';

    //############################## act
    const arrayOfSteps = reverseString(inputString);
    const { length } = arrayOfSteps;
    const lastStep = arrayOfSteps[length - 1];
    const resultString = lastStep.map((el) => el.data).join('');

    //############################## assert
    expect(resultString).toEqual(testString);
  });

  // с нечетным количеством символов.
  it('Have odd number of character', () => {
    //############################## arrange
    const inputString = 'sator';
    const testString = 'rotas';

    //############################## act
    const arrayOfSteps = reverseString(inputString);
    const { length } = arrayOfSteps;
    const lastStep = arrayOfSteps[length - 1];
    const resultString = lastStep.map((el) => el.data).join('');

    //############################## assert
    expect(resultString).toEqual(testString);
  });

  // с одним символом.
  it('Have one of character', () => {
    //############################## arrange
    const inputString = 'q';
    const testString = 'q';

    //############################## act
    const arrayOfSteps = reverseString(inputString);
    const { length } = arrayOfSteps;
    const lastStep = arrayOfSteps[length - 1];
    const resultString = lastStep.map((el) => el.data).join('');

    //############################## assert
    expect(resultString).toEqual(testString);
  });

  // пустую строку.
  it('Have empty input', () => {
    //############################## arrange
    const runEmpty = () => {
      reverseString('');
    };
    // const runBlank = () => {
    //   reverseString();
    // };

    //############################## assert
    expect(runEmpty).toThrow('Empty string');
    // expect(runBlank).toThrow('Empty string');
  });
});
