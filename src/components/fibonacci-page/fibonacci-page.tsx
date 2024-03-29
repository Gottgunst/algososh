import React, { FormEventHandler, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { motion } from 'framer-motion';
import { Circle } from '../ui/circle/circle';
import { calcFibonacci } from '../../algorithms/calcFibonacci';
import { useStagesState } from '../../hooks/useStagesState';
import styles from './fibonacci-page.module.css';

export const FibonacciPage: React.FC = () => {
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
  } = useStagesState<number[]>(0);

  const changeInput: FormEventHandler<HTMLInputElement> = (e) => {
    const input = parseInt((e.target as HTMLInputElement).value);

    if (input > 19 || input < 1 || isNaN(input)) setIsDisabledInput(true);
    else {
      setIsDisabledInput(false);
      setInputData(input);
    }
  };

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setCurrStage(<></>);
    setStages(calcFibonacci(inputData));
    setIsLoader(true);
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
    if (inputData < 1) setIsDisabledInput(true);
    else setIsDisabledInput(false);
  }, [inputData]);

  useEffect(() => {
    if (stages) {
      setCurrStage(
        <motion.div className={styles.result}>
          {stages.map((el, i) => (
            <motion.div
              initial={{ x: -5, y: -30, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ ease: 'easeIn', duration: 0.5, delay: i * 0.5 }}
              key={i}
              layoutId={'id' + i}
            >
              <Circle letter={el + ''} index={i} />
            </motion.div>
          ))}
        </motion.div>
      );
      setTimeout(() => setIsLoader(false), stages.length * 600);
    }
  }, [stages]);

  /* #######################
  ========== JSX ==========
  ####################### */

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <form className={styles.form} onSubmit={runAlgorithm}>
        <Input
          max={19}
          isLimitText={true}
          onChange={changeInput}
          type='number'
        />
        <Button
          type='submit'
          text='Рассчитать'
          disabled={isDisabledInput}
          isLoader={isLoader}
        />
      </form>
      {currStage}
    </SolutionLayout>
  );
};
