import { nanoid } from 'nanoid';

export const arrWithMemo: TArrWithMemo = (arr) =>
  arr.map((el, i) => ({ data: el, id: nanoid(), index: i }));

/* #######################
========== Типы ==========
####################### */
type TArrWithMemo = <T>(arr: T[]) => TArrWithId<T>[];

export type TArrWithId<T> = {
  data: T;
  id: string;
  index: number;
};
