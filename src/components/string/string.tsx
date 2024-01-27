import React, { FormEventHandler, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { letterWithIndex, reverseString } from '../../algorithms/reverseString';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { motion, LayoutGroup } from 'framer-motion';

export const StringComponent: React.FC = () => {
  const [inputSting, setInputString] = useState('');
  const [stages, setStages] = useState<letterWithIndex[][] | null>(null);
  const [currStage, setCurrStage] = useState<JSX.Element | null>(null);
  const [lap, setLap] = useState<number | null>(null);

  const changeInput: FormEventHandler<HTMLInputElement> = (e) => {
    setInputString((e.target as HTMLInputElement).value);
  };

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLap(0);
    setStages(reverseString(inputSting));
  };

  useEffect(() => {
    if (stages && lap !== null) {
      setCurrStage(
        <>
          {stages![lap].map((el) => {
            // получаем уникальный индекс по которому хранится буква
            const key = Object.keys(el)[0];

            return <Circle letter={el[key]} key={key} layoutId={key} />;
          })}
        </>
      );

      if (lap < stages!.length - 1)
        setTimeout(() => {
          setLap(lap + 1);
        }, 1000);
      else setLap(null);
    }
  }, [stages, setCurrStage, lap]);

  return (
    <SolutionLayout title='Строка'>
      <form className='form' onSubmit={runAlgorithm}>
        <Input maxLength={11} isLimitText={true} onChange={changeInput} />
        <Button type='submit' text='Развернуть' />
      </form>
      <motion.div
        className='result'
        layout
        transition={{ ease: 'easeIn', duration: 2 }}
      >
        {currStage}
      </motion.div>
    </SolutionLayout>
  );
};
