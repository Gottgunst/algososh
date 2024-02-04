import { Dispatch, FormEventHandler, useState } from 'react';
import { ElementStates } from '../types/element-states';

export const useStagesState: TUseStagesState = <S, CS>(input: any) => {
  // входящие данные
  const [inputData, setInputData] = useState<typeof input | null>(input);

  // сцена загружается или анимируется
  const [isLoader, setIsLoader] = useState(false);
  // отключение кнопок ввода
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  // отключение кнопок очистки
  const [isDisabledDelete, setIsDisabledDelete] = useState(false);
  //элемент добавляется или стирается
  const [isAddElement, setIsAddElement] = useState(true);

  // данные для всех сцен
  const [stages, setStages] = useState<S | null>(null);
  // элементы текущей сцены
  const [currStage, setCurrStage] = useState<CS | null>(null);

  // цвет покраски элемента
  const [elementPhase, setElementPhase] = useState(ElementStates.Changing);
  // индекс элемента для покраски
  const [currElement, setCurrElement] = useState(0);

  // круги анимации
  const [lap, setLap] = useState<number | null>(null);

  const changeInput = (e: any) => {
    setInputData((e.target as HTMLInputElement).value);
  };

  // Промисы для контроля анимации
  const timeline = (callback: Function) =>
    new Promise<void>((resolve) => {
      callback();
      resolve();
    });
  // пауза
  const wait = (time = 700) =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });

  return {
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
    lap,
    setLap,
    timeline,
    wait,
  };
};

/* #######################
========== Типы ==========
####################### */
type TUseStagesState = <S, CS = JSX.Element>(
  input?: any
) => {
  inputData: typeof input;
  setInputData: Dispatch<typeof input>;

  changeInput: FormEventHandler<HTMLInputElement>;

  isLoader: boolean;
  setIsLoader: Dispatch<boolean>;

  isDisabledInput: boolean;
  setIsDisabledInput: Dispatch<boolean>;

  isDisabledDelete: boolean;
  setIsDisabledDelete: Dispatch<boolean>;

  isAddElement: boolean;
  setIsAddElement: Dispatch<boolean>;

  stages: S | null;
  setStages: Dispatch<S | null>;

  currStage: CS | null;
  setCurrStage: Dispatch<CS | null>;

  elementPhase: ElementStates;
  setElementPhase: Dispatch<ElementStates>;

  currElement: number;
  setCurrElement: Dispatch<number>;

  lap: number | null;
  setLap: Dispatch<number | null>;

  timeline: (callback: Function) => Promise<void>;
  wait: (time: number) => Promise<void>;
};
