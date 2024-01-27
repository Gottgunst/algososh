import React, { FormEventHandler, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { letterWithIndex, reverseString } from '../../algorithms/reverseString';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { motion } from 'framer-motion';

export const StringComponent: React.FC = () => {
  const [inputSting, setInputString] = useState('');

  const [isLoader, setIsLoader] = useState(false);
  const [isDisabledInput, setIsDisabledInput] = useState(false);

  const [stages, setStages] = useState<letterWithIndex[][] | null>(null);
  const [currStage, setCurrStage] = useState<JSX.Element | null>(null);
  const [lap, setLap] = useState<number | null>(null);

  const changeInput: FormEventHandler<HTMLInputElement> = (e) => {
    setInputString((e.target as HTMLInputElement).value);
  };

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setCurrStage(<></>);
    setLap(0);
    setIsLoader(true);
    setStages(reverseString(inputSting));
  };

  useEffect(() => {
    if (inputSting === '') setIsDisabledInput(true);
    else setIsDisabledInput(false);

    if (stages && lap !== null) {
      // инициализация массива в состоянии default
      if (lap === 0)
        setCurrStage(
          <>
            {stages[lap].map((el, i) => {
              // получаем уникальный индекс по которому хранится знак
              const key = Object.keys(el)[0];
              const state = ElementStates.Default;

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

      // запуск анимации перестановки
      setTimeout(() => {
        setCurrStage(
          <>
            {stages[lap].map((el) => {
              // получаем уникальный индекс по которому хранится знак
              const key = Object.keys(el)[0];
              const lastIndex = stages[lap].length - 1 - lap;

              const state =
                key === 'id' + lap || key === 'id' + lastIndex
                  ? ElementStates.Changing
                  : key < 'id' + lap || key > 'id' + lastIndex
                  ? ElementStates.Modified
                  : ElementStates.Default;

              return (
                <motion.div
                  key={key}
                  layoutId={key}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <Circle letter={el[key]} state={state} />
                </motion.div>
              );
            })}
          </>
        );

        if (lap < stages!.length - 1) {
          // переход на новый круг анимации
          setTimeout(() => {
            setLap(lap + 1);
          }, 500);
        } else {
          // перекрашиваем все знаки в modified
          setCurrStage(
            <>
              {stages[lap].map((el) => {
                // получаем уникальный индекс по которому хранится знак
                const key = Object.keys(el)[0];
                const state = ElementStates.Modified;

                return (
                  <motion.div
                    key={key}
                    layoutId={key}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <Circle letter={el[key]} state={state} />
                  </motion.div>
                );
              })}
            </>
          );
          setLap(null);
        }
      }, 900);

      setTimeout(() => setIsLoader(false), stages.length + 4 * 1500);
    }
  }, [stages, setCurrStage, lap, inputSting]);

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
