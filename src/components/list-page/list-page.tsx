import React, { FormEventHandler, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { motion } from 'framer-motion';
import { useStagesState } from '../../hooks/useStagesState';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { LinkedList } from '../../algorithms/LinkedList';
import { Methods } from '../../types/methods';
import { ElementStates } from '../../types/element-states';
import { TArrWithId } from '../../utils/arrWithMemo';
import styles from './list-page.module.css';

// Максимальный Размер Списка
const listSize = 7;

export const ListPage: React.FC = () => {
  const [linkedList] = useState(new LinkedList<string>());
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [isDisabledInputIndex, setIsDisabledInputIndex] = useState(false);
  const [isEnough, setIsEnough] = useState(false);

  const [method, setMethod] = useState<Methods | null>();
  const [headInfo, setHeadInfo] = useState<JSX.Element | string | null>('head');
  const [tailInfo, setTailInfo] = useState<JSX.Element | string | null>('tail');

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
    timeline,
    wait,
  } = useStagesState<TArrWithId<string | null>[]>('');

  const changeInputIndex: FormEventHandler<HTMLInputElement> = (e: any) => {
    const input = Number((e.target as HTMLInputElement).value);

    if (input < 0 || input > linkedList.getSize() - 1) {
      setIsDisabledInputIndex(true);
      e.target.value = 0;
    } else {
      setIsDisabledInputIndex(false);
      setInputIndex(input);
    }
  };

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const method: Methods = (e.nativeEvent as any).submitter.value;
    const size = linkedList.getSize();
    // const isFromHead = size / 2 - inputIndex > 0;
    setMethod(method);
    setIsLoader(true);

    setHeadInfo(miniCircle(inputData, true));
    setElementPhase(ElementStates.Default);

    switch (method) {
      case Methods.addHead:
        setCurrElement(0);
        linkedList.prepend(inputData);
        break;
      case Methods.addTail:
        setCurrElement(size - 1);
        linkedList.append(inputData);
        break;
      case Methods.addIndex:
        // setCurrElement(isFromHead ? 0 : size - 1);
        setCurrElement(0);
        linkedList.insertAt(inputData, inputIndex);
        setElementPhase(ElementStates.Changing);
        break;

      default:
        break;
    }
  };

  const delItem = (method: Methods) => {
    const size = linkedList.getSize();
    const removeCurrValue = (index: number) => {
      const temp = [...stages!];
      temp[index].data = '';
      return temp;
    };
    setMethod(method);
    setIsLoader(true);
    setElementPhase(ElementStates.Changing);

    if (stages)
      switch (method) {
        case Methods.delHead:
          setCurrElement(0);
          setTailInfo(miniCircle(stages[0].data!, false));
          setStages(removeCurrValue(0));
          linkedList.shift();
          break;
        case Methods.delTail:
          setCurrElement(size - 1);
          setTailInfo(miniCircle(stages[size - 1].data!, false));
          setStages(removeCurrValue(size - 1));
          linkedList.pop();
          break;
        case Methods.delIndex:
          setCurrElement(inputIndex);

          setTailInfo(miniCircle(stages[inputIndex].data!, false));
          setStages(removeCurrValue(inputIndex));
          linkedList.removeAt(inputIndex);
          break;

        default:
          break;
      }
  };

  const miniCircle = (input: string, isHead: boolean) => (
    <motion.div
      layout
      initial={isHead ? { y: -30, opacity: 0 } : { y: -50, opacity: 0 }}
      animate={isHead ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
      exit={isHead ? { y: 50, opacity: 0 } : { y: 30, opacity: 0 }}
      transition={
        isHead
          ? { duration: 0.2, delay: 0.5, ease: 'easeIn' }
          : { duration: 0.5, delay: 0.2, ease: 'easeOut' }
      }
    >
      <Circle isSmall letter={input} state={ElementStates.Changing} />
    </motion.div>
  );

  /* #######################
  ======== Эффекты ========
  ####################### */

  useEffect(() => {
    if (linkedList.getSize() === 0) {
      linkedList.init(['34', '8', '1']);
      setElementPhase(ElementStates.Default);
      setStages(linkedList.getList());
    }
    return () => {
      setCurrStage(<></>);
    };
  }, []);

  useEffect(() => {
    if (inputData === '') setIsDisabledInput(true);
    else setIsDisabledInput(false);

    if (linkedList.getSize() !== 0) setIsDisabledDelete(false);
  }, [inputData]);

  useEffect(() => {
    if (isLoader) {
      setIsDisabledDelete(true);
      setIsDisabledInput(true);
      setIsDisabledInputIndex(true);
    } else {
      setIsDisabledInput(false);
      setIsDisabledInputIndex(false);

      linkedList.getSize() === 0
        ? setIsDisabledDelete(true)
        : setIsDisabledDelete(false);
    }
  }, [isLoader]);

  useEffect(() => {
    const size = linkedList.getSize();
    size === listSize ? setIsEnough(true) : setIsEnough(false);

    if (stages) {
      timeline(() => {
        setCurrStage(
          <motion.div className={styles.result} layout>
            {stages.map((el, i) => {
              const isFirst = i === 0;
              const isLast = stages.length - 1 === i;
              const isCurr = currElement === i;
              const isHeadInfo = typeof headInfo !== 'string';
              const isTailInfo = typeof tailInfo !== 'string';
              const isIndexMethod =
                method === Methods.addIndex || method === Methods.delIndex;

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
                  className={styles.wrapper}
                >
                  <Circle
                    letter={el.data + ''}
                    index={i}
                    head={
                      isHeadInfo && isCurr ? headInfo : isFirst ? 'head' : ''
                    }
                    tail={
                      isTailInfo && isCurr ? tailInfo : isLast ? 'tail' : ''
                    }
                    state={
                      isCurr
                        ? elementPhase
                        : isIndexMethod && i < currElement
                        ? ElementStates.Changing
                        : ElementStates.Default
                    }
                  />
                  {isLast ? '' : <ArrowIcon />}
                </motion.div>
              );
            })}
          </motion.div>
        );
      })
        .then(() => wait(1600))
        .then(() => {
          if (method === Methods.addTail) {
            setCurrElement(size - 1);
            setElementPhase(ElementStates.Modified);
          }
        })
        .then(() => {
          if (
            (method === Methods.addIndex || method === Methods.delIndex) &&
            currElement !== inputIndex
          ) {
            return Promise.reject();
          }
        })
        .then(() => {
          setIsLoader(false);
          if (method === Methods.addTail || method === Methods.addHead) {
            setElementPhase(ElementStates.Modified);
            setHeadInfo('head');
            setStages(linkedList.getList());
            setMethod(null);
            setInputData('');
            (
              document.querySelector('input[name=list]') as HTMLInputElement
            ).value = '';
          }
          if (method === Methods.delHead || method === Methods.delTail) {
            setTailInfo('tail');
            setStages(linkedList.getList());
            setMethod(null);
          }
          if (method === Methods.addIndex || method === Methods.delIndex) {
            if (method === Methods.addIndex) {
              setElementPhase(ElementStates.Modified);
              setInputData('');
              (
                document.querySelector('input[name=list]') as HTMLInputElement
              ).value = '';
            } else setElementPhase(ElementStates.Default);
            setTailInfo('tail');
            setHeadInfo('head');
            setStages(linkedList.getList());
            setMethod(null);
          }
        })
        .then(() => wait(1500))
        .then(() => {
          if (method === null) setElementPhase(ElementStates.Default);
        })
        .catch(() => setCurrElement(currElement + 1));
    }
  }, [stages, elementPhase, currElement, headInfo, tailInfo]);

  /* #######################
  ========== JSX ==========
  ####################### */

  return (
    <SolutionLayout title='Связный список'>
      <form className={styles.form} onSubmit={runAlgorithm}>
        <div className={styles.formPart}>
          <Input
            maxLength={4}
            isLimitText={true}
            onChange={changeInput}
            name='list'
            extraClass={styles.input}
          />
          <Button
            type='submit'
            text={isEnough ? 'Нет места' : 'Добавить в head'}
            value={Methods.addHead}
            isLoader={isLoader && method === Methods.addHead}
            disabled={isDisabledInput || isEnough}
            extraClass={styles.button}
          />
          <Button
            type='submit'
            text={isEnough ? 'Нет места' : 'Добавить в tail'}
            value={Methods.addTail}
            isLoader={isLoader && method === Methods.addTail}
            disabled={isDisabledInput || isEnough}
            extraClass={styles.button}
          />
          <Button
            type='button'
            text='Удалить из head'
            isLoader={isLoader && method === Methods.delHead}
            disabled={isDisabledDelete}
            onClick={() => delItem(Methods.delHead)}
            extraClass={styles.button}
          />
          <Button
            type='button'
            text='Удалить из tail'
            isLoader={isLoader && method === Methods.delTail}
            disabled={isDisabledDelete}
            onClick={() => delItem(Methods.delTail)}
            extraClass={styles.button}
          />
        </div>
        <div className={styles.formPart}>
          <Input
            type='number'
            onChange={changeInputIndex}
            name='index-list'
            extraClass={styles.input}
            defaultValue={0}
            max={isDisabledDelete ? 0 : linkedList.getSize() - 1}
            min={0}
          />
          <Button
            type='submit'
            text={isEnough ? 'Нет места' : 'Добавить по индексу'}
            value={Methods.addIndex}
            isLoader={isLoader && method === Methods.addIndex}
            disabled={isDisabledInputIndex || isDisabledInput || isEnough}
            extraClass={styles.button}
          />
          <Button
            type='button'
            text='Удалить по индексу'
            isLoader={isLoader && method === Methods.delIndex}
            disabled={isDisabledDelete || isDisabledInputIndex}
            onClick={() => delItem(Methods.delIndex)}
            extraClass={styles.button}
          />
        </div>
      </form>

      {currStage}
    </SolutionLayout>
  );
};
