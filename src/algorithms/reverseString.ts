import { stages } from '../types/stages';

export function reverseString(str: string): stages<string> {
  const strArr = str.split('');
  const stages = [strArr];

  for (let i = 0, end = str.length - 1; i < end; i++, end--) {
    const tempArray = [...stages[i]];

    tempArray[i] = strArr[end];
    tempArray[end] = strArr[i];

    stages.push(tempArray);
  }

  return stages;
}
