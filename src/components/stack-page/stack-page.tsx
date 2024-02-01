import React, { FormEventHandler, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { useStagesState } from '../../hooks/useStagesState';
import { motion } from 'framer-motion';
import { Stack } from '../../algorithms/Stack';
import { Circle } from '../ui/circle/circle';
import { TArrWithIndex } from '../../utils/arrWithMemo';
import { ElementStates } from '../../types/element-states';

export const StackPage: React.FC = () => {
  const {
    inputData,
    setInputData,
    changeInput,
    isLoader,
    setIsLoader,
    isDisabledInput,
    setIsDisabledInput,
    isDisabledDelete,
    setIsDisabledDelete,
    stages,
    setStages,
    currStage,
    setCurrStage,
    elementPhase,
    setElementPhase,
  } = useStagesState<TArrWithIndex<string>[]>('');

  const [stack] = useState(new Stack<string>());

  const delItem = () => {
    setElementPhase(ElementStates.Changing);
    setIsLoader(true);
    setTimeout(() => {
      stack.pop();
      setStages(stack.getArray());
    }, 700);
  };

  const clearItem = () => {
    stack.clear();
    setStages(null);
  };

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setIsLoader(true);
    stack.push(inputData);
    setInputData('');
    (document.querySelector('input[name=stack]') as HTMLInputElement).value =
      '';
    setStages(stack.getArray());
    setElementPhase(ElementStates.Changing);
  };

  useEffect(() => {
    if (inputData === '') setIsDisabledInput(true);
    else setIsDisabledInput(false);
  }, [inputData]);

  useEffect(() => {
    if (stages && stages.length > 0) {
      setIsDisabledDelete(false);
      setCurrStage(
        <>
          {stages.map((el, i) => (
            <motion.div
              initial={{ x: -5, y: -30, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ ease: 'easeIn', duration: 0.5 }}
              key={el.index}
              layoutId={'id' + el.index}
            >
              <Circle
                letter={el.data + ''}
                index={i}
                head={i === stages.length - 1 ? 'Top' : ''}
                state={
                  i === stages.length - 1 ? elementPhase : ElementStates.Default
                }
              />
            </motion.div>
          ))}
        </>
      );
      if (isLoader)
        setTimeout(() => {
          setIsLoader(false);
          setElementPhase(ElementStates.Default);
        }, 700);
    } else {
      setIsDisabledDelete(true);
      setCurrStage(<></>);
    }
  }, [stages, elementPhase]);

  return (
    <SolutionLayout title='Стек'>
      <form className='form' onSubmit={runAlgorithm} style={{ maxWidth: 927 }}>
        {' '}
        <div style={{ display: 'inherit', gap: 'inherit' }}>
          <Input
            maxLength={4}
            isLimitText={true}
            onChange={changeInput}
            style={{ width: 377 }}
            name='stack'
          />
          <Button
            type='submit'
            text='Добавить'
            value='Добавить'
            isLoader={isLoader}
            disabled={isDisabledInput}
          />
          <Button
            type='button'
            text='Удалить'
            value='Удалить'
            isLoader={isLoader}
            disabled={isDisabledDelete}
            onClick={delItem}
          />
        </div>
        <Button
          type='button'
          text='Очистить'
          isLoader={isLoader}
          disabled={isDisabledDelete}
          onClick={clearItem}
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
