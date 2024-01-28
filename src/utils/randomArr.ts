export const randomArr: TRandomArr = ({ minLen = 3, maxLen = 17 } = {}) => {
  const length = Math.round(Math.random() * (maxLen - minLen) + minLen);

  const array = [0];

  for (let i = 0; i < length; i++) {
    array[i] = Math.round(Math.random() * 100);
  }

  return array;
};

/* #######################
========== Типы ==========
####################### */
type TRandomArr = (props?: TRandomArrProps) => number[];

type TRandomArrProps = {
  minLen?: number | undefined;
  maxLen?: number | undefined;
};
