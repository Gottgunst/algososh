import React, { FormEventHandler, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { randomArr } from '../../utils/randomArr';
import { motion } from 'framer-motion';
import { useStagesState } from '../../hooks/useStagesState';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { RadioInput } from '../ui/radio-input/radio-input';
import { numberWithIndex, sortingArr } from '../../algorithms/sortingArr';
import { Column } from '../ui/column/column';
import { ElementStates } from '../../types/element-states';
import { TStageElement } from '../../types/stage-element';

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
  } = useStagesState<numberWithIndex[][]>([70, 6, 21, 13, 90]);

  const [sortingType, setSortingType] = useState('select');

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const direction = (e.nativeEvent as any).submitter.value;
    const type = sortingType;

    setCurrStage(<></>);
    setLap(0);
    // setIsLoader(true);
    setStages(sortingArr({ arr: inputData, direction, type }));
  };

  const newArray = (): void => {
    setInputData(randomArr());
  };

  const changeSortingType: FormEventHandler<HTMLInputElement> = (e) => {
    setSortingType((e.target as HTMLInputElement).value);
  };

  const stageElement: TStageElement<numberWithIndex[][]> = ({
    stages,
    lap,
    phase,
  }) => {
    return (
      <>
        {stages[lap].map((el) => {
          // получаем уникальный индекс по которому хранится знак
          const key = Object.keys(el)[0];
          const lastIndex = stages[lap].length - 1 - lap;

          const state =
            phase === 'initial'
              ? ElementStates.Default
              : phase === 'finally'
              ? ElementStates.Modified
              : key === 'id' + lap || key === 'id' + lastIndex
              ? ElementStates.Changing
              : key < 'id' + lap || key > 'id' + lastIndex
              ? ElementStates.Modified
              : ElementStates.Default;

          return (
            <motion.div
              key={key}
              layoutId={key}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Column index={el[key]} state={state} />
            </motion.div>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    console.log('inputData: ', inputData, '\nStages: ', stages);

    if (stages && lap != null) {
      setCurrStage(stageElement({ stages, lap, phase: 'initial' }));
    }
  }, [stages]);

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
        className='result'
        layout
        transition={{ ease: 'easeIn', duration: 0.5 }}
        style={{ alignItems: 'flex-end', maxWidth: 'auto' }}
      >
        {currStage}
      </motion.div>
    </SolutionLayout>
  );
};
