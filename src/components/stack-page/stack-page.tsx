import React, { FormEventHandler, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { useStagesState } from '../../hooks/useStagesState';
import { motion } from 'framer-motion';
import { Stack } from '../../algorithms/Stack';
import { Circle } from '../ui/circle/circle';
import { TArrWithId } from '../../utils/arrWithMemo';
import { ElementStates } from '../../types/element-states';
import styles from './stack-page.module.css';

export const StackPage: React.FC = () => {
  const [stack] = useState(new Stack<string>());

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
    isAddElement,
    setIsAddElement,
    stages,
    setStages,
    currStage,
    setCurrStage,
    elementPhase,
    setElementPhase,
  } = useStagesState<TArrWithId<string>[]>('');

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setIsLoader(true);
    setIsAddElement(true);
    stack.push(inputData);
    setInputData('');
    (document.querySelector('input[name=stack]') as HTMLInputElement).value =
      '';
    setStages(stack.getArray());
    setElementPhase(ElementStates.Changing);
  };

  const delItem = () => {
    setElementPhase(ElementStates.Changing);
    setIsLoader(true);
    setIsAddElement(false);
    setTimeout(() => {
      stack.pop();
      setStages(stack.getArray());
    }, 700);
  };

  const clearItem = () => {
    stack.clear();
    setStages(null);
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
    if (isLoader) {
      setIsDisabledInput(true);
      setIsDisabledDelete(true);
    } else {
      setIsDisabledInput(false);

      stages && stages.length > 0
        ? setIsDisabledDelete(false)
        : setIsDisabledDelete(true);
    }
  }, [isLoader]);

  useEffect(() => {
    if (stages && stages.length > 0) {
      setCurrStage(
        <motion.div
          className={styles.result}
          layout
          transition={{ ease: 'easeIn', duration: 0.5 }}
        >
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
        </motion.div>
      );
      if (isLoader)
        setTimeout(() => {
          setIsLoader(false);
          setElementPhase(ElementStates.Default);
        }, 700);
    } else {
      setCurrStage(<></>);
    }
  }, [stages, elementPhase]);

  /* #######################
  ========== JSX ==========
  ####################### */

  return (
    <SolutionLayout title='Стек'>
      <form className={styles.form} onSubmit={runAlgorithm}>
        <div className={styles.formPart}>
          <Input
            maxLength={4}
            isLimitText={true}
            onChange={changeInput}
            extraClass={styles.input}
            name='stack'
          />
          <Button
            type='submit'
            text='Добавить'
            value='Добавить'
            isLoader={isLoader && isAddElement}
            disabled={isDisabledInput}
          />
          <Button
            type='button'
            text='Удалить'
            value='Удалить'
            isLoader={isLoader && !isAddElement}
            disabled={isDisabledDelete}
            onClick={delItem}
          />
        </div>
        <Button
          type='button'
          text='Очистить'
          // isLoader={isLoader}
          disabled={isDisabledDelete}
          onClick={clearItem}
        />
      </form>

      {currStage}
    </SolutionLayout>
  );
};
