import { Dispatch, FormEventHandler, useState } from 'react';
import { ElementStates } from '../types/element-states';

export const useStagesState: TUseStagesState = <S, CS>(input: any) => {
  // входящие данные
  const [inputData, setInputData] = useState(input);

  // сцена загружается или анимируется
  const [isLoader, setIsLoader] = useState(false);
  // отключение кнопок ввода
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  // отключение кнопок очистки
  const [isDisabledDelete, setIsDisabledDelete] = useState(false);

  // данные для всех сцен
  const [stages, setStages] = useState<S | null>(null);
  // элементы текущей сцены
  const [currStage, setCurrStage] = useState<CS | null>(null);
  // покраска элемента
  const [elementPhase, setElementPhase] = useState(ElementStates.Changing);

  // круги анимации
  const [lap, setLap] = useState<number | null>(null);

  const changeInput = (e: any) => {
    setInputData((e.target as HTMLInputElement).value);
  };

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
    stages,
    setStages,
    currStage,
    setCurrStage,
    elementPhase,
    setElementPhase,
    lap,
    setLap,
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

  stages: S | null;
  setStages: Dispatch<S | null>;

  currStage: CS | null;
  setCurrStage: Dispatch<CS | null>;

  elementPhase: ElementStates;
  setElementPhase: Dispatch<ElementStates>;

  lap: number | null;
  setLap: Dispatch<number | null>;
};
