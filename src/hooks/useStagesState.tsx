import { Dispatch, useState } from 'react';

export const useStagesState: TUseStagesState = <S, CS>(input: any) => {
  // входящие данные
  const [inputData, setInputData] = useState(input);

  // сцена загружается или анимируется
  const [isLoader, setIsLoader] = useState(false);
  // отключение кнопок ввода
  const [isDisabledInput, setIsDisabledInput] = useState(false);

  // данные для всех сцен
  const [stages, setStages] = useState<S | null>(null);
  // элементы текущей сцены
  const [currStage, setCurrStage] = useState<CS | null>(null);

  // круги анимации
  const [lap, setLap] = useState<number | null>(null);

  return {
    inputData,
    setInputData,
    isLoader,
    setIsLoader,
    isDisabledInput,
    setIsDisabledInput,
    stages,
    setStages,
    currStage,
    setCurrStage,
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

  isLoader: boolean;
  setIsLoader: Dispatch<boolean>;

  isDisabledInput: boolean;
  setIsDisabledInput: Dispatch<boolean>;

  stages: S | null;
  setStages: Dispatch<S>;

  currStage: CS | null;
  setCurrStage: Dispatch<CS>;

  lap: number | null;
  setLap: Dispatch<number | null>;
};
