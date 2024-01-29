import { ElementStates } from '../types/element-states';
import { TArrWithIndex, arrWithMemo } from '../utils/arrWithMemo';

export const sortingArr: TSortingArr = ({
  arr,
  type = 'select',
  direction = 'ascending',
}) => {
  const numWithMemo = arrWithMemo<number>(arr);
  const stages = [numWithMemo];
  const { length } = numWithMemo;

  for (let i = 0; i < length - 1; ) {
    const lastStage = stages.length - 1;

    let num = stages[lastStage][i].data;
    let numIndex = i;

    if (type === 'select') {
      for (let j = i + 1; j < length; j++) {
        if (
          direction === 'ascending'
            ? num > stages[lastStage][j].data
            : num < stages[lastStage][j].data
        ) {
          num = stages[lastStage][j].data;
          numIndex = j;
        }
      }

      stages.push(
        swapNumbers({
          arr: [...stages[lastStage]],
          firstIndex: i,
          secondIndex: numIndex,
        })
      );
      i++;
    } else {
      if (
        direction === 'ascending'
          ? num > stages[lastStage][i + 1].data
          : num < stages[lastStage][i + 1].data
      ) {
        num = stages[lastStage][i + 1].data;
        numIndex = i + 1;

        stages.push(
          swapNumbers({
            arr: [...stages[lastStage]],
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
type TSortingArr = (props: TSortingArrProps) => TArrWithIndex<number>[][];
type TSortingArrProps = {
  arr: number[];
  type?: 'select' | 'bubble' | string;
  direction?: 'ascending' | 'descending';
};

type TSwapNumbers = (props: TSwapNumbersProps) => TArrWithIndex<number>[];
type TSwapNumbersProps = {
  arr: TArrWithIndex<number>[];
  firstIndex: number;
  secondIndex: number;
};
