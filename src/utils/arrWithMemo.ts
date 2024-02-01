export const arrWithMemo: TArrWithMemo = (arr) =>
  arr.map((el, i) => ({ data: el, index: i }));

/* #######################
========== Типы ==========
####################### */
type TArrWithMemo = <T>(arr: T[]) => TArrWithIndex<T>[];

export type TArrWithIndex<T> = {
  data: T;
  index: number;
};
