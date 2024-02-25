import React, { FormEventHandler, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { reverseString } from '../../algorithms/reverseString';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { motion } from 'framer-motion';
import { useStagesState } from '../../hooks/useStagesState';
import { TStageElement } from '../../types/stage-element';
import { TArrWithId } from '../../utils/arrWithMemo';
import styles from './string.module.css';

export const StringComponent: React.FC = () => {
  const {
    inputData,
    changeInput,
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
  } = useStagesState<TArrWithId<string>[][]>('');

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setCurrStage(<></>);
    setLap(0);
    setIsLoader(true);
    setStages(reverseString(inputData));
  };

  const stageElement: TStageElement<TArrWithId<string>[][]> = ({
    stages,
    lap,
    phase,
  }) => {
    return (
      <motion.div
        className={styles.result}
        layout
        transition={{ ease: 'easeIn', duration: 0.5 }}
      >
        {stages[lap].map((el) => {
          const lastIndex = stages[lap].length - 1 - lap;

          const state =
            phase === 'initial'
              ? ElementStates.Default
              : phase === 'finally'
              ? ElementStates.Modified
              : el.index === lap || el.index === lastIndex
              ? ElementStates.Changing
              : el.index < +lap || el.index > +lastIndex
              ? ElementStates.Modified
              : ElementStates.Default;

          return (
            <motion.div
              key={el.index}
              layoutId={'id' + el.id}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Circle letter={el.data} state={state} />
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
    return () => {
      setCurrStage(<></>);
    };
  }, []);

  useEffect(() => {
    if (inputData === '') setIsDisabledInput(true);
    else setIsDisabledInput(false);
  }, [inputData]);

  useEffect(() => {
    if (stages && lap !== null) {
      const phase =
        lap === 0
          ? 'initial'
          : lap < stages!.length - 1
          ? 'animate'
          : stages!.length % 2 > 0
          ? 'animate'
          : 'finally';

      timeline(() => {
        setCurrStage(stageElement({ stages, lap, phase }));
      })
        .then(() => wait(1000))
        .then(() => {
          if (lap === 0)
            setCurrStage(stageElement({ stages, lap, phase: 'animate' }));

          if (stages!.length % 2 > 0 && lap === stages.length - 1) {
            setCurrStage(stageElement({ stages, lap, phase: 'finally' }));
          }
        })
        .then(() => wait(lap === 0 ? 1000 : 0))
        .then(() => {
          if (lap < stages!.length - 1) {
            setLap(lap + 1);
          } else {
            setLap(null);
            setIsLoader(false);
          }
        });
    }
  }, [stages, lap]);

  /* #######################
  ========== JSX ==========
  ####################### */

  return (
    <SolutionLayout title='Строка'>
      <form className={styles.form} onSubmit={runAlgorithm}>
        <Input maxLength={11} isLimitText={true} onChange={changeInput} />
        <Button
          type='submit'
          text='Развернуть'
          isLoader={isLoader}
          disabled={isDisabledInput}
        />
      </form>

      {currStage}
    </SolutionLayout>
  );
};
