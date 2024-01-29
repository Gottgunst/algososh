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
import { TStageElement } from '../../types/stage-element';
import { TArrWithIndex, arrWithMemo } from '../../utils/arrWithMemo';

export const SortingPage: React.FC = () => {
  const {
    inputData,
    setInputData,
    isLoader,
    setIsLoader,
    isDisabledInput,
    setIsDisabledInput,
    stages,
    setStages,
    currStage,
    setCurrStage,
    lap,
    setLap,
  } = useStagesState<TArrWithIndex<number>[][]>([10, 100, 42, 35, 88]);

  const [sortingType, setSortingType] = useState('select');

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const direction = (e.nativeEvent as any).submitter.value;
    const type = sortingType;

    setLap(0);
    setIsLoader(true);
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

  const stageElement: TStageElement<TArrWithIndex<number>[][]> = ({
    stages,
    lap,
  }) => {
    return (
      <>
        {stages[lap].map((el) => {
          return (
            <motion.div
              key={el.index}
              layoutId={'id' + el.index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Column index={el.data} state={el.state} />
            </motion.div>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    setCurrStage(
      stageElement({
        stages: [arrWithMemo<number>([10, 100, 42, 35, 88])],
        lap: 0,
        phase: 'initial',
      })
    );
  }, []);

  useEffect(() => {
    console.log('Stages: ', stages);

    if (stages && lap != null) {
      // запуск анимации перестановки
      setTimeout(() => {
        setCurrStage(stageElement({ stages, lap }));

        if (lap < stages!.length - 1) {
          // переход на новый круг анимации
          setTimeout(() => {
            setLap(lap + 1);
          }, 500);
        } else {
          // перекрашиваем все знаки в modified
          setCurrStage(stageElement({ stages, lap }));
          setLap(null);
        }
      }, 900);

      setTimeout(() => setIsLoader(false), stages.length + 4 * 1500);
    }
  }, [stages, lap]);

  return (
    <SolutionLayout title='Сортировка массива'>
      <form className='form' onSubmit={runAlgorithm} style={{ maxWidth: 927 }}>
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
      <motion.div
        className='result result_sortArray'
        layout
        transition={{ ease: 'easeIn', duration: 0.5 }}
      >
        {currStage}
      </motion.div>
    </SolutionLayout>
  );
};
