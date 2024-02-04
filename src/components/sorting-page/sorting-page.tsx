import React, { FormEventHandler, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { randomArr } from '../../utils/randomArr';
import { motion } from 'framer-motion';
import { useStagesState } from '../../hooks/useStagesState';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { RadioInput } from '../ui/radio-input/radio-input';
import { TArrTuples, sortingArr } from '../../algorithms/sortingArr';
import { Column } from '../ui/column/column';
import { ElementStates } from '../../types/element-states';
import { TStageElement } from '../../types/stage-element';
import { arrWithMemo } from '../../utils/arrWithMemo';
import styles from './sorting-page.module.css';

// Начальный Массив
const initArray = [10, 100, 42, 35, 88];

export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = useState('select');
  const [directionType, setDirectionType] = useState<Direction | null>(null);
  const [elState, setElState] = useState<ElementStates | null>(null);

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
    timeline,
    wait,
  } = useStagesState<TArrTuples>(initArray);

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const direction = (e.nativeEvent as any).submitter.value;
    setDirectionType(direction);
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
        stages: [
          [
            arrWithMemo<number>(newArray),
            Array(newArray.length).fill(ElementStates.Default),
          ],
        ],
        lap: 0,
      })
    );
  };

  const changeSortingType: FormEventHandler<HTMLInputElement> = (e) => {
    setSortingType((e.target as HTMLInputElement).value);
  };

  const stageElement: TStageElement<TArrTuples> = ({ stages, lap }) => {
    const [arr, states] = stages[lap];
    const isFinal = elState !== null;

    return (
      <motion.div
        layoutId='result'
        className={styles.result}
        transition={{ ease: 'easeIn', duration: 0.7 }}
      >
        {arr.map((el, i) => {
          const state = states[i];
          return (
            <motion.div
              key={el.id}
              layoutId={el.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Column index={el.data} state={isFinal ? elState : state} />
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
          stages: [
            [
              arrWithMemo<number>(initArray),
              Array(5).fill(ElementStates.Default),
            ],
          ],
          lap: 0,
          phase: 'initial',
        })
      );
    return () => {
      setCurrStage(<></>);
    };
  }, []);

  useEffect(() => {
    if (isLoader) {
      setIsDisabledInput(true);
    } else {
      setIsDisabledInput(false);
    }
  }, [isLoader]);

  useEffect(() => {
    if (stages && lap !== null) {
      console.log(stages);

      const maxLap = stages.length;

      timeline(() => {
        setCurrStage(stageElement({ stages, lap }));
      })
        .then(() => wait(500))
        .then(() => {
          if (lap < maxLap - 1) {
            setLap(lap + 1);
          }
          if (lap === maxLap - 1 && elState === null) {
            setLap(maxLap - 1);
            setElState(ElementStates.Modified);
            return Promise.reject();
          }
        })
        .then(() => {
          if (lap === maxLap - 1) {
            setLap(null);
            setIsLoader(false);
            setElState(null);
          }
        })
        .catch(() => {});
    }
  }, [stages, lap, elState]);

  /* #######################
  ========== JSX ==========
  ####################### */

  return (
    <SolutionLayout title='Сортировка массива'>
      <form className={styles.form} onSubmit={runAlgorithm}>
        <div className={styles.radio}>
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
        </div>
        <div className={styles.formPart}>
          <Button
            type='submit'
            text='По возрастанию'
            value={Direction.Ascending}
            isLoader={isLoader && directionType === Direction.Ascending}
            disabled={isDisabledInput}
            sorting={Direction.Ascending}
          />
          <Button
            type='submit'
            text='По убыванию'
            value={Direction.Descending}
            isLoader={isLoader && directionType === Direction.Descending}
            disabled={isDisabledInput}
            sorting={Direction.Descending}
          />
        </div>
        <Button
          type='button'
          text='Новый массив'
          // isLoader={isLoader}
          disabled={isDisabledInput}
          onClick={newArray}
        />
      </form>
      {currStage}
    </SolutionLayout>
  );
};
