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
import { rejects } from 'assert';

// Максимальный Размер Списка
const listSize = 7;

export const ListPage: React.FC = () => {
  const [linkedList] = useState(new LinkedList<string>());
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [isDisabledInputIndex, setIsDisabledInputIndex] = useState(false);
  const [isEnough, setIsEnough] = useState(false);

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
  } = useStagesState<TArrWithId<string | null>[]>('');

  const timeline = (callback: Function) =>
    new Promise<void>((resolve) => {
      callback();
      resolve();
    });

  const wait = (time = 700) =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });

  const changeInputIndex: FormEventHandler<HTMLInputElement> = (e: any) => {
    const input = Number((e.target as HTMLInputElement).value);

    if (input < 0) setIsDisabledInputIndex(true);
    else {
      setIsDisabledInputIndex(false);
      setInputIndex(input);
    }
  };

  const runAlgorithm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const method: Methods = (e.nativeEvent as any).submitter.value;
    const size = linkedList.getSize();
    const timer = size * 100 + 500;
    const isFromHead = size / 2 - inputIndex > 0;

    timeline(() => {
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
          // setCurrElement(isFromHead ? -1 : size);
          setCurrElement(inputIndex);
          linkedList.insertAt(inputData, inputIndex);
          setElementPhase(ElementStates.Changing);
          break;

        default:
          break;
      }
    })
      .then(() => wait(timer))
      // .then(() =>
      //   timeline(() => {
      //     console.log(method);
      //     if (method === Methods.addIndex)
      //       for (
      //         let i = currElement;
      //         i !== inputIndex;
      //         isFromHead ? i++ : i--
      //       ) {
      //         console.log(i);

      //         setCurrElement(i);
      //       }
      //   })
      // )
      .then(() => {
        if (method === Methods.addTail) setCurrElement(size);
      })
      .then(() => wait(timer))
      .then(() => {
        setStages(linkedList.getList());
        setHeadInfo('head');
        setElementPhase(ElementStates.Modified);
        setInputData('');
        (document.querySelector('input[name=list]') as HTMLInputElement).value =
          '';
        setIsLoader(false);
      })
      .then(() => wait(timer * 1.5))
      .then(() => {
        setElementPhase(ElementStates.Default);
      });
  };

  const delItem = (method: Methods) => {
    const size = linkedList.getSize();
    const timer = size * 100 + 500;

    const removeCurrValue = (index: number) => {
      const temp = [...stages!];
      temp[index].data = '';
      return temp;
    };

    timeline(() => {
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
    })
      .then(() => wait(timer * 2))
      .then(() => {
        setStages(linkedList.getList());
        setTailInfo('tail');
        setElementPhase(ElementStates.Default);
        setIsLoader(false);
      });
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
    linkedList.getSize() === listSize ? setIsEnough(true) : setIsEnough(false);
    linkedList.getSize() === 0
      ? setIsDisabledDelete(true)
      : setIsDisabledDelete(false);

    if (stages) {
      setCurrStage(
        <>
          {stages.map((el, i) => {
            const isFirst = i === 0;
            const isLast = stages.length - 1 === i;
            const isCurr = currElement === i;
            const isHeadInfo = typeof headInfo !== 'string';
            const isTailInfo = typeof tailInfo !== 'string';

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
                  head={isHeadInfo && isCurr ? headInfo : isFirst ? 'head' : ''}
                  tail={isTailInfo && isCurr ? tailInfo : isLast ? 'tail' : ''}
                  state={isCurr ? elementPhase : ElementStates.Default}
                />
                {isLast ? '' : <ArrowIcon />}
              </motion.div>
            );
          })}
        </>
      );
    }
  }, [stages, elementPhase, currElement, headInfo, tailInfo]);

  /* #######################
  ========== JSX ==========
  ####################### */

  return (
    <SolutionLayout title='Связный список'>
      <form
        className='form'
        onSubmit={runAlgorithm}
        style={{ maxWidth: 952, flexDirection: 'column' }}
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
            extraClass='button-width'
          />
          <Button
            type='submit'
            text={isEnough ? 'Нет места' : 'Добавить в tail'}
            value={Methods.addTail}
            isLoader={isLoader}
            disabled={isDisabledInput || isEnough}
            extraClass='button-width'
          />
          <Button
            type='button'
            text='Удалить из head'
            isLoader={isLoader}
            disabled={isDisabledDelete}
            onClick={() => delItem(Methods.delHead)}
            extraClass='button-width'
          />
          <Button
            type='button'
            text='Удалить из tail'
            isLoader={isLoader}
            disabled={isDisabledDelete}
            onClick={() => delItem(Methods.delTail)}
            extraClass='button-width'
          />
        </div>
        <div style={{ display: 'inherit', gap: 'inherit' }}>
          <Input
            type='number'
            onChange={changeInputIndex}
            name='index-list'
            extraClass='input-width'
            defaultValue={0}
            max={isDisabledDelete ? 0 : linkedList.getSize() - 1}
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
      <motion.div className='result' layout style={{ minHeight: 232 }}>
        {currStage}
      </motion.div>
    </SolutionLayout>
  );
};
