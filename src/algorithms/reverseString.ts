export function reverseString(str: string): letterWithIndex[][] {
  const strArr = str.split('');
  const strArrWithMemo = strArr.map((el, i) => ({ ['id' + i]: el }));
  const stages = [strArrWithMemo];

  for (let i = 0, end = str.length - 1; i < end; i++, end--) {
    const tempArray = [...stages[i]];

    tempArray[i] = strArrWithMemo[end];
    tempArray[end] = strArrWithMemo[i];

    stages.push(tempArray);
  }

  return stages;
}

/* #######################
========== Типы ==========
####################### */
export type letterWithIndex = {
  [id: string]: string;
};
