import React, { FormEventHandler, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { useStagesState } from '../../hooks/useStagesState';
import { motion } from 'framer-motion';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import { Queue } from '../../algorithms/Queue';
import styles from './queue-page.module.css';

// Размер очереди
const queueSize = 7;

export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue<string>(queueSize));
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
    currElement,
    setCurrElement,
  } = useStagesState<(string | null)[]>('');

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setIsLoader(true);
    setIsAddElement(true);
    queue.enqueue(inputData);

    setInputData('');
    (document.querySelector('input[name=queue]') as HTMLInputElement).value =
      '';
    setStages(queue.getArray());
    const [_, __, tail] = queue.getCoords();
    setCurrElement(tail);
    setElementPhase(ElementStates.Changing);
  };

  const delItem = () => {
    setElementPhase(ElementStates.Changing);
    const [_, head] = queue.getCoords();
    setCurrElement(head);
    setIsLoader(true);
    setIsAddElement(false);

    setTimeout(() => {
      queue.dequeue();
      setStages(queue.getArray());
    }, 500);
  };

  const clearItem = () => {
    queue.clear();
    setStages(Array(queueSize).fill(null));
  };

  /* #######################
  ======== Эффекты ========
  ####################### */

  useEffect(() => {
    setIsDisabledDelete(true);
    setStages(Array(queueSize).fill(null));
    setInputData(null);
    return () => {
      setCurrStage(<></>);
    };
  }, []);

  useEffect(() => {
    const [length] = queue.getCoords();

    if (isLoader) {
      setIsDisabledInput(true);
      setIsDisabledDelete(true);
    } else {
      if (inputData === '' || length === queueSize || inputData === null)
        setIsDisabledInput(true);
      else setIsDisabledInput(false);

      queue.isEmpty() ? setIsDisabledDelete(true) : setIsDisabledDelete(false);
    }
  }, [isLoader, inputData, stages]);

  useEffect(() => {
    if (stages) {
      const [_, head, tail] = queue.getCoords();
      setCurrStage(
        <motion.div className={styles.result} layout>
          {stages.map((el, i) => (
            <motion.div
              initial={{ x: -5, y: -30, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ ease: 'easeIn', duration: 0.5, delay: i / 10 }}
              key={i}
              layout
            >
              <Circle
                letter={el ? el + '' : ''}
                index={i}
                head={el && i === head ? 'head' : ''}
                tail={el && i === tail ? 'tail  ' : ''}
                state={
                  el && i === currElement ? elementPhase : ElementStates.Default
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
        }, 500);
    }
  }, [stages, elementPhase, currElement]);

  /* #######################
  ========== JSX ==========
  ####################### */

  return (
    <SolutionLayout title='Очередь'>
      <form className={styles.form} onSubmit={runAlgorithm}>
        <div className={styles.formPart}>
          <Input
            maxLength={4}
            isLimitText={true}
            onChange={changeInput}
            extraClass={styles.input}
            name='queue'
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
          value='Очистить'
          // isLoader={isLoader}
          disabled={isDisabledDelete}
          onClick={clearItem}
        />
      </form>

      {currStage}
    </SolutionLayout>
  );
};
