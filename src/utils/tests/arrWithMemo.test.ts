import { arrWithMemo } from '../arrWithMemo';

describe('Array with index and id', () => {
  //
  it('should return object array with items', () => {
    //############################## arrange
    const arr = ['Crowe', 1964, { Name: 'Russell' }];

    //############################## act
    const newArr = arrWithMemo(arr);

    //############################## assert
    newArr.forEach((el) => {
      expect(el).toHaveProperty('data');
      expect(el).toHaveProperty('id');
      expect(el).toHaveProperty('index');
    });
  });

  //
  it('should return uniq id', () => {
    //############################## arrange
    const arr = [1, 2, 3, 4, 5, 1, 3];
    let tempId: string[] = [];

    //############################## act
    const newArr = arrWithMemo(arr);

    //############################## assert
    newArr.forEach((el) => {
      tempId.forEach((collectId) => expect(el.id).not.toBe(collectId));
      tempId.push(el.id);
    });
  });
});
