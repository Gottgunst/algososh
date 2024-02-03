import { ElementStates } from '../types/element-states';
import { TArrWithId, arrWithMemo } from '../utils/arrWithMemo';

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

  switch (type) {
    case 'select':
      for (let i = 0; i < length - 1; i++) {
        const lastStage = stages.length - 1;
        const [arr, phase] = stages[lastStage];

        let num = arr[i].data;
        let numIndex = i;

        for (let j = i + 1; j < length; j++) {
          stages.push(
            phaseNumbers({
              arr: [...arr],
              phase,
              firstIndex: i,
              secondIndex: j,
              last: length,
              state: ElementStates.Changing,
              type,
            })
          );

          if (
            direction === 'ascending' ? num > arr[j].data : num < arr[j].data
          ) {
            num = arr[j].data;
            numIndex = j;
          }
        }

        stages.push(
          swapNumbers({
            arr: [...arr],
            phase,
            firstIndex: i,
            secondIndex: numIndex,
            last: length,
            state: ElementStates.Modified,
            type,
          })
        );
      }
      break;
    case 'bubble':
      for (let i = 0, l = length - 1; i <= l; i++) {
        const lastStage = stages.length - 1;
        const [arr, phase] = stages[lastStage];

        if (i === l && i !== 0) {
          stages.push(
            phaseNumbers({
              arr,
              phase,
              firstIndex: i,
              secondIndex: i,
              last: l + 1,
              state: ElementStates.Modified,
              type,
            })
          );
          i = -1;
          l--;
        } else {
          let num = arr[i].data;
          let numIndex = i;

          stages.push(
            phaseNumbers({
              arr: [...arr],
              phase,
              firstIndex: i,
              secondIndex: i + 1,
              last: l,
              state: ElementStates.Changing,
              type,
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
                arr: [...arr],
                phase,
                firstIndex: i,
                secondIndex: numIndex,
                last: l,
                state: ElementStates.Changing,
                type,
              })
            );
          }
        }
      }
      break;
    default:
      break;
  }

  return stages;
};

const phaseNumbers: TPhaseNumbers = ({
  arr,
  phase,
  firstIndex,
  secondIndex,
  last,
  state,
  type,
}) => {
  const stateArray: ElementStates[] = [...phase];

  for (let i = 0; i < last; i++) {
    if (i === secondIndex && i === firstIndex)
      stateArray[i] = ElementStates.Modified;
    else if (i === secondIndex || i === firstIndex) {
      stateArray[i] = state;
      type === 'select' && i === secondIndex
        ? (stateArray[i] = ElementStates.Changing)
        : (stateArray[i] = state);
    } else {
      if (i < firstIndex && type === 'select')
        stateArray[i] = ElementStates.Modified;
      else stateArray[i] = ElementStates.Default;
    }
  }

  return [arr, stateArray];
};

const swapNumbers: TSwapNumbers = ({
  arr,
  phase,
  firstIndex,
  secondIndex,
  last,
  state,
  type,
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
      last,
      state: ElementStates.Modified,
      type,
    })[1],
  ];
};

/* #######################
========== Типы ==========
####################### */
type TSortingArr = (
  props: TSortingArrProps
) => [TArrWithId<number>[], ElementStates[]][];

export type TArrTuples = [TArrWithId<number>[], ElementStates[]][];

type TSortingArrProps = {
  arr: number[];
  type?: 'select' | 'bubble' | string;
  direction?: 'ascending' | 'descending';
};

type TSwapNumbers = (
  props: TNumbersProps
) => [TArrWithId<number>[], ElementStates[]];

type TPhaseNumbers = TSwapNumbers;

type TNumbersProps = {
  arr: TArrWithId<number>[];
  phase: ElementStates[];
  firstIndex: number;
  secondIndex: number;
  last: number;
  state: ElementStates;
  type: 'select' | 'bubble' | string;
};
