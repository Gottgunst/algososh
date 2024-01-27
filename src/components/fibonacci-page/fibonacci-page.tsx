import React, { FormEventHandler, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { motion } from 'framer-motion';
import { Circle } from '../ui/circle/circle';
import { calcFibonacci } from '../../algorithms/calcFibonacci';

export const FibonacciPage: React.FC = () => {
  const [inputNumber, setInputNumber] = useState(0);

  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const [stages, setStages] = useState<number[] | null>(null);
  const [currStage, setCurrStage] = useState<JSX.Element | null>(null);

  const changeInput: FormEventHandler<HTMLInputElement> = (e) => {
    const input = (e.target as HTMLInputElement).value as unknown as number;

    if (input > 19 || input < 1) setIsDisabledInput(true);
    else {
      setIsDisabledInput(false);
      setInputNumber(input);
    }
  };

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setCurrStage(<></>);
    setStages(calcFibonacci(inputNumber));
    setIsLoader(true);
  };

  useEffect(() => {
    if (inputNumber < 1) setIsDisabledInput(true);
    else setIsDisabledInput(false);

    if (stages) {
      setCurrStage(
        <>
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
        </>
      );
      setTimeout(() => setIsLoader(false), stages.length * 600);
    }
  }, [stages, inputNumber]);

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <form className='form' onSubmit={runAlgorithm}>
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
      <motion.div className='result'>{currStage}</motion.div>
    </SolutionLayout>
  );
};
