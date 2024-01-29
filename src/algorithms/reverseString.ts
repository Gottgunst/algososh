import { TArrWithIndex, arrWithMemo } from '../utils/arrWithMemo';

export function reverseString(str: string): TArrWithIndex<string>[][] {
  const strArr = str.split('');
  const strArrWithMemo = arrWithMemo<string>(strArr);
  const stages = [strArrWithMemo];

  for (let i = 0, end = str.length - 1; i < end; i++, end--) {
    const tempArray = [...stages[i]];

    tempArray[i] = strArrWithMemo[end];
    tempArray[end] = strArrWithMemo[i];

    stages.push(tempArray);
  }

  return stages;
}
