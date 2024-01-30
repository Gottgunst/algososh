import { ElementStates } from '../types/element-states';
import { TArrWithIndex, arrWithMemo } from '../utils/arrWithMemo';

export const sortingArr: TSortingArr = ({
  arr,
  type = 'select',
  direction = 'ascending',
}) => {
  const numWithMemo = arrWithMemo<number>(arr);

  const { length } = numWithMemo;
  const stages: TArrTuples = [
    [numWithMemo, Array(length).fill(ElementStates.Default)],
  ];

  for (let i = 0; i < length - 1; ) {
    const lastStage = stages.length - 1;
    const [arr, phase] = stages[lastStage];

    let num = arr[i].data;
    let numIndex = i;

    if (type === 'select') {
      for (let j = i + 1; j < length; j++) {
        stages.push(
          phaseNumbers({
            arr,
            phase,
            firstIndex: i,
            secondIndex: j,
            state: ElementStates.Changing,
          })
        );

        if (direction === 'ascending' ? num > arr[j].data : num < arr[j].data) {
          num = arr[j].data;
          numIndex = j;
        }
      }

      stages.push(
        swapNumbers({
          arr,
          phase,
          firstIndex: i,
          secondIndex: numIndex,
          state: ElementStates.Modified,
        })
      );
      i++;
    } else {
      stages.push(
        phaseNumbers({
          arr,
          phase,
          firstIndex: i,
          secondIndex: i + 1,
          state: ElementStates.Changing,
        })
      );
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
            phase,
            firstIndex: i,
            secondIndex: numIndex,
            state: ElementStates.Modified,
          })
        );

        i = 0;
      } else i++;
    }
  }

  return stages;
};

const phaseNumbers: TPhaseNumbers = ({
  arr,
  phase,
  firstIndex,
  secondIndex,
  state,
}) => {
  const stateArray: ElementStates[] = [...phase];

  arr.forEach((el, i) => {
    if (i === firstIndex || i === secondIndex) stateArray[i] = state;
    else stateArray[i] = ElementStates.Default;
  });

  return [arr, stateArray];
};

const swapNumbers: TSwapNumbers = ({
  arr,
  phase,
  firstIndex,
  secondIndex,
  state,
}) => {
  const temp = arr[firstIndex];

  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;

  return [
    [...arr],
    phaseNumbers({
      arr,
      phase,
      firstIndex,
      secondIndex,
      state: ElementStates.Modified,
    })[1],
  ];
};

/* #######################
========== Типы ==========
####################### */
type TSortingArr = (
  props: TSortingArrProps
) => [TArrWithIndex<number>[], ElementStates[]][];

export type TArrTuples = [TArrWithIndex<number>[], ElementStates[]][];

type TSortingArrProps = {
  arr: number[];
  type?: 'select' | 'bubble' | string;
  direction?: 'ascending' | 'descending';
};

type TSwapNumbers = (
  props: TNumbersProps
) => [TArrWithIndex<number>[], ElementStates[]];

type TPhaseNumbers = TSwapNumbers;

type TNumbersProps = {
  arr: TArrWithIndex<number>[];
  phase: ElementStates[];
  firstIndex: number;
  secondIndex: number;
  state: ElementStates;
};
