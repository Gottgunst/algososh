import { nanoid } from 'nanoid';

export const arrWithMemo: TArrWithMemo = (arr) =>
  arr.map((el, i) => ({
    data: el,
    id: 'id' + Math.round(Math.random() * 1000) + 'd' + Date.now(),
    index: i,
  }));

/* #######################
========== Типы ==========
####################### */
type TArrWithMemo = <T>(arr: T[]) => TArrWithId<T>[];

export type TArrWithId<T> = {
  data: T;
  id: string;
  index: number;
};
