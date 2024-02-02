import { TArrWithId, arrWithMemo } from '../utils/arrWithMemo';

export const sortingArr: TSortingArr = ({
  arr,
  type = 'select',
  direction = 'ascending',
}) => {
  const numWithMemo = arrWithMemo<number>(arr);

  const { length } = numWithMemo;
  const stages = [numWithMemo];

  for (let i = 0; i < length - 1; ) {
    const lastStage = stages.length - 1;
    const arr = stages[lastStage];

    let num = arr[i].data;
    let numIndex = i;

    if (type === 'select') {
      for (let j = i + 1; j < length; j++) {
        if (direction === 'ascending' ? num > arr[j].data : num < arr[j].data) {
          num = arr[j].data;
          numIndex = j;
        }
      }

      stages.push(
        swapNumbers({
          arr,
          firstIndex: i,
          secondIndex: numIndex,
        })
      );
      i++;
    } else {
      if (
        direction === 'ascending'
          ? num > arr[i + 1].data
          : num < arr[i + 1].data
      ) {
        num = arr[i + 1].data;
        numIndex = i + 1;

        stages.push(
          swapNumbers({
            arr,
            firstIndex: i,
            secondIndex: numIndex,
          })
        );

        i = 0;
      } else i++;
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
type TSortingArr = (props: TSortingArrProps) => TArrWithId<number>[][];

type TSortingArrProps = {
  arr: number[];
  type?: 'select' | 'bubble' | string;
  direction?: 'ascending' | 'descending';
};

type TSwapNumbers = (props: TNumbersProps) => TArrWithId<number>[];

type TNumbersProps = {
  arr: TArrWithId<number>[];
  firstIndex: number;
  secondIndex: number;
};
