import React, { FormEventHandler, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { letterWithIndex, reverseString } from '../../algorithms/reverseString';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { motion } from 'framer-motion';
import { useStagesState } from '../../hooks/useStagesState';
import { TStageElement } from '../../types/stage-element';

export const StringComponent: React.FC = () => {
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
  } = useStagesState<letterWithIndex[][]>('');

  const changeInput: FormEventHandler<HTMLInputElement> = (e) => {
    setInputData((e.target as HTMLInputElement).value);
  };

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setCurrStage(<></>);
    setLap(0);
    setIsLoader(true);
    setStages(reverseString(inputData));
  };

  const stageElement: TStageElement<letterWithIndex[][]> = ({
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
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Circle letter={el[key]} state={state} />
            </motion.div>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    if (inputData === '') setIsDisabledInput(true);
    else setIsDisabledInput(false);

    if (stages && lap !== null) {
      // инициализация массива в состоянии default
      if (lap === 0)
        setCurrStage(stageElement({ stages, lap, phase: 'initial' }));

      // запуск анимации перестановки
      setTimeout(() => {
        setCurrStage(stageElement({ stages, lap, phase: 'animate' }));

        if (lap < stages!.length - 1) {
          // переход на новый круг анимации
          setTimeout(() => {
            setLap(lap + 1);
          }, 500);
        } else {
          // перекрашиваем все знаки в modified
          setCurrStage(stageElement({ stages, lap, phase: 'finally' }));
          setLap(null);
        }
      }, 900);

      setTimeout(() => setIsLoader(false), stages.length + 4 * 1500);
    }
  }, [stages, setCurrStage, lap, inputData]);

  return (
    <SolutionLayout title='Строка'>
      <form className='form' onSubmit={runAlgorithm}>
        <Input maxLength={11} isLimitText={true} onChange={changeInput} />
        <Button
          type='submit'
          text='Развернуть'
          isLoader={isLoader}
          disabled={isDisabledInput}
        />
      </form>
      <motion.div
        className='result'
        layout
        transition={{ ease: 'easeIn', duration: 0.5 }}
      >
        {currStage}
      </motion.div>
    </SolutionLayout>
  );
};
