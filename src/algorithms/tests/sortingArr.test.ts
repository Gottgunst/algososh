import { sortingArr } from '../sortingArr';

// Тестирование алгоритмов сортировки выбором и пузырьком
describe('Sorting Array', () => {
  // Корректно сортирует:
  // пустой массив;
  it('Have empty input', () => {
    //############################## arrange
    const arr: number[] = [];
    const runSelectEmpty = () => {
      sortingArr({ arr, type: 'select' });
    };
    const runBubbleEmpty = () => {
      sortingArr({ arr, type: 'bubble' });
    };

    //############################## assert
    expect(runSelectEmpty).toThrow('Empty array');
    expect(runBubbleEmpty).toThrow('Empty array');
  });

  // массив из одного элемента;
  it('Have one element array', () => {
    //############################## arrange
    const arr = [42];

    //############################## act
    const arrStepSelect = sortingArr({ arr, type: 'select' });
    const arrStepBubble = sortingArr({ arr, type: 'bubble' });
    const { length: lengthSelect } = arrStepSelect;
    const { length: lengthBubble } = arrStepBubble;
    const lastStepSelect = arrStepSelect[lengthSelect - 1];
    const lastStepBubble = arrStepBubble[lengthBubble - 1];
    const [lastStepSelectArr, lastStepSelectStates] = lastStepSelect;
    const [lastStepBubbleArr, lastStepBubbleStates] = lastStepBubble;
    const resultArrSelect = lastStepSelectArr.map((el) => el.data);
    const resultArrBubble = lastStepBubbleArr.map((el) => el.data);

    //############################## assert
    expect(resultArrSelect).toEqual(arr);
    expect(resultArrBubble).toEqual(arr);
  });

  // массив из нескольких элементов.
  it('Usual ascending sorting', () => {
    //############################## arrange
    const arr = [10, 100, 42, 35, 88];
    const arrAsc = [10, 35, 42, 88, 100];

    //############################## act
    const arrStepSelect = sortingArr({
      arr,
      type: 'select',
      direction: 'ascending',
    });
    const arrStepBubble = sortingArr({
      arr,
      type: 'bubble',
      direction: 'ascending',
    });
    const { length: lengthSelect } = arrStepSelect;
    const { length: lengthBubble } = arrStepBubble;
    const lastStepSelect = arrStepSelect[lengthSelect - 1];
    const lastStepBubble = arrStepBubble[lengthBubble - 1];
    const [lastStepSelectArr, lastStepSelectStates] = lastStepSelect;
    const [lastStepBubbleArr, lastStepBubbleStates] = lastStepBubble;
    const resultArrSelect = lastStepSelectArr.map((el) => el.data);
    const resultArrBubble = lastStepBubbleArr.map((el) => el.data);

    //############################## assert
    expect(resultArrSelect).toEqual(arrAsc);
    expect(resultArrBubble).toEqual(arrAsc);
  });

  it('Usual descending sorting', () => {
    //############################## arrange
    const arr = [10, 100, 42, 35, 88];
    const arrDesc = [100, 88, 42, 35, 10];

    //############################## act
    const arrStepSelect = sortingArr({
      arr,
      type: 'select',
      direction: 'descending',
    });
    const arrStepBubble = sortingArr({
      arr,
      type: 'bubble',
      direction: 'descending',
    });
    const { length: lengthSelect } = arrStepSelect;
    const { length: lengthBubble } = arrStepBubble;
    const lastStepSelect = arrStepSelect[lengthSelect - 1];
    const lastStepBubble = arrStepBubble[lengthBubble - 1];
    const [lastStepSelectArr, lastStepSelectStates] = lastStepSelect;
    const [lastStepBubbleArr, lastStepBubbleStates] = lastStepBubble;
    const resultArrSelect = lastStepSelectArr.map((el) => el.data);
    const resultArrBubble = lastStepBubbleArr.map((el) => el.data);

    //############################## assert
    expect(resultArrSelect).toEqual(arrDesc);
    expect(resultArrBubble).toEqual(arrDesc);
  });
});
