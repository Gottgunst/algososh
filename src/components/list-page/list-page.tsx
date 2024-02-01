import React, { FormEventHandler, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { motion } from 'framer-motion';
import { useStagesState } from '../../hooks/useStagesState';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { LinkedList, TArrWithId } from '../../algorithms/LinkedList';
import { Methods } from '../../types/methods';
import { ElementStates } from '../../types/element-states';

// Размер Списка
const listSize = 7;

export const ListPage: React.FC = () => {
  const [linkedList] = useState(new LinkedList<string>());
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [isDisabledInputIndex, setIsDisabledInputIndex] = useState(false);
  const [isEnough, setIsEnough] = useState(false);

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
    currElement,
    setCurrElement,
  } = useStagesState<TArrWithId<string | null>[]>('');

  const changeInputIndex: FormEventHandler<HTMLInputElement> = (e: any) => {
    const input = Number((e.target as HTMLInputElement).value);

    if (input > linkedList.getSize() - 1 || input < 0)
      setIsDisabledInputIndex(true);
    else {
      setIsDisabledInputIndex(false);
      setInputIndex(input);
    }
  };

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setIsLoader(true);

    const method: Methods = (e.nativeEvent as any).submitter.value;

    switch (method) {
      case Methods.addHead:
        setCurrElement(0);
        linkedList.prepend(inputData);
        break;
      case Methods.addTail:
        setCurrElement(linkedList.getSize() - 1);
        linkedList.append(inputData);
        break;
      case Methods.addIndex:
        setCurrElement(inputIndex);
        linkedList.insertAt(inputData, inputIndex);
        break;

      default:
        break;
    }
    console.log(linkedList.getList());
    setStages(linkedList.getList());
    setInputData('');
    (document.querySelector('input[name=list]') as HTMLInputElement).value = '';
    setElementPhase(ElementStates.Changing);
  };

  const delItem = (method: Methods) => {
    setIsLoader(true);

    switch (method) {
      case Methods.delHead:
        setCurrElement(0);
        linkedList.shift();
        break;
      case Methods.delTail:
        setCurrElement(linkedList.getSize() - 1);
        linkedList.pop();
        break;
      case Methods.delIndex:
        setCurrElement(inputIndex);
        linkedList.removeAt(inputIndex);
        break;

      default:
        break;
    }

    setElementPhase(ElementStates.Changing);

    setTimeout(() => {
      setStages(linkedList.getList());
    }, 500);
  };

  /* #######################
  ======== Эффекты ========
  ####################### */

  useEffect(() => {
    if (linkedList.getSize() === 0) {
      linkedList.init(['0', '34', '8', '1']);
      setElementPhase(ElementStates.Default);
      setStages(linkedList.getList());
    }
    return () => {
      setCurrStage(<></>);
    };
  }, []);

  useEffect(() => {
    // const size = queue.getCoords();
    if (inputData === '') setIsDisabledInput(true);
    else setIsDisabledInput(false);

    if (linkedList.getSize() !== 0) setIsDisabledDelete(false);
  }, [inputData]);

  useEffect(() => {
    if (linkedList.getSize() === listSize) {
      setIsEnough(true);
    } else setIsEnough(false);

    if (stages) {
      setCurrStage(
        <>
          {stages.map((el, i) => {
            const isLast = stages.length - 1 === i;
            return (
              <motion.div
                initial={{
                  y: -30,
                  opacity: 0,
                  width: isLast ? 80 : 100,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  width: isLast ? 80 : 120,
                }}
                transition={{ ease: 'easeIn', duration: 0.5, delay: i / 10 }}
                key={el.id}
                layoutId={el.id}
                style={{ display: 'flex', alignItems: 'center', gap: 16 }}
              >
                <Circle
                  letter={el.data + ''}
                  index={i}
                  head={i === 0 ? 'head' : ''}
                  tail={isLast ? 'tail  ' : ''}
                  state={
                    i === currElement ? elementPhase : ElementStates.Default
                  }
                />
                {isLast ? '' : <ArrowIcon />}
              </motion.div>
            );
          })}
        </>
      );
      if (isLoader)
        setTimeout(() => {
          setIsLoader(false);
          linkedList.getSize() === 0
            ? setIsDisabledDelete(true)
            : setIsDisabledDelete(false);
          setElementPhase(ElementStates.Default);
        }, 500);
    }
  }, [stages, elementPhase, currElement]);

  /* #######################
  ========== JSX ==========
  ####################### */

  return (
    <SolutionLayout title='Связный список'>
      <form
        className='form'
        onSubmit={runAlgorithm}
        style={{ maxWidth: 927, flexDirection: 'column' }}
      >
        <div style={{ display: 'inherit', gap: 'inherit' }}>
          <Input
            maxLength={4}
            isLimitText={true}
            onChange={changeInput}
            name='list'
            extraClass='input-width'
          />
          <Button
            type='submit'
            text={isEnough ? 'Нет места' : 'Добавить в head'}
            value={Methods.addHead}
            isLoader={isLoader}
            disabled={isDisabledInput || isEnough}
          />
          <Button
            type='submit'
            text={isEnough ? 'Нет места' : 'Добавить в tail'}
            value={Methods.addTail}
            isLoader={isLoader}
            disabled={isDisabledInput || isEnough}
          />
          <Button
            type='button'
            text='Удалить из head'
            isLoader={isLoader}
            disabled={isDisabledDelete}
            onClick={() => delItem(Methods.delHead)}
          />
          <Button
            type='button'
            text='Удалить из tail'
            isLoader={isLoader}
            disabled={isDisabledDelete}
            onClick={() => delItem(Methods.delTail)}
          />
        </div>
        <div style={{ display: 'inherit', gap: 'inherit' }}>
          <Input
            type='number'
            onChange={changeInputIndex}
            name='index-list'
            extraClass='input-width'
            defaultValue={0}
            max={linkedList.getSize() - 1}
            min={0}
          />
          <Button
            type='submit'
            text={isEnough ? 'Нет места' : 'Добавить по индексу'}
            value={Methods.addIndex}
            isLoader={isLoader}
            disabled={isDisabledInputIndex || isDisabledInput || isEnough}
            extraClass='button-width'
          />
          <Button
            type='button'
            text='Удалить по индексу'
            isLoader={isLoader}
            disabled={isDisabledDelete || isDisabledInputIndex}
            onClick={() => delItem(Methods.delIndex)}
            extraClass='button-width'
          />
        </div>
      </form>
      <motion.div className='result' layout>
        {currStage}
      </motion.div>
    </SolutionLayout>
  );
};
