import React, { FormEventHandler, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { randomArr } from '../../utils/randomArr';
import { motion } from 'framer-motion';
import { useStagesState } from '../../hooks/useStagesState';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { RadioInput } from '../ui/radio-input/radio-input';
import { sortingArr } from '../../algorithms/sortingArr';
import { Column } from '../ui/column/column';
import { ElementStates } from '../../types/element-states';
import { TElementAnimation, TStageElement } from '../../types/stage-element';
import { TArrWithId, arrWithMemo } from '../../utils/arrWithMemo';

// Начальный Массив
const initArray = [10, 100, 42, 35, 88];

export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = useState('select');
  const [animationArray, setAnimationArray] = useState<
    TElementAnimation[] | null
  >(null);
  const [currElement, setCurrElement] = useState<number>(0);

  const {
    inputData,
    setInputData,
    isLoader,
    setIsLoader,
    isDisabledInput,
    stages,
    setStages,
    currStage,
    setCurrStage,
    lap,
    setLap,
    timeline,
    wait,
  } = useStagesState<TArrWithId<number>[][]>(initArray);

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const direction = (e.nativeEvent as any).submitter.value;
    const type = sortingType;

    setIsLoader(true);
    setLap(0);
    setStages(sortingArr({ arr: inputData, direction, type }));
  };

  const newArray = (): void => {
    const newArray = randomArr();
    setInputData(newArray);
    setCurrStage(
      stageElement({
        stages: [arrWithMemo<number>(newArray)],
        lap: 0,
      })
    );
  };

  const changeSortingType: FormEventHandler<HTMLInputElement> = (e) => {
    setSortingType((e.target as HTMLInputElement).value);
  };

  const stageElement: TStageElement<TArrWithId<number>[][]> = ({
    stages,
    lap,
    animation = Array(stages[lap].length).fill({
      state: ElementStates.Default,
    }),
  }) => {
    return (
      <motion.div
        layoutId='result'
        className='result result_sortArray'
        transition={{ ease: 'easeIn', duration: 0.7 }}
      >
        {stages[lap].map((el, i) => {
          const state = animation[i].state;

          return (
            <motion.div
              key={el.id}
              layoutId={'id' + el.id}
              initial={{ opacity: 0, scale: 1, y: 0 }}
              animate={{ opacity: 1 }}
            >
              <Column index={el.data} state={state} />
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  /* #######################
  ======== Эффекты ========
  ####################### */

  useEffect(() => {
    if (!stages)
      setCurrStage(
        stageElement({
          stages: [arrWithMemo<number>(initArray)],
          lap: 0,
        })
      );
    return () => {
      setCurrStage(<></>);
    };
  }, []);

  useEffect(() => {
    if (stages && lap != null) {
      let anim: TElementAnimation[];

      timeline(() => {
        // if (animationArray === null && currElement < stages[lap].length - 1) {
        //   setAnimationArray(
        //
        //   );
        // }
      })
        .then(() => {
          // anim = [
          //   ...stages[lap].map((el, i) => {
          //     return {
          //       state:
          //         el.index === i
          //           ? ElementStates.Changing
          //           : ElementStates.Modified,
          //       index: el.index,
          //       link: el,
          //     };
          //   }),
          // ];
        })
        .then(() => {
          setCurrStage(stageElement({ stages, lap }));

          // if (currElement < stages[lap].length - 1) {
          //   // setAnimationArray(null);
          //   setCurrElement(currElement + 1);
          //   return Promise.reject();
          // }
        })
        .then(() => wait(30 * stages.length - 1))
        .then(() => {
          if (lap < stages!.length - 1) {
            setLap(lap + 1);
            setCurrElement(0);
          } else {
            setLap(null);
            setIsLoader(false);
          }
        })
        .catch(() => {
          // setLap(null);
          // setIsLoader(false);
        });
    }
  }, [stages, lap]);

  /* #######################
  ========== JSX ==========
  ####################### */

  return (
    <SolutionLayout title='Сортировка массива'>
      <form
        className='form'
        onSubmit={runAlgorithm}
        style={{ maxWidth: 927, height: 60, alignItems: 'center' }}
      >
        <RadioInput
          label='Выбор'
          value='select'
          name='sortingType'
          onClick={changeSortingType}
          defaultChecked
        />
        <RadioInput
          label='Пузырёк'
          value='bubble'
          name='sortingType'
          onClick={changeSortingType}
        />
        <div style={{ display: 'inherit', gap: 'inherit' }}>
          <Button
            type='submit'
            text='По возрастанию'
            value={Direction.Ascending}
            isLoader={isLoader}
            disabled={isDisabledInput}
            sorting={Direction.Ascending}
          />
          <Button
            type='submit'
            text='По убыванию'
            value={Direction.Descending}
            isLoader={isLoader}
            disabled={isDisabledInput}
            sorting={Direction.Descending}
          />
        </div>
        <Button
          type='button'
          text='Новый массив'
          isLoader={isLoader}
          disabled={isDisabledInput}
          onClick={newArray}
        />
      </form>
      {currStage}
    </SolutionLayout>
  );
};
