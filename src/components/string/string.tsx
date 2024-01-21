import React, { FormEventHandler, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { reverseString } from '../../algorithms/reverseString';
import { stages } from '../../types/stages';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';

export const StringComponent: React.FC = () => {
  const [inputSting, setInputString] = useState('');
  const [stages, setStages] = useState<stages<string> | null>(null);
  const [currStage, setCurrStage] = useState<JSX.Element | null>(null);
  const [lap, setLap] = useState(0);

  const changeInput: FormEventHandler<HTMLInputElement> = (e) => {
    setInputString((e.target as HTMLInputElement).value);
  };

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setStages(reverseString(inputSting));
  };

  useEffect(() => {
    if (stages) {
      setCurrStage(
        <>
          {stages![lap].map((el, i) => (
            <Circle letter={el} key={i} />
          ))}
        </>
      );
      if (lap < stages!.length - 1)
        setTimeout(() => {
          setLap(lap + 1);
        }, 1000);
    }
    // return setLap(0);
  }, [stages, setCurrStage, lap]);

  return (
    <SolutionLayout title='Строка'>
      <form className='form' onSubmit={runAlgorithm}>
        <Input maxLength={11} isLimitText={true} onChange={changeInput} />
        <Button type='submit' text='Развернуть' />
      </form>
      <div className='result'>{currStage}</div>
    </SolutionLayout>
  );
};
