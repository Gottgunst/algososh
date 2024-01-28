export const sortingArr: TSortingArr = ({
  arr,
  type = 'select',
  direction = 'ascending',
}) => {
  const numbersWithMemo = arr.map((el, i) => ({ ['id' + i]: el }));
  const stages = [numbersWithMemo];
  const { length } = arr;

  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j < length - 1; j++) {
      if (arr[i] < arr[j])
        stages.push(swapNumbers({ arr, firstIndex: i, secondIndex: j }));
    }
  }

  return stages;
};

const swapNumbers: TSwapNumbers = ({ arr, firstIndex, secondIndex }) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;

  return [...arr];
};

/* #######################
========== Типы ==========
####################### */
type TSortingArr = (props: TSortingArrProps) => numberWithIndex[][];
type TSortingArrProps = {
  arr: number[];
  type?: 'select' | 'bubble' | string;
  direction?: 'ascending' | 'descending';
};

type TSwapNumbers = (props: TSwapNumbersProps) => numberWithIndex[];
type TSwapNumbersProps = {
  arr: numberWithIndex[];
  firstIndex: number;
  secondIndex: number;
};

/* #######################
========== Типы ==========
####################### */
export type numberWithIndex = {
  [id: string]: number;
};
